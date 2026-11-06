# Design Grimoar

> *Tratado canônico e cartografia epistemológica do Product Design, UX e Sistemas Digitais.*

<br>

> 🕯️ &nbsp; *O design não habita a camada decorativa do artefato; constitui a estrutura silenciosa através da qual a mente humana compreende o mundo. O Grimoar existe para destilar a prática dispersa da indústria em um monumento vivo de rigor, ciência e método.*

<br>

---

<br>

### 📓 &nbsp; I. Manifesto Curatorial

O **Design Grimoar** é uma enciclopédia autônoma de alta densidade informacional, concebida para catalogar os fundamentos perpétuos do design de produtos digitais. 

Em uma indústria frequentemente seduzida pelo efêmero, este compêndio resgata as âncoras cognitivas, visuais e sistêmicas da profissão — da psicologia ecológica da percepção à engenharia de *design tokens*. Cada conceito é investigado não como uma convenção passageira, mas como um teorema formal derivado da cognição humana e da computação aplicada.

> ◽️ &nbsp; **Diretriz de Nomenclatura**  
> Todos os termos técnicos, *frameworks* e conceitos da indústria são mantidos estritamente em seu idioma original (*English*). A tradução para o Português do Brasil ocorre no máximo uma única vez, na sentença de abertura do verbete, estritamente para contextualização inicial.

<br>

---

<br>

### ◽️ &nbsp; II. Taxonomia Canônica

A cartografia do Grimoar organiza o conhecimento do ofício em seis domínios fundamentais, dispostos em progressão da mente humana à esteira de entrega técnica.

<br>

| Código | Domínio | Escopo Epistemológico | Âncoras Canônicas |
| :--- | :--- | :--- | :--- |
| `01` | **Psicologia Cognitiva** | Teoria da carga cognitiva, modelos mentais, vieses heurísticos e percepção visual | *Sweller, Gestalt, Kahneman, Miller* |
| `02` | **UX & Interaction Design** | *Affordances*, *signifiers*, arquitetura de informação e gramática de interação | *Norman, Gibson, Nielsen, ISO 9241* |
| `03` | **UI & Visual Design** | Tipografia editorial, sistemas de malha, contraste perceptual e teoria da cor | *Bringhurst, Tschichold, WCAG 2.2, Itten* |
| `04` | **Design Systems** | *Design tokens*, contratos de componentes, acessibilidade e governança de escala | *Frost, Curtis, W3C DTCG* |
| `05` | **Product Design Strategy** | Enquadramento de problemas (*problem framing*), *discovery* contínuo e hipóteses de valor | *Torres, Cagan, Rumelt, Christensen* |
| `06` | **DesignOps & Engineering** | *Handoff* determinístico, automação de esteiras, ferramentas e conformidade | *Fessenden, Malewicz, DORA* |

<br>

---

<br>

### 🪶 &nbsp; III. Anatomia de um Verbete

Cada página deste grimoar obedece a um esquema estrito validado deterministicamente via `Zod`. Nenhum texto é incorporado ao cânone sem satisfazer as cinco seções estruturais obrigatórias:

> **1. Definição Canônica**  
> Síntese axiomática em um parágrafo denso. O termo é contextualizado e demarcado em suas fronteiras técnicas exatas.

> **2. Fundamentação Teórica e Cognitiva**  
> Ancoragem científica obrigatória em literatura revisada por pares ou padrões formais da indústria.

> **3. Gramática de Aplicação Prática**  
> Heurísticas prescritivas e anti-padrões concretos observados em sistemas digitais em produção.

> **4. Métricas e Impacto em Produto**  
> Indicadores de mensuração qualitativa e quantitativa (ex: *Task Completion Rate*, latência perceptual, conformidade WCAG).

> **5. Referências Cruzadas e Fontes**  
> Teia hipertextual de interconexão conceitual (`[[WikiLinks]]`) e bibliografia primária consultada.

<br>

---

<br>

### ▫️ &nbsp; IV. Arquitetura do Sistema Autônomo

O Grimoar opera sob um protocolo de engenharia rigoroso na nuvem Oracle Cloud ARM64, orquestrado pelo **DeepSeek Harness** e pelo framework **Cordis**.

```
                ┌────────────────────────────────────────────────────────┐
                │             1. Ingestão Determinística                 │
                │        Firecrawl MCP  +  VibeVoice ASR (0.5B)          │
                └───────────────────────────┬────────────────────────────┘
                                            ▼
                ┌────────────────────────────────────────────────────────┐
                │          2. Roteamento Vetorial (pgvector)             │
                │     Cosseno ≥ 0.82 ➔ MERGE  │  Cosseno < 0.82 ➔ CREATE │
                └───────────────────────────┬────────────────────────────┘
                                            ▼
                ┌────────────────────────────────────────────────────────┐
                │         3. Loop Autônomo de Verificação (3x)           │
                │   Lexicógrafo (Síntese) ⇄ Auditor Acadêmico ⇄ Zod Gate │
                └───────────────────────────┬────────────────────────────┘
                                            ▼
                ┌────────────────────────────────────────────────────────┐
                │            4. Publicação Atômica & Sincronia           │
                │    GitHub (SSOT)  +  GitHub Pages (Astro)  +  pgvector │
                └───────────────────────────┬────────────────────────────┘
                                            ▼
                ┌────────────────────────────────────────────────────────┐
                │               5. Notificações Estruturadas             │
                │                  Hermes Agent (Nous)                   │
                └────────────────────────────────────────────────────────┘
```

<br>

> ◽️ &nbsp; **Front-end Oficial & Leitura Notion-like**  
> Hospedado no **GitHub Pages**, o front-end adota uma estética minimalista inspirada no Notion: tipografia sem serifa limpa (*Inter*), largura de leitura centralizada, blocos com respiro, ausência de bordas pesadas, resolução automática de `[[WikiLinks]]` e suporte nativo a Dark/Light Mode com chaveamento manual no cabeçalho.

<br>

> ◽️ &nbsp; **Princípio do Isolamento Epistemológico**  
> As etapas de síntese (*Lexicógrafo*) e auditoria científica (*Auditor Acadêmico*) utilizam *prompts* de sistema desconectados e chamadas de API estritamente independentes. O agente verificador não herda o contexto nem os vieses do agente gerador.

<br>

---

<br>

### 🕯️ &nbsp; V. Operação

```bash
# Instalação das dependências do orquestrador
npm install

# Execução da suíte completa de verificação determinística
npm test

# Inicialização do orquestrador DeepSeek Harness
npm start

# Visualização local do front-end Notion-like
npm run dev:docs

# Compilação do site estático (Astro SSG para GitHub Pages)
npm run build:docs
```

<br>

---

<br>

> ◽️ &nbsp; *Design Grimoar — Preservado sob licença canônica. Curadoria permanente para a eternidade do ofício.*
