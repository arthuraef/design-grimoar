#!/usr/bin/env bash
# ==============================================================================
# Design Grimoar — Oracle Cloud (OCI) Always Free ARM64 Idempotent Setup Script
# ==============================================================================
# Executa a configuração segura e idempotente para a instância Ubuntu 22.04/24.04 ARM64:
# 1. Validação de arquitetura (ARM64 / aarch64)
# 2. Criação/Validação de Swapfile de 4 GB
# 3. Verificação/Instalação do Docker Engine & Docker Compose V2
# 4. Criação de diretórios e ajuste de permissões (UID/GID)
# 5. Validação de segurança das variáveis do .env (sem vazar segredos)
# 6. Build e inicialização segura dos containers com healthcheck
# ==============================================================================

set -euo pipefail

# Paleta ANSI para logs no terminal
COLOR_RESET="\033[0m"
COLOR_INFO="\033[36m"
COLOR_SUCCESS="\033[32m"
COLOR_WARN="\033[33m"
COLOR_ERROR="\033[31m"
COLOR_BOLD="\033[1m"

log_info() {
    echo -e "${COLOR_INFO}[INFO]${COLOR_RESET} $1"
}

log_success() {
    echo -e "${COLOR_SUCCESS}[SUCCESS]${COLOR_RESET} $1"
}

log_warn() {
    echo -e "${COLOR_WARN}[WARN]${COLOR_RESET} $1"
}

