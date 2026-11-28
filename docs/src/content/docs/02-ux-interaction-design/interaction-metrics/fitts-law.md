---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-metrics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo do movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função logarítmica da distância até ele e de sua dimensão."
tags:
  - "fitts-law"
  - "usabilidade"
  - "interaction-design"
  - "ergonomia-cognitiva"
aliases:
  - "Lei de Fitts"
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
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

A *Fitts's Law* (Lei de Fitts) é uma equação empírica e modelo neurocognitivo utilitário para a área de *human-computer interaction* (HCI) e *ergonomics*. Formulada originalmente pelo psicólogo Paul Fitts em 1954, a lei especifica que o tempo exigido para realizar o movimento rápido de um ponteiro ou efetor humano até uma zona de destino (*target area*) é uma função logarítmica que correlaciona a distância (*distance*) percorrida e a dimensão ou largura (*width*) do próprio alvo.

# 2. Fundamentação Teórica e Cognitiva

O modelo formal da *Fitts's Law* é parametrizado pelo cálculo do *Index of Difficulty* (ID), quantificado em *bits*:

$$ID = \log_2\left(\frac{2D}{W}\right)$$

Onde $D$ representa a distância em relação ao centro do alvo e $W$ corresponde à largura do alvo avaliada ao longo do eixo principal de movimento. O *Movement Time* (MT) é expresso através de uma relação linear dependente das constantes empíricas do dispositivo:

$$MT = a + b \cdot ID$$

Do ponto de vista do controle motor humano, o deslocamento em direção ao alvo ocorre em duas fases neurocognitivas consecutivas:
1. **Fase Balística (*open-loop phase*):** Um impulso inicial de alta velocidade projetado pelo sistema nervoso central em direção à proximidade geral do objetivo.
2. **Fase de Ajuste Fino (*closed-loop phase*):** Micromovimentos corretivos guiados por retroalimentação visual (*visual feedback loop*) para enquadrar o cursor dentro dos limites físicos de $W$.

Em interfaces gráficas de usuário (*graphical user interfaces* - GUI), os cantos e as extremidades da tela possuem uma largura virtual $W$ infinitamente grande, uma vez que o cursor do mouse é fisicamente impedido de ultrapassar a borda do display (*screen boundary*). Essa característica reduz drasticamente o tempo de aquisição do alvo ao mitigar a necessidade da fase de ajuste fino.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Recomendadas
- **Dimensionamento Proporcional de *Touch Targets*:** Dimensionar a área interativa (*hit target*) de forma inversamente proporcional à frequência de uso e diretamente proporcional à distância teórica percorrida pelo ponteiro ou polegar (alcançando o tamanho mínimo recomendado em *touchscreens* de $48 \times 48\text{ dp}$).
- **Aproveitamento das Bordas de Tela (*Infinite Edges*):** Posicionar elementos de navegação primários e botões de ação global nas extremidades da tela para usufruir da dimensão de interceptação infinita.
- **Redução da Distância de Trajetória ($D$):** Empregar menus contextuais (*pie menus* ou *pop-up menus*) acionados diretamente na posição atual do ponteiro do usuário para zerar o valor da distância $D$.

### Anti-padrões
- ***Tiny Touch Targets*:** Criação de elementos de acionamento crítico com áreas de clique diminutas inseridos em contextos de rápida tomada de decisão, forçando correções motoras excessivas.
- ***Excessive Traversal Distance*:** Disposição de controles sequenciais interdependentes em lados opostos do layout, obrigando o usuário a deslocar o cursor por extensas áreas da tela repetidamente.
- ***Nested Flyout Menus*:** Menus suspensos em cascata de múltiplos níveis que exigem movimento contínuo do ponteiro dentro de corredores estreitos de navegação.

# 4. Métricas e Impacto em Produto

- ***Throughput* (TP):** Métrica fundamental de desempenho de entrada medida em bits por segundo ($bits/s$), calculada pela razão entre a dificuldade do alvo e o tempo de movimento ($TP = ID / MT$).
- ***Task Completion Time* (TCT):** A otimização dos parâmetros $D$ e $W$ resulta em reduções diretas no tempo gasto por transação ou fluxo operacional.
- ***Error Rate*:** A expansão de $W$ reduz substancialmente acionamentos acidentais e cliques fora do alvo (*miss-clicks*).
- ***Fitts's Index of Performance*:** Parâmetro benchmark utilizado em validações ergonômicas de *input devices* (como mouses, *trackpads* e controles hápteis).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[SteeringLaw]]

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.