---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "human-computer-interaction"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law (Lei de Fitts) é um modelo psicomotor e ergonômico que estabelece que o tempo necessário para alcançar um alvo é uma função logarítmica da distância até ele dividida por sua dimensão física."
tags:
  - "fittss-law"
  - "interaction-design"
  - "hci"
  - "usabilidade"
  - "ergonomia"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' Law as a Research and Design Model in Human-Computer Interaction"
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
  - "[[TouchTargets]]"
  - "[[LawOfProximity]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é uma equação preditiva do comportamento humano e um princípio fundamental da *Human-Computer Interaction* (HCI) que quantifica o tempo necessário para mover um apontador até uma área de destino interativa. O modelo postula que o tempo de aquisição de um alvo é uma função direta da distância até ele (*distance*) e da sua dimensão (*target size*). Em síntese, alvos menores e mais distantes exigem maior tempo e esforço motor, enquanto alvos maiores e mais próximos são selecionados de forma mais rápida e precisa.

# 2. Fundamentação Teórica e Cognitiva

Formulada em 1954 pelo psicólogo Paul Fitts e posteriormente adaptada para a ciência da computação por Scott MacKenzie e Bill Buxton, a lei fundamenta-se nos princípios da teoria da informação de Shannon. O tempo de movimento (*Movement Time* - MT) é expresso matematicamente pela fórmula:

$$MT = a + b \cdot ID$$

onde $ID$ representa o Índice de Dificuldade (*Index of Difficulty*), calculado como:

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Nesta relação, $D$ representa a distância física até o centro do alvo, $W$ é a largura (*width*) do alvo ao longo do eixo de deslocamento, e $a$ e $b$ são constantes empíricas associadas ao dispositivo de entrada (como *mouse*, *trackpad* ou *touchscreen*).

A base neurocognitiva do modelo descreve que a aquisição do alvo ocorre através de duas fases motoras consecutivas:
1. *Initial Impulse Phase* (Fase Estocástica Primária): Um movimento balístico rápido e de grande amplitude que projeta o cursor na direção geral do objeto.
2. *Current Control Phase* (Fase de Ajuste Fino): Uma sucessão de correções visuo-motoras de alta precisão para desacelerar e ajustar a posição exata sobre o componente. 

Quando a dimensão do alvo reduz, a necessidade de correções micro-motoras aumenta exponencialmente, elevando a carga biomecânica e desacelerando a conclusão da tarefa. Em arranjos de *desktop*, as bordas físicas da tela funcionam como *Infinite Targets* (alvos infinitos), pois o limite da viewport impede o cursor de ultrapassar a área estipulada, anulando a necessidade do ajuste fino de desaceleração.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- *Target Sizing Generoso*: Expandir a área clicável ou tocável dos componentes de interface. Em interfaces móveis, assegurar uma área mínima de *Touch Target* de 48x48 dp/px.
- *Proximity Optimization*: Posicionar botões de ação sequenciais ou dependentes imediatamente próximos aos pontos de origem de foco do usuário para mitigar o valor de $D$.
- *Edge and Corner Positioning*: Alocar elementos interativos críticos ou globais (como menus principais e barras de ação) nas extremidades físicas da tela em layouts desktop para tirar proveito do conceito de *Infinite Target*.
- *Contextual UI Integration*: Implementar menus contextuais ativados sob o ponteiro (ex.: menus disparados via clique com botão direito ou ações flutuantes no ponto de seleção) para reduzir a distância $D$ a zero.

### Anti-padrões
- *Micro-Targets*: Utilizar ícones pequenos sem *padding* estendido, tais como botões de fechar modais ou atalhos de exclusão cujas dimensões ativas coincidam exatamente com a sua geometria visual reduzida.
- *Target Chasing*: Projetar menus suspensos encadeados (*Flyout Menus*) que exigem do usuário a navegação em trajetória contínua por corredores estreitos, onde pequenos desvios desativam o estado do componente.
- *Destructive Proximity*: Posicionar botões destrutivos irreversíveis adjacentes a elementos de confirmação frequente sem espaçamento adequado ou diferenciação de área interativa.

# 4. Métricas e Impacto em Produto

- *Task Completion Time* (TCT): Redução direta no tempo gasto para a execução de fluxos operacionais críticos (ex.: rotas de *checkout* ou preenchimento de formulários).
- *Error Rate / Misclick Rate*: Diminuição percentual da incidência de toques ou cliques acidentais fora dos limites previstos do componente.
- *Throughput* (TP): Aumento na taxa de transferência de informação no uso do sistema, medida em bits por segundo ($TP = ID / MT$).
- *Conversion Rate*: Elevação das taxas de conversão em componentes de *Call to Action* (CTA) decorrente da ampliação do *bounding box* interativo.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[TouchTargets]]
- [[LawOfProximity]]

### Fontes
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' Law as a Research and Design Model in Human-Computer Interaction*. Human-Computer Interaction, 7(1), 91–139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.
