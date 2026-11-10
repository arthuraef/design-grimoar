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
summary: "Fitts's Law (Lei de Fitts) estabelece que o tempo necessário para apontar e selecionar um alvo é uma função matemática que relaciona a distância até o objeto e a sua largura dimensional."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "ui"
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
  - title: "Laws of UX - Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[JakobsLaw]]"
---

# 1. Definição Canônica

A Fitts's Law (Lei de Fitts) é um modelo de controle psicomotor que formaliza a relação entre a velocidade e a precisão do movimento humano ao interagir com alvos físicos ou digitais. Formalmente, o modelo postula que o tempo total exigido para que um indivíduo mova um ponteiro ou membro até uma determinada *target area* é proporcional ao *Index of Difficulty* (ID) da tarefa, o qual é calculado com base na razão entre a *distance* (ou *amplitude*) do movimento e a *width* (dimensão operacional) do alvo.

No âmbito de *Interaction Design* e *User Experience*, o princípio determina que elementos interativos primários de uma interface devem apresentar dimensões fisicamente adequadas e localização estratégica para mitigar o tempo de acesso, otimizar o *motor control* do usuário e minimizar a taxa de erro em tarefas de seleção.

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954 a partir da teoria da informação de Shannon, a lei quantifica a capacidade do sistema neuromotor humano em termos de largura de banda de transmissão de informação. A equação clássica é expressa por:

$$MT = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde:
- $MT$ representa o *Movement Time* (tempo de execução do movimento).
- $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada (*input device*) e do contexto fisiológico.
- $D$ é a *Distance* do ponto de partida ao centro do alvo.
- $W$ é a *Width* do alvo ao longo do eixo do movimento.
- O termo em logaritmo de base 2 define o *Index of Difficulty* ($ID$), medido em *bits*.

Sob a perspectiva da *cognitive psychology*, a tarefa de apontar compreende duas fases do sistema motor: uma fase inicial de desaceleração balística (*rapid logarithmic movement*) direcionada às proximidades do alvo, seguida por micropassos de ajuste visual-motor (*closed-loop feedback phase*) para atingir a zona de clique ou toque. Quanto menor o alvo em proporção à distância focal, maior é a exigência de processamento de *sensory feedback*, o que eleva a *cognitive load* e prolonga o tempo de confirmação do gesto.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
- **Dimensionamento Proporcional de Interactive Elements:** Aumentar a *bounding box* ou a *hit area* de botões primários (como *call to action*) para reduzir o *Index of Difficulty*.
- **Aproveitamento das Infinite Edges:** Posicionar elementos críticos nos cantos e bordas da tela em ambientes *desktop*, visto que a borda atua como um limite físico onde o cursor para automaticamente, tornando o tamanho do alvo virtualmente infinito ($W \to \infty$).
- **Proximidade Contextual:** Agrupar seleções correlatas ou utilizar *contextual menus* que aparecem imediatamente adjacentes à localização corrente do cursor para minimizar a distância ($D$).
- **Touch Target Padding:** Garantir alvos de toque em telas móveis com dimensão física mínima de 48x48 dp (ou 44x44 pt), incorporando *invisible padding* ao redor dos elementos visuais.

### Anti-padrões
- **Tiny Hit Areas:** Ícones ou links de texto com áreas de clique extremamente restritas que exigem alta precisão motora e causam frustração no usuário.
- **Distância Excessiva entre Controles Dependentes:** Posicionar botões de confirmação de formulários excessivamente distantes dos campos de entrada de dados, forçando trajetórias longas e desnecessárias do ponteiro.
- **Cantos Desperdiçados:** Deixar as bordas absolutas da interface desprovidas de função de clique interativa, ignorando a propriedade de aceleração livre de ponteiro.

# 4. Métricas e Impacto em Produto

A implementação rigorosa da Fitts's Law impacta de forma direta as métricas de usabilidade e performance operacional:

- **Task Completion Time (TCT):** A redução matemática do *Movement Time* resulta em menor tempo para a conclusão de fluxos operacionais críticos.
- **Error Rate:** O aumento proporcional da *hit target area* reduz a ocorrência de *misclicks* e toques acidentais (*rage clicks*).
- **Throughput (TP):** Métrica padrão para avaliar a performance de *input devices*, calculada pela divisão do *Index of Difficulty* pelo *Movement Time* ($TP = \frac{ID}{MT}$), permitindo benchmark de eficiência da interface.
- **Conversion Rate:** Em produtos digitais, o correto redimensionamento e posicionamento do *Primary Call to Action* correlaciona-se com aumentos mensuráveis na taxa de conversão do funil de vendas.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Relaciona o tempo de tomada de decisão com a quantidade de opções disponíveis na interface.
- [[CognitiveLoad]] — Trata da quantidade de esforço mental alocado no processamento de informações visuais e de interação.
- [[JakobsLaw]] — Sustenta a expectativa dos usuários em relação a padrões consagrados de navegação e componentes.

### Fontes Principais
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.
- LAWS OF UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.
