-- Inicialização do Banco Vetorial e Relacional — Design Grimoar
-- Suporte nativo para PostgreSQL 16 + pgvector em arquitetura ARM64 (Oracle Cloud Always Free)

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela Canônica de Verbetes
CREATE TABLE IF NOT EXISTS verbetes (
    id VARCHAR(128) PRIMARY KEY,
    slug VARCHAR(128) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(64) NOT NULL,
    subdomain VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    version VARCHAR(16) NOT NULL DEFAULT '1.0.0',
    summary TEXT NOT NULL,
    frontmatter JSONB NOT NULL,
    content_markdown TEXT NOT NULL,
    file_path VARCHAR(512),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de Embeddings para Busca Semântica
CREATE TABLE IF NOT EXISTS verbete_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    verbete_id VARCHAR(128) REFERENCES verbetes(id) ON DELETE CASCADE,
    section_title VARCHAR(255) NOT NULL,
    chunk_index INT NOT NULL,
    content_chunk TEXT NOT NULL,
    embedding vector(1536), -- Suporta embeddings de 1536 dimensões (ex: OpenAI / DeepSeek / Ollama)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice Vetorial HNSW para Alta Performance em ARM64
CREATE INDEX IF NOT EXISTS idx_verbete_embeddings_hnsw 
ON verbete_embeddings USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Tabela de Auditoria Acadêmica (Etapa 3 - Verifier Log)
CREATE TABLE IF NOT EXISTS academic_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    verbete_id VARCHAR(128) REFERENCES verbetes(id) ON DELETE CASCADE,
    auditor VARCHAR(128) NOT NULL,
    audit_status VARCHAR(32) NOT NULL,
    academic_anchors_added TEXT[],
    critique_notes TEXT,
    audited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de Ingestão Determinística (Etapa 1 - Firecrawl / Audio Ingestion)
CREATE TABLE IF NOT EXISTS ingestion_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_url TEXT,
    source_type VARCHAR(64) NOT NULL, -- 'firecrawl_web', 'vibevoice_audio', 'pdf'
    raw_content TEXT NOT NULL,
    cleaned_content TEXT,
    metadata JSONB,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_verbetes_domain ON verbetes(domain);
CREATE INDEX IF NOT EXISTS idx_verbetes_slug ON verbetes(slug);
CREATE INDEX IF NOT EXISTS idx_ingestion_processed ON ingestion_sources(processed);
