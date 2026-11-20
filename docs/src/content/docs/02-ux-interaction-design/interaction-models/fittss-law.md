---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-models"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para alcançar um alvo motor é uma função matemática direta da distância até ele e do seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "hci"
aliases:
  - "Lei de Fitts"
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
    url: "https://lawsofux.com/fittss-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[DohertyThreshold]]"
  - "[[TeslersLaw]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo ergonômico e psicomotor que prevê a quantidade de tempo necessária para mover um apontador até uma área de destino específica. O princípio estabelece que o tempo de aquisição de um alvo é uma função logarítmica da proporção entre a distância até o alvo e a largura do próprio alvo. 

Em Human-Computer Interaction (HCI) e Interaction Design, a lei demonstra que alvos interativos maiores e posicionados mais próximos da localização atual do cursor (ou do polegar do usuário) são significativamente mais rápidos e precisos de serem acionados, minimizando o esforço físico e o tempo de execução da tarefa.

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954, a lei estende os princípios da Teoria da Informação de Claude Shannon para o controle motor humano. O modelo mensura a dificuldade de uma tarefa motora por meio do *Index of Difficulty* (ID), expresso formalmente na variação de Shannon proposta por I. Scott MacKenzie:

$$ID = \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
*   **$D$ (Distance):** A distância espacial do ponto de origem até o centro do alvo.
*   **$W$ (Width):** A largura do alvo medida ao longo do eixo de movimento.

O tempo total de movimento (*Movement Time* - MT) é calculado através da relação linear:

$$MT = a + b \cdot ID$$

Em que $a$ e $b$ são constantes empíricas derivadas do dispositivo de entrada (como *mouse*, *touchscreen* ou *trackball*) e do contexto fisiológico do usuário.

Sob a perspectiva da psicologia cognitiva e do processamento neuromuscular, a execução do movimento ocorre em duas fases sucessivas:
1.  **Fase Balística (*Initial Impulse Phase*):** Um movimento rápido e de alta amplitude disparado pelo sistema nervoso central em direção aproximada ao alvo.
2.  **Fase de Correção (*Current Control Phase*):** Ciclos contínuos de *visual feedback* e microajustes motores para centralizar o apontador na superfície do alvo. Alvos menores ou mais distantes exigem um número substancialmente maior de ciclos de correção visual-motora, sobrecarregando o controle psicomotor do indivíduo.

Um corolário crítico de Fitts's Law em interfaces gráficas de desktop é o efeito de borda (*Screen Edges*). Como os cantos e as extremidades da tela atuam como barreiras físicas para o cursor do *mouse*, o valor de $W$ torna-se matematicamente infinito nessa dimensão, reduzindo o *Index of Difficulty* praticamente a zero e tornando os cantos da tela locais de altíssima eficiência de aquisição.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design

*   **Dimensionamento de Touch Targets:** Definir dimensões mínimas apropriadas para áreas interativas baseadas no meio de entrada (ex.: no mínimo $48 \times 48 \text{ dp}$ em interfaces *touch* móveis para acomodar o diâmetro do polegar).
*   **Aproveitamento de Bordas e Cantos (Infinite Edges):** Alocar elementos cruciais ou de alta frequência de uso (como a barra de menus do macOS ou botões de controle de janela) exatamente na borda do *display* em arranjos de *desktop*.
*   **Proximidade Contextual de Elementos:** Implementar *popover menus*, menus radiais (*pie menus*) ou modais cujas ações primárias fiquem alinhadas diretamente ao ponto focal ou posição corrente do cursor.
*   **Bounding Boxes Expandidas:** Estender a área clicável (*target area*) de links ou botões para além da extensão estrita do texto ou do ícone, incorporando o espaçamento interno (*padding*) como área de acionamento válida.

### Anti-padrões de Interação

*   **Tiny Target Syndrome:** Disponibilizar botões de ação primários ou elementos de navegação críticos com superfícies de clique extremamente reduzidas (ex.: ícones interativos de $12 \times 12 \text{ px}$), forçando correções motoras exaustivas.
*   **Hover Traps em Menus Desdobráveis:** Criar submenus no formato *dropdown* em cascata que exigem que o cursor trafegue por caminhos estreitos e extensos, gerando alta taxa de desvio motor (*overshoot*) e fechamento acidental da interface.
*   **Destructive Neighbor Target:** Posicionar alvos de ações irreversíveis e destrutivas (ex.: "Excluir") contíguos a ações de confirmação padrão sem diferenciação adequada de tamanho, distância ou zonas de proteção (*margins*).

# 4. Métricas e Impacto em Produto

*   **Task Completion Time (TCT):** A otimização do *Index of Difficulty* diminui proporcionalmente o tempo bruto consumido no acionamento de componentes de interface em fluxos operacionais.
*   **Error Rate / Miss-click Rate:** A ampliação do tamanho efetivo de alvos e o aumento das distâncias entre elementos antagônicos reduzem diretamente a frequência de toques incorretos ou fora da *bounding box*.
*   **Throughput (TP):** Métrica padronizada pela norma ISO 9241-9 para avaliação da usabilidade de dispositivos de entrada e interfaces, calculada pela razão entre a dificuldade efetiva da tarefa e o tempo de movimento ($TP = \frac{ID_e}{MT}$).
*   **Conversion Rate (CVR):** O aumento das dimensões de botões de Call-to-Action (CTA) e a aproximação desses alvos em relação ao centro visual do usuário diminuem a fricção interativa no funil de conversão.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Modela o tempo de tomada de decisão cognitiva que antecede a execução motora regida por Fitts's Law.
*   [[CognitiveLoad]] — Descreve o custo de processamento mental ampliado pela necessidade de precisão motora excessiva.
*   [[DohertyThreshold]] — Trata da latência de resposta do sistema que complementa a velocidade de entrada psicomotora do usuário.
*   [[TeslersLaw]] — Define a conservação da complexidade que demanda compensações na camada visual e espacial da interface.

### Fontes Citadas
*   Fitts, Paul M. "The information capacity of the human motor system in controlling the amplitude of movement." *Journal of Experimental Psychology*, vol. 47, no. 6, 1954, pp. 381–391.
*   MacKenzie, I. Scott. "Fitts' law as a research and design model in human-computer interaction." *Human-Computer Interaction*, vol. 7, no. 1, 1992, pp. 91–139.
*   Yablonski, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.
