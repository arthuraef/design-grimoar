---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomia-interativa"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para alcançar um alvo com precisão é uma função logarítmica da distância até o alvo dividida pela sua largura."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "human-computer-interaction"
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
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo preditivo da biomecânica e da *Human-Computer Interaction* que quantifica o *Movement Time* necessário para que um operador mova um apontador físico ou digital a partir de uma posição inicial até atingir uma área de destino específica. O princípio dita que o tempo para adquirir um *target* é uma função proporcional à distância até ele e inversamente proporcional à sua dimensão ao longo do eixo de deslocamento.

---

# 2. Fundamentação Teórica e Cognitiva

Desenvolvida originalmente pelo psicólogo Paul Fitts em 1954, a lei fundamenta-se na teoria da informação aplicada ao controle motor humano. O modelo trata o sistema neuromuscular como um canal de comunicação com capacidade finita de transmissão de dados, medida em *bits*.

A formulação matemática mais aceita no campo de HCI é a variação de Shannon:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   $MT$ (*Movement Time*): Tempo total gasto na execução do movimento.
*   $a$ e $b$: Regressões empíricas representando a velocidade de reação do sistema e a eficiência do dispositivo de entrada (*Mouse*, *Touchscreen*, *Trackpad*).
*   $D$ (*Distance*): Distância do ponto de origem até o centro do *target*.
*   $W$ (*Width*): Largura do *target* medida ao longo do eixo do movimento.
*   $\log_2 \left( \frac{D}{W} + 1 \right)$ (*Index of Difficulty* - ID): A quantidade de informação necessária para realizar a tarefa com precisão, mensurada em *bits*.

Neurobiologicamente, a execução do movimento é dividida em duas fases: um impulso balístico inicial (*gross primary movement*) que aproxima o ponteiro do destino, seguido por micro-ajustes visualmente guiados (*fine secondary movement*). Quanto menor o valor do *Width* em relação à *Distance*, maior é o número de correções de *feedback* proprioceptivo exigidas, elevando a carga motora do usuário.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Aumento de *Bounding Box*:** Expandir a *Clickable Area* de elementos de ação primária sem alterar necessariamente a escala de seus ativos visuais gráficos.
*   **Uso de *Infinite Targets*:** Posicionar elementos-chave de interface nos cantos e bordas da tela. Como o ponteiro do *mouse* para nos limites do monitor, essas áreas possuem *Width* conceitualmente infinito, reduzindo drasticamente o *Index of Difficulty*.
*   **Proximidade Contextual:** Renderizar menus suspensos, *Popovers* e *Floating Action Buttons* na vizinhança imediata da posição atual do cursor para minimizar a *Distance*.
*   **Adequação para *Touch Interfaces*:** Definir alvos de toque respeitando limites mínimos de dimensão física recomendados (como no mínimo 48x48 *density-independent pixels*).

### Anti-padrões
*   ** *Tiny Touch Targets*:** Elementos interativos minúsculos agrupados com alta densidade, forçando um elevado *Index of Difficulty* e causando cliques acidentais (*Accidental Taps*).
*   ** *Cascade Dropdown Menus*:** Menus suspensos em cascata que exigem trajetórias lineares estritas ao longo de eixos estreitos; qualquer desvio acidental fecha a interface e reinicia o movimento.
*   ** *Corner-to-Corner Layouts*:** Exigir confirmações de ação em extremidades opostas do *viewscreen* sem atalhos de teclado ou mecânicas de aceleração.

---

# 4. Métricas e Impacto em Produto

*   ** *Throughput* (TP):** Medida absoluta do desempenho do dispositivo e da interface expressa em *bits per second* ($TP = \frac{ID_e}{MT}$). Utilizada em testes A/B para avaliar a eficiência de *layouts*.
*   ** *Task Completion Time* (TCT):** A otimização sistemática das distâncias de navegação reduz diretamente o tempo de execução de fluxos operacionais complexos.
*   ** *Error Rate* / *Miss-click Rate*:** A redução do *Index of Difficulty* minimiza cliques acidentais fora da zona de destino, mitigando a frustração do usuário.
*   ** *Conversion Rate*:** Em *E-commerce* e formulários de conversão, aumentar a *Clickable Area* de botões de *Checkout* diminui a fricção motora do *funnel*, aumentando a taxa de conclusão.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Define o tempo de decisão que precede a execução motora quantificada por Fitts's Law.
*   [[CognitiveLoad]] — Trata dos custos cognitivos associados a micro-ajustes precisos em interfaces complexas.
*   [[DohertyThreshold]] — Relaciona a velocidade da resposta mecânica e visual com a produtividade no ecossistema interativo.

### Fontes
*   FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381–391, 1954.
*   MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
*   LAWS OF UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.