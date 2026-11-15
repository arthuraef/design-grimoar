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
summary: "Modelo ergonômico de controle motor que estabelece que o tempo necessário para mover o apontador até uma área de destino é função direta da distância até o alvo e inversamente proporcional à sua largura."
tags:
  - "fitts-law"
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "human-computer-interaction"
aliases:
  - "Fitts Law"
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "MacKenzie, I. S. (1992) - Fitts' Law as a Research and Design Tool in Human-Computer Interaction"
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

Fitts's Law (Lei de Fitts) é um modelo de controle motor humano aplicado ao *interaction design* que prevê o tempo necessário para mover um dispositivo de apontamento (ou o dedo em *touchscreens*) até uma determinada área-alvo. Matematicamente, a lei postula que o tempo de movimento (*Movement Time* - $MT$) é uma função logarítmica da razão entre a distância (*Distance* - $D$) até o alvo e a largura (*Width* - $W$) desse alvo ao longo do eixo de deslocamento.

A formulação matemática mais aceita na área de *Human-Computer Interaction* (HCI), refinada pela variação de Shannon proposta por I. Scott MacKenzie, é expressa por:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   $MT$: Tempo de movimento necessário para atingir a meta.
*   $a$ e $b$: Constantes empíricas determinadas por regressão linear, representando o tempo de reação inicial do operador e a velocidade de processamento do sistema visuomotor.
*   $\log_2 \left( \frac{D}{W} + 1 \right)$: O *Index of Difficulty* ($ID$), quantificado em *bits*, que mensura a complexidade informacional da tarefa motora executada.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954 no âmbito da psicologia experimental e ergonomia, a Fitts's Law foi introduzida no contexto computacional por Stuart Card, Thomas Moran e Allen Newell no final dos anos 1970.

O fundamento teórico baseia-se na Teoria da Informação de Claude Shannon, compreendendo o sistema motor humano como um canal de comunicação de capacidade limitada (*throughput*). A trajetória de um movimento intencional divide-se em duas etapas:
1.  **Fase Balística (Inicial):** Movimento rápido e de grande amplitude disparado em direção ao alvo visual, regido por comandos motores pré-programados no cérebro (*feedforward control*).
2.  **Fase de Correção Fina (Final):** Microajustes operados à medida que o dispositivo aproxima-se dos limites do alvo, controlados por um *visual feedback loop* contínuo.

Quanto menor for o *target size* e maior a *distance*, mais ciclos de retroalimentação visual são requeridos do sistema nervoso central, resultando em um crescimento logarítmico do tempo total e na alocação incremental de *cognitive load*.

Em ambientes de *desktop GUIs*, a Fitts's Law concebe a existência de "alvos infinitos" (*infinite targets*). Cantos e bordas superiores ou inferiores da tela possuem extensão ilimitada no vetor de deslocamento do cursor, uma vez que a física do *pointer* é contida pelas margens físicas do monitor. Consequentemente, o *Index of Difficulty* para atingir esses pontos torna-se virtualmente nulo, pois não exige a fase de correção fina.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Expansão do Target Size (Bounding Box):** Maximizar a área clicável dos componentes de interação vitais (como botões de *Call-to-Action*), estendendo a zona ativa de *hit testing* além do espaço ocupado exclusivamente pelo texto ou ícone visual.
*   **Proximidade Contextual:** Agrupar espacialmente controles operacionais relacionados ou sequenciais, minimizando a distância ($D$) que o cursor precisa percorrer entre ações consecutivas (ex: *context menus* exibidos adjacentes ao ponteiro).
*   **Utilização das Margens e Cantos da Tela:** Posicionar controles globais e atalhos de alta frequência nas extremidades físicas do display para aproveitar a propriedade de *infinite targets*.
*   **Adequação Dimensional para Touch Targets:** Em interfaces móbica-táteis, adotar uma escala física mínima segura para os *touch targets* (ex: 48x48 dp no Android Material Design ou 44x44 pt no iOS Human Interface Guidelines) para neutralizar a oclusão visual e a imprecisão gerada pelo toque digital (*fat-finger syndrome*).

### Anti-padrões
*   **Micro-Targeting:** Definir áreas de interatividade extremamente reduzidas para ações essenciais (ex: ícones de exclusão de registros ou caixas de seleção de pouca extensão espacial).
*   **Dispersão Espacial de Controles Dependentes:** Posicionar passos sequenciais de um mesmo fluxo em cantos opostos da interface gráfica, aumentando drasticamente o tempo de deslocamento físico ($D$).
*   **Cascata de Menus Aninhados (Nested Submenus):** Projetar *dropdown menus* com corredores de navegação estreitos, onde pequenos desvios no vetor de movimento do cursor causam a perda de foco e o encerramento do *hover state*, exigindo reinício da ação.

---

# 4. Métricas e Impacto em Produto

A aplicação criteriosa da Fitts's Law afeta quantitativamente os seguintes indicadores de produto e usabilidade:

*   **Task Completion Time (TCT):** A otimização do *Index of Difficulty* em rotas críticas reduz de forma mensurável o tempo necessário para a execução de fluxos produtivos e formulários.
*   **Error Rate (Taxa de Erros de Clique):** A ampliação adequada do *target size* reduz a incidência de cliques acidentais fora do perímetro pretendido (*misses*), mitigando a frustração do usuário.
*   **Throughput (TP):** Métrica de desempenho humano-computador expressa em *bits* por segundo ($bits/s$), empregada para comparar a eficiência de múltiplos *layouts* de interface ou diferentes dispositivos de entrada (ex: *mouse* vs *trackpad*).
*   **Conversion Rate (Taxa de Conversão):** O aumento do tamanho efetivo e a redução do tempo de acesso físico ao *primary CTA* reduzem o atrito no funil operacional, acelerando o encerramento das conversões.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Define o tempo de tomada de decisão que precede o início do movimento físico mapeado pela Fitts's Law.
*   [[CognitiveLoad]] — A alta precisão exigida por alvos reduzidos consome recursos cognitivos durante a fase de correção fina do movimento.
*   [[DohertyThreshold]] — A soma da latência de resposta do sistema com o *Movement Time* do usuário determina a cadência ideal de interatividade em sistemas digitais.

### Fontes
1.  **Fitts, Paul M.** (1954). *"The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"*. Journal of Experimental Psychology, 47(6), 381–391.
2.  **MacKenzie, I. Scott** (1992). *"Fitts' Law as a Research and Design Tool in Human-Computer Interaction"*. Human-Computer Interaction, 7(1), 91–139.
3.  **Yablonski, Jon.** *Laws of UX: Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.
4.  **Card, Stuart K., Moran, Thomas P., & Newell, Allen** (1983). *"The Psychology of Human-Computer Interaction"*. Lawrence Erlbaum Associates.