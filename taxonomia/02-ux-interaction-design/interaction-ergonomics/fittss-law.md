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
summary: "Modelo ergonômico e psicofísico que estabelece que o tempo necessário para atingir um alvo é uma função da distância até ele dividida por sua dimensão física."
tags:
  - "fitts-law"
  - "hci"
  - "usabilidade"
  - "ergonomia"
  - "interaction-design"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
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
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um modelo de controle motor e ergonomia cognitiva que prevê o *Target Acquisition Time* (tempo de aquisição de alvo) em interfaces físicas e digitais. A lei estabelece formalmente que o tempo necessário para mover um dispositivo de apontamento (ou o próprio membro corporal) até um alvo é proporcional à razão entre a distância percorrida e a largura do alvo final.

Matematicamente, a sua formulação mais aceita no campo de *Human-Computer Interaction* (HCI) — a variação de Shannon — é expressa como:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   $MT$ representa o *Movement Time* (Tempo de Movimento).
*   $a$ e $b$ são constantes empíricas derivadas de regressão linear para um dispositivo de entrada específico.
*   $D$ é a *Distance* (Distância) do ponto inicial até o centro do alvo.
*   $W$ é a *Width* (Largura) do alvo medida ao longo do eixo de movimento.
*   O termo $\log_2 \left( \frac{D}{W} + 1 \right)$ é denominado *Index of Difficulty* (ID), mensurado em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954, a lei fundamenta-se na adaptação da Teoria da Informação de Claude Shannon aos sistemas neuromusculares humanos. O sistema motor humano é modelado como um canal de comunicação de capacidade limitada, onde o ato de mover o cursor ou o dedo até uma área delimitada consome capacidade de processamento de informação.

O processo psicofísico desdobra-se em duas fases motoras distintas:
1.  **Fase Balística (Movimento Primário):** Um deslocamento rápido de alta velocidade em direção genérica ao alvo, executado de forma pré-programada pelo sistema nervoso central sem feedback sensorial ostensivo.
2.  **Fase Homogênea de Ajuste Fine (Movimento Secundário):** Micromovimentos orientados por *visual feedback loop* para alinhar o ponteiro exatamente dentro da *bounding box* do elemento interativo.

Quanto menor for o alvo ($W$) e maior a distância ($D$), mais ciclos de correção visual-motora são exigidos, aumentando de forma logarítmica o valor de $MT$. 

Um corolário crítico da Fitts's Law no contexto de *Graphical User Interfaces* (GUI) é o conceito de alvos com dimensão infinita. As bordas e cantos físicos da tela (*screen edges* e *screen corners*) impedem que o cursor ultrapasse o limite de pixels disponível, reduzindo o custo de erro de ultrapassagem (*overshoot*) a zero e tornando essas regiões excepcionalmente eficientes para alvos de alta frequência.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximizar a Hit Area de Elementos Primários:** Aumentar a área clicável real (*touch target* ou *bounding box*) dos botões de ação principal (*Call-to-Action* / *CTA*), adicionando *padding* interno transparente para expandir $W$ sem distorcer o equilíbrio estético visual.
*   **Minimizar a Distância de Deslocamento ($D$):** Agrupar controles contextuais próximos ao foco visual atual do usuário. Exemplos incluem *radial menus* (pie menus) e *contextual menus* ativados por clique com o botão direito, que reduzem $D$ a um valor próximo de zero.
*   **Capitalizar nos Cantos da Tela:** Posicionar controles globais vitais (como menus de sistema, botões de início ou ações de navegação principal) nos cantos ou extremidades da interface, aproveitando a propriedade de largura efetiva infinita ($W = \infty$).
*   **Dimensionamento Ergonômico em Touchscreens:** Respeitar limites mínimos de input tátil (como os padrões de 44x44pt no iOS e 48x48dp no Android), visto que a precisão dos dedos humanos é substancialmente menor do que a de um cursor de mouse.

### Anti-padrões
*   **Tiny Targets:** Links ou botões minúsculos posicionados sem margem de respiro, forçando o usuário a despender alto esforço psicomotor na fase de ajuste fino.
*   **Disparidade Espacial Entre Ações Dependentes:** Posicionar um botão de confirmação ("Salvar") no extremo oposto de um formulário de dados, exigindo longas trajetórias repetitivas de cursor.
*   **Cascading Menus Estreitos:** *Dropdown menus* hierárquicos com corredores de navegação extremamente estreitos, que combinam a penalidade da Fitts's Law com limitações de restrição física descritas pela *Steering Law*.

---

# 4. Métricas e Impacto em Produto

A aplicação direta da Fitts's Law influencia diretamente indicadores quantitativos de eficiência operacional e ergonomia digital:

*   **Task Completion Time (TCT):** A otimização sistemática dos valores de $D$ e $W$ na hierarquia visual reduz diretamente o tempo médio de execução de tarefas críticas.
*   **Error Rate / Misclick Rate:** Alvos com baixo *Index of Difficulty* (ID) diminuem sensivelmente a taxa de cliques acidentais e seleções errôneas em formulários e transações.
*   **Throughput (TP):** Mensurado em *bits por segundo* ($bits/s$), representa a métrica padronizada da ISO 9241-9 para avaliar a eficiência biomecânica combinada de dispositivos de input e interfaces de usuário.
*   **Conversion Rate:** A redução do atrito físico em fluxos de checkout pela expansão visual e tátil do botão de finalização impulsiona as taxas de conversão de produtos e-commerce.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Define a relação entre o tempo de decisão e a quantidade de escolhas cognitivas disponíveis.
*   [[CognitiveLoad]] — Trata da carga mental global exigida pela interface durante a execução de uma tarefa.
*   [[SteeringLaw]] — Desdobramento direto da Fitts's Law para movimentos restritos em trajetórias ou canais.

### Fontes Primárias
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.