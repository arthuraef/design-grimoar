# Arquitetura e Regras de Engenharia — Projeto Design Grimoar

## Stack Oficial
- **Infraestrutura:** Oracle Cloud Always Free (VM.Standard.A1.Flex ARM 4 OCPUs / 24GB RAM) via Docker Compose.
- **Orquestrador de Agentes:** DeepSeek Harness (`@deepseek-ai/dsh` / Cordis Framework).
- **Ingestão Web & Áudio:** Firecrawl (Self-hosted/MCP) + Microsoft VibeVoice ASR (0.5B).
- **Banco Vetorial:** PostgreSQL (`pgvector`) ou Oracle Autonomous DB 23ai.
- **Armazenamento Canônico (SSOT) & Front-end Oficial:** GitHub (`Design Grimoar`) + GitHub Pages (Site Estático Notion-like via Astro em `/docs`).
- **Notificações & Cron:** Hermes Agent (Nous Research).

## Regras Inegociáveis de Engenharia
1. **Separação Cognitivo vs. Determinístico:** Nunca use LLM para fazer scraping, cálculo de similaridade vetorial, validação de schema YAML ou operações Git. Use scripts TypeScript/Python estritos para as Etapas 1, 4 e 5.
2. **Isolamento de Agentes (Generator-Verifier):** A Etapa 2 (Síntese) e a Etapa 3 (Validação Acadêmica) devem usar prompts de sistema separados e chamadas de API independentes para evitar viés de confirmação.
3. **Segurança (Least Privilege):** O processo que consome dados externos via Firecrawl não pode conter variáveis de ambiente do GitHub (`GITHUB_TOKEN`) nem permissão de escrita direta no repositório.
4. **Validação de Schema (Hard Gate):** Todo verbete gerado deve passar por validação `Zod`/`Pydantic` antes do commit.
5. **Diretriz Estrita de Nomenclatura e Tradução:** Todos os termos técnicos, frameworks e conceitos da indústria devem ser mantidos obrigatoriamente em seu idioma original (inglês). A tradução para o Português do Brasil deve aparecer apenas uma vez, logo na descrição ou definição inicial, exclusivamente para fins de ilustração e contexto.