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
summary: "Modelo ergonômico e psicomotor que estabelece que o tempo necessário para atingir um alvo é uma função logarítmica da relação entre a distância até o alvo e a sua dimensão."
tags:
  - "fitts-law"
  - "interaction-design"
  - "usability"
  - "ergonomics"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
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
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo de desempenho humano e controle motor formulado em 1954 por Paul Fitts. O princípio estabelece que o tempo necessário para mover rapidamente um apontador até uma área de destino é uma função logarítmica da relação entre a distância até o alvo e a largura desse mesmo alvo. No âmbito do Human-Computer Interaction (HCI) e do Interaction Design, este modelo matemático é utilizado para otimizar layouts de interface gráfica, reduzindo a latência de execução motora e o esforço físico durante a seleção de elementos interativos.

# 2. Fundamentação Teórica e Cognitiva

A formulação matemática clássica de Fitts's Law expressa o Movement Time (MT) por meio de uma equação linear:

$$MT = a + b \cdot ID$$

Onde $ID$ representa o Index of Difficulty (Índice de Dificuldade), frequentemente quantificado pela variação de Shannon (introduzida por Scott MacKenzie no contexto de HCI):

$$ID = \log_2 \left( \frac{D}{W} + 1 \right)$$

- **$D$ (Distance):** A distância escalar a ser percorrida do ponto de origem ao centro do alvo.
- **$W$ (Width):** A largura ou dimensão do alvo ao longo do eixo principal de movimento.
- **$a$ e $b$:** Constantes empíricas derivadas do dispositivo de entrada (mouse, touchscreen, trackpad) e dos fatores neuro-motores do usuário.

Sob a ótica do processamento de informação humana e da Teoria da Informação de Shannon-Hartley, o sistema neuromotor atua como um canal de comunicação com taxa finita de transmissão de dados (Throughput). A precisão do movimento motor fino envolve sucessivos ciclos de realimentação visual (closed-loop visual feedback), nos quais correções balísticas são executadas até que o dispositivo apontador convirja com a região limítrofe do componente. Alvos menores ou localizados em distâncias maiores exigem mais ciclos de ajuste corretivo pelo sistema nervoso central, incrementando o tempo total de resposta.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design Otimizado
- **Aproveitamento de Bordas Físicas (Magic Corners / Infinite Targets):** Elementos posicionados nos limites extremos do display (cantos e bordas da tela) possuem largura teórica infinita no plano cartesiano do cursor, eliminando a possibilidade de overshoot e reduzindo o tempo de aquisição ao mínimo teórico.
- **Proximidade Contextual (Pipelining):** Posicionar menus de contexto, popovers e botões de ação secundária imediata próximos às coordenadas atuais do cursor ou ponto de foco do usuário, minimizando a variável $D$.
- **Expansão de Target Area (Hit Target Expansion):** Aumentar a área interativa invisível (bounding box) de ícones e componentes pequenos sem alterar suas proporções visuais, elevando o parâmetro $W$ sem comprometer o equilíbrio estético.
- **Conformidade de Touch Targets:** Em interfaces móveis, adotar dimensões mínimas de contato físico recomendadas pelos guias de estilo (ex: $48 \times 48\text{ dp}$ no Material Design ou $44 \times 44\text{ pt}$ nas iOS Human Interface Guidelines).

### Anti-padrões Frequentes
- **Micro-targets Concentrados:** Agrupamentos de botões ou links diminutos sem espaçamento suficiente (padding/margin), elevando o Index of Difficulty e provocando erros de acionamento (misclicks).
- **Submenus em Cascata Extensos (Cascading Menus):** Menus suspensos que exigem do usuário movimentação do cursor em trajetórias estreitas e retilíneas ao longo de múltiplos níveis hierárquicos, maximizando o tempo de execução e a probabilidade de desvio motor.
- **Adjacência de Ações Destrutivas:** Posicionar botões de ação irreversível (ex: "Excluir") ao lado de botões de uso primário (ex: "Salvar") sem zonas de amortecimento espacial, aumentando a gravidade dos erros operacionais decorrentes da imprecisão motora.

# 4. Métricas e Impacto em Produto

- **Throughput (TP):** Quantificado em bits por segundo (\text{bits/s}), mede a capacidade de processamento motor combinando o Index of Difficulty ($ID$) e o Movement Time ($MT$). É a métrica padrão segundo a norma ISO 9241-9 para benchmark de dispositivos e interfaces.
- **Task Completion Time (TCT):** A otimização direta das variáveis de Fitts's Law reduz a latência acumulada de navegação em fluxos críticos, impactando de forma mensurável o tempo total de conclusão da tarefa.
- **Error Rate (Taxa de Erro de Clique/Toque):** Percentual de disparos executados fora da área do alvo pretendido. Taxas elevadas sinalizam uma dimensão $W$ subdimensionada em relação à precisão do dispositivo de entrada.
- **Fitts's Index Score:** Análise comparativa entre variações de layout em testes A/B para mensurar a eficiência motora relativa demandada por diferentes arquiteturas de navegação.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[DohertyThreshold]]

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381–391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91–139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. Sebastopol: O'Reilly Media, 2020.
- LAWS OF UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.
