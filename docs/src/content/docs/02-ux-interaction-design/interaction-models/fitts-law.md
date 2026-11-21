---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-models"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicomotor que postula que o tempo necessário para mover um apontador até uma área de alvo é uma função logarítmica da distância até o alvo dividida por sua largura."
tags:
  - "interaction-design"
  - "ergonomics"
  - "hci"
  - "usability"
aliases:
  - "Fitts Law"
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
---

# 1. Definição Canônica

A **Fitts's Law** (traduzida historicamente como Lei de Fitts) é um modelo de desempenho humano centrado na relação física entre amplitude de movimento e precisão espacial. Formalmente, o princípio dita que o tempo para adquirir um *target* (alvo interativo) é uma função direta da distância (*distance* ou *amplitude*) até ele, inversamente proporcional à sua dimensão (*width* ou *target size*).

A formulação matemática clássica adaptada para *Human-Computer Interaction* (HCI) por I. Scott MacKenzie (variante de Shannon) é expressa como:

$$MT = a + b \cdot \log_2 \left( 1 + \frac{D}{W} \right)$$

Onde:
- **$MT$ (*Movement Time*)**: Tempo total necessário para completar a ação motora.
- **$a$** e **$b$**: Constantes empíricas derivadas de regressão linear baseadas no *pointing device* e no contexto do usuário.
- **$D$ (*Distance*)**: Distância escalar do ponto inicial do cursor ou dedo até o centro do alvo.
- **$W$ (*Width*)**: Tamanho do alvo ao longo do eixo de movimento.
- **$\log_2(1 + D/W)$**: Denominado **$ID$ (*Index of Difficulty*)**, medido em *bits*.

# 2. Fundamentação Teórica e Cognitiva

Originada nos experimentos de psicologia experimental de Paul Fitts em 1954, a lei foi estendida da movimentação motora analógica para ambientes digitais baseados em *Graphical User Interface* (GUI). O fundamento cognitivo baseia-se na teoria do processamento de informação humana, interpretando o sistema motor como um canal de comunicação com capacidade limitada de largura de banda (*information capacity*).

O movimento de busca e seleção ocorre em duas fases encadeadas:
1. **$Initial\ Ballistic\ Phase$ ($Open\text{-}loop\ movement$)**: Um movimento rápido e de alta velocidade disparado pelo sistema motor em direção ao alvo geral, sem controle visual fino contínuo.
2. **$Final\ Corrective\ Phase$ ($Closed\text{-}loop\ feedback$)**: Um ajuste de precisão em baixa velocidade baseado em *visual feedback* em tempo real para posicionar o *pointer* exatamente sobre os limites de $W$.

Em interfaces computacionais desktop, as bordas físicas da tela fornecem o conceito de *infinite target size* ($W = \infty$). Como o cursor do mouse não pode ultrapassar o limite do *display*, a necessidade da etapa de correção final é reduzida a zero, tornando cantos e bordas áreas de *Index of Difficulty* mínimo.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas (Práticas Recomendadas)
- **Otimização do *Touch Target Size*:** Garantir que elementos acionáveis em interfaces móveis tenham uma área tátil mínima recomendada (ex.: $48 \times 48\text{ dp}$ no Android Material Design ou $44 \times 44\text{ pt}$ no iOS Human Interface Guidelines) para acomodar o diâmetro do dedo humano.
- **Proximidade Contextual (*Spatial Proximity*):** Posicionar *floating action buttons*, menus de contexto (*contextual menus*) e *popovers* próximos da localização atual de interação do usuário para mitigar a variável $D$.
- **Uso das Bordas do *Screen Layout*:** Alocar elementos cruciais (como barras de menu no macOS ou botão Iniciar no Windows) nos limites periféricos do monitor para alavancar a propriedade do alvo infinito.
- **Expandir a Área Clicável Dinamicamente:** Expandir a área de ativação (*hitbox*) em vez de apenas o artefato visual do componente de interface para facilitar a aquisição sem poluição estética.

### Anti-padrões
- **$Tiny\ Click\ Targets$:** Posicionar botões vitais de conversão ou ícones de ação rápida em dimensões inferiores ao limiar funcional (ex.: ícones de $12 \times 12\text{ px}$ sem *padding* estendido).
- **$Excessive\ Pointer\ Distance$:** Projetar fluxos de trabalho que exigem do usuário alternâncias bruscas e repetitivas do cursor entre cantos opostos da tela para concluir uma única tarefa (*high movement amplitude*).
- **$Cascading\ Dropdown\ Discontinuity$:** Menus suspensos em cascata com caminhos estreitos que exigem trajetórias motoras rígidas e altamente precisas em subitens, resultando em falhas de seleção e fechamento acidental da interface.

# 4. Métricas e Impacto em Produto

- **$Throughput\ (TP)$:** Medida padrão do desempenho de entrada calculada em $bits/s$, combinando a velocidade e a precisão em uma única métrica objetiva de usabilidade motor-digital.
- **$Task\ Completion\ Time\ (TCT)$:** Reduções no $ID$ de componentes-chave em um *checkout* ou painel analítico causam quedas estatisticamente significativas no tempo total de conclusão de tarefas.
- **$Error\ Rate$ (Taxa de Erro):** A taxa de cliques acidentais fora da área pretendida diminui proporcionalmente conforme o aumento adequado do tamanho do alvo em relação à distância do ponto de origem.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

- [[HicksLaw]] — Modela o tempo de tomada de decisão pré-motor, complementando o tempo de execução física da Fitts's Law.
- [[SteeringLaw]] — Uma extensão bidimensional da Fitts's Law aplicada a trajetórias restritas por canais e superfícies.
- [[CognitiveLoad]] — A frustração motora advinda do insucesso na aquisição do alvo sobrecarrega os recursos cognitivos de atenção primária do usuário.

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- LAWS OF UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.