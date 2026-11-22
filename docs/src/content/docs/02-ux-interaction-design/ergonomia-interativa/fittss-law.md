---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomia-interativa"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de controle psicomotor que determina que o tempo necessário para mover o apontador até um alvo é uma função logarítmica da distância até o alvo dividida por sua largura."
tags:
  - "usabilidade"
  - "ergonomia"
  - "interaction-design"
  - "hci"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design model in human-computer interaction"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added:
    - "Fitts, P. M. (1954)"
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[TeslersLaw]]"
---

# 1. Definição Canônica

Formulada pelo psicólogo Paul Fitts em 1954, a **Fitts's Law** (traduzida no contexto de IHC como *Lei de Fitts*) é um modelo científico do movimento humano que estabelece que o tempo necessário para alcançar um alvo motor (*target*) é proporcional à distância até ele e inversamente proporcional ao seu tamanho físico ou virtual. Em termos formais de *Human-Computer Interaction* (HCI), a lei determina que elementos de interação maiores e dispostos mais próximos do ponto de origem do ponteiro ou polegar exigem menos tempo e esforço para aquisição visual e motora.

A formulação matemática clássica expandida por Shannon define o Tempo de Movimento ($MT$) como:

$$MT = a + b \log_2 \left( \frac{D}{W} + 1 \right)$$

Onde:
* $D$ representa a distância (*Distance*) ao alvo.
* $W$ representa a largura (*Width*) do alvo ao longo do eixo de movimento.
* $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada (*input device*).
* O termo logarítmico representa o Índice de Dificuldade (*Index of Difficulty* - ID).

# 2. Fundamentação Teórica e Cognitiva

A base neurocognitiva da Fitts's Law fundamenta-se no compromisso entre velocidade e precisão (*Speed-Accuracy Trade-off*) do sistema motor humano. O ato de mover um cursor ou um dedo até um alvo na interface consiste em dois estágios motores principais:

1. **Movimento Balístico Inicial:** Um impulso de alta velocidade que projeta o membro na direção aproximada do alvo.
2. **Correções de Malha Fechada (*Feedback Control Loop*):** Microajustes visuo-motores contínuos acionados pelo sistema nervoso central à medida que o membro se aproxima do perímetro do alvo.

Conforme a dimensão $W$ do alvo diminui ou a distância $D$ aumenta, a necessidade de processamento visual para correções de malha fechada se intensifica, exigindo maior tempo e carga atencional.

Em interfaces desktop, a Fitts's Law manifesta o conceito de "alvos infinitos" (*infinite targets*). Cantos e bordas da tela possuem dimensão funcional infinita, pois o ponteiro do mouse é retido pelos limites físicos da tela, eliminando a probabilidade de extrapolação (*overshooting*) e reduzindo o tempo de aquisição ao mínimo teórico.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Dimensionamento proporcional de CTA (*Call-to-Action*):** Aumente a área clicável de botões críticos e ações primárias. No design para dispositivos móveis, a recomendação mínima do *touch target* é de 48x48 dp/pt.
* **Maximização das bordas físicas:** Posicione menus principais, botões de fechamento ou *navigation bars* nos cantos ou limites da tela para criar alvos virtuais de fácil alcance.
* **Zonamento por frequência de uso:** Posicione elementos interativos frequentes em áreas de descanso natural da mão ou do ponteiro (ex.: *thumb zone* em dispositivos móveis).
* **Agrupamento de elementos correlatos:** Reduza a distância ($D$) entre um campo de entrada de texto e seu respectivo botão de submissão para otimizar o fluxo motor.

### Anti-padrões
* **Micro-alvos (*Tiny Touch Targets*):** Utilizar botões de texto ou ícones minúsculos (abaixo de 24x24 px) sem espaçamento estendido, resultando em erros de toque e frustração do usuário.
* **Distância excessiva entre ações vinculadas:** Posicionar uma caixa de confirmação no lado oposto de um controle de alteração, exigindo longos trajetos balísticos do cursor.
* **Proximidade perigosa de ações destrutivas:** Colocar um botão de exclusão minúsculo imediatamente adjacente a um botão de confirmação primário sem padding de proteção.

# 4. Métricas e Impacto em Produto

A implementação da Fitts's Law afeta diretamente a eficiência operacional das interfaces de usuário e reduz custos cognitivos:

* **Task Completion Time (TCT):** A otimização dos valores $D$ e $W$ reduz diretamente a latência de execução de tarefas motoras repetitivas.
* **Taxa de Erro de Clique (*Mislick Rate*):** Alvos dimensionados abaixo da capacidade de precisão do dispositivo registram altos índices de disparos acidentais (*misclicks*), afetando o *Task Success Rate*.
* **Throughput (TP):** Métrica padronizada pela norma ISO 9241-9 para quantificar a taxa de transferência de informação no uso de *input devices*, calculada pela razão entre o Índice de Dificuldade ($ID$) e o tempo médio de execução ($MT$).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]] — Define como o tempo de tomada de decisão afeta o tempo total antes do início da ação motora.
* [[CognitiveLoad]] — A redução da exigência de precisão motora diminui a carga cognitiva do usuário.
* [[TeslersLaw]] — A complexidade intrínseca de navegação motora deve ser absorvida pelo sistema via posicionamento inteligente.

### Fontes Principais
* **Fitts, P. M.** (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
* **MacKenzie, I. S.** (1992). *Fitts' law as a research and design model in human-computer interaction*. Human-Computer Interaction, 7(1), 91-139.
* **Yablonski, J.** (2020). *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media.
