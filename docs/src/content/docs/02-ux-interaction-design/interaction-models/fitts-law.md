---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-models"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de controle motor psicofísico que estabelece que o tempo necessário para alcançar um alvo é diretamente proporcional à distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomics"
  - "fitts-law"
  - "human-computer-interaction"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement."
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design tool in human-computer interaction."
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
  - "[[SteeringLaw]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica

A **Fitts's Law** (traduzida no contexto de ergonomia como *Lei de Fitts*) é um modelo científico formulado para quantificar o tempo necessário para que um operador humano mova um apontador visual ou físico a partir de uma posição inicial até uma zona de destino de dimensão específica. Formalizada como uma equação logarítmica, a lei estipula que a taxa de tempo para aquisição de alvo (*Target Acquisition Time*) aumenta à medida que a distância (*Distance*) ao alvo cresce e diminui conforme a largura (*Width*) do alvo se amplia.

A formulação matemática clássica expandida para *Human-Computer Interaction* (HCI) por Shannon e MacKenzie é expressa como:

$$MT = a + b \cdot \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
*   $MT$ representa o tempo de movimento (*Movement Time*).
*   $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada (*input device*) e do usuário.
*   $D$ é a distância até o centro do alvo.
*   $W$ é a largura útil do alvo medida ao longo do eixo de movimento.
*   O termo $\log_2\left(\frac{D}{W} + 1\right)$ é designado como o Índice de Dificuldade (*Index of Difficulty* - ID), medido em *bits*.

# 2. Fundamentação Teórica e Cognitiva

A base conceitual da Fitts's Law deriva da Teoria da Informação desenvolvida por Claude Shannon no ambiente da psicologia experimental por Paul Fitts em 1954. O modelo trata o sistema neuromuscular humano como um canal de comunicação de capacidade limitada, onde o ato de mover a mão ou o cursor equivale à transmissão de dados controlada por um *feedback loop* visual.

O movimento em direção a um alvo desdobra-se tipicamente em duas fases distintas:
1.  **Fase Balística (*Initial Impulsive Phase*):** Um impulso inicial de alta velocidade que desloca o apontador em direção aproximada às coordenadas do objeto.
2.  **Fase Correutiva (*Current Control Phase*):** Microajustes guiados por retroalimentação visual de malha fechada à medida que o ponteiro se aproxima dos limites do alvo.

Alvos menores exigem um número significativamente maior de ciclos de *feedback* visual para correção de trajetória, elevando drasticamente o *Index of Difficulty*. Em ambientes digitais, os cantos e as bordas de uma tela exibições possuem dimensões virtuais infinitas, uma vez que o cursor não pode ultrapassar os limites físicos do *display*, reduzindo o tempo de movimento ($MT$) para o valor mínimo teórico devido à restrição do limite mecânico do hardware (*Infinite Edge Effect*).

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximização de Hitboxes Principais:** Aumentar a área interativa (*touch target* ou *bounding box*) dos botões de ação primários (Primary CTAs), reduzindo a necessidade de precisão exata do ponteiro.
*   **Aproveitamento de Edges e Corners:** Posicionar elementos cruciais de navegação, tais como menus de sistema ou botões de encerramento, nos cantos ou extremidades da tela gráfica para alavancar a propriedade de tamanho infinito do limite geométrico.
*   **Minimização da Distância de Trajeto (*Contextual Menus*):** Trazer a interface até o cursor por meio de *popovers*, *radial menus* (Pie Menus) ou menus disparados pelo clique no botão direito do *mouse*, reduzindo a variável $D$ a um valor próximo de zero.
*   **Agrupamento por Tarefa Comum:** Manter controles sequenciais ou correlatos fisicamente contíguos na *UI* para suprimir o percurso do indicador entre ações interdependentes.

### Anti-padrões
*   **Tiny Interactive Targets:** Elementos clicáveis com dimensões inferiores a $44 \times 44$ pixels em telas *touch* ou inferiores a $16 \times 16$ pixels em superfícies desktop, impondo sobrecarga de precisão motora.
*   **Destinos Flutuantes/Dinâmicos:** Botões que alteram sua posição vertical/horizontal ao passar o cursor (*hover state*), forçando o reinício da fase balística de movimento.
*   **Corredores Estreitos de Menu Dropdown:** Submenus flutuantes que exigem um trajeto reto contínuo em áreas de pixel reduzidas, violando a derivação da Fitts's Law conhecida como *Steering Law*.
*   **Disparidade Espacial de Ações Críticas:** Posicionar o botão "Confirmar" no canto superior direito e o campo de formulário correspondente no canto inferior esquerdo, expandindo o fator $D$ sem ganhos funcionais.

# 4. Métricas e Impacto em Produto

A implementação rigorosa da Fitts's Law afeta diretamente o rendimento mecânico da interação e impacta os seguintes indicadores operacionais:

*   **Task Completion Time (TCT):** A otimização sistemática do *Index of Difficulty* resulta em decréscimo direto no tempo total exigido para a conclusão de fluxos operacionais críticos.
*   **Misclick Rate / Error Rate:** Alvos redimensionados de forma coerente minimizam a frequência de cliques acidentais fora do *bounding box* pretendido, reduzindo o custo de recuperação de erros.
*   **Throughput (TP):** Métrica fundamental em *HCI* (expressa em *bits per second*) calculada pela razão entre o *Index of Difficulty* e o *Movement Time*, avaliando a eficiência combinada da interface e do dispositivo de entrada.
*   **Conversion Rate:** A redução do tempo de deslocamento físico até os seletores finais de compra em jornadas e-commerce maximiza a taxa de finalização ao diminuir a atrito operacional.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Regulamentação sobre a relação entre quantidade de seleções e tempo de tomada de decisão mental.
*   [[SteeringLaw]] — Extensão da Fitts's Law para trajetórias restritas dentro de canais bidimensionais.
*   [[CognitiveLoad]] — Impacto do esforço psicomotor na carga de processamento mental global.

### Fontes
*   FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
*   MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
*   LAWS OF UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.
