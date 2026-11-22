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
summary: "Fitts's Law (Lei de Fitts) é um modelo psicofísico e ergonômico que determina que o tempo necessário para alcançar um alvo visual é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement."
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

Fitts's Law (Lei de Fitts) é um princípio ergonômico e modelo preditivo de desempenho humano formulado por Paul Fitts em 1954. A lei estabelece que o tempo necessário para mover rapidamente um apontador (como o cursor do mouse, um stylus ou o próprio dedo) até uma área de destino é função da relação matemática entre a distância até o alvo (*distance* ou *amplitude*) e a largura (*width* ou *target size*) do mesmo. 

Em *interaction design*, a lei fundamenta a otimização de elementos interativos, prescrevendo que alvos críticos ou de alta frequência de uso devem possuir dimensões físicas ou virtuais expandidas e estar localizados em trajetórias motoras curtas em relação ao ponto de origem do usuário.

# 2. Fundamentação Teórica e Cognitiva

O modelo matemático clássico derivado da teoria da informação de Shannon expressa o *Index of Difficulty* (ID) de um movimento como:

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Onde $D$ representa a distância percorrida (*Distance*) e $W$ representa a largura do alvo (*Width*) ao longo do eixo de movimento. O tempo de movimento (*Movement Time* - MT) é linearmente dependente do ID:

$$MT = a + b \cdot ID$$

Sendo $a$ e $b$ constantes empíricas determinadas pelo dispositivo de entrada e pelo contexto biomecânico.

Sob a perspectiva da psicologia cognitiva e do controle motor, a movimentação até um alvo é dividida em duas fases principais:
1. **Fase de Impulso Inicial (*Ballistic Movement*)**: Movimento rápido e de baixa precisão guiado por comandos pré-programados do sistema nervoso central em direção à área do alvo.
2. **Fase de Correção Final (*Current Control Phase*)**: Sub-movimentos de alta precisão baseados em *visual feedback loop* para ajustar o cursor exatamente sobre os limites da *hitbox*.

Em interfaces de desktop, as bordas e cantos da tela possuem dimensão efetiva infinita ($W = \infty$), pois a restrição mecânica do cursor impede o ultrapassamento do limite gráfico. Isso zera o tempo de desaceleração na fase de correção final. Em interfaces móveis (*touchscreens*), a dinâmica altera-se devido à ausência de *hover state* e às variações na anatomia das mãos, tornando a *thumb zone* a região primária de menor distância de alcance.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Positivas

*   **Hitbox Expansion**: Aumentar o perímetro clicável ou tocável dos componentes interativos (*padded targets*) sem necessariamente alterar o tamanho de seus ativos visuais internos (ícones ou texto).
*   **Edge and Corner Pinning**: Posicionar botões de ação global e barras de ferramentas nas extremidades ou nos cantos da interface em ambientes desktop para aproveitar os *infinite targets*.
*   **Proximity of Related Actions**: Posicionar botões secundários ou menus contextuais nas proximidades do ponto de origem da interação (ex: *popover menus* acionados por clique no botão direito).
*   **Minimum Touch Target Standards**: Garantir dimensões mínimas absolutas para telas sensíveis ao toque (ex: 48×48 dp no Android Material Design ou 44×44 pt no iOS Human Interface Guidelines).

### Anti-padrões

*   **Tiny Target Cluster**: Agrupar múltiplos botões pequenos e com baixo espaçamento relativo, aumentando drasticamente o tempo de desaceleração motora e o risco de acionamento errôneo (*misclick*).
*   **Excessive Travel Distance**: Exigir que o usuário percorra grandes distâncias na tela para executar ações sequenciais encadeadas (ex: botão de confirmação posicionado no canto inferior direito para um campo de formulário localizado no topo esquerdo).
*   **Hidden Hitboxes**: Restringir a área interativa estritamente aos vetores numéricos de um texto ou de um ícone de formato irregular, em vez de preencher toda a *bounding box* do elemento.

# 4. Métricas e Impacto em Produto

*   **Task Completion Time (TCT)**: A aplicação correta reduz o tempo de conclusão de tarefas ao diminuir a fase de correção do movimento motor.
*   **Error Rate / Misclick Rate**: Aumentar a largura efetiva do alvo reduz proporcionalmente a frequência de cliques fora da área útil ou seleções incorretas em interfaces compactas.
*   **Throughput (TP)**: Métrica padronizada por ISO 9241-9 que mede a eficiência de dispositivos de entrada computando $ID / MT$, permitindo comparar diferentes designs de interação sob estresse de tempo.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]]
*   [[CognitiveLoad]]
*   [[DohertyThreshold]]

### Fontes Acadêmicas e de Indústria
*   Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391.
*   MacKenzie, I. S. (1992). Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, 7(1), 91-139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.