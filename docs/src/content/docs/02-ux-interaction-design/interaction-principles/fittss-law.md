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
summary: "Modelo ergonômico e psicofísico que estabelece que o tempo necessário para mover o apontador até um alvo é proporcional à distância do movimento e inversamente proporcional à dimensão do alvo."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "hci"
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

**Fitts's Law** (em português, historicamente referida como *Lei de Fitts*) é uma lei fundamental da ergonometria e do *Human-Computer Interaction* (HCI) que estabelece que o tempo exigido para selecionar um alvo visual ou físico é determinado pela relação logarítmica entre a distância inicial até o alvo (*amplitude*) e a dimensão espacial útil desse mesmo alvo (*width*).

Formulada em 1954 pelo psicólogo Paul Fitts, a lei determina que elementos interativos maiores e posicionados mais próximos do ponto de origem da entrada do usuário exigem menor tempo de deslocamento e produzem menores taxas de erro. No âmbito das interfaces digitais, a fórmula clássica é dada por:

$$MT = a + b \cdot ID = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde $MT$ é o *Movement Time*, $D$ é a distância (*distance*), $W$ é a largura do alvo (*width*), $ID$ é o *Index of Difficulty* medido em bits, e $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada empregado.

---

# 2. Fundamentação Teórica e Cognitiva

A base científica da **Fitts's Law** repousa na Teoria da Informação de Claude Shannon, recontextualizada para o controle motor humano. O ato de apontar para um alvo é concebido como uma transmissão de informação através de um canal neuromotor com capacidade finita.

O processo de movimento divide-se em duas fases cognitivo-motoras iterativas:
1. **Fase de Movimento Balístico (Fase Primária):** Deslocamento rápido e de grande amplitude disparado pelo sistema motor central em direção à área aproximada do destino.
2. **Fase de Ajuste Fino (Fase Secundária):** Um *feedback loop* visual-motor em tempo real onde o cérebro processa desvios de trajetória e efetua microcorreções sucessivas à medida que o apontador se aproxima das bordas do alvo.

Quando a dimensão do alvo ($W$) diminui ou a distância ($D$) aumenta, o *Index of Difficulty* ($ID$) cresce exponencialmente. Isso força o sistema nervoso a executar múltiplos ciclos de retroalimentação visual para garantir a precisão final, aumentando significativamente a carga cognitiva e motora do usuário.

Na adaptação proposta por I. Scott MacKenzie para interfaces bidimensionais de computação (conhecida como formulação de Shannon), a equação assume a variação:

$$ID = \log_2\left(\frac{D}{W} + 1\right)$$

Esta variação impede que o *Index of Difficulty* assuma valores negativos ou nulos quando a distância até o alvo é extremamente pequena em relação à sua dimensão.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Dimensionamento proporcional à relevância:** Elementos primários de *Call to Action* (CTA) devem possuir uma área clicável substancialmente maior em comparação a ações secundárias ou destrutivas.
* **Exploração dos cantos e bordas (Magic Corners):** Na navegação desktop com cursor, os limites físicos do monitor atuam como barreiras absolutas. Como o cursor não pode ultrapassar a tela, o parâmetro $W$ desses cantos e bordas tende ao infinito, tornando os *magic corners* os alvos mais rápidos de se atingir.
* **Redução da distância de deslocamento:** Elementos acionados contextualmente (como menus de contexto em clique com botão direito ou menus sob a posição atual do toque) reduzem a distância $D$ a zero, anulando o tempo de deslocamento balístico.
* **Zoneamento ergonômico em dispositivos móveis:** Em telas sensíveis ao toque (*touchscreens*), os botões operacionais essenciais devem ser posicionados na zona de alcance natural do polegar (*thumb zone*), minimizando o estresse e a amplitude de movimento.

### Anti-padrões (Anti-patterns)
* **Pequenas áreas de toque (Tiny Touch Targets):** Alvos com área útil inferior a $48 \times 48 \text{ dp}$ em telas móveis criam altas taxas de erro mecânico (*fat-finger problem*).
* **Menus dropdown multinível encadeados:** Exigir que o cursor navegue por um canal estreito horizontal ou vertical viola tanto a **Fitts's Law** quanto a **Steering Law**, sobrecarregando a precisão visual do usuário.
* **Espaçamento insuficiente entre botões opostos:** Posicionar uma ação irreversível (ex: "Excluir") imediatamente adjacente a uma ação de alta frequência (ex: "Salvar") com áreas de toque reduzidas provoca disparos acidentais recorrentes devido ao desvio padrão de precisão motora.

---

# 4. Métricas e Impacto em Produto

| Métrica de Produto | Mecanismo de Impacto | Efeito Esperado |
| :--- | :--- | :--- |
| **Movement Time (MT)** | Diminuição de $D$ e aumento de $W$ nos fluxos críticos. | Redução direta no tempo total de execução da tarefa (*Task Completion Time*). |
| **Error Rate (Taxa de Erro)** | Expansão de *touch targets* acima do limiar mínimo ergonômico. | Queda em cliques errôneos e em interações acidentais indesejadas. |
| **Throughput (TP)** | Otimização do layout dos componentes de entrada em fluxos operacionais intensivos. | Aumento no volume de tarefas processadas por unidade de tempo por usuários avançados. |
| **Conversion Rate (CRO)** | Ampliação física e alinhamento do CTA primário no caminho focal do usuário. | Elevação nas taxas de conversão por diminuição do atrito mecânico no checkout/cadastro. |

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Define como o tempo de decisão varia de acordo com o número de escolhas, complementando o tempo de execução física da **Fitts's Law**.
* [[SteeringLaw]] — Extensão direta da Fitts's Law para a navegação por cenários e canais restritos em interfaces.
* [[CognitiveLoad]] — A precisão motora exigida por alvos pequenos consome capacidade de processamento cognitivo.

### Fontes
* FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
* MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
* LAWS OF UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.