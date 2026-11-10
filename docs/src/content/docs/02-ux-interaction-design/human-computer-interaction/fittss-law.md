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
summary: "Princípio ergonômico de design de interação que estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função matemática da distância até o alvo e da largura do mesmo."
tags:
  - "fitts-law"
  - "hci"
  - "interaction-design"
  - "usability"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Paul Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
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
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

**Fitts's Law** (frequentemente traduzida como Lei de Fitts) é um modelo de controle psicomotor que prevê o tempo necessário para um usuário mover um dispositivo de apontamento (*pointing device*) até uma determinada área-alvo (*target*). Formulada por Paul Fitts em 1954, a lei postula que o tempo de aquisição de um alvo é uma função logarítmica da relação entre a distância até o alvo e a dimensão física desse alvo ao longo do eixo de movimento.

Na engenharia de *user experience* e no *interaction design*, o conceito dita que elementos de interface com os quais os usuários interagem com alta frequência devem possuir dimensões físicas maiores e estar localizados próximos à posição atual do cursor ou da zona de alcance tátil (*touch zone*).

---

# 2. Fundamentação Teórica e Cognitiva

A base matemática da Fitts's Law é expressa pela equação:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
*   **$MT$** (*Movement Time*): Tempo total para concluir o movimento.
*   **$a$** e **$b$**: Constantes empíricas derivadas do dispositivo de entrada e do contexto fisiológico.
*   **$D$** (*Distance*): Distância do ponto de partida até o centro do alvo.
*   **$W$** (*Width*): Largura do alvo medida ao longo da dimensão de movimento.
*   **$\log_2 \left( \frac{2D}{W} \right)$**: Índice de Dificuldade (*Index of Difficulty* ou $ID$), medido em bits.

Sob a perspectiva da psicologia cognitiva e da ergonomia física, a execução de um apontamento envolve dois processos motores:
1.  **Movimento Balístico Primário**: Um impulso rápido e impreciso em direção ao alvo.
2.  **Ajuste Fino de Feedback**: Correções visomotoras sucessivas à medida que o cursor ou o dedo se aproxima das bordas do alvo.

Alvos menores exigem um ciclo maior de feedback corretivo, aumentando drasticamente o tempo de processamento cognitivo e a taxa de erro. Além disso, as bordas externas das telas de computadores (*screen edges*) e os cantos superiores/inferiores oferecem um valor de $W$ teoricamente infinito, pois a trava do cursor impede que o movimento ultrapasse a tela, eliminando a necessidade de ajuste fino.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximização da Bounding Box**: Aumentar a área interativa clicável (*hit target* ou *bounding box*) de botões, ícones e *links*, em vez de limitar a zona de clique apenas ao elemento vetorial ou textual.
*   **Aproveitamento das Bordas e Cantos**: Posicionar elementos de acesso crítico (como menus de contexto, barras de navegação ou botões de fechar) nas extremidades físicas da tela para criar alvos de dimensão infinita.
*   **Menu de Contexto de Proximidade**: Implementar menus flutuantes que surgem exatamente no ponto onde o cursor do usuário ou o ponto de toque está localizado (*pie menus* ou *contextual toolbars*), reduzindo a distância $D$ a zero.
*   **Diretrizes de Touch Target**: Respeitar as dimensões mínimas de acessibilidade para dispositivos móveis (geralmente $44 \times 44$ pixels ou $48 \times 48$ dps para *touchscreen*).

### Anti-padrões
*   **Alvos Minúsculos com Alto Impacto**: Botões primários de confirmação ou botões destrutivos (*danger actions*) apresentados com dimensões de pixels muito reduzidas, forçando extrema precisão motora.
*   **Zonas de Hit Desvinculadas**: Ícones acompanhados de texto descritivo onde apenas o ícone é interativo, deixando o texto como uma área morta.
*   **Disparidade de Proximidade em Fluxos Sequenciais**: Posicionar um botão de continuação (ex: "Avançar") no canto inferior direito e o botão da etapa seguinte no canto superior esquerdo, forçando o deslocamento contínuo do cursor por toda a extensão da tela.

---

# 4. Métricas e Impacto em Produto

*   **Task Completion Time (TCT)**: A otimização do $ID$ em alvos de alta frequência reduz diretamente o tempo médio que o usuário leva para concluir uma tarefa.
*   **Miss-click Rate (Taxa de Cliques Errôneos)**: Alvos adequados diminuem os acionamentos acidentais em elementos adjacentes.
*   **Throughput (Taxa de Transferência Motor-Visual)**: Medida padrão de desempenho em testes de usabilidade (expressa em bits por segundo) para avaliar a eficiência de dispositivos de entrada ou layouts de UI.
*   **Conversion Rate**: Em fluxos de checkout e *funnels*, alvos visíveis e fisicamente fáceis de interagir (*Call to Action* proeminentes) diminuem a fricção física, aumentando a probabilidade de conversão.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] – Aumenta a compreensão da tomada de decisão com base na quantidade de escolhas, complementando o esforço físico com o esforço mental.
*   [[CognitiveLoad]] – O impacto do processamento mental associado à precisão motora durante a execução de tarefas.
*   [[SteeringLaw]] – Uma extensão da Fitts's Law aplicável ao movimento de navegação através de trajetórias restringidas (como menus suspensos).

### Fontes
*   Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
*   Yablonski, Jon. *Laws of UX: Fitts’s Law*. Disponível em: https://lawsofux.com/en/fitts-law/
*   MacKenzie, I. S. (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.