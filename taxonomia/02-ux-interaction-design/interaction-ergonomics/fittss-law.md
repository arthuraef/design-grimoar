---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e preditivo do movimento humano que estabelece que o tempo exigido para alcançar um alvo é diretamente proporcional à distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "human-computer-interaction"
aliases:
  - "Fitts Law"
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

Fitts's Law (Lei de Fitts) é um modelo de controle motor e ergonomia de interações que dita que o tempo necessário para mover um dispositivo de apontamento até uma área-alvo é uma função logarítmica da distância até o objetivo dividida pela sua dimensão física. Formulado por Paul Fitts em 1954 no campo da psicologia experimental e aplicado posteriormente ao *Human-Computer Interaction* (HCI), o modelo quantifica a precisão espacial exigida para a execução de tarefas motoras de seleção em interfaces bi e tridimensionais.

# 2. Fundamentação Teórica e Cognitiva

A base matemática de Fitts's Law é expressa pela equação:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde $MT$ representa o *Movement Time* (Tempo de Movimento), $D$ corresponde à *Distance* (distância da posição inicial ao centro do alvo), $W$ é a *Width* (largura tolerável do alvo ao longo do eixo de movimento), enquanto $a$ e $b$ são constantes empíricas derivadas do hardware de entrada e do ambiente motor. O termo logarítmico $\log_2(2D/W)$ define o *Index of Difficulty* ($ID$), medido em *bits*.

Sob o prisma da neurociência cognitiva, a execução do movimento compreende duas fases sequenciais:
1. **Fase Balística (Open-loop control):** Movimento rápido inicial orientado visualmente ao alvo, cobrindo a maior parte da distância sem reajustes proprioceptivos profundos.
2. **Fase de Correção Fina (Closed-loop control):** Micro-ajustes guiados por *visual feedback* contínuo conforme o apontador aproxima-se do perímetro de $W$.

Alvos menores aumentam significativamente a duração da fase de correção fina, elevando o tempo de execução e a exigência de coordenação motora fina do usuário. Em ambientes gráficos com bordas rígidas (desktop OS), o valor efetivo de $W$ nos cantos da tela torna-se matematicamente infinito, transformando os quatro cantos físicos da tela nos pontos de menor $ID$ e mais rápida aquisição de toda a interface.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Otimizadoras
- **Dimensionamento Proporcional de CTAs:** Expandir a *clickable area* de elementos essenciais de conversão (*Primary Actions*) para no mínimo 44x44 pt/dp em dispositivos sensíveis ao toque, compensando a imprecisão natural dos dedos humanos.
- **Aproveitamento das Fronteiras da Tela:** Alocar menus globais e botões críticos nos limites externos ou cantos absolutos da interface visual em monitores, mitigando a probabilidade de erros de overshoot.
- **Proximidade Contextual:** Agrupar controles de ação rápida (ex: *contextual menus*, *popovers*) imediatamente adjacentes à localização atual do cursor ou ao ponto de foco ativo.

### Anti-padrões
- **Tiny Target Syndrome:** Ícones de ação primária sem *padding* estrutural interno adequado, forçando o usuário a desacelerar dramaticamente o movimento balístico para efetuar a seleção.
- **Hover Dropdown Cascades:** Menus suspensos em cascata com caminhos de navegação estreitos, nos quais pequenos desvios angulares do curso do ponteiro fecham o submenu, exigindo reinício do ciclo motor.
- **Desconexão Espacial entre Entrada e Ação:** Posicionar botões de confirmação a grandes distâncias físicas dos campos de formulário associados sem redundância no encadeamento visual.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** A aplicação estrita de Fitts's Law reduz diretamente a latência física na execução das tarefas de navegação e preenchimento de formulários.
- **Throughput (TP):** Métrica fundamental normatizada pela ISO 9241-9, calculada pela razão entre o *Index of Difficulty* ($ID$) e o tempo efetivo de movimento ($MT$), mensurando a eficiência informacional de dispositivos e seleções gráficas em *bits/segundo*.
- **Error Rate / Misclick Ratio:** Redução na incidência de cliques acidentais fora do perímetro pretendido, diminuindo o índice de frustração e correções corretivas de entrada.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[DohertyThreshold]]

### Fontes
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' Law as a Research and Design Tool in Human-Computer Interaction*. Human-Computer Interaction, 7(1), 91-139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.