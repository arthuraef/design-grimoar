---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-mechanics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Princípio ergonômico e preditivo da interação humano-computador que estabelece que o tempo necessário para alcançar um alvo é uma função da distância até ele e da sua dimensão espacial."
tags:
  - "fittss-law"
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "target-acquisition"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design model in human-computer interaction"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um modelo formal de controle psicomotor e ergonômico que estabelece que o tempo necessário para mover um atuador físico ou ponteiro gráfico em direção a uma área de destino é uma função logarítmica da proporção entre a distância até o alvo e a largura do próprio alvo.

No âmbito de *User Experience* (UX) e *Interaction Design*, este princípio matemático determina que elementos interativos de maior dimensão espacial, posicionados próximos ao ponto de repouso ou trajetória do cursor/dedo, exigem menor esforço físico e sensorial, resultando em aquisições de alvo mais velozes e com reduzida taxa de erro.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954 com base na teoria da informação de Claude Shannon, a lei quantifica a capacidade de processamento de informação do sistema motor humano. Na disciplina de *Human-Computer Interaction* (HCI), a formulação de Shannon estendida por I. Scott MacKenzie é expressa pela equação:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- **$MT$ (Movement Time):** O tempo total de execução para realizar a translação e seleção do elemento.
- **$a$ e $b$:** Constantes empíricas de regressão linear que variam conforme o dispositivo de entrada (*mouse*, *touchscreen*, *stylus*, *trackball*).
- **$D$ (Distance):** A distância física do ponto de origem ao centro geométrico do alvo.
- **$W$ (Width):** A largura eficaz do alvo ao longo do eixo principal de movimento.
- **$ID$ (Index of Difficulty):** O componente $\log_2 \left( \frac{D}{W} + 1 \right)$, medido em *bits*, que mensura a complexidade motora do gesto.

Sob o ponto de vista neuromotor, a aquisição de um alvo divide-se em duas etapas: um movimento balístico inicial (*ballistic phase*) de aproximação veloz, seguido por uma fase de correção de alça fechada (*visual feedback loop*) caracterizada por microajustes sensoriais. Alvos reduzidos exigem um número significativamente maior de correções de precisão no ciclo de feedback visual, elevando o tempo de execução e a fadiga muscular.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Recomendadas

- **Dimensão Mínima de *Hitbox*:** Assegurar que *touch targets* em dispositivos móveis ofereçam uma área interativa mínima de $48 \times 48 \text{ dp}$ (Android) ou $44 \times 44 \text{ pt}$ (iOS), estendendo a *bounding box* invisível mesmo quando a representação gráfica do ícone for menor.
- **Aproveitamento das Bordas e Cantos da Tela (*Screen Edges*):** Em interfaces orientadas a ponteiro (*desktop*), cantos e limites extremos possuem largura virtual infinitamente grande ($W = \infty$), visto que o cursor é retido pela borda da tela. Botões posicionados nesses pontos periféricos exigem esforço de precisão nulo.
- **Proximidade Contextual de Ações:** Posicionar acionadores de alta frequência em proximidade direta com o foco de atenção e trajetória do ponteiro do usuário (ex.: *popover menus*, *contextual toolbars* e botões de submissão adjacentes ao término de formulários).
- **Ampliação Dinâmica de Alvos (*Target Magnification*):** Aplicar expansão adaptativa de área clicável ou tamanho visual durante o estado de aproximação (*hover* ou projeção de foco), elevando a largura $W$ no momento crítico de acionamento.

### Anti-padrões a Evitar

- **Micro-targets com Distanciamento Amplo:** Ícones ou links minúsculos ($< 24 \text{ px}$) separados por longos espaços em branco (*whitespace*), gerando um alto *Index of Difficulty* pela combinação desfavorável de elevado $D$ e reduzido $W$.
- **Menus Cascata Estreitos (*Cascading Dropdowns*):** Estrituras de navegação que exigem a manutenção do ponteiro dentro de um corredor estreito de pixels; violam a Fitts's Law e agravam a complexidade espacial conforme regido pela *Steering Law*.
- **Desconexão Espacial entre Entrada e Confirmação:** Dispor o elemento de entrada de dados na extremidade oposta ao botão de ação primário, forçando um deslocamento longo do atuador motor sem suporte de alinhamento visual.

---

# 4. Métricas e Impacto em Produto

A aplicação das propriedades geométricas da Fitts's Law impacta parâmetros mensuráveis de eficácia operacional e desempenho em produtos digitais:

- **Task Completion Time (TCT):** A otimização do $ID$ em fluxos repetitivos reduz diretamente a duração agregada das tarefas executadas pelos usuários.
- **Error Rate e Misclick Rate:** *Hitboxes* ampliadas e proporcionalmente distribuídas minimizam toques ou cliques acidentais em elementos adjacentes, reduzindo a taxa de erro e ações de desfeita (*undo*).
- **Throughput (TP):** Métrica padronizada de eficiência de entrada ($TP = \frac{ID}{MT}$), expressa em *bits/segundo*, utilizada em testes de usabilidade industrial para quantificar o desempenho relativo de novas convenções de interface.
- **Primary CTA Conversion Rate:** O aumento estratégico das dimensões visuais e da área interativa de chamadas de ação primárias reduz o atrito motor e eleva as taxas globais de conversão.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Modela o tempo de decisão cognitiva frente ao número de opções, complementando a otimização motora da Fitts's Law.
- [[CognitiveLoad]] — Deficiências de usabilidade motora decorrentes de *hitboxes* reduzidas sobrecarregam o esforço cognitivo estranho (*extraneous cognitive load*).
- [[SteeringLaw]] — Derivação contínua da Fitts's Law para trajetórias delimitadas por canais ou restrições espaciais.

### Fontes Acadêmicas e Primárias
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.