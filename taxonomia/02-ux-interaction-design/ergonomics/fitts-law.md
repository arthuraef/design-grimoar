---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de controle motor e ergonomia computacional que postula que o tempo necessário para atingir um alvo é uma função logarítmica da distância até ele dividida por sua largura."
tags:
  - "usabilidade"
  - "design"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Paul M. Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "I. Scott MacKenzie (1992) - Fitts' Law as a Research and Design Model in Human-Computer Interaction"
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

**Fitts's Law** (Lei de Fitts) é um modelo biomecânico e psicomotor preditivo que postula que o tempo necessário para mover um efetor para uma área de destino é uma função logarítmica da distância (*distance*) até esse destino dividida por sua largura (*width*).

Formulada empiricamente para o contexto de *Human-Computer Interaction* (HCI) através do refinamento de Shannon por MacKenzie, a equação expressa-se como:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   **$MT$ (*Movement Time*):** O tempo total despendido para alcançar o alvo.
*   **$a$ e $b$:** Regressões empíricas constantes atreladas ao dispositivo de ponteiro (*mouse*, *trackpad*, *touchscreen*) e à população testada.
*   **$D$ (*Distance*):** A amplitude linear entre a posição inicial do ponteiro ou efetor e o centro focal do alvo.
*   **$W$ (*Width*):** A largura ou dimensão utilizável do alvo medida ao longo do eixo principal de deslocamento.
*   **$ID$ (*Index of Difficulty*):** Representado pelo componente $\log_2 \left( \frac{D}{W} + 1 \right)$, quantificando a dificuldade da tarefa em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Concebida originalmente por Paul Fitts em 1954 no campo da psicologia experimental, a lei fundamenta-se na aplicação da *Information Theory* de Claude Shannon ao sistema de controle neuromuscular humano. A hipótese central assume que o aparelho motor humano funciona como um canal de comunicação com capacidade limitada de processamento de informação.

O processo de alcance espacial divide-se cognitivamente em duas fases encadeadas:
1.  **Movimento Ballístico Inicial:** Disparo neuromuscular de alta velocidade que projeta o efetor em direção à proximidade geral do alvo sem controle contínuo por *visual feedback*.
2.  **Fase de Micro-ajustes de Correção:** Controle em *closed-loop visual feedback*, no qual correções visuomotoras de fina precisão ocorrem iterativamente à medida que o efetor se aproxima dos limites de $W$.

Quanto maior a distância $D$ ou menor a largura $W$, maior a quantidade de processamento neuromuscular no *closed-loop*, resultando em aumento exponencial de correções e retardo de execução.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Dimensionamento Mínimo de Target Area:** Alvos interativos em *touchscreens* e interfaces móveis devem satisfazer áreas de toque biomecanicamente acessíveis (tamanho mínimo recomendado de $48 \times 48 \text{ dp}$ ou $44 \times 44 \text{ pt}$) para evitar micro-ajustes excessivos.
*   **Aproveitamento das Bordas de Display:** Telas de computador limitam o movimento físico do cursor nas extremidades, tornando $W$ virtualmente infinito ($W \to \infty$). Posicionar elementos nos cantos da tela reduz o *Index of Difficulty* drasticamente por eliminar a probabilidade de *overshoot*.
*   **Proximidade de Contextual Controls:** Menus flutuantes (*context menus*, *popovers*) e botões de *call-to-action* primários devem situar-se nas imediações do cursor ou da área ativa de foco, minimizando $D$.

### Anti-padrões
*   **Micro Target Syndrome:** Agrupamento de botões de ação ou elementos de navegação críticos com dimensões físicas reduzidas ($< 24 \text{ px}$), induzindo fadiga motora e múltiplos erros.
*   **Cascading Menus Estreitos:** Estruturas de *dropdown* encadeadas que exigem trajetórias longas e ortogonais restritas a canais estreitos, expondo o usuário à falha ao ultrapassar os limites laterais de $W$.
*   **Proximidade de Ações Destrutivas:** Posicionamento de botões de exclusão ou confirmação irreversível contíguos a ações operacionais frequentes sem margem de segurança ou buffer espacial.

---

# 4. Métricas e Impacto em Produto

*   **Task Completion Time (TCT):** A otimização direta da taxa $D/W$ traduz-se em redução do tempo de resposta da tarefa em operações críticas de alta frequência.
*   **Error Rate e Misclicks:** Diminuir o *Index of Difficulty* reduz substancialmente a incidência de cliques acidentais e falhas de seleção em componentes de interface.
*   **Throughput (TP):** Métrica padronizada pela norma ISO 9241-9 para quantificar o desempenho do conjunto usuário-dispositivo, calculada pela relação $TP = \frac{ID_e}{MT}$ em *bits/second*.
*   **Conversion Rate:** A expansão visual e tátil de botões estratégicos em *checkouts* minimiza o atrito motor, facilitando o encadeamento direto de conversão.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]]
*   [[CognitiveLoad]]
*   [[SteeringLaw]]

### Fontes
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.