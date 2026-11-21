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
summary: "Modelo psicofísico de movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função da distância até o alvo e do seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
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
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo psicofísico e princípio fundamental do *interaction design* e da ergonomia cognitiva que estabelece que o tempo necessário para mover um apontador até uma área de destino (alvo) é uma função logarítmica da distância até esse alvo e da sua dimensão angular ao longo do eixo de movimento. Em sistemas de interface de usuário, o modelo determina que componentes visualmente distantes do ponto de repouso do cursor e com dimensões reduzidas exigem maior tempo de execução motora e registram maior taxa de erro de acionamento.

# 2. Fundamentação Teórica e Cognitiva

Formulada por Paul Fitts em 1954 no âmbito da psicologia experimental e posteriormente adaptada para a interação homem-computador por Stuart Card, Thomas Moran e Allen Newell, Fitts's Law deriva formalmente da Teoria da Informação de Claude Shannon. A formulação matemática clássica (com a variação de Shannon proposta por Scott MacKenzie) expressa o *Index of Difficulty* (ID, ou Índice de Dificuldade) medido em *bits*:

$$ID = \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
- $D$ representa a distância (*Distance*) até o centro do alvo.
- $W$ representa a largura (*Width*) ou dimensão do alvo ao longo do eixo de deslocamento.

O tempo de movimento ($MT$, *Movement Time*) é computado por uma equação linear:

$$MT = a + b \cdot ID$$

As constantes empíricas $a$ e $b$ são derivadas via regressão linear para dispositivos de entrada específicos (como *mouse*, *touchscreen* ou *trackball*).

Sob a perspectiva da psicomotricidade visual, a trajetória da mão ou cursor é dividida em duas fases operacionais:
1. **Fase Ballistic Movement (Impulso Inicial):** Movimento rápido e de grande amplitude controlado pelo sistema motor primário em direção à posição genérica do alvo.
2. **Fase Feedback Control (Ajuste Fino):** Micro-correções controladas por retroalimentação visual contínua à medida que o indicador se aproxima do limite do alvo. Alvos menores ampliam a duração da fase de ajuste fino, desacelerando desproporcionalmente a conclusão do movimento.

Em interfaces de *desktop*, as bordas físicas da tela funcionam como alvos de dimensão $W$ teoricamente infinita (*infinite targets*), pois o ponteiro é fisicamente impedido de ultrapassar a resolução da tela, anulando a necessidade de ajuste fino de precisão.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Recomendadas
- **Expansão da Hit Area:** Ampliar a zona de contato interativa (*target area*) sem alterar o tamanho do elemento visual primário (por exemplo, aplicando *padding* transparente em botões ou convertendo linhas completas de tabelas em áreas clicáveis).
- **Proximidade Contextual (Spatial Proximity):** Posicionar controles operacionais recorrentes (como menus contextuais ativados por clique secundário) exatamente onde o cursor se encontra no momento da ação.
- **Exploração de Screen Boundaries:** Alocar elementos essenciais de navegação global ou ações de alta frequência nos cantos ou extremidades da tela, reduzindo o tempo de acesso pela eliminação do risco de ultrapassagem do alvo (*overshoot*).
- **Sizing de Elementos para Mobile:** Garantir alvos de toque com dimensões físicas mínimas equivalentes ao diâmetro de contato do dedo humano (aproximadamente 48x48 pixels de densidade independente ou 9mm).

### Anti-padrões Gráficos
- **Micro-targets isolados:** Empregar elementos interativos de baixíssima dimensão (ex: ícones de fechamento ou caixas de seleção menores que 24x24 pixels) situados a distâncias consideráveis de focos primários de digitação ou leitura.
- **Cascading Flyout Menus:** Projetar menus suspensos hierárquicos com caminhos de navegação estreitos que exigem trajetórias motoras de precisão absoluta, sujeitas a fechamentos involuntários ao menor desvio do cursor.
- **Adjacência Físico-Temporal Destrutiva:** Agrupar botões de ação destrutiva (como "Deletar") imediatamente ao lado de botões de confirmação (como "Salvar") com a mesma escala visual, multiplicando falhas motoras por *misclick*.

# 4. Métricas e Impacto em Produto

- **Throughput (TP):** Taxa de transferência de informação medida em bits por segundo ($TP = \frac{ID}{MT}$), avaliando o desempenho relativo e a eficiência de dispositivos de entrada e esquemas de layout.
- **Task Completion Time (TCT):** A otimização direta baseada em Fitts's Law reduz os tempos de transição visual e motora em formulários complexos e fluxos de checkout, diminuindo a fricção temporal agregada.
- **Misclick Rate (Taxa de Erro de Acionamento):** Métrica de usabilidade que mensura a frequência com que usuários clicam fora do limite do alvo pretendido ou ativam elementos incorretos devido ao dimensionamento ou espaçamento inadequado.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

- [[HicksLaw]]
- [[CognitiveLoad]]

**Fontes:**
- Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
- MacKenzie, I. S. (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
- Yablonski, J. (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.
- Laws of UX: Fitts's Law. Disponível em: <https://lawsofux.com/en/fitts-law/>.