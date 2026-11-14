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
summary: "Modelo preditivo do controle motor humano que estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função logarítmica da distância até o alvo e da sua largura."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "hci"
aliases:
  - "Fitts Law"
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, Paul M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. Scott (1992) - Fitts' law as a research and design tool in human-computer interaction"
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

Fitts's Law (comumente traduzida para fins contextuais como **Lei de Fitts**) é um modelo ergonômico e psicofísico fundamental para a Human-Computer Interaction (HCI). O princípio dita que o tempo requerido para uma pessoa mover um atuador (como um ponteiro de mouse, dedo ou caneta stylus) até uma superfície de destino alvo é diretamente proporcional à distância linear até esse elemento e inversamente proporcional à dimensão física do próprio alvo ao longo do eixo de movimento.

Matematicamente, a formulação mais aceita no campo de HCI é a variação de Shannon proposta por I. Scott MacKenzie:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- $MT$ representa o *Movement Time* (Tempo de Movimento).
- $a$ e $b$ são constantes empíricas derivadas por regressão linear baseada no dispositivo de entrada e no usuário.
- $D$ é a distância (*Distance*) ao centro do alvo.
- $W$ é a largura (*Width*) do alvo medida ao longo do eixo de deslocamento.
- A expressão $\log_2 \left( \frac{D}{W} + 1 \right)$ quantifica o *Index of Difficulty* ($ID$), medido em *bits*.

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto da psicologia experimental e controle motor humano, a lei fundamenta-se na Teoria da Informação de Claude Shannon. Fitts demonstrou que a capacidade do sistema neuromuscular humano de processar ações motoras contínuas pode ser mensurada utilizando a métrica binária de transmissão de informação (*bits*).

A execução motora descrita pela lei ocorre por meio de um ciclo iterativo de controle de *feedback* visual-motor:
1. **Fase de Impulso Primário (*Ballistic Phase*):** Um movimento rápido e inicial de grande amplitude direcionado à vizinhança da meta, controlado por mecanismos motores centrais sem correção em tempo real.
2. **Fase de Ajuste Fino (*Sub-movements / Feedback Phase*):** Uma série de microcorreções visuo-motoras de desaceleração e alinhamento preciso à medida que o atuador se aproxima das bordas delimitadoras do alvo.

Alvos menores ou mais distantes exigem um número elevado de iterações na fase de ajuste fino, o que incrementa exponencialmente a carga cognitiva de controle motor e o tempo total de execução. 

No contexto de Graphical User Interfaces (GUI), as bordas e cantos da tela possuem uma largura teórica infinita ($W \to \infty$), uma vez que o cursor do mouse é bloqueado pelo limite físico da janela ou monitor. Consequentemente, o $ID$ para elementos ancorados nesses vértices físicos tende a zero, tornando a aquisição motora nesses locais extremamente ágil e imune a desvios de precisão.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas de Design
- **Dimensionamento Proporcional de *Touch Targets*:** Aumentar a área interativa (*padding* e superfície clicável) de componentes críticos, especialmente em interfaces sensíveis ao toque onde a precisão do polegar ou indicador é anatomicamente inferior à de um cursor de mouse.
- **Minimização de Trajetória (*Distance Reduction*):** Posicionar menus de contexto (*context menus*), *popovers* e interfaces flutuantes na vizinhança imediata do ponto focal atual do cursor ou foco de atenção visual do usuário.
- **Exploração dos Limites Físicos (*Screen Edges*):** Fixar barras de navegação, botões primários de ação ou acionadores globais nas extremidades superiores, inferiores ou cantos das telas em sistemas desktop, maximizando o valor efetivo de $W$.
- **Agrupamento Funcional Próximo:** Posicionar botões de controle de formulário e ações secundárias a distâncias reduzidas em relação aos campos de entrada correspondentes, minimizando a distância $D$ de navegação motora.

## Anti-padrões
- **Superfícies de Clique Infinitesimais (*Tiny Target Syndrome*):** Ícones funcionais ou links de texto sem preenchimento computável adequado, que forçam o usuário a despender um tempo excessivo de ajuste fino para interceptar a área ativa.
- **Submenus Cascata com Trajetórias Sensíveis (*Waterfall Menus*):** Submenus em *hover state* que exigem que o usuário mova o ponteiro por um corredor reto e estreito sem desviar o cursor; qualquer desvio angular faz com que o alvo desapareça devido à perda de foco motor.
- **Dispersão Extrema de Ações Conectadas:** Posicionar uma ação de confirmação primária no canto inferior direito da tela enquanto os dados de validação estão no canto superior esquerdo em monitores widescreen, elevando o valor de $D$ sem justificativa ergonômica.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** A aplicação estrita de Fitts's Law diminui o tempo acumulado de execução de tarefas interativas, impactando diretamente a produtividade em softwares de alta frequência de uso (*enterprise/B2B applications*).
- **Misclick / Error Rate:** O aumento do *Index of Difficulty* correlaciona-se diretamente com o aumento de acionamentos acidentais em elementos adjacentes. Alvos dimensionados adequadamente reduzem a taxa de cliques errôneos.
- **Throughput (TP):** Métrica fundamental em testes de usabilidade de dispositivos de entrada, calculada dividindo o $ID$ pelo tempo médio de movimento ($TP = ID / MT$), medindo a eficiência de interatividade do hardware/software combinado.
- **Conversion Rate em CTAs Primários:** Botões de ação principal (*Call to Action*) com dimensões ergonômicas ampliadas e posicionados dentro de zonas motoras de baixo esforço apresentam taxas de interatividade sensivelmente superiores.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

## Referências Cruzadas
- [[HicksLaw]] — Define como a quantidade de opções afeta o tempo de tomada de decisão prévio à execução motora.
- [[CognitiveLoad]] — Modulada pelo esforço adicional de precisão exigido por *touch targets* inadequados.
- [[DohertyThreshold]] — A redução do tempo de movimento via Fitts's Law contribui para manter a interação abaixo do limite de resposta de 400ms.

## Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-computer interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.
- LAWS OF UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.