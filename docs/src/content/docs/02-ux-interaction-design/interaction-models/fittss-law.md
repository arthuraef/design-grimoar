---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-models"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece um modelo ergonômico preditivo do tempo necessário para mover um apontador até uma área de destino em função da distância e do tamanho do alvo."
tags:
  - "usabilidade"
  - "interaction-design"
  - "human-computer-interaction"
  - "fitts-law"
aliases:
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
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

Fitts's Law (Lei de Fitts) é um modelo ergonômico e preditivo de *motor control* formulado para quantificar a eficiência do movimento humano de precisão. A lei estabelece que o tempo necessário para selecionar ou adquirir um *target* (alvo interativo) é uma função logarítmica da distância até o objeto dividida por sua largura útil. No âmbito do *interaction design* e do *user interface design*, o princípio dita que elementos vitais ou de alta frequência de uso devem possuir dimensões físicas ou virtuais expandidas e estar localizados próximos à trajetória natural do *pointing device* ou do toque.

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no campo da psicologia experimental e posteriormente adaptada para a *human-computer interaction* (HCI) por Stuart Card, Thomas Moran e Allen Newell, a lei é fundamentada na *information theory*. 

A expressão matemática clássica (modificada por Shannon e posteriormente por T. P. MacKenzie) é definida como:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   $MT$ representa o *movement time* (tempo total de movimento).
*   $a$ e $b$ são constantes empíricas derivadas do dispositivo de entrada e do contexto motor.
*   $D$ representa a *distance* (distância até o alvo).
*   $W$ representa a *width* (largura/tamanho do alvo ao longo do eixo de movimento).
*    O termo $\log_2 \left( \frac{D}{W} + 1 \right)$ é denominado *index of difficulty* (ID), medido em bits.

Sob a perspectiva neurológica e cognitiva, o movimento em direção a um *target* divide-se em duas fases: uma fase inicial rápida de impulso (*ballistic movement*) orientada pelo planejamento motor, seguida por uma fase de ajuste de alta precisão (*homing phase*) guiada por um *feedback loop* visuomotor. *Targets* menores com distâncias maiores aumentam a exigência de correções visuomotoras contínuas durante a *homing phase*, elevando a *cognitive load* e a latência de execução. Por outro lado, bordas e cantos da tela (*screen boundaries*) oferecem conceitualmente uma largura de alvo infinita ($W = \infty$), pois o *cursor* é fisicamente impedido de ultrapassar a *viewport*, eliminando a necessidade de desaceleração na fase final do movimento.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas (Boas Práticas)
*   **Dimensionamento Adequado de Touch Targets**: Estabelecer dimensões mínimas absolutas de área clicável para evitar a imprecisão inerente do toque manual (*fat-finger problem*), adotando dimensões recomendadas pela indústria (mínimo de 48x48 dp/px).
*   **Aproveitamento de Screen Boundaries**: Posicionar elementos de navegação primários, barras de ferramentas ou botões de controle nas extremidades e cantos da tela para aproveitar a restrição física do display, convertendo esses pontos em zonas de acionamento de índice de dificuldade quase nulo.
*   **Proximidade Contextual**: Agrupar *controls* contextuais diretamente adjacentes ao foco de entrada do usuário (ex: menus pop-up ou *floating toolbars* exibidos sobre o objeto selecionado), minimizando o valor de $D$.

### Anti-padrões
*   *Tiny Target Syndrome*: Utilizar ícones e links com superfícies interativas diminutas cercadas por áreas passivas extensas, forçando o usuário a despender alto esforço visuomotor para acioná-los.
*   *Extreme Distance Traversal*: Posicionar a confirmação final de uma ação de formulário no lado oposto da interface em relação aos campos de preenchimento, impondo um tempo de trajetória desnecessariamente elevado.
*   *Cascading Hover Dropdowns*: Utilizar menus desdobráveis em cascata que exigem que o *cursor* transite por corredores estreitos e distantes sem margem para desvios angulares, provocando interrupções frequentes do fluxo operado pelo usuário.

# 4. Métricas e Impacto em Produto

*   **Task Completion Time (TCT)**: A aplicação rigorosa da lei reduz diretamente o tempo de execução de tarefas interativas recorrentes ao mitigar o *movement time*.
*   **Error Rate / Misclick Rate**: O aumento da área útil dos *targets* correlaciona-se inversamente com a taxa de cliques acidentais fora do perímetro pretendido.
*   **Throughput (TP)**: Medida em bits por segundo conforme o padrão ISO 9241-9, o *throughput* avalia a eficiência de desempenho do usuário ao operar um dispositivo de entrada específico dentro da interface gráfica.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

*   [[HicksLaw]]
*   [[CognitiveLoad]]
*   [[DohertyThreshold]]

### Fontes Técnicas
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91–139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.