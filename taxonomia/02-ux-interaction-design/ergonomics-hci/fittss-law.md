---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics-hci"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para atingir um alvo interativo é uma função direta da distância até ele e inversamente proporcional à sua dimensão espacial."
tags:
  - "ergonomics"
  - "hci"
  - "interaction-design"
  - "usability"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, Paul M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
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

Fitts's Law (traduzida no contexto de ergonomia como Lei de Fitts) é um modelo formal de controle psicomotor que determina que o *target acquisition time* — o tempo necessário para mover um apontador ou membro corporal até uma área de destino — varia diretamente em relação à distância (*distance*) até o objeto e inversamente em relação ao seu tamanho (*size*). 

Formalizada matematicamente por Paul Fitts em 1954, a equação define que o custo temporal de um movimento motor é governado pela relação logarítmica entre amplitude do deslocamento e largura do alvo. No contexto moderno de *human-computer interaction* (HCI) e *user interface design*, a lei fundamenta a otimização de *touch targets*, posicionamento de componentes visuais e arranjo espacial de elementos interativos em interfaces gráficas (*GUI*).

---

# 2. Fundamentação Teórica e Cognitiva

A base científica da Fitts's Law fundamenta-se na teoria da informação aplicada ao sistema neuromuscular humano. O modelo original postula a existência do *Index of Difficulty* (ID), mensurado em *bits*, expresso na fórmula clássica:

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Onde:
*   $D$ representa a distância (*distance* ou amplitude) do ponto de origem até o centro do alvo.
*   $W$ representa a largura (*width* ou *target size*) medida ao longo do eixo de movimento.

O tempo total de movimento (*Movement Time* ou MT) é calculado empiricamente como uma função linear do ID:

$$MT = a + b \cdot ID$$

Sendo $a$ e $b$ constantes empíricas derivadas do dispositivo de entrada (*input device*, ex: mouse, *trackpad*, *stylus* ou toque direto) e da capacidade motora do usuário.

Cognitivamente, o processo de alcance de um alvo opera em um ciclo de *closed-loop visual feedback*. O movimento divide-se em duas fases principais:
1.  **Balística Inicial (*Ballistic Phase*)**: Um movimento motor rápido, não guiado por retroalimentação contínua, que cobre a maior parte da distância estimada.
2.  **Ajuste Fino (*Corrective Phase*)**: Micro-ajustes perceptivo-motores sob controle de *visual feedback* à medida que o apontador se aproxima dos limites do alvo (*bounding box*).

Em ambientes virtuais, cantos e bordas da tela oferecem dimensões virtuais infinitas ($W = \infty$), pois o cursor físico fica retido pela limitação da tela, eliminando a fase de micro-ajuste e reduzindo o tempo de acesso a valores mínimos.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Redimensionamento Proporcional de *Click Target***: Expandir a *hitbox* clicável de elementos (adicionando *padding* interno) sem necessariamente alterar a representação gráfica do ícone visual.
- **Aproveitamento de Cantos e Bordas (*Magic Pixels*)**: Posicionar elementos de acesso frequente ou global (como *app bars*, botões de fechar ou menus de navegação) nas extremidades físicas da viewport para alavancar a largura virtual infinita.
- **Otimização da *Thumb Zone* em Interfaces Móveis**: Agrupar ações primárias (*primary calls-to-action*) no arco natural de alcance do polegar em dispositivos *touchscreen*, minimizando o valor de $D$.
- **Proximidade Contextual de Menus**: Utilizar *context menus* acionados por clique secundário diretamente no ponto de origem do cursor, reduzindo a distância $D$ a zero.

### Anti-padrões
- **Tiny Target Syndrome**: Dispor botões ou links interativos críticos com dimensões inferiores às recomendações mínimas de acessibilidade (ex: menores que 44×44 pt no iOS ou 48×48 dp no Android), aumentando exponencialmente o *Index of Difficulty*.
- **Excessive Spatial Traversal**: Forçar o usuário a percorrer grandes distâncias físicas na tela para confirmar uma ação encadeada (ex: colocar o campo de entrada de texto no topo e o botão "Confirmar" no canto inferior oposto sem alinhamento natural de fluxo).
- **Hover Tunnels Traps**: Menus cascata em subníveis (*flyout menus*) que exigem trajetórias lineares hiper-precisas em canais estreitos, onde pequenos desvios fazem o menu fechar por invalidação da área de alcance.

---

# 4. Métricas e Impacto em Produto

| Métrica | Mecanismo de Impacto | Direção Desejada |
| :--- | :--- | :--- |
| **Task Completion Time (TCT)** | Redução da constante $MT$ pela diminuição da distância $D$ e aumento de $W$. | Queda (Otimização) |
| **Misclick Rate / Touch Error Rate** | Menor probabilidade de desvio motor fora do *bounding box* de destino. | Queda (Otimização) |
| **Throughput (TP)** | Taxa de transferência de informação do sistema dispositivo-usuário, medida em *bits/second*. | Elevação (Eficiência) |
| **Conversion Velocity** | Menor atrito físico para finalizar ações críticas em funis de *checkout* ou *onboarding*. | Elevação (Desempenho) |

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Define o custo cognitivo da tomada de decisão antes da execução motora.
- [[CognitiveLoad]] — Reflete o esforço mental total associado à navegação e interpretação de alvos.
- [[DohertyThreshold]] — Trata da latência de resposta do sistema associada ao tempo de execução das tarefas interativas.

### Fontes Acadêmicas e Canônicas
- Fitts, Paul M. "The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement." *Journal of Experimental Psychology*, vol. 47, no. 6, 1954, pp. 381–391.
- MacKenzie, I. Scott. "Fitts' Law as a Research and Design Tool in Human-Computer Interaction." *Human-Computer Interaction*, vol. 7, no. 1, 1992, pp. 91–139.
- Yablonski, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.