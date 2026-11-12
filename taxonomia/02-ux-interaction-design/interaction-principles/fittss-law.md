---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-principles"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e preditivo de movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "ui-design"
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

A **Fitts's Law** (traduzida para o português como Lei de Fitts) é um modelo ergonômico e preditivo de controle psicomotor que mensura a taxa de desempenho no movimento humano direcionado a um alvo. Aplicada ostensivamente ao *Interaction Design* e à *Human-Computer Interaction* (HCI), a lei estabelece que o tempo exigido para adquirir ou interagir com um elemento de interface (*Movement Time* - $MT$) é uma função logarítmica da razão entre a distância até o objeto (*Distance* ou *Amplitude* - $D$) e a largura ou dimensão física do alvo no eixo de deslocamento (*Width* - $W$).

Na formulação matemática revisada para a computação por Shannon e MacKenzie, o cálculo é estruturado como:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

O termo $\log_2 \left( \frac{D}{W} + 1 \right)$ define o *Index of Difficulty* ($ID$), mensurado em *bits*. As variáveis $a$ e $b$ representam parâmetros empíricos de regressão linear condicionados ao dispositivo de entrada de dados (*input devices*, tais como *mouse*, *touchscreen*, *stylus* ou *trackpad*).

---

# 2. Fundamentação Teórica e Cognitiva

Proposta originalmente pelo psicólogo Paul Fitts em 1954 no âmbito da psicologia experimental e ergonomia militar, a Fitts's Law foi construída com base nos postulados da *Information Theory* formulados por Claude Shannon. Fitts conceituou o sistema neuromotor e os membros superiores humanos como um canal analógico de transmissão de dados dotado de capacidade finita de processamento de informação, cuja métrica de eficiência é mensurada via *Throughput* ($TP$).

Sob a ótica da neurociência cognitiva e biomecânica, a aquisição de um *target* opera por meio de um modelo de controle de duas fases sequenciais:

1. **Fase Balística Inicial (Rapid Iterative Impulse Model):** Um disparo de alta velocidade e baixo controle guiado pelo plano motor pré-programado no córtex cerebral, projetando o ponteiro ou o membro na direção aproximada do destino.
2. **Fase de Correção Contínua (Visual Feedback Loop):** Uma sucessão de microajustes motores operados em ciclo fechado (*closed-loop control*), nos quais o sistema visual processa o erro de alinhamento restante e desacelera o movimento até garantir a sobreposição exata ao elemento.

Em ambientes computacionais baseados em *point-and-click*, a Fitts's Law manifesta uma característica topológica determinante: as extremidades e os cantos da *viewport* gráfica contam com dimensão virtual infinita ($W = \infty$). Como o ponteiro do sistema operacional não ultrapassa as coordenadas limítrofes do monitor, o *Index of Difficulty* para atingir essas bordas desce a níveis mínimos, suprimindo a necessidade da fase de correção fina.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Dimensionamento Proporcional de Touch Targets:** Garantir que áreas interativas em telas sensíveis ao toque mantenham uma área mínima acessível (como $44 \times 44$ pt no iOS Human Interface Guidelines ou $48 \times 48$ dp no Material Design), prevenindo falhas decorrentes do *finger fatiguing* e da imprecisão do toque.
* **Redução da Distância de Deslocamento:** Dispor elementos dependentes e sequenciais em extrema proximidade espacial, como o posicionamento de *contextual menus* que emergem exatamente nas coordenadas correntes do cursor do usuário.
* **Aproveitamento de Bordas e Cantos Infinitos:** Posicionar controles globais de alta frequência — tais como barras de navegação superior, botões de alternância e seletores cruciais — nas margens da *viewport* gráfica para alavancar a área de captura infinita.
* **Expansão da Hitbox Virtual:** Ampliar o espaçamento clicável (*padding* de interação) além dos limites visuais do vetor ou *text label*, aumentando a dimensão $W$ efetiva sem violar a hierarquia estética visual.

### Anti-padrões
* **Micro-Click Targets:** Links puramente textuais de pouca densidade de caracteres e botões reduzidos sem espaçamento interno em exibições de alta densidade de pixels (*high-DPI screens*), impondo um alto *Index of Difficulty*.
* **Disparidade de Trajeto (Distance Inflation):** Posicionar botões de confirmação de etapas no extremo oposto de campos de entrada em formulários extensos, exigindo deslocamentos longos repetitivos do ponteiro.
* **Gatilhos Destrutivos Adjacentes:** Posicionar ações irreversíveis (*e.g.*, "Excluir") em botões de pequena dimensão colados a ações de alta frequência de uso (*e.g.*, "Salvar"), facilitando erros de captura causados pela variabilidade motora.
* **Menus em Cascata Rígidos:** Desdobramentos de *dropdown menus* em múltiplos níveis que requerem a manutenção do cursor dentro de um canal vetorial estreito e linear, provocando interrupções frequentes de navegação por desalinhamento motor.

---

# 4. Métricas e Impacto em Produto

* **Task Completion Time (TCT):** A otimização sistemática da taxa $D/W$ nos fluxos operacionais acelera o tempo global gasto por usuários na conclusão de tarefas interativas na *user interface*.
* **Error Rate e Misclick Rate:** A expansão das áreas de clique e a aproximação de alvos diminuem drasticamente a ocorrência de cliques acidentais e acionamentos inválidos por desvio motor.
* **Throughput (TP):** Métrica padronizada pela norma ISO 9241-9 para quantificar a usabilidade de dispositivos de entrada e componentes visuais, calculada pela razão entre o *Index of Difficulty* ($ID$) e o *Movement Time* ($MT$).
* **Conversion Rate (CR):** O dimensionamento generoso e o alinhamento espacial estratégico de botões de ação principal (*Call-to-Action* - CTA) reduzem a fricção física no funil de conversão, aumentando as taxas de sucesso comercial.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Define a latência na seleção de escolhas no nível de tomada de decisão mental, antecedendo a fase de execução motora descrita pela Fitts's Law.
* [[CognitiveLoad]] — Examina a sobrecarga do sistema de processamento cognitivo ao tentar localizar visualmente alvos reduzidos ou distantes na interface.
* [[DohertyThreshold]] — Analisa os limites de tempo de resposta do sistema quando combinados ao tempo de reação e deslocamento psicomotor do usuário.

### Fontes
* **FITTS, Paul M.** *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, v. 47, n. 6, p. 381-391, 1954.
* **MACKENZIE, I. Scott.** *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, v. 7, n. 1, p. 91-139, 1992.
* **YABLONSKI, Jon.** *Laws of UX: Using Psychology to Design Better Products and Services*. Sebastopol: O'Reilly Media, 2020. Disponível em: <https://lawsofux.com/en/fitts-law/>.