---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics-and-motor-behavior"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo de desempenho psicomotor e ergonômico que estabelece que o tempo necessário para selecionar um alvo é uma função logarítmica da distância até ele e do seu tamanho."
tags:
  - "fittss-law"
  - "interaction-design"
  - "usability"
  - "ergonomics"
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
  - title: "Laws of UX - Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[LawOfProximity]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo preditivo de desempenho psicomotor e ergonômico formulado por Paul Fitts em 1954. A lei estabelece que o *Movement Time* necessário para que um dispositivo de controle ou membro do corpo atinja uma área de destino é uma função logarítmica da relação entre a distância até o alvo (*Distance* ou *Amplitude*) e a dimensão espacial de sua área de captura (*Width*).

# 2. Fundamentação Teórica e Cognitiva

A expressão matemática clássica da lei, adaptada para o design de interações computacionais pela variação de Shannon-MacKenzie, é definida como:

$$MT = a + b \cdot \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
- $MT$ (*Movement Time*): Tempo total decorrido para concluir a trajetória física até o acionamento do alvo.
- $a$ e $b$: Parâmetros empíricos obtidos por regressão linear, representando o tempo de reação e a capacidade operacional do dispositivo de entrada (*pointing device*).
- $ID$ (*Index of Difficulty*): O termo $\log_2\left(\frac{D}{W} + 1\right)$, mensurado em *bits*, que quantifica a complexidade psicomotora da tarefa.

A mecânica cognitiva subjacente baseia-se no modelo de controle motor em malha fechada (*closed-loop motor control*). O deslocamento até o componente visual ocorre em duas fases principais: uma fase balística primária (*ballistic primary movement*), na qual o usuário realiza uma aproximação rápida em direção ao elemento, e uma fase de ajuste fino com micro-correções baseadas no *visual feedback loop*. Quanto menor a dimensão do alvo ($W$) em relação à amplitude do movimento ($D$), maior é a exigência de processamento de retroalimentação visual, resultando em retardo do tempo de execução.

Em telas e ambientes computacionais, o conceito estende-se ao *infinite target effect*: os cantos e bordas extremas do monitor delimitam um plano onde o ponteiro do cursor é bloqueado pelos limites físicos do display, atribuindo uma dimensão virtual infinita ($W = \infty$) a essas zonas de acionamento.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas
- **Dimensionamento Mínimo de *Touch Targets***: Em interfaces orientadas ao toque (*touch-based interfaces*), defina áreas de captura de no mínimo $48 \times 48\text{ dp}$ (ou $44 \times 44\text{ pt}$) para adequar o acionamento ao diâmetro médio da polpa digital e absorver imprecisões no *touch input*.
- **Exploração do *Infinite Target Effect***: Posicione ações globais e elementos primários de navegação nas bordas e cantos do display, garantindo que o movimento físico de arrasto do cursor atinja o alvo sem necessidade de desaceleração de precisão.
- **Expansão de *Hit Area* Sem Inflação de *Visual Design***: Aumente as margens internas do componente (*padding*) e o *bounding box* invisível do elemento interativo mantendo o ícone ou texto com dimensões visuais enxutas.
- **Minimização da Trajetória em Fluxos Críticos**: Agrupe controles contextuais relevantes (*contextual toolbars*, *radial menus*) próximos ao ponto focal de descanso do ponteiro ou do polegar do usuário para reduzir o parâmetro $D$ da equação.

### Anti-padrões
- **Click Targets Reduzidos**: Apresentar hiperlinks ou ícones com dimensões inferiores a $16 \times 16\text{ px}$ destituídos de margens estendidas de acionamento, exigindo micro-ajustes manuais e resultando em alta latência motora.
- **Proximidade de Ações Destrutivas**: Posicionar controles de descarte ou exclusão contíguos a botões de salvamento sem amortecimento espacial, induzindo o erro por variação de trajetória (*miss-click*).
- **Controles Recuados das Bordas**: Deslocar botões ou barras de navegação fixas a poucos pixels das extremidades da janela em aplicações web, anulando a propriedade de dimensão infinita que o limite físico da tela oferece.

# 4. Métricas e Impacto em Produto

A otimização estrutural orientada por Fitts's Law impacta de forma mensurável os seguintes indicadores de produto e engenharia de usabilidade:

- **Task Completion Time (TCT)**: A redução no *Index of Difficulty* das rotas operacionais diminui o tempo necessário para conclusão de fluxos transacionais e tarefas repetitivas em produtos empresariais.
- **Throughput (TP)**: Medida padrão de desempenho de entrada expressa em *bits/second* ($TP = \frac{ID}{MT}$), utilizada em benchmarks de usabilidade para avaliar a eficiência de dispositivos e componentes operacionais.
- **Input Error Rate**: O dimensionamento correto da *hit area* diminui diretamente a incidência de cliques acidentais fora do alvo (*miss-clicks*), otimizando a taxa de sucesso de conversão em elementos cruciais como *Call to Action* (CTA).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

- [[HicksLaw]]
- [[CognitiveLoad]]
- [[LawOfProximity]]

### Fontes
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391.
- MacKenzie, I. S. (1992). Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, 7(1), 91–139.
- Laws of UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.