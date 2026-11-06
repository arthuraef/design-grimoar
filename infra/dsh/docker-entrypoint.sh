#!/bin/sh
set -e

# ==============================================================================
# ENTRYPOINT DETERMINÍSTICO — DEEPSEEK HARNESS (ORACLE CLOUD ALWAYS FREE ARM64)
# ==============================================================================

# 1. Configurar safe.directory para evitar erro de propriedade cruzada no Git
git config --system --add safe.directory /app 2>/dev/null || true
git config --global --add safe.directory /app 2>/dev/null || true
git config --global --add safe.directory '*' 2>/dev/null || true

# 2. Limpar locks órfãos do Git caso existam após queda da VM
if [ -f "/app/.git/index.lock" ]; then
    echo "🧹 [Entrypoint]: Removendo lock órfão /app/.git/index.lock..."
    rm -f /app/.git/index.lock 2>/dev/null || true
fi

# 3. Garantir existência de diretórios de persistência
mkdir -p /app/logs /app/taxonomia /app/docs/src/content/docs

# 4. Configurar identidade Git padrão se não existir
if ! git config user.name >/dev/null 2>&1; then
    git config --global user.name "${GIT_AUTHOR_NAME:-Grimoar Autonomous Agent}"
fi
if ! git config user.email >/dev/null 2>&1; then
    git config --global user.email "${GIT_AUTHOR_EMAIL:-grimoar@designgrimoar.canonical}"
fi

echo "🚀 [Entrypoint]: Ambiente configurado. Iniciando Orquestrador..."
exec "$@"
