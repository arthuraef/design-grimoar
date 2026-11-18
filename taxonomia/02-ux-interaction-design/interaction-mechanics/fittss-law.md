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
summary: "Modelo ergonômico e psicomotor que estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função da distância até o alvo e do seu tamanho final."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "motor-control"
aliases:
  - "Fitts Law"
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
  - "[[LawOfProximity]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo de controle motor humano e ergonomia quantitativa que prediz o *target acquisition time* com base na relação proporcional entre a *distance* (ou amplitude) até o objeto de destino e o *target size* (dimensão física do alvo). Formulado originalmente por Paul Fitts em 1954, o princípio estabelece que elementos visuais maiores e localizados mais próximos do ponto de partida reduzem a latência motora e a taxa de erro do usuário, enquanto alvos reduzidos e distantes exigem maior precisão e tempo de execução.

# 2. Fundamentação Teórica e Cognitiva

A formulação matemática clássica da Fitts's Law define o *Index of Difficulty* ($ID$), mensurado em bits, como:

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Onde $D$ representa a *distance* ao centro do alvo e $W$ denota a largura (*width*) do alvo ao longo do eixo de movimento. O *Movement Time* ($MT$) é modelado como uma função linear:

$$MT = a + b \cdot ID$$

Sendo $a$ e $b$ constantes empíricas derivadas do *input device* e da capacidade neuromuscular do indivíduo. Em contextos modernos de *Human-Computer Interaction* (HCI), adota-se predominantemente a aproximação de Shannon formulada por MacKenzie:

$$ID = \log_2 \left( \frac{D}{W} + 1 \right)$$

Sob a perspectiva do controle motor e psicofísica, o deslocamento em direção a um alvo combina uma fase inicial balística de alta velocidade com fases corretivas guiadas por *visual feedback* contínuo. Conforme o cursor ou dedo se aproxima das extremidades da tela, como *corners* e *edges*, o valor efetivo de $W$ tende ao infinito, pois o limite físico do display impede a ultrapassagem do apontador, transformando os cantos da interface nas áreas de menor $ID$ e maior velocidade de acionamento.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

**Heurísticas de Design:**
- **Aumento de Hit Area:** Expandir os limites interativos (*hit targets*) através do uso de *padding* sem necessariamente inflar a escala visual do elemento, garantindo o tamanho mínimo de 48x48dp em *touch interfaces*.
- **Exploração de Infinite Edges:** Posicionar menus de contexto, barras de navegação globais e ações críticas nas extremidades superiores, inferiores ou cantos da tela para aproveitar a restrição física do cursor.
- **Minimização de Distância de Deslocamento:** Agrupar componentes associados ou invocar *popover menus* e *contextual menus* nas proximidades imediatas da localização atual do cursor ou foco ativo do usuário.

**Anti-padrões:**
- **Tiny Touch Targets:** Utilizar áreas clicáveis inferiores a 24px posicionadas em close proximity a outros elementos interativos, induzindo cenários frequentes de *misclick*.
- **Cascading Flyout Menus:** Projetar estruturas de navegação suspensas em múltiplos níveis que exigem do usuário um movimento retilíneo em corredores estreitos de pixels, elevando o tempo de ajuste motor e provocando fechamentos acidentais da interface.
- **Destructive Action Proximity:** Posicionar elementos destrutivos (ex.: botões de exclusão) imediatamente adjacentes a botões de confirmação ou salvamento sem *padding* de separação adequado.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** A otimização do $ID$ em fluxos operacionais reduz quantitativamente a duração total de tarefas e o atrito na execução.
- **Error Rate e Misclick Rate:** Redução direta na frequência de acionamentos acidentais em elementos indesejados, verificada por meio de *heatmap analysis* e *session recordings*.
- **Throughput (TP):** Métrica fundamental de HCI dada pela taxa $TP = \frac{ID}{MT}$ (expressa em bits por segundo), utilizada para comparar a eficiência ergonômica entre diferentes *input devices* ou layouts de interface.
- **Conversion Rate (CR):** Maximizar a acessibilidade motora de botões de *checkout* ou *sign-up* reduz a fricção física no final do funil de conversão.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

**Referências Cruzadas:**
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[DohertyThreshold]]
- [[LawOfProximity]]

**Fontes:**
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91–139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media.
- Laws of UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.