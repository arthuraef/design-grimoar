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
summary: "Modelo preditivo do movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "hci"
  - "ergonomia"
aliases:
  - "Fitts Law"
  - "Fitts' Law"
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
  - "[[LawOfProximity]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é uma lei ergonômica e modelo ergo-cognitivo formulado para prever o tempo necessário para que um operador mova um apontador visual ou físico até uma área de destino específica. Em sua formulação básica no campo de *Human-Computer Interaction*, a lei dita que a duração de uma ação de apontamento é proporcional à distância (*Distance*) até o objeto e inversamente proporcional à largura (*Width*) da superfície do alvo.

Matematicamente, a relação é expressa pelo modelo da Teoria da Informação:

$$MT = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde $MT$ representa o *Movement Time*, $a$ e $b$ são constantes empíricas derivadas do dispositivo de entrada (mouse, *touchscreen*, *trackpad*), $D$ é a distância ao alvo e $W$ representa a largura do alvo ao longo do eixo de movimento. O componente logarítmico $\log_2(2D/W)$ define o *Index of Difficulty* (ID), medido em *bits*.

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954, a teoria aplica princípios da Teoria da Informação ao controle psicomotor humano. O ato de alcançar um elemento de interface baseia-se em um ciclo de *feedback* visual-motor contínuo, composto por duas fases distintas:

1. **Movimento Balístico Inicial**: Um pulso motor rápido e impreciso que projeta o cursor na direção geral do alvo.
2. **Correção de Ajuste Fino**: Micro-ajustes guiados por *visual feedback* à medida que o ponteiro se aproxima dos limites do componente.

À medida que o *Index of Difficulty* aumenta — por meio de alvos menores ou maiores distâncias —, o cérebro exige mais ciclos de *feedback* para efetuar a correção sensorial, elevando o tempo total de resposta e a carga do sistema nervoso central. 

Em interfaces digitais para computadores desktop, os cantos e bordas da tela possuem dimensões efetivas infinitas ($W = \infty$), pois o cursor é fisicamente impedido de ultrapassar os limites do *display*. Esses locais — conhecidos tecnicamente como *magic pixels* ou *infinite edges* — reduzem o *Index of Difficulty* a quase zero, permitindo aquisições de alvo extremamente rápidas e de baixíssimo erro motor.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Maximização de Touch Targets**: Redimensionar botões e elementos clicáveis para áreas acessíveis. No contexto *mobile*, adotar dimensões físicas mínimas recomendadas (ex.: 48x48 dp/pt) para acomodar a variação de precisão dos dedos.
* **Otimização de Thumb Zone**: Em layouts móveis, posicionar os elementos interativos primários de alta frequência (ex.: *Floating Action Buttons*, *Bottom Navigation Bars*) dentro da zona de alcance natural do polegar.
* **Exploração de Bordas de Tela**: Fixar elementos críticos (como barras de menus e botões de ação global) nas extremidades absolutas do *viewport* em interfaces de desktop para aproveitar a propriedade de largura infinita.
* **Agrupamento Contextual de Controles**: Posicionar menús contextuais ou *popovers* de ação imediatamente adjacentes ao elemento de disparo ou à posição atual do cursor.

### Anti-padrões
* **Micro-Click Targets**: Desenhar botões ou links de texto com *padding* insuficiente, forçando o usuário a pausar para efetuar correções de alta precisão motora.
* **Dispersion of Related Actions**: Posicionar um botão de confirmação extremamente distante dos campos de entrada ou das seleções às quais ele se aplica, aumentando desnecessariamente a variável de distância ($D$).
* **Nested Menus de Alta Precisão**: Desenhar *dropdown menus* multinível com trilhas de *hover* estreitas, onde uma leve variação angular do cursor resulta no encerramento acidental da cascata de opções.

# 4. Métricas e Impacto em Produto

A aplicação criteriosa da Fitts's Law afeta diretamente os indicadores de desempenho operacional de uma interface:

* **Task Completion Time (TCT)**: A redução global da distância entre comandos frequentes e o aumento da área interativa reduzem diretamente a latência de execução de fluxos produtivos.
* **Error Rate / Mis-click Rate**: Superfícies de contato adequadas diminuem a ocorrência de cliques falsos ou acionamentos acidentais de comandos vizinhos.
* **Throughput (TP)**: Métrica padronizada pela norma ISO 9241-9 para avaliar a eficiência de dispositivos de entrada e layouts de UI, calculada pela relação entre o *Index of Difficulty* e o *Movement Time* ($TP = ID / MT$).
* **Taxas de Conversão em Checkout/Funis**: Reduzir a fricção motora em botões críticos (ex.: *Call to Action* de compra) resulta em taxas de abandono menores durante fases de decisão rápida.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Modela o tempo de tomada de decisão em função do número de escolhas, complementando o tempo de execução motora da Fitts's Law.
* [[LawOfProximity]] — Princípio da Gestalt que fundamenta o agrupamento espacial para reduzir a distância física de deslocamento do ponteiro.
* [[CognitiveLoad]] — A precisão motora exigida por alvos pequenos consome recursos cognitivos do usuário.

### Fontes
* FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
* MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
* YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media, 2020.