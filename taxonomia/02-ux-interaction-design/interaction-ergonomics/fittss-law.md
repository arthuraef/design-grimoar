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
summary: "Modelo preditivo de controle motor e ergonomia de interação onde o tempo para atingir um alvo é função da distância até ele e do seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, Paul M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
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
  - "[[VisualHierarchy]]"
  - "[[JakobsLaw]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo ergonômico e psicofísico aplicado ao *interaction design* e à interação humano-computador que estabelece que o tempo necessário para mover um apontador até uma determinada área de alvo é uma função matemática direta da distância até esse alvo, dividida pela sua dimensão física. Formulada pelo psicólogo Paul Fitts em 1954, a lei prevê que elementos interativos maiores e posicionados mais próximos do ponto de origem da ação reduzem substancialmente o tempo de execução e o esforço motor do usuário.

---

# 2. Fundamentação Teórica e Cognitiva

A base científica de Fitts's Law assenta na teoria da informação e no controle neuromotor humano. O modelo é matematizado por meio do *Index of Difficulty* (ID), expresso em bits:

$$ID = \log_2\left(\frac{2D}{W}\right)$$

em que $D$ representa a distância (*target distance*) até o elemento e $W$ corresponde à largura do alvo (*target size*) ao longo do eixo do movimento.

Sob a perspectiva da psicologia cognitiva e da biomecânica, o deslocamento em direção a um objeto interativo não ocorre como um impulso contínuo único, mas divide-se em duas etapas:
1. **Fase Balística:** Um movimento de aproximação rápido e de alta amplitude em direção à zona geral do alvo.
2. **Fase de Ajuste Fino:** Uma sequência de microcorreções contínuas coordenadas por *feedback loops* visuo-motores até atingir a superfície exata do elemento.

Quando o *target size* é reduzido ou a *target distance* aumenta, a necessidade de processamento visual e correções motoras de precisão cresce exponencialmente, elevando a carga física e cognitiva. Em interfaces baseadas em ponteiro (*mouse* ou *trackpad*), as bordas e cantos do *display* oferecem uma dimensão virtualmente infinita de alvo ($W \to \infty$), uma vez que o cursor é impedido de ultrapassar os limites físicos da tela.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Recomendadas
- **Expansão de Target Area:** Aumentar a área interativa (*hit area*) para além dos limites visuais rígidos de um ícone ou botão, garantindo dimensões mínimas aceitáveis para facilidade de toque ou clique (ex.: área mínima de 44x44px em interfaces de toque).
- **Ancoragem em Bordas e Cantos:** Alocar elementos cruciais de navegação ou controle contextual nas extremidades da tela para aproveitar a propriedade de tamanho infinito de alvo em dispositivos de ponteiro.
- **Proximidade de Fluxo Primário:** Posicionar botões de ação subsequente (como seletores de confirmação ou *call-to-action*) visual e fisicamente próximos do ponto de convergência do cursor ou do foco de atenção do usuário.

### Anti-padrões
- **Tiny Target Syndrome:** Interface composta por links de texto ou ícones minúsculos situados em zonas densas, demandando alto esforço de desaceleração e correção motora micrométrica.
- **Action Displacement:** Posicionamento de botões de alto valor ou ações de confirmação em cantos opostos à área de entrada de dados principal, forçando trajetórias extensas do cursor.
- **Padrões de Destruição Próximos:** Agrupamento de ações destrutivas (ex.: "Excluir") excessivamente próximas de ações primárias (ex.: "Salvar") com áreas de toque reduzidas, aumentando a incidência de erros motores.

---

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** A otimização do *Index of Difficulty* diminui o tempo total gasto no cumprimento de tarefas críticas dentro da interface.
- **Error Rate / Misclick Rate:** O dimensionamento adequado de componentes reduz a proporção de cliques ou toques incorretos acidentais, melhorando a precisão da navegação.
- **Conversion Rate (CR):** A redução da fricção motora em formulários e menus de *checkout* impacta positivamente as taxas de conversão final em produtos digitais.
- **Throughput (TP):** Métrica padronizada pela norma ISO 9241-9 que avalia o desempenho de entrada de dados relacionando o *Index of Difficulty* com o tempo de resposta do usuário em bits por segundo.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[VisualHierarchy]]
- [[JakobsLaw]]

### Fontes
- Fitts, Paul M. (1954). "The information capacity of the human motor system in controlling the amplitude of movement". *Journal of Experimental Psychology*, 47(6), 381–391.
- ISO 9241-9:2000. *Ergonomics of human-system interaction — Part 9: Requirements for non-keyboard input devices*.
- Laws of UX (2026). "Fitts’s Law". Disponível em: <https://lawsofux.com/en/fitts-law/>.