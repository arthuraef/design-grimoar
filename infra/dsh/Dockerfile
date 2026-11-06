# ==============================================================================
# DOCKERFILE MULTI-STAGE — DEEPSEEK HARNESS (ORACLE CLOUD ARM64 NATIVE)
# ==============================================================================

# ------------------------------------------------------------------------------
# Estágio 1: Builder (Compilação TypeScript)
# ------------------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
COPY schema.ts ./schema.ts
COPY prompts/ ./prompts/

RUN npm run build

# ------------------------------------------------------------------------------
# Estágio 2: Runner Mínimo de Produção
# ------------------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Dependências nativas mínimas de sistema para Git e Healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Artefatos compilados do estágio builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prompts ./prompts
COPY --from=builder /app/schema.ts ./schema.ts
COPY dsh.config.yml ./dsh.config.yml

# Script de Entrypoint defensivo (UID/GID, Git safe.directory e locks órfãos)
COPY infra/dsh/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/index.js"]
