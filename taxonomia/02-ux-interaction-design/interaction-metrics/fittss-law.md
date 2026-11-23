---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-metrics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law modela matematicamente o tempo de aquisição de alvos em interfaces de interação humana, estabelecendo que a duração do movimento é uma função logarítmica da distância até o alvo dividida pela sua largura."
tags:
  - "interaction-design"
  - "usability"
  - "hpm"
  - "ergonomics"
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
  academic_anchor_added: []
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[SteeringLaw]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzida historicamente como Lei de Fitts) é um modelo de desempenho psicomotor que prevê a quantidade de tempo necessária para mover um apontador até uma zona de destino específica. A lei postula que o tempo de aquisição de um alvo é uma função logarítmica da distância até o elemento combinada à dimensão física ou interativa do próprio alvo ao longo do eixo do movimento.

Matematicamente, na formulação refinada de Shannon-MacKenzie, expressa-se por:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- $MT$ (*Movement Time*): Tempo total gasto para completar o movimento de aquisição.
- $a$ e $b$: Constantes empíricas derivadas por regressão linear (intercepto e inclinação do dispositivo de entrada).
- $D$ (*Distance*): Distância do ponto inicial do cursor/dedo até o centro do alvo.
- $W$ (*Width*): Largura útil do alvo ao longo do eixo de movimento.
- O termo $\log_2 \left( \frac{D}{W} + 1 \right)$ é denominado *Index of Difficulty* ($ID$), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Proposta originalmente pelo psicólogo Paul Fitts em 1954 no contexto da ergonomia humana e teoria da informação, a lei assume que o sistema motor humano age como um canal de comunicação de capacidade limitada. A aquisição de um alvo envolve um ciclo de controle por *feedback* visual e motor dividido em duas fases distintas:

1. **Fase Balística Inicial:** Um movimento rápido e de grande amplitude que arremessa o membro ou cursor em direção à localização aproximada do alvo.
2. **Fase de Correção Fina:** Série de microajustes guiados por *feedback* visual constante à medida que o apontador se aproxima dos limites de $W$.

Em *Human-Computer Interaction* (HCI), o modelo aplica-se tanto a dispositivos físicos (mouse, *trackpad*, *stylus*) quanto a comandos diretos por *touchscreen*. Um aspecto marcante da geometria em ambientes de *desktop* é o "efeito borda infinita": os limites e cantos físicos da tela possuem largura teoricamente infinita ($W \to \infty$), uma vez que o cursor não pode ultrapassar o perímetro do display, reduzindo o *Index of Difficulty* drasticamente.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Maximização da Hitbox:** Ampliar a área interativa clicável (*padding* interno ou áreas de toque expandidas) sem necessariamente alterar o tamanho visual do elemento.
- **Minimização da Distância de Acesso:** Posicionar menus contextuais, botões de ação secundária e controles de formulário em extrema proximidade do ponto focal ou da posição atual do cursor (*pie menus*, menus de clique direito).
- **Aproveitamento das Bordas e Cantos:** Posicionar elementos cruciais de navegação ou controle no perímetro absoluto da tela para tirar proveito da limitação do display e criar alvos matematicamente "infinitos".
- **Dimensionamento Pré-definido para Dispositivos Móveis:** Garantir dimensões mínimas absolutas para áreas de toque (*touch targets*), tipicamente $48 \times 48\text{ dp}$ no Android ou $44 \times 44\text{ pt}$ no iOS.

### Anti-padrões
- **Micro-targets:** Utilizar links de texto minúsculos ou ícones de navegação reduzidos posicionados a grande distância da zona focal do usuário.
- **Hover Menus Estreitos:** Estruturar submenus suspensos que exigem um caminho de navegação do mouse extremamente preciso ao longo de eixos estreitos, aumentando o risco de encerramento acidental do menu por desvio motor.
- **Dispersão de Ações Principais:** Exigir que o usuário navegue longas distâncias na tela para confirmar ações iniciadas no centro de atenção (ex.: botão de confirmação posicionado no canto oposto do modal).

---

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** Reduções diretas no $ID$ dos elementos refletem-se na queda do tempo médio gasto por tarefa em fluxos operacionais críticos.
- **Throughput (TP):** Métrica de desempenho que avalia a eficiência de um dispositivo de entrada ou interface, expressa em *bits* por segundo:
  $$TP = \frac{ID}{MT}$$
- **Error Rate (Taxa de Erro):** Aumento exponencial em cliques ou toques acidentais (*misclicks*) quando o tamanho do alvo é inferior ao limiar ergonômico ideal do dispositivo.
- **Conversion Rate:** A ampliação e o reposicionamento estratégicos dos botões de *Call to Action* (CTA) correlacionam-se positivamente com o volume global de conversões devido à menor carga estresse-motora.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Relaciona o tempo de decisão à escolha cognitiva, complementando Fitts's Law que foca no tempo de execução motora.
- [[SteeringLaw]] — Extensão de Fitts's Law para trajetórias onde o cursor deve ser navegado dentro de um canal contínuo restringido.
- [[CognitiveLoad]] — A frustração motora derivada de alvos pequenos eleva indiretamente a carga cognitiva estressante.

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media, 2020.