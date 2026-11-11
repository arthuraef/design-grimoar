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
summary: "Modelo psicomotor e ergonômico que estabelece que o tempo necessário para atingir um alvo é proporcional à distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, Paul M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "MacKenzie, I. Scott (1992) - Fitts' Law as a Research and Design Tool in Human-Computer Interaction"
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
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo de desempenho humano aplicado ao *interaction design* e à *ergonomics* que quantifica o tempo necessário para mover um apontador até uma área-alvo. O princípio postula que o tempo de aquisição do alvo (*target acquisition time*) é uma função logarítmica da razão entre a distância percorrida (*amplitude*) e a largura do alvo (*target size*). 

Formalmente, quanto menor o elemento interativo e maior a distância a ser percorrida até ele, mais lento e propenso a erros será o gesto motor de seleção.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954 no contexto do controle motor humano, a lei foi estendida ao campo de *human-computer interaction* (HCI) por Stuart Card, Thomas P. Moran e Allen Newell, e subsequentemente reformulada por I. Scott MacKenzie através da equação de Shannon:

$$MT = a + b \log_2 \left( 1 + \frac{D}{W} \right)$$

Onde:
*   **$MT$** (*Movement Time*): Tempo total para concluir a ação motora.
*   **$a$** e **$b$** são constantes empíricas dependentes do dispositivo de entrada (*input device*) e do usuário.
*   **$D$** (*Distance*): Distância do ponto inicial até o centro do alvo.
*   **$W$** (*Width*): Largura (ou dimensão útil da área de clique) do alvo ao longo do eixo de movimento.
*   **$\log_2(1 + D/W)$** é o *Index of Difficulty* (ID), medido em *bits*.

### Mecanismos Cognitivo-Motores
O movimento em direção a um alvo ocorre em duas fases principais:
1.  **Ballistic Phase (Fase Balística):** Um movimento inicial rápido e de alta velocidade acionado pelo sistema motor em direção ao alvo aproximado.
2.  **Corrective Phase (Fase de Correção Decelerativa):** Pequenos ajustes finos guiados por *visual feedback loops* à medida que a mão ou ponteiro se aproxima do limite do elemento. 

Alvos pequenos exigem maior alocação de atenção e ciclos corretivos prolongados, aumentando o consumo de *cognitive load* e o tempo computacional do cérebro para refinar a trajetória.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Ampliação do Hitbox Actuável:** Estender a área clicável (*bounding box*) além dos limites visuais do elemento SVG ou ícone (ex.: adicionar *padding* interno em botões de formulários).
*   **Uso de Canto e Bordas Infinitas (*Infinite Targets*):** Em interfaces *desktop*, as bordas físicas da tela atuam como barreiras absolutas. Como o ponteiro não pode ultrapassá-las, o tamanho efetivo do alvo ($W$) se torna virtualmente infinito, tornando cantos de tela ideais para menus principais (*system tray*, barra de aplicativos).
*   **Proximidade Contextual:** Reduzir a distância ($D$) posicionando menus de ação diretamente adjacentes ao foco da atenção do usuário (ex.: *contextual menus* ao clicar com o botão direito, *popovers* flutuantes ao selecionar texto).
*   **Sizing Diferenciado por Dispositivo:** Em interfaces *mobile*, adaptar os alvos interativos às dimensões mínimas ergonômicas da anatomia humana (recomendação padrão de no mínimo $48 \times 48\text{dp}$ para interações via *thumb zone*).

### Anti-padrões
*   **Tiny Touch Targets:** Botões secundários ou *links* operacionais essenciais dispostos com áreas de toque inferiores a $24\text{px}$, gerando *rage clicks* e falhas de seleção.
*   **Hover Disappearing Dropdowns:** Submenus suspensos que exigem trajetória em linha reta precisa sobre lacunas vazias; desvios mínimos de trajeto fecham o menu devido à estrita área de colisão.
*   **Dispersão Espacial de Ações Críticas:** Posicionar o campo de entrada no canto superior esquerdo e o botão primário de *submit* no canto inferior direito de uma tela ultrawide, maximizando a distância ($D$) desnecessariamente.

---

# 4. Métricas e Impacto em Produto

| Métrica de Produto | Mecanismo de Impacto de Fitts's Law |
| :--- | :--- |
| **Task Completion Time (TCT)** | Redução do *Index of Difficulty* em fluxos transacionais diminui diretamente a latência física por passo. |
| **Error Rate / Missed Clicks** | Ampliação do *hitbox* minimiza execuções fora da área do alvo, reduzindo *undo operations*. |
| **Throughput (TP)** | Aumenta a taxa de processamento de informação motora humana em tarefas repetitivas de entrada de dados (*HCI benchmarking*). |
| **Conversion Rate (CRO)** | Otimização da acessibilidade física de botões de *checkout* ou *Floating Action Buttons* (FAB) reduz o abandono por atrito operacional. |

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Define a latência na tomada de decisão em função do número de escolhas, complementando o tempo motor modelado por Fitts's Law.
*   [[SteeringLaw]] — Extensão de Fitts's Law para trajetórias onde o ponteiro deve se mover através de um canal restrito.
*   [[CognitiveLoad]] — O impacto do esforço de precisão motora na capacidade da memória de trabalho.

### Fontes Primary e Secundárias
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
*   Yablonski, Jon. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.