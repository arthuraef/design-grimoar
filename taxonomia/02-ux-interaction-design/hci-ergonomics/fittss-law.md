---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "hci-ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo do movimento humano que estabelece que o tempo necessário para apontar e selecionar um alvo é uma função logarítmica da distância até ele e do seu tamanho."
tags:
  - "hci"
  - "interaction-design"
  - "usability"
  - "fitts-law"
  - "ergonomics"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "MacKenzie, I. S. (1992) - Fitts' Law as a Research and Design Model in Human-Computer Interaction"
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
  - "[[SteeringLaw]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica

**Fitts's Law** (Lei de Fitts, em português) é um modelo formal de sinalização e ergonomia psicomotora que quantifica o tempo necessário para mover um apontador até uma área de destino especificada. Formada originalmente como uma equação matemática na ergonomia e na *Human-Computer Interaction* (HCI), a lei postula que a duração de um movimento de seleção rápida é diretamente proporcional à distância do ponto de partida até o alvo (*Distance*) e inversamente proporcional ao tamanho desse mesmo alvo (*Width*).

Sua formulação clássica, adaptada para sistemas computacionais por Scott MacKenzie (utilizando a variação de Shannon), é expressa como:

$$MT = a + b \cdot \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
*   $MT$ (*Movement Time*): Tempo total para execução do movimento.
*   $a$ e $b$: Constantes empíricas derivadas por regressão linear (representando o tempo de reação inicial e a velocidade do dispositivo de entrada).
*   $\log_2\left(\frac{D}{W} + 1\right)$: O termo denominado *Index of Difficulty* ($ID$), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954 no contexto do controle motor humano e da teoria da informação de Claude Shannon, a lei demonstra que o sistema nervoso opera como um canal de comunicação com capacidade limitada de processamento de dados. 

O movimento de alcance em direção a um alvo desdobra-se em duas fases cognitivo-motoras:
1.  **Fase Balística Inicial (*Initial Ballistic Phase*):** Movimento rápido e de grande amplitude executado em malha aberta (*open-loop control*), impulsionado pelo plano motor pré-programado no cérebro.
2.  **Fase de Correção Fina (*Current Control Phase*):** Movimento de desaceleração em malha fechada (*closed-loop control*), no qual correções visuais contínuas e *feedback* proprioceptivo ajustam a trajetória do indicador à medida que ele se aproxima dos limites físicos do alvo.

Conforme a dimensão ($W$) do alvo diminui ou a distância ($D$) aumenta, o *Index of Difficulty* eleva-se, exigindo um número maior de micro-correções sensório-motoras, o que reduz exponencialmente a velocidade de execução da tarefa. Em ambientes digitais, cantos e bordas da tela oferecem alvos com dimensão virtualmente infinita, pois o cursor físico é impedido de ultrapassar as fronteiras da interface visual.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximização de *Touch Targets* Primários:** Aumentar a área interativa do elemento diminui o *Index of Difficulty*. Ações primárias (ex: botões de conversão) devem ter áreas de clique substancialmente superiores a elementos secundários.
*   **Minimização da Distância de Trajetória:** Agrupar controles contextuais em menus suspensos ou menus radiais (*Pie Menus*) posicionados imediatamente ao lado do estado do cursor ou foco ativo reduz a constante $D$ a um valor próximo de zero.
*   **Exploração das Fronteiras da Tela (*Magic Pixels*):** Posicionar elementos críticos de navegação (como barras de menus ou botões de fechar) nos cantos e bordas da interface gráfica. Nesses pontos, a restrição física do cursor converte o valor de $W$ em um limiar infinito.
*   **Pistas Visuais e Zonas de Clique Expandidas:** Utilizar preenchimentos (*padding*) invisíveis para ampliar o *bounding box* clicável de elementos pequenos, tais como ícones de navegação ou caixas de seleção (*checkboxes*).

### Anti-padrões
*   **Alvos Hiper-dimensionados de Baixa Importância:** Ampliar botões destrutivos ou secundários desnecessariamente, criando acionamentos acidentais por aumento excessivo de acessibilidade.
*   **Menus em Cascata com Corredores Estreitos:** Submenus suspensos que exigem do usuário mover o cursor através de trajetórias retilíneas minúsculas sob risco de fechar o menu. Esses elementos desrespeitam tanto a *Fitts's Law* quanto a *Steering Law*.
*   **Separação Extrema entre Ação e Entrada:** Posicionar o botão de confirmação de um formulário no canto oposto da tela em relação aos campos de preenchimento, forçando longas trajetórias computacionais de varredura e movimento físico.

---

# 4. Métricas e Impacto em Produto

*   **Throughput (TP):** Medida padrão de desempenho motor expressa em *bits/segundo*, calculada dividindo-se o *Index of Difficulty* ($ID$) pelo tempo de movimento ($MT$). Permite comparar objetivamente a eficiência de diferentes dispositivos de entrada ou layouts de interface.
*   **Target Acquisition Time (TAT):** O tempo médio transcorrido entre a intenção de clicar e a confirmação visual da seleção do elemento.
*   **Taxa de Erro por Clique Involuntário (*Misclick Rate*):** Porcentagem de cliques realizados fora do limite efetivo da área de toque ou em elementos adjacentes incorretos.
*   **Conformidade com Acessibilidade (WCAG 2.2):** Cumprimento dos critérios de sucesso 2.5.5 (*Target Size*) e 2.5.8 (*Target Size Minimum*), que exigem dimensões mínimas de interatividade (ex: $24\times24$ px ou $44\times44$ px) para mitigar falhas causadas por tremores ou restrições de motricidade fina.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Define o tempo de tomada de decisão prévio ao movimento físico.
*   [[SteeringLaw]] — Extensão da *Fitts's Law* para cenários onde o cursor deve navegar por trajetórias ou canais restritos.
*   [[CognitiveLoad]] — A frustração motora advinda de alvos difíceis aumenta o esforço mental geral na interface.

### Fontes
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
*   Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media. Disponível em: `https://lawsofux.com/en/fitts-law/`.