import fs from 'node:fs';
import path from 'node:path';
import { validateVerbete } from './schema.js';

const samplePath = path.resolve('taxonomia/template-verbete.md');
console.log(`Lendo verbete de teste: ${samplePath}`);

const content = fs.readFileSync(samplePath, 'utf-8');
const result = validateVerbete(content);

if (result.isValid) {
  console.log('✅ Validação do Verbete bem-sucedida!');
  console.log('Frontmatter parseado:', JSON.stringify(result.frontmatter, null, 2));
} else {
  console.error('❌ Falha na validação do verbete:');
  for (const err of result.errors) {
    console.error(` - ${err}`);
  }
  process.exit(1);
}
