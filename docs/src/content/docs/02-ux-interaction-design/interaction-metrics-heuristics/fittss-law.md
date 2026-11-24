---
title: "Fitts's Law"
slug: "fittss-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-metrics-heuristics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e preditivo de controle motor humano que estabelece o tempo necessário para mover o apontador até uma área de destino em função da distância e da largura do alvo."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
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
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[SteeringLaw]]"
  - "[[CognitiveLoad]]"
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um princípio fundamental de ergonomia e *human-computer interaction* (HCI - interação humano-computador) que estabelece que o tempo necessário para que um operador mova um dispositivo de apontamento até um alvo é uma função matemática logarítmica da distância até o destino dividida pela largura do próprio alvo. 

Formalmente expressa por Paul Fitts em 1954 e adaptada para a computação por I. Scott MacKenzie através da Formulação de Shannon, o tempo de movimento (*Movement Time* - $MT$) é modelado pela equação:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
*   $D$ (*Distance*): Representa a amplitude visual ou física do movimento desde o ponto de origem até o centro do alvo.
*   $W$ (*Target Width*): Corresponde à extensão tolerada da área de toque ou clique ao longo do eixo de movimento.
*   $a$ e $b$: São constantes empíricas dependentes do dispositivo de entrada (*mouse*, *trackpad*, *touchscreen*) e da capacidade fisiológica do operador.
*   $\log_2 \left( \frac{D}{W} + 1 \right)$: Constitui o *Index of Difficulty* ($ID$), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

A base científica da Fitts's Law advém da teoria da informação aplicada ao controle neuro-motor humano. O ato de aquisição de um alvo envolve um ciclo de retroalimentação visuo-motora dividido em duas fases cognitivas distintas:

1.  **Fase Balística Inicial:** Um movimento primário e rápido impulsionado pelo sistema motor em direção ao destino genérico, cobrindo a maior parte da distância ($D$).
2.  **Fase de Correção Fina (*Sub-movements*):** Uma sequência de pequenos ajustes retroalimentados visualmente à medida que o cursor se aproxima dos limites de $W$. Se $W$ for excessivamente pequeno, a fase de correção fina consome um tempo desproporcional e eleva a taxa de erro (*error rate*).

Em ambientes digitais desktop, a Fitts's Law revela a propriedade geométrica dos chamados "alvos infinitos" (*magic corners* / *screen edges*). Como o ponteiro do sistema operacional é impedido de ultrapassar as bordas físicas da tela, a largura efetiva ($W$) de botões colocados nas extremidades expande-se teoricamente ao infinito, reduzindo o *Index of Difficulty* a um patamar residual e otimizando o tempo de aquisição.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
*   **Maximização de $W$ em Ações Críticas:** *Call-to-Action* (CTA) primários e botões de conversão devem possuir áreas expansivas de clique (*hit areas*), superiores aos limites visuais do elemento gráfico através de *padding* transparente.
*   **Minimização de $D$ via Menus Contextuais:** Injetar menus interativos diretamente adjacentes ao ponteiro (ex: menu de clique com o botão direito) reduz a distância $D$ a um valor próximo de zero, acelerando a interação.
*   **Utilização de Cantos e Bordas:** Posicionar elementos de uso frequente (como barras de ferramentas ou botões de encerramento de sessão) nos limites superiores, inferiores ou cantos do *viewport*.
*   **Dimensionamento Adaptado a Touch Interfaces:** Em ecossistemas móbiles, utilizar *touch targets* mínimos de $48 \times 48$ dp (*density-independent pixels*) para compensar a imprecisão natural do polegar humano (*fat-finger problem*).

### Anti-padrões
*   **Target Size Reduzido:** Botões de exclusão ou confirmação representados por ícones minúsculos (ex: $12 \times 12$ px) sem expansão de *hit target*.
*   **Dispersão Espacial de Sequências:** Posicionar o botão "Salvar" no canto superior esquerdo e o botão "Confirmar" no canto inferior direito de formulários longos, forçando viagens de cursor de alto $D$.
*   **Alvos Móveis ou Instáveis:** Menus *drop-down* que recolhem prematuramente quando o usuário tenta mover o cursor na diagonal em direção aos submenus, alterando a trajetória esperada.

---

# 4. Métricas e Impacto em Produto

A aplicação criteriosa da Fitts's Law afeta diretamente a eficiência operacional e os resultados de produtos digitais:

*   **Reduction of Task Completion Time (TCT):** A otimização de $D$ e $W$ reduz os milissegundos dispendidos por ação em fluxos repetitivos, elevando a produtividade em ferramentas operacionais de alta frequência (*enterprise systems*).
*   **Drop-off Rate & Error Rate:** Áreas de toque pequenas provocam erros de precisão (*misclicks*). O dimensionamento correto reduz a frustração do usuário e a taxa de abandono no *checkout*.
*   **Throughput (bits/segundo):** Métrica fundamental em *usability engineering* para comparar a eficiência de diferentes dispositivos de entrada ou layouts de interface:

$$\text{Throughput} = \frac{ID}{MT}$$

Interfaces desenhadas alinhadas com a Fitts's Law mantêm um *Throughput* elevado e constante, maximizando a taxa de transferência de intenção do usuário para o sistema.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
*   [[HicksLaw]] — Modela o tempo de tomada de decisão em relação ao número de opções, complementando o tempo de execução física da Fitts's Law.
*   [[SteeringLaw]] — Extensão da Fitts's Law para trajetórias onde o ponteiro deve navegar por um canal delimitado.
*   [[CognitiveLoad]] — A redução da exigência de precisão motora alivia a carga de processamento do usuário durante a interação.
*   [[DohertyThreshold]] — A execução rápida permitida pela Fitts's Law contribui para manter a interatividade abaixo dos limites de latência ideais.

### Fontes
*   FITTS, Paul M. The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
*   MACKENZIE, I. Scott. Fitts' Law as a Research and Design Model in Human-Computer Interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
*   YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020."
}