---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics-and-usability"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicofísico que estabelece que o tempo necessário para atingir um alvo é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "hci"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design tool in human-computer interaction"
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
  - "[[TouchTargetSize]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um princípio fundamental da ergonomia e da interação humano-computador (HCI) que formaliza a relação matemática entre a velocidade e a precisão do movimento humano ao atingir um alvo visual ou físico. A lei prediz que o tempo necessário para mover um dispositivo apontador até uma zona de interatividade é uma função logarítmica da razão entre a distância percorrida e a dimensão espacial do alvo.

No ecossistema de interface gráfica de usuário (GUI) e de interações sensíveis ao toque, este postulado estabelece que elementos operacionais de alta relevância devem apresentar dimensões físicas expandidas ou estar geometricamente agrupados próximos ao foco de controle da ação, reduzindo a latência do gesto motor e otimizando o tempo de execução da tarefa.

# 2. Fundamentação Teórica e Cognitiva

Desenvolvida originalmente por Paul Fitts em 1954 no campo da psicologia experimental, a formulação foi posteriormente adaptada para a computação por I. Scott MacKenzie através da variação proposta por Shannon. A equação clássica é expressa como:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- **$MT$** (*Movement Time*): O tempo total exigido para que o sistema motor execute e conclua o deslocamento.
- **$a$** e **$b$**: Regressões lineares que variam conforme as características do dispositivo de entrada (mouse, stylus, *touchscreen*).
- **$D$** (*Distance*): A amplitude do deslocamento a partir do ponto de origem até o centro geométrico do alvo.
- **$W$** (*Width*): A largura útil do alvo medida ao longo do eixo em que ocorre o movimento.

O termo logarítmico $\log_2 \left( \frac{2D}{W} \right)$ é denominado *Index of Difficulty* ($ID$), mensurado em bits. O incremento na dificuldade exige ajustes neuro-motores contínuos via *feedback* visual em tempo real, desacelerando o movimento à medida que o ponteiro se aproxima do limite do componente.

Em sistemas operacionais desktop, as quatro extremidades da tela possuem largura teoricamente infinita ($W = \infty$), uma vez que o cursor é impedido de ultrapassar as bordas do monitor. Esse fenômeno zera a necessidade de correção desacelerada no término da trajetória motor-visual. Em dispositivos com entrada por toque (*mobile* e *tablets*), o ausentismo de ponteiro contínuo transfere o peso da otimização diretamente para o dimensionamento do *touch target* e para a biomecânica da mão humana (como a zona de alcance do polegar).

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Positivas
- **Maximização da Hit Box:** Expandir a área de ativação (*hit area*) com o uso de *padding* invisível em ícones e botões compactos, reduzindo o valor de $ID$ sem corromper a harmonia estética da interface.
- **Aproveitamento das Bordas e Cantos:** Posicionar controles globais ou ações recorrentes nas extremidades físicas da tela gráfica para alavancar a propriedade do alvo de dimensão infinita.
- **Proximidade Contextual:** Renderizar menus pop-up, *tooltips* interativos e ações de confirmação nas imediações imediatas do ponteiro ou do foco de toque atual do usuário.
- **Dimensionamento Hierárquico:** Ajustar o tamanho da superfície clicável proporcionalmente à frequência de uso e importância da ação executada pelo usuário.

### Anti-padrões
- **Áreas de Toque Subdimensionadas:** Botões ou hiperlinks com dimensões inferiores às recomendações ergonomicamente seguras (como alvos menores que 44x44 pixels em plataformas móveis).
- **Disparidade de Trajetória Espacial:** Posicionar sequências de botões dependentes em extremidades opostas da tela, impondo uma distância $D$ excessiva entre etapas operacionais consecutivas.
- **Adjacência Destrutiva sem Margem de Segurança:** Agrupar componentes interativos críticos e irreversíveis (como ações de deleção) imediatamente ao lado de botões de uso comum sem o espaçamento (*margin*) compensatório.

# 4. Métricas e Impacto em Produto

A otimização estrutural orientada por Fitts's Law impacta de maneira quantificável o desempenho da interface e a eficiência operacional do usuário:

- **Task Completion Time (TCT):** A redução nas distâncias de deslocamento e o aumento de alvos operacionais diminuem a latência física por ação, acelerando o tempo total de conclusão de fluxos operacionais.
- **Misclick Rate (Taxa de Erro de Clique):** Redução drástica nas acionamentos acidentais e nos cliques falhos fora dos limites dos elementos interativos.
- **Throughput (Index of Performance - IP):** Medida da capacidade de processamento de informação do sistema humano-máquina, dada pela razão entre a dificuldade do alvo e o tempo de movimento ($IP = ID / MT$).
- **Conversion Rate (Taxa de Conversão):** A eliminação do atrito motor em botões de *call-to-action* (CTA) e formulários diminui o abandono em etapas cruciais do funil.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[TouchTargetSize]]

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020. Disponível em: <https://lawsofux.com/en/fitts-law/>.
