import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.POSTGRES_USER || 'grimoar'}:${process.env.POSTGRES_PASSWORD || 'grimoar_secure_pass'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'design_grimoar'}`;

async function initDatabase() {
  console.log(`🔌 [Init DB]: Conectando ao PostgreSQL via ${connectionString.replace(/:[^:@]+@/, ':****@')}...`);
  
  const pool = new pg.Pool({
    connectionString,
    connectionTimeoutMillis: 10000,
  });

  try {
    const sqlPath = path.resolve('infra/db/init.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Arquivo de schema não encontrado em ${sqlPath}`);
    }

    const sql = fs.readFileSync(sqlPath, 'utf-8');
    console.log(`📜 [Init DB]: Aplicando schema de ${sqlPath}...`);
    
    await pool.query(sql);
    console.log('✅ [Init DB]: Extensão pgvector e tabelas de verbetes e embeddings inicializadas com sucesso.');
  } catch (err: any) {
    console.error('❌ [Init DB]: Erro ao inicializar banco de dados:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
