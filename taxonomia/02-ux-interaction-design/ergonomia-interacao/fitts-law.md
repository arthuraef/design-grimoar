---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomia-interacao"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo do movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função matemática diretamente proporcional à distância do alvo e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "ergonomia"
  - "ux-design"
  - "fitts-law"
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
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um princípio fundamental da ergonomia e do *Interaction Design* que prevê o tempo necessário para mover um apontador até uma área de destino especificada. Formalmente, o princípio dita que o tempo de aquisição de um alvo (*Target Acquisition Time*) é uma função logarítmica da razão entre a distância até o alvo (*Distance*) e a largura desse alvo (*Target Size*).

A formulação matemática clássica, refinada por Scott MacKenzie para *Human-Computer Interaction* (HCI) através do modelo de Shannon, é expressa por:

$$MT = a + b \cdot \log_2\left(\frac{D}{W} + 1\right)$$

Onde:
- **$MT$** (*Movement Time*): Tempo total para executar o movimento.
- **$a$** e **$b$**: Constantes empíricas derivadas de regressão linear baseadas no dispositivo de entrada.
- **$D$** (*Distance*): Distância do ponto inicial até o centro do alvo.
- **$W$** (*Width*): Largura útil do alvo no eixo de movimento.
- **$\log_2\left(\frac{D}{W} + 1\right)$**: O *Index of Difficulty* (ID), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente por Paul Fitts em 1954, a lei fundamenta-se na teoria da informação aplicada ao sistema psicomotor humano. O movimento muscular voluntário para atingir um alvo consiste em uma série de correções de feedback visual em tempo real, dividindo-se em duas fases motoras distintas:

1. **Fase Balística Inicial (*Initial Ballistic Phase*):** Movimento rápido e de grande amplitude em direção à posição aproximada do alvo.
2. **Fase de Correção Fina (*Fine Control Phase*):** Microajustes visuo-motores contínuos baseados em *Visual Feedback* para alinhar o cursor ou o membro à área do alvo.

Conforme a dimensão ($W$) diminui ou a distância ($D$) aumenta, o *Index of Difficulty* eleva-se exponencialmente, demandando maior processamento no cérebro e reduzindo a velocidade do movimento. 

Em ambientes de interface gráfica (*Desktop*), cantos e bordas da tela possuem uma dimensão virtual infinitamente grande ($W = \infty$), pois o cursor é fisicamente impedido de ultrapassar a extremidade da tela. Isso reduz o *Index of Difficulty* para o limite mínimo, tornando esses locais áreas de engajamento motor instantâneo.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Redimensionamento Proporcional de *Hitbox*:** Aumentar a área clicável efetiva de botões e links vitais, estendendo o *padding* em vez do elemento gráfico visível.
- **Otimização da *Thumb Zone*:** Em *mobile interfaces*, posicionar ações críticas de alta frequência ao alcance natural do polegar, minimizando a distância $D$.
- **Aproveitamento das Bordas e Cantos:** Posicionar menus globais, botões de fechamento ou controles persistentes nas bordas extremas de telas em sistemas operacionais desktop.
- **Agrupamento Contextual de Controles:** Posicionar menus contextuais e popups o mais próximo possível do local atual do ponteiro do usuário (*Distance* tendendo a zero).

### Anti-padrões
- **Tiny Hitboxes:** Elementos interativos minúsculos sem tolerância de margem (ex: links de texto densos em dispositivos de toque) que aumentam substancialmente a taxa de erro.
- **Dispersão de Ações Conectadas:** Separar botões de confirmação (*Call to Action* ou CTA) dos campos de entrada de dados associados, forçando o deslocamento desnecessário do cursor.
- **Inversão de Relevância Motora:** Atribuir dimensões reduzidas a botões primários de conversão enquanto elementos secundários ou decorativos ocupam grande espaço de tela.

---

# 4. Métricas e Impacto em Produto

A aplicação criteriosa da Fitts's Law impacta diretamente indicadores operacionais de produto:

- **Task Completion Time (TCT):** Redução direta do tempo gasto em fluxos transacionais ao otimizar o *Index of Difficulty* dos componentes da jornada.
- **Error Rate / Misclick Rate:** Queda expressiva na taxa de cliques acidentais em elementos adjacentes quando a área de toque cumpre padrões mínimos ergonomicos (ex: 48x48 dp no Android, 44x44 pt no iOS).
- **Throughput (TP):** Aumento do volume de informação processada com sucesso pelo usuário por unidade de tempo, medido em *bits/s*.
- **Conversion Rate:** Elevação do desempenho de *Funnel Drop-off* pela eliminação de atrito físico em etapas decisivas do checkout ou formulários.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Define a relação entre o número de escolhas e o tempo de decisão inicial que antecede o movimento.
- [[CognitiveLoad]] — A frustração motora causada por falhas na aquisição do alvo incrementa a carga cognitiva do usuário.
- [[SteeringLaw]] — Extensão da Fitts's Law para movimentos restritos ao longo de trajetórias ou canais em interfaces.

### Fontes
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.