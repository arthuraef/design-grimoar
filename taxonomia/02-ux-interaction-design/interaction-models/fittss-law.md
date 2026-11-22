---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-models"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo científico e preditivo do movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função matemática da distância até ele e do seu tamanho."
tags:
  - "fittss-law"
  - "usabilidade"
  - "ergonomia"
  - "interaction-design"
  - "motor-control"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design tool in human-computer interaction"
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
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um modelo formal de controle psicomotor que estabelece que o tempo necessário para mover um apontador até uma área de destino — o *target* — é uma função logarítmica da distância (*distance*) até o alvo dividida pela largura (*width*) do próprio alvo. 

Formulada originalmente em 1954 e posteriormente adaptada para a área de *Human-Computer Interaction* (HCI), a equação canônica é expressa matematicamente como:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
* $MT$ é o *Movement Time* (tempo de movimento).
* $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada e do operador.
* $D$ é a distância do ponto inicial ao centro do alvo.
* $W$ é a largura do alvo ao longo do eixo de movimento.
* O termo logarítmico $\log_2 \left( \frac{2D}{W} \right)$ representa o *Index of Difficulty* ($ID$), medido em *bits*.

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts, a lei baseia-se na teoria da informação do sistema motor humano. O ato de atingir um alvo em uma *Graphical User Interface* (GUI) ou *Natural User Interface* (NUI) envolve duas fases distintas de movimento:

1. **Ballistic Phase (Fase Balística):** Um movimento inicial rápido e de alta velocidade em direção ao alvo geral, guiado por programação motora sem alça de feedback em tempo real.
2. **Homing Phase (Fase de Ajuste Fino):** Um movimento lento e de correção contínua, governado por *visual feedback loop* à medida que o cursor se aproxima dos limites do alvo.

Conforme a largura do alvo ($W$) diminui ou a distância ($D$) aumenta, o tempo gasto na *homing phase* cresce exponencialmente. 

### Alvos Infinitos em Telas
Uma extensão fundamental da Fitts's Law em ambientes computacionais é a propriedade dos cantos e bordas da tela. Em sistemas com ponteiros retidos dentro da resolução do display (como sistemas operacionais de desktop), os cantos da tela possuem dimensão efetiva $W = \infty$, pois o cursor não pode passar da borda física. Isso torna os cantos os locais de acionamento mais rápidos e com o menor *Index of Difficulty* possível em uma GUI.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Positivas
* **Dimensional Scaling:** Aumente o *bounding box* interativo de elementos críticos (ex.: botões de *Primary Action* ou *Call to Action*), em vez de apenas ampliar o elemento gráfico visual.
* **Edge & Corner Placement:** Posicione menus globais e botões de alta frequência nas extremidades físicas da tela para aproveitar a borda infinita.
* **Contextual Proximity:** Reduza a distância física de deslocamento aproximando o controle da ação do contexto do usuário (ex.: *pie menus*, menus contextuais que aparecem no local exato do cursor via clique com botão direito).
* **Generous Hit Targets em Touch:** Em interfaces móveis, projete áreas de toque com no mínimo $48 \times 48 \text{ dp}$ (ou $9 \text{ mm}$), mitigando a imprevisibilidade do *finger-fat problem*.

### Anti-padrões
* **Tiny Touch Targets:** Botões ou hiperlinks excessivamente pequenos agrupados densamente, exigindo alto esforço de *homing phase* e resultando em *misclicks*.
* **Destructive Proximity:** Posicionar alvos de ações destrutivas (ex.: "Excluir") imediatamente adjacentes a alvos de confirmação primária (ex.: "Salvar") com áreas de toque reduzidas, o que aumenta drasticamente a probabilidade de acionamento acidental durante a rápida *ballistic phase*.
* **Excessive Travel Distance:** Exigir que o operador desloque o cursor por grandes distâncias entre entradas de formulário consecutivas ou etapas de confirmação sem interrupção de fluxo.

---

# 4. Métricas e Impacto em Produto

* **Throughput (TP):** Medida padronizada da taxa de transferência de informação humana (em bits/segundo), calculada como $TP = \frac{ID_e}{MT}$. Utilizada em benchmark de dispositivos de entrada (mouses, *trackpads*, *eye-tracking*).
* **Task Completion Time (TCT):** A aplicação correta da lei reduz a latência acumulada por interrupções e correções motoras, caindo o tempo total de conclusão de fluxos.
* **Error Rate (Miss Rate):** A porcentagem de tentativas de clique executadas fora dos limites do alvo diminui proporcionalmente ao aumento de $W$ e otimização do $ID$.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Define como o número de escolhas afeta o tempo de decisão que precede a fase de movimento da Fitts's Law.
* [[CognitiveLoad]] — A alta dificuldade motora ($ID$ elevado) consome recursos da memória de trabalho humana.
* [[DohertyThreshold]] — A otimização física do movimento contribui para manter a interação abaixo da latência de 400ms.

### Fontes
* Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
* Laws of UX (2026). *Fitts's Law*. Disponível em: https://lawsofux.com/en/fitts-law/
* MacKenzie, I. S. (1992). *Fitts' law as a research and design tool in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
