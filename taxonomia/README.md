# Taxonomia Canônica — Design Grimoar

Este repositório é a Fonte Única da Verdade (SSOT) para o **Design Grimoar**. Cada verbete é armazenado como um documento Markdown com YAML Frontmatter estrito validado via Zod.

## Estrutura de Domínios Oficiais

- **`01-psicologia-cognitiva/`**: Fundamentação da percepção humana, memória, vieses, Gestalt, teoria da carga cognitiva (Sweller) e modelos mentais.
- **`02-ux-interaction-design/`**: Arquitetura de informação, affordances, signifiers, heurísticas de usabilidade (Nielsen, ISO 9241) e pesquisa com usuários.
- **`03-ui-visual-design/`**: Fundamentos visuais, tipografia, teoria das cores, contraste WCAG, layouts de grade e microinterações.
- **`04-design-systems/`**: Design tokens, anatomia de componentes atômicos, governança, acessibilidade programática e documentação viva.
- **`05-product-design-strategy/`**: Problem framing, discovery contínuo, métricas de adoção/retenção e alinhamento com modelos de negócio.
- **`06-designops-engineering/`**: Processos de entrega, handoff design-engineering, ferramentas, esteiras de CI/CD e auditoria de qualidade.

---

## Estrutura Obrigatória de Cada Verbete

Todo verbete gerado deve conter Frontmatter validado por `schema.ts` e exatamente as 5 seções numeradas:
1. `# 1. Definição Canônica`
2. `# 2. Fundamentação Teórica e Cognitiva`
3. `# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)`
4. `# 4. Métricas e Impacto em Produto`
5. `# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes`
