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
summary: "Modelo ergonômico e psicofísico que estabelece que o tempo necessário para atingir um alvo é uma função direta da distância até ele e inversamente proporcional à sua largura."
tags:
  - "fitts-law"
  - "interaction-design"
  - "ergonomics"
  - "usability"
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
  academic_anchor_added:
    - "Fitts, P. M. (1954)"
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/fittss-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[JakobsLaw]]"
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzida no contexto de ergonomia como *Lei de Fitts*) é um modelo científico do controle motor humano que estabelece que o tempo necessário para mover um apontador até uma determinada área de destino (alvo) é uma função logarítmica da distância até o alvo dividida pela largura desse mesmo alvo.

Formalizada matematicamente por Paul Fitts em 1954 e posteriormente adaptada para a área de *Human-Computer Interaction (HCI)* por I. Scott MacKenzie através da formulação de Shannon, a lei é expressa pela seguinte equação:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   **$MT$ (*Movement Time*)**: O tempo total necessário para completar a ação motora.
*   **$a$ e $b$**: Constantes empíricas derivadas de regressão linear que variam de acordo com o *input device* e as condições do usuário.
*   **$D$ (*Distance*)**: A distância do ponto inicial até o centro do alvo.
*   **$W$ (*Width*)**: A dimensão/largura do alvo ao longo do eixo de movimento.
*   **$\log_2 \left( \frac{D}{W} + 1 \right)$**: O **$ID$ (*Index of Difficulty*)**, medido em *bits*, que quantifica a complexidade da tarefa de seleção.

---

# 2. Fundamentação Teórica e Cognitiva

A base de Fitts's Law fundamenta-se na Teoria da Informação desenvolvida por Claude Shannon. O sistema neuromotor humano é tratado como um canal de comunicação com capacidade limitada de processamento de informação, onde a execução de um movimento de precisão requer um ajuste contínuo guiado por um *feedback loop* visual e proprioceptivo.

O movimento em direção a um alvo ocorre tipicamente em duas fases distintas:
1.  **Fase Ballística (*Initial Impulse Phase*)**: Movimento rápido e de grande amplitude que transporta o apontador na direção geral do alvo, executado com base no planejamento motor prévio.
2.  **Fase de Correção (*Current Control Phase*)**: Micro-ajustes de alta precisão executados à medida que o apontador se aproxima dos limites do alvo, consumindo a maior parte do *Movement Time* se o alvo for excessivamente pequeno.

Em interfaces digitais para dispositivos *desktop*, os cantos e as bordas da tela exibem uma propriedade conhecida como **Infinite Edge** (ou largura infinita). Como o cursor do *mouse* é impedido de ultrapassar os limites físicos do *display*, a dimensão efetiva do alvo ($W$) tende ao infinito em direção à borda, reduzindo drasticamente o *Index of Difficulty* a quase zero, independente da distância física percorrida.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Sizing & Target Optimization**: Dimensione elementos interativos críticos (como botões primários de *Call to Action*) com áreas de clique (*hit targets*) generosas. Em ambientes de toque (*touchscreen*), adote áreas mínimas recomendadas de $44 \times 44\text{ pt}$ (iOS) ou $48 \times 48\text{ dp}$ (Android).
*   **Spatial Proximity**: Posicione elementos de suporte ou fluxos sequenciais em extrema proximidade espacial da posição provável do cursor ou do foco de atenção visual do usuário para minimizar $D$.
*   **Leveraging Infinite Edges**: Aloje elementos globais e de alta frequência de uso (como menus principais, botões de fechamento ou barras de ferramentas) nos cantos e bordas superiores/inferiores da tela para maximizar o valor efetivo de $W$.
*   **Contextual Control Menus**: Utilize menus contextuais acionados via clique secundário ou menus radiais (*pie menus*) diretamente na posição atual do cursor, reduzindo a distância $D$ a zero.

### Anti-padrões
*   **Micro-Targeting**: Utilizar ícones isolados de dimensões reduzidas sem estender o *padding* da sua área de clique clicável (*Bounding Box*), resultando em alto *Index of Difficulty*.
*   **Excessive Spatial Displacement**: Posicionar ações destrutivas ou de confirmação nos cantos opostos da tela em relação ao foco da tarefa ativa, exigindo deslocamentos longos e imprecisos.
*   **Adjacência sem Isolamento**: Agrupar alvos de alta frequência extremamente próximos a ações destrutivas com áreas de toque reduzidas, provocando erros acidentais por falta de tolerância espacial.

---

# 4. Métricas e Impacto em Produto

A modelagem de interfaces com base em Fitts's Law afeta diretamente indicadores-chave de *usability* e engenharia de fatores humanos:

*   **Task Completion Time (TCT)**: A otimização direta do tempo de movimento ($MT$) reduz o tempo total de execução da tarefa, otimizando fluxos operacionais em softwares de alta produtividade.
*   **Throughput (TP)**: Medido em bits por segundo ($	ext{bits/s}$), é a razão entre o *Index of Difficulty* ($ID$) e o *Movement Time* ($MT$). Um aumento no *Throughput* indica que o sistema permite seleções mais rápidas com maior eficácia motora.
*   **Error Rate / Miss-click Rate**: Aumentar a dimensão útil do alvo ($W$) reduz exponencialmente a incidência de cliques fora da área ativa (*misclicks*), mitigando frustração e cancelamentos de fluxo em *checkout*.
*   **Conversion Rate**: O dimensionamento correto e posicionamento ergonômico de ações primárias reduz a fricção física necessária para interagir, aumentando as taxas de conversão de formulários e etapas críticas do produto.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] – Relação entre o tempo de decisão cognitiva e o número de opções.
*   [[CognitiveLoad]] – O custo de processamento mental associado à localização e precisão visual de alvos.
*   [[JakobsLaw]] – A expectativa de padrões ergonômicos e posicionamento de elementos fundamentada em convenções de mercado.
*   [[DohertyThreshold]] – A relevância da velocidade de resposta combinada com a velocidade de execução motora do usuário.

### Fontes
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.