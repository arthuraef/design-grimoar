import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const envPath = path.resolve('.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envParsed = dotenv.parse(envContent);

const GITHUB_TOKEN = envParsed.GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';
if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN não encontrado no .env!');
  process.exit(1);
}
const REPO = 'arthuraef/design-grimoar';

// Mapeamento dos secrets a cadastrar
const secretsToSet: Record<string, string> = {
  FIRECRAWL_API_KEY: envParsed.FIRECRAWL_API_KEY || '',
  FIRECRAWL_API_URL: envParsed.FIRECRAWL_API_URL || 'https://api.firecrawl.dev',
  EMBEDDING_API_KEY: envParsed.EMBEDDING_API_KEY || '',
  EMBEDDING_BASE_URL: envParsed.EMBEDDING_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai',
  EMBEDDING_MODEL: envParsed.EMBEDDING_MODEL || 'gemini-embedding-001',
  LEXICOGRAPHER_API_KEY: envParsed.LEXICOGRAPHER_API_KEY || '',
  LEXICOGRAPHER_BASE_URL: envParsed.LEXICOGRAPHER_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai',
  LEXICOGRAPHER_MODEL: envParsed.LEXICOGRAPHER_MODEL || 'gemini-3.5-flash',
  ACADEMIC_AUDITOR_API_KEY: envParsed.ACADEMIC_AUDITOR_API_KEY || '',
  ACADEMIC_AUDITOR_BASE_URL: envParsed.ACADEMIC_AUDITOR_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai',
  ACADEMIC_AUDITOR_MODEL: envParsed.ACADEMIC_AUDITOR_MODEL || 'gemini-3.5-flash-lite',
  NOTIFICATIONS_WEBHOOK_URL: envParsed.NOTIFICATIONS_WEBHOOK_URL || '',
  PAT_GITHUB_TOKEN: GITHUB_TOKEN,
};

console.log(`🔐 Cadastrando ${Object.keys(secretsToSet).length} secrets no repositório ${REPO}...`);

for (const [key, value] of Object.entries(secretsToSet)) {
  if (!value) {
    console.warn(`⚠️ [Pular]: Secret "${key}" está vazio no .env.`);
    continue;
  }

  try {
    execFileSync('gh', ['secret', 'set', key, '-R', REPO, '--body', value], {
      env: { ...process.env, GH_TOKEN: GITHUB_TOKEN },
      stdio: 'pipe',
    });
    console.log(`✅ Secret cadastrado com sucesso: ${key}`);
  } catch (err: any) {
    console.error(`❌ Falha ao cadastrar secret ${key}:`, err.message);
  }
}

console.log('\n🎉 Todos os secrets foram registrados com sucesso no GitHub Actions!');