log_error() {
    echo -e "${COLOR_ERROR}[ERROR]${COLOR_RESET} $1" >&2
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

echo -e "${COLOR_BOLD}"
echo "=================================================================="
echo "    DESIGN GRIMOAR — DEPLOY AUTÔNOMO OCI ARM64 (ALWAYS FREE)     "
echo "=================================================================="
echo -e "${COLOR_RESET}"
log_info "Diretório do projeto: ${PROJECT_ROOT}"

# ------------------------------------------------------------------------------
# 1. Validação da Arquitetura (ARM64 / aarch64)
# ------------------------------------------------------------------------------
log_info "Verificando arquitetura da máquina..."
ARCH="$(uname -m)"
if [[ "${ARCH}" == "aarch64" || "${ARCH}" == "arm64" ]]; then
    log_success "Arquitetura validada: ${ARCH} (compatível com Ampere A1 Flex OCI)"
else
    log_warn "Arquitetura detectada: ${ARCH}. As imagens foram otimizadas para ARM64/x86_64, continuando com aviso."
fi

# ------------------------------------------------------------------------------
# 2. Verificação e Criação de Swapfile (4 GB)
# ------------------------------------------------------------------------------
log_info "Verificando espaço de memória Swap..."
SWAP_TOTAL_KB=$(grep SwapTotal /proc/meminfo 2>/dev/null | awk '{print $2}' || echo "0")
SWAP_MIN_KB=$((2 * 1024 * 1024)) # Mínimo 2 GB

if [[ "${SWAP_TOTAL_KB}" -lt "${SWAP_MIN_KB}" ]]; then
    log_warn "Swap insuficiente (${SWAP_TOTAL_KB} kB). Configurando Swapfile de 4 GB para estabilidade..."
    if [[ $EUID -ne 0 ]]; then
        SUDO_CMD="sudo"
    else
        SUDO_CMD=""
    fi

    if [[ ! -f /swapfile ]]; then
        log_info "Alocando /swapfile de 4 GB..."
        ${SUDO_CMD} fallocate -l 4G /swapfile || ${SUDO_CMD} dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress
        ${SUDO_CMD} chmod 600 /swapfile
        ${SUDO_CMD} mkswap /swapfile
    fi

    log_info "Ativando /swapfile..."
    ${SUDO_CMD} swapon /swapfile 2>/dev/null || true

    if ! grep -q '/swapfile' /etc/fstab; then
        log_info "Persistindo /swapfile em /etc/fstab..."
        echo '/swapfile none swap sw 0 0' | ${SUDO_CMD} tee -a /etc/fstab > /dev/null
    fi
    log_success "Swapfile de 4 GB ativado com sucesso."
else
    log_success "Swap já configurado e suficiente: $((SWAP_TOTAL_KB / 1024)) MB."
fi

# ------------------------------------------------------------------------------
# 3. Verificação/Instalação do Docker Engine & Docker Compose V2
# ------------------------------------------------------------------------------
log_info "Verificando instalação do Docker e Docker Compose..."
if ! command -v docker &> /dev/null; then
    log_warn "Docker não encontrado. Instalando Docker CE oficial..."
    if [[ $EUID -ne 0 ]]; then
        SUDO_CMD="sudo"
    else
        SUDO_CMD=""
    fi

    ${SUDO_CMD} apt-get update -y
    ${SUDO_CMD} apt-get install -y ca-certificates curl gnupg lsb-release
    ${SUDO_CMD} install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | ${SUDO_CMD} gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ${SUDO_CMD} chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | ${SUDO_CMD} tee /etc/apt/sources.list.d/docker.list > /dev/null

    ${SUDO_CMD} apt-get update -y
    ${SUDO_CMD} apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ${SUDO_CMD} systemctl enable docker
    ${SUDO_CMD} systemctl start docker

    CURRENT_USER="${USER:-$(whoami)}"
    ${SUDO_CMD} usermod -aG docker "${CURRENT_USER}" || true
    log_success "Docker CE e Docker Compose instalados com sucesso."
else
    log_success "Docker já está instalado: $(docker --version)"
fi

if ! docker compose version &> /dev/null; then
    log_error "Plugin 'docker compose' V2 não está disponível. Por favor instale o pacote 'docker-compose-plugin'."
    exit 1
else
    log_success "Docker Compose V2 disponível: $(docker compose version)"
fi

# ------------------------------------------------------------------------------
# 4. Estrutura de Diretórios, Permissões e Git Safe Directory
# ------------------------------------------------------------------------------
log_info "Configurando permissões e diretórios de dados..."
mkdir -p taxonomia docs/src/content/docs logs/hermes infra/db

# Ajustar permissões para permitir escrita do container Node (UID:GID 1000:1000)
chmod -R 775 taxonomia docs/src/content/docs logs

# Configurar Git safe.directory para evitar recusas de permissão no repo
git config --global --add safe.directory "${PROJECT_ROOT}" 2>/dev/null || true
git config --global --add safe.directory "/app" 2>/dev/null || true

# Limpeza preventiva de locks residuais do Git
rm -f .git/index.lock .git/refs/heads/*.lock 2>/dev/null || true
log_success "Diretórios e permissões normalizados."

# ------------------------------------------------------------------------------
# 5. Validação de Segurança do Arquivo .env
# ------------------------------------------------------------------------------
log_info "Validando configurações de ambiente (.env)..."
if [[ ! -f .env ]]; then
    if [[ -f .env.example ]]; then
        log_warn ".env não encontrado. Copiando .env.example para .env..."
        cp .env.example .env
        log_error "Arquivo .env recém-criado. Configure as chaves de API obrigatórias antes de iniciar os serviços!"
        exit 1
    else
        log_error "Nenhum arquivo .env ou .env.example encontrado."
        exit 1
    fi
fi

# Validar variáveis críticas sem expor seus valores
check_env_var() {
    local var_name="$1"
    local val
    val="$(grep -E "^${var_name}=" .env | cut -d '=' -f2- | tr -d ' "\r' || true)"
    if [[ -z "${val}" || "${val}" == "alterar_para_senha_segura_em_producao" ]]; then
        log_error "Variável obrigatória ausente ou padrão em .env: ${var_name}"
        return 1
    fi
    log_success "Variável validada: ${var_name} (definida com ${#val} caracteres)"
    return 0
}

MISSING_VARS=0
check_env_var "POSTGRES_PASSWORD" || MISSING_VARS=$((MISSING_VARS + 1))
check_env_var "DATABASE_URL" || MISSING_VARS=$((MISSING_VARS + 1))
check_env_var "FIRECRAWL_API_KEY" || MISSING_VARS=$((MISSING_VARS + 1))
check_env_var "EMBEDDING_API_KEY" || MISSING_VARS=$((MISSING_VARS + 1))
check_env_var "GITHUB_TOKEN" || MISSING_VARS=$((MISSING_VARS + 1))

if [[ "${MISSING_VARS}" -gt 0 ]]; then
    log_error "Existem ${MISSING_VARS} variáveis críticas não configuradas no arquivo .env."
    log_error "Edite o arquivo .env e execute este script novamente."
    exit 1
fi

# ------------------------------------------------------------------------------
# 6. Build Multi-stage e Inicialização dos Containers
# ------------------------------------------------------------------------------
log_info "Validando sintaxe do docker-compose.yml..."
docker compose config > /dev/null
log_success "docker-compose.yml sintaticamente válido."

log_info "Construindo e iniciando containers em segundo plano..."
docker compose up -d --build

log_info "Aguardando serviços atingirem estado saudável (Healthchecks)..."
MAX_WAIT_SECONDS=60
ELAPSED=0
HEALTHY=false

while [[ ${ELAPSED} -lt ${MAX_WAIT_SECONDS} ]]; do
    UNHEALTHY_SERVICES=$(docker compose ps --format '{{.Service}}: {{.Health}}' | grep -v 'healthy' | grep -v '^$' || true)
    if [[ -z "${UNHEALTHY_SERVICES}" ]]; then
        HEALTHY=true
        break
    fi
    sleep 3
    ELAPSED=$((ELAPSED + 3))
    echo -n "."
done
echo ""

if [[ "${HEALTHY}" == "true" ]]; then
    log_success "Todos os serviços do Design Grimoar estão saudáveis e operacionais!"
else
    log_warn "Alguns serviços ainda estão inicializando ou sem healthcheck completo:"
    docker compose ps
fi

echo -e "\n${COLOR_BOLD}=== STATUS DOS CONTAINERS ===${COLOR_RESET}"
docker compose ps

echo -e "\n${COLOR_BOLD}=== COMANDOS ÚTEIS PARA OPERAÇÃO ===${COLOR_RESET}"
echo "  - Monitorar logs em tempo real:  npm run cloud:logs   (ou docker compose logs -f --tail=50)"
echo "  - Verificar status dos serviços: npm run cloud:status (ou docker compose ps)"
echo "  - Reiniciar orquestrador:        npm run cloud:restart"
echo "  - Backup do banco pgvector:      npm run db:backup"
echo "  - Desligar stack com segurança:  npm run cloud:down"
echo ""
log_success "Setup do Design Grimoar na Oracle Cloud ARM64 concluído com sucesso!"
