---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomia-e-usabilidade"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para alcançar um alvo visual é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "I. Scott MacKenzie (1992) - Fitts' law as a research and design model in human-computer interaction"
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
  - "[[LawOfProximity]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo formal de desempenho psicomotor que estabelece que o tempo necessário para mover rapidamente um apontador até uma área de destino é uma função da distância até o alvo e da largura desse mesmo alvo. Formulado originalmente no campo da psicologia experimental e posteriormente adaptado para a interação humano-computador (HCI), o princípio prevê que alvos menores e espacialmente distantes exigem um tempo de aquisição significativamente maior e impõem maior esforço de precisão motora.

Matematicamente, utilizando a variação de Shannon proposta por I. Scott MacKenzie, o `Index of Difficulty` (ID) de uma tarefa motora é expresso por:

$$ID = \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde $D$ representa a distância (*distance*) percorrida pelo atuador até o centro do alvo e $W$ representa a largura (*width*) do alvo medida ao longo do eixo do movimento. O tempo de movimento (*Movement Time* - MT) é expresso de forma linear como $MT = a + b \cdot ID$, onde $a$ e $b$ são constantes empíricas derivadas do dispositivo de entrada.

# 2. Fundamentação Teórica e Cognitiva

Desenvolvida em 1954 pelo psicólogo Paul Fitts, a lei apoia-se na aplicação da Teoria da Informação ao sistema neuromuscular humano. O ato de apontar para um elemento visual em um `user interface` envolve um modelo de controle motor em dois estágios principais:

1. **Movimento Balístico Inicial:** Uma ação motora primária de alta velocidade que desloca o cursor ou o membro corporal na direção aproximada do alvo.
2. **Controle de Feedback Visuomotor:** Uma sucessão de microcorreções contínuas baseadas no processamento sensorial visual para ajustar a posição final dentro das fronteiras operacionais da `touch target` ou `click area`.

Conforme o `target size` diminui ou a `distance` aumenta, o número de iterações no loop de feedback visual cresce exponencialmente, elevando a carga perceptivo-motora. Em interfaces gráficas com cursor desktop, as bordas físicas do display atuam como alvos de dimensão infinitamente ampla ($W = \infty$), pois o movimento do cursor é fisicamente contido pelas margens da tela. Isso resulta em um `Index of Difficulty` extremamente reduzido para elementos posicionados nos cantos ou limites periféricos da tela.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Expansão do Target Size:** Maximizar a área clicável ou tocável (`bounding box`) de elementos interativos sem necessariamente expandir seus elementos visuais visíveis, garantindo dimensões mínimas adequadas a diferentes dispositivos (como $48 \times 48 \text{ dp}$ em telas de toque).
* **Minimização da Distância de Trajetória:** Posicionar botões de ação primária e controles de confirmação sequenciais em estreita proximidade física para reduzir o deslocamento necessário do cursor ou polegar.
* **Aproveitamento das Bordas e Cantos da Tela:** Posicionar controles globais e frequentes (como menus de barra, navegação principal ou ações de fechamento) nos cantos e bordas da interface em ambientes desktop, criando alvos virtualmente infinitos.
* **Menus Contextuais In-place:** Utilizar menus disparados no ponto exato onde o cursor ou o foco do usuário está localizado (como `contextual menus` acionados via botão direito ou toque longo), reduzindo $D$ a zero.

### Anti-padrões
* **Alvos Subdimensionados:** Disponibilizar botões essenciais ou ícones de ação rápida com áreas de toque reduzidas (ex.: $8 \times 8 \text{ px}$), forçando o usuário a executar múltiplos ajustes motores de precisão.
* **Dispersão Espacial Sequencial:** Dispor passos consecutivos de um fluxo operacional em extremidades opostas da tela, aumentando desnecessariamente o tempo total de movimento.
* **Zonas Mortas em Flyout Menus:** Criar lacunas não clicáveis entre submenus suspensos (`dropdown menus`), fazendo com que pequenos desvios de curso cancelem a seleção do usuário e exijam o reinício da trajetória.

# 4. Métricas e Impacto em Produto

* **Task Completion Time (TCT):** A otimização baseada em Fitts's Law reduz de forma quantificável o tempo total necessário para a conclusão de tarefas interativas.
* **Error Rate / Misclick Rate:** A adequação das dimensões dos alvos reduz a frequência de acionamentos acidentais em elementos indesejados ou áreas neutras.
* **Throughput (TP):** Métrica padrão de desempenho neuromuscular que mensura a taxa de transferência de informação do sistema motor humano por unidade de tempo, expressa em bits por segundo (bps) e calculada como a razão entre o `Index of Difficulty` (ID) e o `Movement Time` (MT).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Define o impacto da quantidade de opções sobre o tempo de decisão cognitiva, complementando a medição do tempo motor estimada por Fitts's Law.
* [[CognitiveLoad]] — O esforço de ajuste fino em alvos motores de alta precisão consome recursos no processamento cognitivo.
* [[LawOfProximity]] — O agrupamento visual e espacial alinha a proximidade perceptiva com a redução da distância de trajetória física.

### Fontes
* FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
* MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
* YABLONSKI, Jon. *Laws of UX: Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.
