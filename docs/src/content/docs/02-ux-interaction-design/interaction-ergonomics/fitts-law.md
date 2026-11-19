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
summary: "Fitts's Law é um modelo preditivo de controle motor humano que estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função logarítmica da distância até o alvo e do tamanho da sua superfície de ativação."
tags:
  - "fitts-law"
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "motor-control"
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
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzida formalmente para o português como *Lei de Fitts*) é um modelo empírico de controle psicomotor que prevê o tempo necessário para alcançar e selecionar um elemento visual em uma interface gráfica. Formalizada por Paul Fitts em 1954, a lei estabelece que o *Movement Time* (MT) para atingir um *target* é diretamente proporcional à distância (*Distance*, $D$) percorrida pelo apontador ou pelo membro do usuário e inversamente proporcional ao tamanho (*Width*, $W$) da área do elemento alvo.

Matematicamente, a formulação mais aceita na comunidade de *Human-Computer Interaction* (HCI), refinada por Scott MacKenzie utilizando a aproximação de Shannon, é expressa como:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- **$MT$** (*Movement Time*): tempo total necessário para completar o movimento de seleção.
- **$a$** e **$b$**: constantes empíricas obtidas por regressão linear que representam o tempo de reação inicial do sistema neuro-motor e a velocidade de condução do dispositivo de entrada, respectivamente.
- **$D$** (*Distance*): distância entre a posição inicial do cursor/dedo e o centro geométrico do alvo.
- **$W$** (*Width*): dimensão da zona de clique ou toque medida ao longo do eixo do movimento.
- **$\log_2 \left( \frac{D}{W} + 1 \right)$**: o índice de dificuldade (*Index of Difficulty*, $ID$), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Fitts's Law fundamenta-se nos princípios da Teoria da Informação de Claude Shannon, aplicando a medição de capacidade de canal ao sistema psicomotor humano. Quando um indivíduo realiza um movimento rápido com alvo direcionado (*rapid aimed movement*), o sistema nervoso executa correções em tempo real através de um *feedback loop* visuomotor contínuo.

O processo psicomotor divide-se em duas fases estruturais:
1. **Fase Balística Inicial (*Initial Ballistic Phase*)**: o cérebro projeta um movimento acelerado de alta velocidade cobrindo a maior parte do percurso até a vizinhança do alvo.
2. **Fase de Correção Fina (*Current Control Phase*)**: pequenos micro-ajustes proprioceptivos e visuais reduzem o erro posicional à medida que o cursor se aproxima da borda do componente.

### Índice de Dificuldade e Desempenho
O termo logarítmico na equação define o *Index of Difficulty* ($ID$). Devido à natureza logarítmica da percepção e do controle motor:
- Aumentar o tamanho de um alvo que já é grande produz ganhos marginais irrelevantes no tempo de aquisição.
- Reduzir o tamanho de elementos minúsculos inflaciona desproporcionalmente o tempo de seleção e a taxa de erro.

O *Throughput* ($TP$), medido em *bits/second*, reflete a eficiência do dispositivo e do usuário ao combinar velocidade e precisão:

$$TP = \frac{ID_{e}}{MT}$$

### Alvos Infinitos nas Bordas e Cantos
Em interfaces desktop operadas por *pointers* (como mouses e *trackpads*), os cantos e bordas da tela possuem uma dimensão espacial virtualmente infinita ($W \to \infty$). Como o cursor é fisicamente impedido de ultrapassar a extremidade do display, a distância exigida para desaceleração atinge um limite mecânico, tornando os cantos do monitor as regiões de mais rápida e precisa aquisição de toda a interface.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Dimensionamento Adequado de *Touch Targets***: Garanta dimensões mínimas absolutas para interações ao toque (mínimo recomendado de 48×48 dp/pt para sistemas operacionais móbiles e 24×24 px para dispositivos desktop com suporte a cursor de alta precisão).
- **Proximidade Contextual**: Reduza a distância $D$ agrupando controles acionáveis perto do foco de atenção atual do usuário. Exemplos incluem *context menus* acionados por clique direito e *pie menus* radiais centrados sob a posição atual do cursor.
- **Exploração Estratégica de Bordas e Cantos**: Aloque elementos críticos e frequentes (como barras de navegação, botões de fechamento e menus globais) nas extremidades da tela para capitalizar a propriedade de $W \to \infty$.
- **Expansão Dinâmica da *Hitbox***: Separe a representação visual do componente do seu *bounding box* de interatividade, expandindo a área reativa invisível (*padding*) para facilitar a captura do evento de clique.

### Anti-padrões
- **Alvos Minúsculos em Densidade Alta (*Micro-targets*)**: Apresentar ícones sem rótulos e com dimensões inferiores a 16 px dispostos com pequeno espaçamento entre si, exigindo alta precisão de ajuste fino do usuário.
- **Dispersão Extrema em Displays *Ultrawide***: Posicionar o botão primário de confirmação (*Primary CTA*) de um formulário no canto inferior direito e o campo de entrada principal no canto superior esquerdo em telas largas, forçando uma distância $D$ exagerada.
- **Destruição Próxima a Ações Primárias**: Posicionar o botão "Excluir" colado ao botão "Salvar" com áreas de toque reduzidas, ocasionando o fenômeno de *mislip* devido à sobreposição da margem de erro motora.

---

# 4. Métricas e Impacto em Produto

A implementação rigorosa de Fitts's Law impacta de forma direta a eficiência operacional e a ergonomia cognitiva de produtos digitais, refletindo-se nas seguintes métricas de *product analytics* e usabilidade:

| Métrica | Mecanismo de Impacto |
| :--- | :--- |
| **Task Completion Time (TCT)** | A otimização de $D$ e $W$ reduz o *Movement Time* acumulado em fluxos transacionais repetitivos, acelerando a conclusão de tarefas. |
| **Error Rate / Mislip Rate** | *Touch targets* com $ID$ equilibrado diminuem substancialmente toques acidentais e cliques fora do alvo ideal. |
| **Throughput (TP)** | Avaliação quantitativa da usabilidade de novos dispositivos de entrada ou componentes de *design systems* em testes de laboratório. |
| **Conversion Rate (CTA)** | Ampliar a visibilidade e o $W$ efetivo do botão principal em funis de checkout reduz o atrito psicomotor no momento da conversão. |

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Modela o tempo de tomada de decisão prévio à execução do movimento motor.
- [[CognitiveLoad]] — Descreve a carga de processamento mental que interfere na precisão da fase de correção fina.
- [[DohertyThreshold]] — Garante que a resposta da interface ao término do movimento de seleção ocorra em menos de 400ms.

### Fontes Acadêmicas e de Indústria
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.
- ISO 9241-9:2000. *Ergonomic requirements for office work with visual display terminals (VDTs) — Part 9: Requirements for non-keyboard input devices*.