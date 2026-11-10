---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "human-computer-interaction"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de ergonomia e interação humano-computador que determina que o tempo para selecionar um alvo é função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "ergonomia"
  - "hci"
  - "interaction-design"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design tool in human-computer interaction"
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

A **Fitts's Law** (Lei de Fitts) é uma equação empírica e psicofísica que quantifica o tempo necessário para mover um apontador até um alvo delimitado. No âmbito do *interaction design* e *human-computer interaction* (HCI), o modelo estabelece que a velocidade e a precisão com que um usuário interage com um elemento gráfico dependem diretamente da distância até a meta e inversamente do tamanho físico desse elemento no eixo do movimento.

Matematicamente, a reformulação canônica proposta por Shannon-MacKenzie define o cálculo como:

$$MT = a + b \cdot \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
* **$MT$** (*Movement Time*): Tempo total exigido para completar a trajetória do movimento motor.
* **$a$ e $b$**: Constantes empíricas determinadas via regressão linear, associadas ao dispositivo de entrada (como *mouse*, *trackpad* ou *touchscreen*) e ao ambiente fisiológico.
* **$D$** (*Distance*): Distância vetorial calculada entre a posição inicial do cursor/membro e o centro do alvo.
* **$W$** (*Width*): Dimensão do alvo medida ao longo do eixo em que o movimento ocorre.
* **$\log_2\left(\frac{D}{W} + 1\right)$**: Denominado *Index of Difficulty* ($ID$), medido em *bits*, representando a complexidade informacional do movimento exigido.

---

# 2. Fundamentação Teórica e Cognitiva

Originalmente concebida em 1954 pelo psicólogo Paul Fitts no contexto da psicologia experimental e ergonomia industrial, a teoria foi incorporada ao design de *software* por Stuart Card, Thomas P. Moran e Allen Newell na década de 1970.

A base conceitual apoia-se na teoria da informação de Claude Shannon. O sistema neuromotor humano opera sob limites de largura de banda perceptual e motora. Ao executar o deslocamento muscular rumo a um *target*, o cérebro realiza uma série de ciclos de feedback contínuos, conhecidos como *closed-loop motor control*.

Conforme a dimensão $W$ diminui ou a distância $D$ se amplia, aumenta a probabilidade de erros de *overshoot* (ultrapassar o alvo) ou *undershoot* (parar antes do alvo). Consequentemente, o sistema cognitivo necessita de microajustes sucessivos de precisão motora fina, elevando o tempo de processamento.

Uma implicação fundamental em *Graphical User Interfaces* (GUIs) é o conceito de **bordas infinitas**. Elementos localizados nos limites extremos da tela do dispositivo possuem largura efetiva $W = \infty$, uma vez que o cursor do *mouse* é impedido fisicamente de ultrapassar a resolução do monitor. Essa limitação física reduz o *Index of Difficulty* a um patamar mínimo independentemente de $D$.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Dimensionamento Adequado de *Touch Targets***: Para interfaces sensíveis ao toque, a área clicável deve respeitar um patamar mínimo (ex.: $48 \times 48\text{ dp}$ no *Material Design* e $44 \times 44\text{ pt}$ na *Human Interface Guidelines*), garantindo a mitigação de erros motores.
* **Proximidade Contextual**: Minimizar o valor de $D$ posicionando elementos de ação imediata perto do ponto focal do usuário, como menus contextuais situados adjacentes ao cursor ou seleção atual.
* **Aproveitamento de Bordas e Cantos**: Posicionar ações de alta frequência em extremidades do *viewport* para converter os limites físicos do *hardware* em barreiras mecânicas de retenção do cursor.
* **Expansão Visualmente Oculta da Área Clicável**: Ampliar a zona de interatividade (*hit target*) através de *padding* transparente sem alterar a escala dos elementos visuais internos.

### Anti-padrões de Design
* **Alvos Adjacentes de Risco Elevado**: Dispor botões de ação destrutiva (como "Excluir") excessivamente próximos a controles de ação primária (como "Salvar") com dimensões reduzidas, provocando acionamentos acidentais decorrentes de *overshoot*.
* **Caminhos de Navegação Estreitos em Menus Suspensos**: Exigir a movimentação contínua do cursor por faixas reduzidas em *flyout menus*, combinando alta distância $D$ e reduzida tolerância a desvios (violando a *Steering Law*).
* **Posicionamento de CTAs em Áreas de Difícil Alcance no *Mobile***: Alocar botões de ação principal na região superior da tela em dispositivos móveis, estendendo a amplitude de movimento do polegar além da zona confortável (*thumb zone*).

---

# 4. Métricas e Impacto em Produto

O alinhamento de interfaces à Fitts's Law gera impactos diretos e mensuráveis em produtos digitais:

* **Task Completion Time (TCT)**: A otimização do *Index of Difficulty* reduz o tempo gasto na conclusão de tarefas essenciais em fluxos operacionais de alta frequência.
* **Error Rate**: A ampliação da área efetiva de acionamento reduz diretamente o número de *missclicks* e acionamentos indesejados.
* **Throughput (TP)**: Métrica padronizada pela norma ISO 9241-9, que quantifica o desempenho do conjunto usuário-dispositivo em *bits/second*, permitindo benchmark preciso de ergonomia de interface.
* **Conversion Rate (CR)**: Botões de *Call to Action* (CTA) otimizados em tamanho e proximidade do fluxo natural de leitura/ação maximizam as taxas de conclusão de etapas de *checkout* ou cadastro.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Analisa o tempo de decisão que antecede o início da resposta motora descrita pela Fitts's Law.
* [[CognitiveLoad]] — Examina a carga mental exigida para a identificação do elemento visual antes da execução do movimento físico.
* [[SteeringLaw]] — Descreve a extensão da Fitts's Law para trajetórias nas quais o movimento motor é contido por um canal ou túnel delimitado.

### Fontes Primárias e Acadêmicas
* **Fitts, P. M.** (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
* **MacKenzie, I. S.** (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
* **Card, S. K., Moran, T. P., & Newell, A.** (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum Associates.
* **Yablonski, J.** (2020). *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media.
