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
summary: "Modelo ergonômico e psicomotor que estabelece que o tempo necessário para atingir um alvo é uma função matemática da distância até ele e do seu tamanho visual."
tags:
  - "fitts-law"
  - "usability"
  - "interaction-design"
  - "ergonomics"
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
---

# 1. Definição Canônica

**Fitts's Law** (Lei de Fitts) é um princípio fundamental da ergonomia e da interação humano-computador que prevê que o tempo necessário para mover um apontador até uma área de destino é determinado pela razão entre a distância até esse destino e a largura da área receptora. Formulado originalmente pelo psicólogo Paul Fitts em 1954 no contexto do controle motor humano, o modelo foi posteriormente adaptado para interfaces digitais por Stuart Card, Thomas Moran e Allen Newell.

Na prática de *interaction design*, a lei dita que quanto menor e mais distante estiver um elemento interativo (*target*), mais tempo o usuário levará para posicionar o cursor ou o dedo sobre ele, e maior será a probabilidade de erro na aquisição do alvo.

---

# 2. Fundamentação Teórica e Cognitiva

A base matemática da Fitts's Law é expressa classicamente através do tempo de movimento (*Movement Time* - MT):

$$MT = a + b \cdot \text{ID}$$

Onde $\text{ID}$ representa o *Index of Difficulty* (Índice de Dificuldade), calculado pela variação de Shannon proposta por I. Scott MacKenzie:

$$\text{ID} = \log_2 \left( \frac{D}{W} + 1 \right)$$

- $D$ (*Distance*): Distância até o centro do *target*.
- $W$ (*Width*): Largura do *target* ao longo do eixo de movimento.
- $a$ e $b$: Constantes empíricas derivadas de regressão linear que variam segundo o dispositivo de entrada (*mouse*, *trackpad*, *touchscreen* ou *stylus*).

### Mecanismo Psicomotor
O processo neurocognitivo de aquisição de um *target* divide-se em duas fases contínuas:
1. **Fase Balística Primária:** Um movimento motor rápido e de grande amplitude que arremessa o membro ou cursor em direção genérica ao *target*.
2. **Fase de Correção Contínua:** Ajustes finos de pequena amplitude guiados por *visual feedback* em tempo real à medida que o cursor se aproxima dos limites do elemento.

### A Geometria das Bordas da Tela (*Magic Pixels*)
Em interfaces gráficas operadas por ponteiros físicos, os cantos e bordas da tela possuem uma dimensão virtualmente infinita ($W = \infty$). Como o cursor não pode ultrapassar o limite físico do *display*, o tempo de movimento para esses cantos é drasticamente reduzido, tornando-os os pontos de menor *Index of Difficulty* de toda a interface.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Redimensionamento Proporcional de Hitboxes:** Otimize a área clicável (*hitbox*) de elementos pequenos. A área interativa deve ultrapassar os limites visuais do elemento SVG ou do texto sempre que necessário.
- **Redução da Distância de Percurso:** Posicione elementos de confirmação ou ações sequenciais em proximidade física ao ponto de origem do cursor ou foco da atenção (ex.: *contextual menus*, *popovers* ancorados e *floating action buttons*).
- **Aproveitamento de Limites Físicos:** Posicione controles de altíssima frequência (como botões de navegação primária ou menus globais) nas bordas extremas ou nos cantos da interface em ambientes *desktop*.
- **Touch Target Guidelines:** Em interfaces sensíveis ao toque, mantenha alvos interativos com dimensões mínimas recomendadas de $48 \times 48\text{ dp}$ (Android) ou $44 \times 44\text{ pt}$ (iOS), acompanhados de espaçamento (*padding*) adequado para evitar *misclicks*.

### Anti-padrões
- **Tiny Click Targets:** Botões de exclusão, ícones de ajuda ou links de texto com áreas de toque reduzidas (ex.: $< 24\text{px}$) em telas com alta densidade de pixels.
- **Submenus Aninhados Estreitos (*Flyout Menus*):** Exigir que o usuário navegue por corredores verticais e horizontais estreitos com o cursor, onde uma pequena variação angular resulta na perda do foco do menu (alto *Index of Difficulty*).
- **Dispersão Espacial de Ações Críticas:** Separar fisicamente um campo de entrada do seu botão de confirmação correspondente por grandes distâncias visuais sem alinhamento prévio no fluxo focal.

---

# 4. Métricas e Impacto em Produto

| Métrica | Impacto de Fitts's Law |
| :--- | :--- |
| **Task Completion Time (TCT)** | Aumentos na área do *target* e reduções na distância diminuem o tempo de execução de tarefas rotineiras de forma logarítmica. |
| **Error Rate / Misclick Rate** | *Targets* dimensionados abaixo do limite motor resultam no aumento de cliques acidentais em elementos adjacentes. |
| **Throughput (TP)** | Métrica padrão de HCI medida em bits/segundo; avalia a eficiência combinada de velocidade e precisão de um dispositivo ou layout. |

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Determina o tempo de tomada de decisão antes do início do movimento motor.
- [[CognitiveLoad]] — A redução da dificuldade motora minimiza o esforço de atenção despendido durante a interação.

### Fontes
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- Card, S. K., English, W. K., & Burr, B. J. (1978). *Evaluation of mouse, rate-controlled isometric joystick, step keys, and text keys for text selection on a CRT*. Ergonomics, 21(8), 601–613.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.