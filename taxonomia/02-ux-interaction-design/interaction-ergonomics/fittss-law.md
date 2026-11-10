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
summary: "Fitts's Law estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função logarítmica que relaciona a distância até o alvo e a dimensão espacial desse alvo."
tags:
  - "usabilidade"
  - "ergonomia"
  - "interaction-design"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, Paul M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
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
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

**Fitts's Law** (Lei de Fitts em Português) é um modelo ergonômico e psicomotor da interação humano-computador que prevê o tempo necessário para alcançar um alvo visual ou interativo. A lei postula que o tempo de aquisição de um alvo é diretamente proporcional à distância necessária para percorrê-lo e inversamente proporcional ao tamanho do próprio alvo. 

Matematicamente, a fórmula clássica é expressa por:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- $MT$ (*Movement Time*): Tempo total de movimento.
- $D$ (*Distance* / *Amplitude*): Distância do ponto inicial até o centro do alvo.
- $W$ (*Width*): Largura ou extensão do alvo ao longo do eixo de movimento.
- $a$ e $b$: Constantes empíricas derivadas por regressão linear dependentes do dispositivo de entrada (*input device*) e do usuário.

A expressão logarítmica $\log_2(2D/W)$ define o chamado **Index of Difficulty** ($ID$), medido em *bits*, que quantifica a complexidade motora da tarefa de aquisição.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto da psicologia experimental e ergonomia industrial, a lei aplica a Teoria da Informação de Claude Shannon ao sistema de controle motor humano.

O processo fisiológico e cognitivo de apontamento desdobra-se em duas fases distintas de controle sensório-motor:
1. **Fase Balística (Movimento Inicial de Alta Velocidade):** O cérebro executa um impulso motor inicial em malha aberta (*open-loop control*) direcionado à proximidade estimada do alvo.
2. **Fase de Ajuste Fino (Feedback Visual):** O sistema nervoso entra em malha fechada (*closed-loop control*), utilizando processamento visual contínuo para realizar micromovimentos de correção até que o dispositivo apontador colida com a superfície útil do alvo.

Alvos menores exigem ciclos adicionais de *feedback* visual e correção motora, elevando o tempo total de resposta. Além disso, a topologia de interfaces digitais confere propriedades únicas aos cantos e bordas da tela: como o ponteiro do mouse cessa o movimento físico ao atingir o limite visual do monitor, essas zonas possuem uma dimensão virtual infinitamente grande ($W \to \infty$), reduzindo drasticamente o *Index of Difficulty*.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Redimensionamento Proporcional de CTAs:** Aumentar a área clicável de botões primários (*Call to Action*) reduz a precisão necessária e acelera o tempo de execução.
- **Minimização da Distância de Deslocamento:** Posicionar controles contextuais (como menus de contexto ou *popovers*) imediatamente adjacentes à localização atual do cursor ou foco de toque.
- **Exploração de Bordas e Cantos:** Em interfaces de desktop, colocar elementos de alta frequência (como barra de tarefas ou botões de encerramento) nos limites físicos da tela para tirar proveito da dimensão de borda infinita.
- **Ampliação da Zona de Toque em Mobile:** Em interfaces *touchscreen*, a área interativa invisível (*touch target*) deve ser significativamente maior do que o elemento gráfico visível para compensar o diâmetro do dedo do usuário (mínimo recomendado de $48 \times 48\text{ dp}$ ou $44 \times 44\text{ pt*).

### Anti-padrões
- **Alvos Interativos Microscópicos:** Botões ou hiperlinks com pequenas dimensões espaciais dispostos em telas de alta densidade sem acréscimo de *padding* funcional.
- **Menus Cascata Profundos (Nested Menus):** Estruturas de navegação suspensas que exigem do usuário a manutenção do ponteiro dentro de um corredor estreito; pequenos desvios forçam o reinício de toda a trajetória de movimento.
- **Dispersão Espacial de Ações Relacionadas:** Posicionar o botão de confirmação e a entrada de texto associada em extremidades opostas da interface, aumentando o tempo e o esforço motor.

---

# 4. Métricas e Impacto em Produto

A otimização guiada por Fitts's Law afeta diretamente os parâmetros formais de eficiência e ergonomia da interface:

- **Task Completion Time (TCT):** A redução no tempo de aquisição dos elementos alvos reflete-se na diminuição do tempo total gasto na execução da tarefa.
- **Error Rate / Mis-click Rate:** Aumentar o *Index of Difficulty* (alvos menores ou mais distantes) eleva a probabilidade de cliques acidentais fora da zona demarcada, afetando negativamente a taxa de erro.
- **Throughput (TP):** Medida padronizada em ISO 9241-9 expressa em *bits/segundo*, calculada pela razão entre o *Index of Difficulty* efetivo e o tempo de movimento ($TP = ID_e / MT$). É utilizada para benchmarking de performance entre diferentes periféricos ou arranjos de layout.
- **Conversion Rate:** Em fluxos transacionais, a redução do atrito motor na interagir com o botão de finalização diminui a desistência por fadiga operacional.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Define o tempo de tomada de decisão cognitiva prévio ao movimento motor.
- [[SteeringLaw]] — Extensão da Fitts's Law para trajetórias restringidas por canais e corredores verticais/horizontais.
- [[CognitiveLoad]] — Relação entre o esforço visual de identificação e a execução motora.

### Fontes
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
- Laws of UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.