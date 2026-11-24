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
summary: "Fitts's Law postula que o tempo necessário para selecionar um alvo é uma função direta da distância até ele e inversamente proporcional às suas dimensões."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fittss-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul M. Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added:
    - "Paul M. Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[JakobsLaw]]"
---

# 1. Definição Canônica

Fitts's Law (traduzida originalmente como Lei de Fitts) é uma lei formal da psicofísica e do *Human-Computer Interaction* (Interação Humano-Computador ou HCI) que estabelece que o tempo necessário para mover um apontador até uma área de destino é determinado pela distância do ponto de origem até o centro da meta, dividida pela largura do alvo.

Formulada matematicamente pela variação de Shannon:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- **$MT$** (*Movement Time*): Tempo total gasto para completar o movimento de seleção.
- **$a$** e **$b$**: Constantes empíricas derivadas de regressão linear baseadas no dispositivo de entrada (*input device*).
- **$D$** (*Distance*): Distância do ponto de partida até o centro do alvo.
- **$W$** (*Width*): Dimensão efetiva do alvo ao longo do eixo de movimento.
- **$\log_2(2D/W)$**: Conhecido como *Index of Difficulty* (ID), mensurado em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Desenvolvida pelo psicólogo Paul Fitts em 1954 a partir da teoria da informação, a lei descreve o modelo de controle motor humano durante tarefas de alta precisão. O processo neuromuscular para atingir um alvo ocorre em duas fases iterativas:

1. **Fase de Movimento Primário (*Ballistic Phase*):** Um deslocamento rápido, de alta velocidade e baixa precisão em direção à meta visual.
2. **Fase de Ajuste Fino (*Correction Phase*):** Uma sequência de pequenas correções motoras guiadas por *visual feedback loop* à medida que o apontador se aproxima dos limites do alvo.

Em *Graphical User Interfaces* (GUI), a topologia da tela introduz uma propriedade física única: as bordas e cantos do monitor possuem largura virtual infinita ($W = \infty$). Como o cursor não pode ultrapassar o limite físico da tela, a necessidade de desaceleração e ajuste fino é eliminada, resultando em um tempo de aquisição drasticamente reduzido (*Index of Difficulty* próximo de zero).

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design:
- **Dimensionamento Proporcional de CTAs:** Elementos de alta prioridade ou ações primárias (*Call-to-Action*) devem possuir *hit targets* generosos para minimizar o tempo de reação motor.
- **Uso Estratégico de Bordas:** Fixar barras de ferramentas, botões de fechamento ou menus de contexto nas extremidades da tela amplia a área efetiva de clique sem ocupar espaço visual adicional.
- **Proximidade Contextual:** Posicionar componentes interativos dependentes diretamente adjacentes ao ponto de ação do usuário (ex.: *contextual menus* ativados pelo botão direito do mouse).
- **Bounding Boxes Estendidos:** Ampliar a área clicável de botões e ícones pequenos incluindo o *padding* circundante na zona interativa, mantendo a estética visual compacta.

### Anti-padrões:
- **Micro-targets:** Elementos interativos críticos com dimensões inferiores a $48 \times 48 \text{ dp}$ em interfaces *touchscreen*, gerando erros frequentes de acionamento.
- **Deslocamento Excessivo de Cursor:** Posicionar botões de confirmação de formulários em extremidades opostas aos campos de entrada de dados, exigindo percursos longos.
- **Alvos Flutuantes Desvinculados:** Menus suspensos (*dropdowns*) que fecham subitamente se o usuário se desviar de um caminho de pixel estreito (*hover tunnel*).

---

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** Redução mensurável no tempo necessário para concluir fluxos de trabalho críticos pela otimização do tamanho e posicionamento dos alvos.
- **Error Rate (Misclick Rate):** Diminuição na frequência de cliques acidentais fora do limite interativo ou em alvos adjacentes incorretos.
- **Throughput (TP):** Métrica padrão ISO 9241-9 que calcula a taxa de processamento de informação motora ($TP = ID / MT$), avaliando a eficiência combinada do dispositivo de entrada e da interface.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas:
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[JakobsLaw]]

### Fontes:
- **Fitts, P. M.** (1954). *The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement*. Journal of Experimental Psychology, 47(6), 381–391.
- **MacKenzie, I. S.** (1992). *Fitts' Law as a Research and Design Tool in Human-Computer Interaction*. Human-Computer Interaction, 7(1), 91–139.
- **Yablonski, J.** (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.