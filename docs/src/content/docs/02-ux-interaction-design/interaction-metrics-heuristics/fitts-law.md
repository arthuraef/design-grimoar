---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-metrics-heuristics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicomotor que postula que o tempo necessário para atingir um alvo é uma função logarítmica que relaciona a distância até o objetivo e sua dimensão espacial."
tags:
  - "fitts-law"
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "hci"
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

A **Fitts's Law** (traduzida para o Português do Brasil como Lei de Fitts) é uma lei quantitativa fundamental da interação humano-computador (*Human-Computer Interaction*) e da ergonomia cognitiva. O princípio estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função direta da distância até esse alvo e inversamente proporcional ao seu tamanho físico ou digital.

Matematicamente, a fórmula expandida por Shannon para descrever o tempo de movimento (*Movement Time* - MT) é expressa como:

$$MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- **$MT$**: Tempo total para completar a ação de apontamento.
- **$a$** e **$b$**: Constantes empíricas derivadas da regressão linear, que dependem do dispositivo de entrada (*input device*) e do perfil do usuário.
- **$D$**: Distância (*Distance*) do ponto de partida até o centro do alvo.
- **$W$**: Largura (*Width*) ou dimensão linear da zona de interação do alvo ao longo do eixo do movimento.
- **$\log_2 \left( \frac{D}{W} + 1 \right)$**: Denominado *Index of Difficulty* (ID), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto da psicologia experimental e controle motor humano, a **Fitts's Law** aplica os conceitos da Teoria da Informação ao sistema neuromotor. O cérebro humano processa ações motoras direcionadas a alvos através de um ciclo de feedback visual e correções sucessivas (*sub-movements*).

À medida que o *Index of Difficulty* (ID) aumenta — seja pelo estreitamento da dimensão $W$ do alvo ou pelo incremento na distância $D$ —, o sistema nervoso exige mais tempo de processamento perceptivo-motor para refinar a trajetória final do curso e evitar erros de sobrepasso (*overshoot*).

Em interfaces gráficas (*Graphical User Interfaces*), os cantos e bordas da tela possuem uma dimensão efetiva teórica infinita de $W$, pois o cursor se fixa na extremidade do *display* independentemente do excesso de força aplicado no ponteiro, resultando em um ID extremamente reduzido.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Maximizar o *Hitbox* de Elementos Críticos**: Botões de ação primária (*Call to Action*) devem possuir superfícies de clique significativamente superiores aos botões secundários para minimizar o tempo de seleção.
- **Utilizar as Bordas da Tela (Desktops)**: Posicionar menus globais e barras de controle nas extremidades da tela, aproveitando a propriedade de limite físico que maximiza $W$.
- **Reduzir a Distância de Trajetória ($D$)**: Agrupar controles contextuais próximos à posição atual do cursor (ex.: *context menus*, seletores rápidos em *hover*).
- **Adequar a Superfície de Toque (*Touch Target*)**: Em interfaces móbiles, garantir dimensões físicas mínimas recomendadas de interatividade (ex.: mínimo de $48 \times 48 \text{ dp}$ para Android e $44 \times 44 \text{ pt}$ para iOS).

### Anti-padrões
- **Alvos de Micro-clique**: Links textuais isolados ou ícones minúsculos sem padding interno (*hitbox padding*), elevando o ID da tarefa.
- **Espaçamento Excessivo entre Elementos Sequenciais**: Posicionar botões de avanço ou confirmação longe dos pontos iniciais de interação do formulário.
- **Alvos em Movimento ou Flutuantes**: Menus suspensos que somem ao menor desvio motor do ponteiro, violando a estabilidade da métrica $W$.

---

# 4. Métricas e Impacto em Produto

A aplicação e medição rigorosa da **Fitts's Law** afetam diretamente indicadores-chave de eficiência:

- **Movement Time (MT)**: Métrica temporal absoluta exigida para a conclusão do apontamento.
- **Throughput (TP)**: Medida combinada da capacidade humana com o periférico, calculada como $\text{TP} = \text{ID} / \text{MT}$ (expressa em bits por segundo). Usada em benchmark de hardware de entrada e otimização de interfaces.
- **Taxa de Erro de Clique (*Click Error Rate*)**: Porcentagem de disparos executados fora da zona interativa ($W$) planejada.
- **Time on Task**: A redução combinada do tempo de navegação diminui o desgaste na memória de trabalho e maximiza as taxas de conversão de fluxos operacionais.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Define o tempo de tomada de decisão com base na quantidade de opções de escolha.
- [[CognitiveLoad]] — Trata da carga mental total que complementa o esforço físico motor previsto por Fitts.
- [[SteeringLaw]] — Extensão da Lei de Fitts para cenários onde o cursor precisa ser guiado por um canal delimitado.

### Fontes Primárias
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.