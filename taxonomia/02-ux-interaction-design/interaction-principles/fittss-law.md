---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-principles"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de ergonomia e interação humano-computador que estabelece que o tempo necessário para alcançar um alvo é diretamente proporcional à distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, Paul M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
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
  - "[[VisualHierarchy]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzida no contexto de ergonomia como *Lei de Fitts*) é um modelo estatístico e psicofísico fundamental da área de *Human-Computer Interaction* (HCI). O princípio formaliza o tempo necessário para mover um apontador (seja um cursor de mouse, estilete ou o próprio dedo humano) até uma área de destino específica, determinando que o tempo de movimento é uma função logarítmica que correlaciona a distância até o objeto (*distance*) com a largura e proporção dimensional da área clicável (*target size*).

No design de interfaces de software, a lei serve como baliza preditiva para otimizar o posicionamento e o dimensionamento de elementos interativos, minimizando o esforço motor e a latência de execução nas tarefas do usuário.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 a partir de experimentos sobre a capacidade de processamento de informação do sistema motor humano, a lei mensura o nível de dificuldade de uma tarefa motora de precisão por meio do *Index of Difficulty* (ID):

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- $D$ representa a distância (ou amplitude do movimento) até o alvo.
- $W$ representa a largura do alvo alinhada ao eixo de movimento.

O tempo total de movimento (*Movement Time* ou $MT$) é modelado por uma regressão linear expressa por:

$$MT = a + b \cdot ID$$

Em termos cognitivo-motores, o ato de mirar em um componente visual envolve um ciclo contínuo de feedback perceptivo-motor composto por dois estágios primários:
1. **Movimento Balístico Inicial:** Um salto rápido e aproximado em direção à localização genérica do componente.
2. **Ajuste Fino Fechado:** Pequenas correções visuo-motoras de alta precisão ao aproximar-se do alvo.

Alvos menores demandam ciclos significativamente maiores de ajuste fino no segundo estágio, exigindo foco visual elevado e aumentando drasticamente o tempo necessário para a conclusão da ação. Em interfaces baseadas em ponteiro, cantos e bordas da tela possuem dimensões efetivas infinitas ($W = \infty$), pois o cursor é fisicamente impedido de ultrapassar os limites do display, eliminando completamente a necessidade de ajustes finos de desaceleração.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Redimensionamento Proporcional de Hit Targets:** Expandir a zona de clique ativa (*bounding box* ou *padded touch target*) além do elemento visual visível. Para interfaces *touch*, estabelecer zonas de interações mínimas de no mínimo 48×48 dp/pt.
- **Aproveitamento das Bordas e Cantos da Tela:** Posicionar botões de ação global e menus principais nas extremidades da tela no Desktop, tirando proveito da teoria de "tamanho de alvo infinito".
- **Minimização da Distância de Deslocamento:** Utilizar *contextual menus* (como popovers de botão direito ou menus flutuantes) próximos ao ponto focal corrente do cursor ou cursor do usuário.
- **Ampliação de CTAs de Alta Prioridade:** Aumentar a escala visual e clicável do *Primary Call to Action* em comparação a ações secundárias.

### Anti-padrões Comuns
- **Micro Target Anti-pattern:** Exigir que o usuário interaja com alvos diminutos (ex.: caixas de seleção de 12px ou ícones sem *padding*), resultando em cliques frustrados ou acidentais.
- **Excessive Travel Distance:** Exigir que o usuário mova o ponteiro por vastas extensões da interface para efetuar confirmações em sequência (ex.: formulário na ponta esquerda com botão de confirmação fixado na extremidade oposta inferior direita).
- **Proximidade Perigosa de Destruição:** Posicionar ações irreversíveis ou destrutivas extremamente próximas a botões de fluxo primário de alta frequência sem o espaçamento físico necessário para mitigar desvios motores.

---

# 4. Métricas e Impacto em Produto

A implementação rigorosa dos princípios de Fitts's Law afeta diretamente a performance e a usabilidade de produtos digitais por meio das seguintes métricas:

- **Task Completion Time (TCT):** Queda direta na latência temporal necessária para concluir fluxos operacionais críticos.
- **Misclick / Error Rate:** Redução na taxa de cliques fora do alvo e de atritos causados por correções manuais.
- **Throughput (Index of Performance):** Aumento no volume de bits de informação processados pela taxa de precisão motora dos usuários.
- **Conversion Rate:** Elevação observável na conversão de funis de checkout ou cadastros ao otimizar o tamanho e o posicionamento de botões de conversão primários.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Redução da carga de decisão e complexidade de escolha antes do movimento motor.
- [[CognitiveLoad]] — Minimizar o esforço cognitivo exigido no controle visual e motor fino.
- [[VisualHierarchy]] — Estruturação de tamanho de componentes em consonância com sua relevância de interação.

### Fontes
- Fitts, Paul M. "The information capacity of the human motor system in controlling the amplitude of movement." *Journal of Experimental Psychology*, vol. 47, no. 6, 1954, pp. 381–391.
- Yablonski, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.
- Laws of UX. "Fitts’s Law." Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.