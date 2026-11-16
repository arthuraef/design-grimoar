---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "human-computer-interaction"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo psicofísico de desempenho motor que prediz que o tempo necessário para mover um apontador até uma área de destino é uma função da distância ao alvo e inversamente proporcional à sua dimensão."
tags:
  - "hci"
  - "interaction-design"
  - "ergonomics"
  - "usability"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, Paul M. (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "MacKenzie, I. Scott (1992) - Fitts' Law as a Research and Design Tool in Human-Computer Interaction"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX: Fitts’s Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[SteeringLaw]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica

*Fitts's Law* (Lei de Fitts) é um modelo ergonômico e preditivo da *Human-Computer Interaction* (HCI) formulado pelo psicólogo Paul Fitts em 1954. O modelo estabelece que o tempo necessário para apontar e selecionar um alvo motor é uma função matemática direta da distância necessária para alcançá-lo (*distance*) e uma função inversa da dimensão espacial da área de contato do alvo (*width*).

---

# 2. Fundamentação Teórica e Cognitiva

A base matemática da *Fitts's Law* é expressa formalmente pela fórmula do *Index of Difficulty* (ID), quantificada em *bits*:

$$ID = \log_2\left(\frac{2D}{W}\right)$$

O tempo de movimento total (*Movement Time* ou MT) é modelado linearmente por:

$$MT = a + b \cdot ID$$

Onde $a$ e $b$ são constantes empíricas derivadas do dispositivo de entrada (*mouse*, *touchscreen*, *trackball*) e do operador humano.

Do ponto de vista neuro-cognitivo e fisiológico, o ato de atingir um alvo espacial divide-se em duas etapas de controle motor:

1. **Primary Submovement Phase (Fase Balística):** Um impulso rápido e impreciso executado pelo sistema motor em direção ao vetor geral do alvo, baseado na representação espacial do *mental model*.
2. **Secondary Submovement Phase (Fase de Controle Fino):** Um ciclo de *visual feedback loop* e correções táticas contínuas de desaceleração para centralizar e ativar o ponteiro dentro dos limites de $W$.

Em interfaces gráficas de usuário (GUIs), as bordas e cantos do monitor operam como alvos infinitos (*infinite targets*). Como a física do cursor é interrompida pelo limite rígido da tela, a dimensão $W$ tende ao infinito do ponto de vista do vetor de alcance, anulando o risco de *overshoot* e reduzindo o *Index of Difficulty* ao valor mínimo.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas (Boas Práticas)
* **Target Sizing e Hitboxes Expandidas:** Aumentar a área interativa (*hitbox*) de elementos sem necessariamente alterar a proporção do ícone visual. Garantir dimensões mínimas para toque baseadas nas diretrizes de plataformas (ex.: 48x48 dp no *Material Design* e 44x44 pt nas *Apple Human Interface Guidelines*).
* **Edge e Corner Placement:** Posicionar elementos operacionais de uso frequente — como barras de navegação, controles globais de sistema ou menus fixos — nas extremidades da tela para tirar proveito da propriedade de alvos infinitos.
* **Contextual Pop-up Menus:** Exibir menus contextuais (acionados por *right-click* ou *press-and-hold*) diretamente na posição atual do cursor ou do toque, zerando o fator distância ($D = 0$).
* **Proximidade Operacional:** Agrupar fisicamente botões de validação primária em conjunto com os campos de entrada de dados relacionados, minimizando o *Movement Time* do fluxo.

### Anti-padrões (Falhas de Design)
* **Micro Targets:** Botões de ação crítica com *hitboxes* minúsculas posicionados com grande separação espacial em relação à trajetória previsível do usuário.
* **Spatial Dispersal:** Espalhar etapas sequenciais de uma mesma tarefa por cantos opostos do *viewport*, exigindo movimentos balísticos extensos e repetitivos.
* **Margens de Borda Destrutivas:** Inserir um espaçamento de *padding* nulo ou reduzido entre um botão interativo crítico e a borda da janela, impedindo a utilização da borda física como delimitador natural de desaceleração.

---

# 4. Métricas e Impacto em Produto

* **Task Completion Time (TCT):** A aplicação rigorosa da *Fitts's Law* reduz diretamente a latência física necessária para concluir fluxos de trabalho transacionais.
* **Error Rate e Miss-click Ratio:** Maximizar a dimensão $W$ diminui a ocorrência de erros de precisão motora, evitando acionamentos acidentais de elementos adjacentes.
* **Throughput (TP):** Medida padronizada da norma ISO 9241-9 para quantificar o desempenho de dispositivos de entrada e leiautes de interface, definida em bits por segundo ($TP = ID / MT$).
* **Friction Index:** Redução da carga de atenção física necessária para navegação, prevenindo o esgotamento motor durante sessões de uso prolongado em ferramentas de produtividade.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

* [[HicksLaw]]
* [[SteeringLaw]]
* [[CognitiveLoad]]

### Fontes Secundárias e Canônicas
* FITTS, Paul M. The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
* MACKENZIE, I. Scott. Fitts' Law as a Research and Design Tool in Human-Computer Interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
* YABLONSKI, Jon. *Laws of UX: Design with Psychology in Mind*. O'Reilly Media, 2020.