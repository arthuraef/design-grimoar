---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicomotor que postula que o tempo necessário para atingir um alvo é uma função direta da distância até ele e do seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "human-computer-interaction"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design model in human-computer interaction"
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

Fitts's Law (Lei de Fitts) é um modelo de desempenho psicomotor e ergonômico formulado para prever o tempo necessário para mover rapidamente um apontador até uma área de destino (alvo). No contexto de *interaction design* e *human-computer interaction* (HCI), a lei estabelece que o *movement time* para alcançar um objeto interativo é uma função logarítmica da razão entre a distância até o alvo (*distance*) e a largura do alvo (*width*).

Formulada matematicamente segundo a variação de Shannon:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- $MT$ é o *movement time* total.
- $a$ e $b$ são constantes empíricas derivadas de amostragem regressiva, representando o tempo de reação inicial e a velocidade do dispositivo de entrada.
- $D$ é a distância do ponto de origem ao centro do alvo.
- $W$ é o tamanho efetivo do alvo ao longo do eixo do movimento.

---

# 2. Fundamentação Teórica e Cognitiva

Proposta pelo psicólogo Paul Fitts em 1954, a lei fundamenta-se na teoria da informação de Claude Shannon, tratando o sistema de controle motor humano como um canal de comunicação com capacidade limitada. O movimento voluntário em direção a um alvo é decomposto em uma fase inicial de disparo balístico (*gross motor control*) seguida por microajustes de feedback visual e motor (*fine motor control*).

A relação quantitativa entre distância e largura define o *Index of Difficulty* (ID), medido em *bits*:

$$ID = \log_2 \left( \frac{D}{W} + 1 \right)$$

A métrica *throughput* (TP) representa a eficiência com que o sistema neuromuscular do usuário processa essa informação, calculada pela divisão de $ID$ pelo tempo de execução.

### Desdobramentos para Interfaces Gráficas

1. **Alvos de Tamanho Infinito (*Screen Edges*)**: Em ambientes de desktop com cursores de mouse, as bordas superiores, inferiores e cantos da tela possuem dimensão efetiva infinita ($W = \infty$). Como o cursor é fisicamente impedido de avançar além do limite da tela, o *Index of Difficulty* aproxima-se de zero, tornando o canto da tela o ponto de acesso mais rápido na interface.
2. **Entrada Táctil (*Touchscreen Dynamics*)**: Em dispositivos móveis, a ausência de um ponteiro de precisão sub-pixel exige que o parâmetro $W$ acomode a variação anatômica dos dedos humanos (*finger occlusion* e imprecisão da área de contato), exigindo *touch targets* substancialmente maiores do que em interfaces acionadas por ponteiros físicos.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Diretrizes de Design (Heurísticas)

- **Maximização do Bounding Box**: Expandir a área clicável de botões e links para além do texto visualizado, incluindo *padding* interno como parte da zona de captura interativa.
- **Utilização das Bordas da Viewport**: Posicionar menus primários, barras de navegação e controles operacionais críticos nas bordas extremas da tela em aplicações desktop.
- **Proximidade Contextual**: Alocar menus de contexto (*contextual menus*) e barras de ferramentas flutuantes imediatamente adjacentes à localização atual do ponteiro do usuário ou do foco de seleção.
- **Dimensionamento Mínimo Táctil**: Aplicar um padrão mínimo de dimensão física para alvos operáveis por toque (ex: 48x48 *density-independent pixels* / dp).

### Anti-padrões de Interação

- **Pixel Hunting**: Exigir que o usuário posicione o cursor sobre um alvo extremamente reduzido (ex: ícones de 12x12 pixels sem *hitbox* estendida) em telas de alta resolução.
- **Dropdown Cascades**: Desenhar menus desdobráveis em múltiplos níveis verticais e horizontais que exigem trajetórias lineares estreitas e estritas, elevando drasticamente a carga psicomotora.
- **Corner Dead Zones**: Inserir margens (*paddings*) desnecessárias entre os elementos interativos e os limites absolutos da janela ou da tela, anulando a propriedade de alvo infinito fornecida pelas bordas físicas.

---

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT)**: A otimização do $ID$ em alvos de alta frequência resulta em redução direta da latência de execução de tarefas na interface.
- **Error Rate (Misclick Rate)**: A expansão adequada da área $W$ reduz a proporção de disparos falhos fora do *bounding box*, minimizando estados de erro acidentais.
- **Throughput (TP)**: Serve como métrica estandardizada (definida pela ISO 9241-9) para benchmark de usabilidade entre diferentes dispositivos de entrada ou layouts de *user interface*.
- **Fricção em Funis de Conversão**: A aplicação da lei em botões de *Call-to-Action* (CTA) primários diminui a hesitação motora, maximizando a taxa de conversão em fluxos críticos de transação.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Modela o tempo de decisão cognitiva em função do número de escolhas disponíveis, complementando o tempo de execução motora de Fitts's Law.
- [[SteeringLaw]] — Extensão da Fitts's Law para trajetórias onde o cursor deve permanecer dentro de um canal delimitado (ex: menus aninhados).
- [[CognitiveLoad]] — A redução da exigência de precisão motora minimiza o esforço mental total alocado durante a interação.

### Fontes Principais
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.