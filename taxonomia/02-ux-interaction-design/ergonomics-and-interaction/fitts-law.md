---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics-and-interaction"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law is a predictive model of human-computer interaction stating that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target."
tags:
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "hci"
aliases:
  - "Fitts' Law"
  - "Lei de Fitts"
academic_anchors:
  - "Paul Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "Scott MacKenzie (1992) - Fitts' Law as a Research and Design Tool in Human-Computer Interaction"
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
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzido contextualmente como Lei de Fitts) é um modelo humano-motor e preditivo formalizado em *Human-Computer Interaction* (HCI) que postula que o tempo necessário para selecionar ou alcançar um *target* visual é uma função logarítmica da distância até esse *target* dividida pela sua largura utilizável no eixo de movimento. Em essência, quanto menor e mais distante o *target*, maior será o tempo de execução e o esforço motor exigido do usuário.

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente por Paul Fitts em 1954 no âmbito da psicologia experimental e da teoria da informação, a lei quantifica a capacidade de processamento do sistema motor humano expressa em *bits* por segundo. 

Matematicamente, a fórmula canônica refinada por Scott MacKenzie (variante Shannon) é dada por:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- **MT** (*Movement Time*): Tempo total gasto para completar a ação motora.
- **a** e **b**: Constantes empíricas derivadas por regressão linear dependentes do dispositivo de entrada (*input device*, como *mouse*, *touchscreen* ou *trackpad*).
- **D** (*Distance*): Distância linear do ponto inicial do cursor ou apontador até o centro do *target*.
- **W** (*Width*): Largura efetiva do *target* medida ao longo do eixo de movimento.
- **Index of Difficulty (ID)**: Expressa o termo $\log_2 \left( \frac{D}{W} + 1 \right)$, medido em *bits*. Quanto maior o *Index of Difficulty*, mais tempo e precisão o sistema cognitivo-motor exige.

Sob a perspectiva cognitiva e neurobiológica, a execução de um movimento em direção a um *target* consiste em dois estágios: a *initial impulse phase* (um movimento balístico rápido direcionado à área aproximada) e a *current control phase* (ajustes finos baseados em *visual feedback* dinâmico). *Targets* menores estendem a *current control phase*, resultando em maior *cognitive load* e latência de execução.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Maximize the Bounding Box**: Aumentar a área interativa clicável de elementos (como botões, *links* e ícones) reduz o *Index of Difficulty*, minimizando erros de seleção.
- **Leverage Edge and Corner Infinite Size**: Nos cantos e bordas da tela (*screen boundaries*), o ponteiro do *mouse* é fisicamente interrompido, resultando em um *Width* efetivamente infinito e tornando essas áreas extremamente ágeis para *actions* frequentes.
- **Proximity of Interactive Controls**: Posicionar elementos relacionados ou fluxos subsequentes (como botões de *submit* ou menus contextuais) próximos ao ponto de foco original do usuário para reduzir $D$ a valores mínimos.
- **Touch Target Ergonomics**: Em interfaces móveis (*mobile UI*), definir *touch targets* mínimos de pelo menos 48x48dp ou 44x44pt para compensar a imprecisão dos dedos (*fat-finger effect*).

### Anti-padrões
- **Tiny Click Targets**: Links de texto ou ícones pequenos isolados sem *padding* adicional, forçando movimentos desacelerados de correção fina.
- **Excessive Spacing on Sequential Actions**: Distanciar botões primários de confirmação e *inputs* dependentes em lados opostos da *viewport*, multiplicando $D$ desnecessariamente.
- **Nested Contextual Menus**: Menus desdobráveis (*hover dropdowns*) profundos que exigem trajetórias lineares estreitas sem tolerância a desvios angulares.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT)**: A otimização do *Index of Difficulty* correlaciona-se diretamente com a redução do tempo médio de execução de tarefas críticas.
- **Error Rate / Misclick Rate**: *Targets* com baixo *Index of Difficulty* apresentam taxas significativamente menores de cliques acidentais e acionamentos inválidos.
- **System Usability Scale (SUS)**: Reduções no esforço biomecânico e cognitivo elevam os índices percebidos de usabilidade e fluidez.
- **Throughput (TP)**: Medido em *bits* por segundo, o *Throughput* avalia o desempenho relativo de *input devices* e *layouts* de interface ao combinar a velocidade e a precisão das interações.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

- [[HicksLaw]]
- [[CognitiveLoad]]
- [[DohertyThreshold]]

### Fontes
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391.
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, 7(1), 91-139.
- Laws of UX (2026). *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>.