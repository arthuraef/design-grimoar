-- Inicialização do Banco Vetorial e Relacional — Design Grimoar
-- Suporte nativo para PostgreSQL 16 + pgvector em arquitetura ARM64 (Oracle Cloud Always Free)

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela Canônica de Verbetes (Sincronizada com o Schema Zod e PublisherService)
CREATE TABLE IF NOT EXISTS verbetes (
    id VARCHAR(128) PRIMARY KEY,
    slug VARCHAR(128) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(64) NOT NULL,
    subdomain VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    version VARCHAR(16) NOT NULL DEFAULT '1.0.0',
    summary TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    aliases JSONB DEFAULT '[]'::jsonb,
    academic_anchors JSONB DEFAULT '[]'::jsonb,
    audit_status VARCHAR(32) DEFAULT 'APPROVED',
    frontmatter JSONB DEFAULT '{}'::jsonb,
    content_markdown TEXT NOT NULL,
    file_path VARCHAR(512),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migrações defensivas para instâncias com banco já inicializado
ALTER TABLE verbetes ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE verbetes ADD COLUMN IF NOT EXISTS aliases JSONB DEFAULT '[]'::jsonb;
ALTER TABLE verbetes ADD COLUMN IF NOT EXISTS academic_anchors JSONB DEFAULT '[]'::jsonb;
ALTER TABLE verbetes ADD COLUMN IF NOT EXISTS audit_status VARCHAR(32) DEFAULT 'APPROVED';
ALTER TABLE verbetes ADD COLUMN IF NOT EXISTS frontmatter JSONB DEFAULT '{}'::jsonb;

-- Tabela de Embeddings para Busca Semântica
CREATE TABLE IF NOT EXISTS verbete_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    verbete_id VARCHAR(128) REFERENCES verbetes(id) ON DELETE CASCADE,
    section_name VARCHAR(255) DEFAULT '',
    section_order INT DEFAULT 0,
    section_title VARCHAR(255) DEFAULT '',
    chunk_index INT DEFAULT 0,
    content_chunk TEXT NOT NULL,
    embedding vector(1536), -- Embeddings de 1536 dimensões (OpenAI / DeepSeek / Gemini)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migrações defensivas para verbete_embeddings
ALTER TABLE verbete_embeddings ADD COLUMN IF NOT EXISTS section_name VARCHAR(255) DEFAULT '';
ALTER TABLE verbete_embeddings ADD COLUMN IF NOT EXISTS section_order INT DEFAULT 0;
ALTER TABLE verbete_embeddings ADD COLUMN IF NOT EXISTS section_title VARCHAR(255) DEFAULT '';
ALTER TABLE verbete_embeddings ADD COLUMN IF NOT EXISTS chunk_index INT DEFAULT 0;

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
