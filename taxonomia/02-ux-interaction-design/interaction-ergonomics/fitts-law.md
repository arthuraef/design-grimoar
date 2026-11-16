---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicomotor que estabelece que o tempo necessário para selecionar um alvo é diretamente proporcional à distância até ele e inversamente proporcional à sua dimensão."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "MacKenzie, I. S. (1992) - Fitts' Law as a Research and Design Model in Human-Computer Interaction"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX - Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[SteeringLaw]]"
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

A **Fitts's Law** (traduzida historicamente como Lei de Fitts) é um modelo científico de controle motor e ergonomia de interação que prediz o tempo total necessário para que um operador mova um apontador visual ou físico até uma área de destino específica. Matematicamente, a lei postula que o tempo de movimento (*Movement Time* - $MT$) é uma função logarítmica da razão entre a distância (*Distance* - $D$) até o alvo e a largura (*Width* - $W$) desse alvo na direção do movimento.

A formulação matemática clássica expandida pela adaptação de Shannon para *Human-Computer Interaction* (HCI) é expressa como:

$$MT = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde:
*   $MT$ representa o tempo total para concluir o movimento de seleção.
*   $a$ e $b$ são constantes empíricas derivadas de regressão linear baseadas no dispositivo de entrada (*input device*) e no contexto motor do usuário.
*   $\log_2\left(\frac{2D}{W}\right)$ define o Índice de Dificuldade (*Index of Difficulty* - $ID$), medido em bits de informação.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto do controle motor humano, a Fitts's Law apoia-se na teoria da informação para tratar o sistema neuromuscular humano como um canal de comunicação com capacidade limitada de transmissão de dados.

Do ponto de vista biocognitivo, o ato de alcançar um alvo envolve dois estágios sucessivos de controle motor:
1.  **Fase Balística Inicial (*Primary Submovement*):** Um movimento rápido e de alta velocidade direcionado às proximidades do alvo, guiado por programação motora central com reduzido *feedback* visual.
2.  **Fase de Correção Fina (*Secondary Submovements*):** Uma série de microajustes guiados por alças de retroalimentação visual (*visual feedback loops*) à medida que o apontador se aproxima dos limites do alvo.

Conforme a largura do alvo ($W$) diminui ou a distância ($D$) aumenta, o valor de $ID$ cresce, exigindo mais ciclos de correção visual e processamento proprioceptivo. Consequentemente, a taxa de transferência (*throughput*) do sistema motor reduz, elevando o tempo de execução e a probabilidade de erros de precisão.

Uma propriedade teórica crucial em *Graphical User Interfaces* (GUI) é a "hipótese da borda infinita" (*infinite edge property*). Como o cursor do sistema operacional é retido pelas bordas e cantos físicos da tela, a dimensão efetiva do alvo ($W$) nesses pontos tende ao infinito ($W \to \infty$). Isso zera o valor efetivo de ajuste fino na borda, tornando os quatro cantos e as margens da tela áreas de acesso ultrarrápido com $ID$ mínimo.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximização de *Bounding Boxes* Interativas:** Aumentar a área clicável ou tocável dos componentes de interface sem necessariamente alterar o tamanho de sua representação gráfica visual.
*   **Aproveitamento de Bordas e Cantos da Tela:** Posicionar elementos críticos globais, tais como menus de navegação primários, barras de ferramentas ou ações de desfazimento (*undo*), nas extremidades físicas da interface do usuário.
*   **Proximidade Contextual de Ações:** Reduzir o parâmetro $D$ posicionando *popover menus*, *contextual toolbars* e diálogos flutuantes o mais próximo possível da posição corrente do *cursor* ou do ponto de foco tátil.
*   **Padrões de Alvo Mínimo (*Touch Targets*):** Adotar dimensões físicas mínimas recomendadas por diretrizes de acessibilidade para *touchscreens* (ex.: $48 \times 48$ dp no Android Material Design ou $44 \times 44$ pt no iOS Human Interface Guidelines).

### Anti-padrões
*   **Alvos Mínimos sem Padding Interno:** Botões ou links compostos exclusivamente por texto pequeno ou ícones isolados sem área de acionamento expandida (*hit area*), elevando dramaticamente o $ID$.
*   **Separação Espacial de Ações Sequenciais:** Exigir que o usuário navegue repetidamente grandes distâncias ($D$ elevado) entre elementos dependentes, como mover o cursor do canto esquerdo para o canto direito da tela para confirmar uma sequência de etapas.
*   **Submenu Cascata Fino (*Flyout Menus*):** Exigir precisão de rastreamento estrito através de corredores estreitos de navegação, obrigando o usuário a realizar movimentos de altíssima precisão onde pequenos desvios fecham o menu (*Steering Law* associada).

---

# 4. Métricas e Impacto em Produto

A implementação rigorosa da Fitts's Law impacta diretamente indicadores quantitativos de experiência do usuário e desempenho operacional:

*   **Task Completion Time (TCT):** A otimização sistemática dos alvos principais resulta na redução direta do tempo total gasto no cumprimento de tarefas operacionais críticas.
*   **Error Rate (Taxa de Cliques Incorretos):** Redução percentual de toques ou cliques fora da área de acionamento pretendida (*misclick rate*), diminuindo frustrações em fluxos de alta frequência.
*   **Throughput (TP):** Métrica padrão de HCI (medida em bits/segundo) para avaliar a eficiência de entrada do usuário em um *layout* interativo.
*   **Conversion Rates em CTAs:** Aumento direto na taxa de cliques em *Call to Action* primários ao otimizar simultaneamente sua visibilidade e área de acionamento em múltiplos *viewports*.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Modela o tempo de tomada de decisão cognitiva antes do disparo do movimento motor.
*   [[CognitiveLoad]] — Descreve o esforço mental total associado ao processamento visual e motor de alvos complexos.
*   [[SteeringLaw]] — Extensão direta da Fitts's Law para trajetórias e trajetos restritos no espaço de interface.
*   [[DohertyThreshold]] — Relaciona os tempos de resposta da interface com o ritmo de interação motora do usuário.

### Fontes Acadêmicas e Referenciais
1.  Fitts, P. M. (1954). *The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement*. Journal of Experimental Psychology, 47(6), 381–391.
2.  MacKenzie, I. S. (1992). *Fitts' Law as a Research and Design Model in Human-Computer Interaction*. Human-Computer Interaction, 7(1), 91-139.
3.  Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.
4.  ISO 9241-9:2000. *Ergonomics of human-system interaction — Part 9: Requirements for non-keyboard input devices*. International Organization for Standardization.