FROM --platform=linux/arm64 node:22-slim

WORKDIR /app

ENV NODE_ENV=production

# Dependências nativas básicas para compilação ARM64 se necessário
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json tsconfig.json ./

RUN npm ci --omit=dev || npm install --production

COPY src/ ./src/
COPY schema.ts ./schema.ts
COPY prompts/ ./prompts/
COPY dsh.config.yml ./dsh.config.yml

# Executar via tsx ou compilar tsc
RUN npm install -g tsx typescript

CMD ["npx", "tsx", "src/index.ts"]
