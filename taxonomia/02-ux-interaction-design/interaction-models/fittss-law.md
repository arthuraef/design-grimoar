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
summary: "Modelo preditivo de comportamento psicomotor que estabelece que o tempo necessário para alcançar um alvo é uma função direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "fittss-law"
  - "target-acquisition"
  - "ergonomics"
  - "interaction-design"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
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
  - "[[Affordance]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um modelo formal de ergonomia e Human-Computer Interaction (HCI) que quantifica o tempo necessário para mover um apontador (seja um cursor físico, dedo ou stylus) até uma área de destino predeterminada. Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto da psicomotricidade humana, a lei postula que a velocidade e a precisão da aquisição de alvos são governadas pela relação geométrica entre a distância percorrida e a dimensão física do alvo.

Matematicamente, o tempo de movimento (Movement Time - MT) é expressado pela fórmula:

$$MT = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde:
*   $D$ representa a distância (Distance) até o alvo.
*   $W$ representa a largura (Width) do alvo ao longo do eixo de movimento.
*   $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada e do ambiente motor.
*   O termo $\log_2(2D / W)$ define o *Index of Difficulty* (ID), medido em bits.

# 2. Fundamentação Teórica e Cognitiva

A base neurocognitiva da Fitts's Law fundamenta-se no sistema de controle motor humano de malha fechada (*closed-loop motor control*). Ao executar um movimento direcionado a um alvo visual:

1.  **Fase Ballistic Original (Open-Loop):** O cérebro executa um impulso motor inicial de alta velocidade projetado para cobrir a maior parte da distância ($D$).
2.  **Fase Correutiva Homogênea (Closed-Loop):** Conforme o apontador se aproxima do alvo, o sistema visual envia *feedback* contínuo para realizar microajustes de precisão. Alvos menores exigem múltiplos ciclos de feedback visual e motor, aumentando substancialmente o tempo total de execução.

No contexto de interfaces digitais, a lei ganha contornos específicos:
*   **Infinite Edges:** As bordas físicas e cantos da tela em interfaces desktop atuam como alvos com dimensão virtualmente infinita ($W = \infty$), pois a trava do cursor impede o ultrapasso, eliminando a necessidade da fase corretiva de ajuste.
*   **Touch Targets:** Em telas sensíveis ao toque, a variabilidade do apêndice físico (dedo polegar versus indicador) e a falta de precisão mecânica demandam áreas de toque estendidas para manter o *Index of Difficulty* baixo.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas Recomendadas

*   **Maximizar a Área Interativa (Hitbox Expansion):** Aumentar o *padding* dos elementos interativos sem necessariamente alterar o peso visual dos ícones ou texto, garantindo uma bounding box expandida.
*   **Redução da Distância de Deslocamento:** Posicionar menus contextuais, menus de clique com botão direito e *popovers* imediatamente adjacentes à posição atual do cursor ou foco de entrada.
*   **Aproveitamento das Bordas e Cantos da Tela:** Posicionar botões de alta frequência funcional (como barras de ferramentas fixas ou botões de fechar) nos limites da tela em ambientes desktop para maximizar a área efetiva de captura.
*   **Dimensionamento Adequado de Touch Targets:** Garantir que componentes interativos em layouts mobile possuam uma dimensão mínima recomendada de 48x48 CSS pixels (ou 48x48 dp), prevendo a zona de oclusão do dedo.

## Anti-padrões

*   **Cascading Dropdown Menus Distantes:** Listas suspensas em cascata que exigem navegação de precisão em eixos estreitos e através de grandes distâncias na tela.
*   **Botões Críticos Diminutos:** Call to Action (CTA) primários renderizados com alvos de clique inferiores a 24px, exigindo desaceleração psicomotora excessiva.
*   **Proximidade de Ações Destrutivas:** Posicionar o botão "Excluir" em extrema proximidade do botão "Salvar" com pequenas hitboxes, resultando em altas taxas de erro operacional por desaceleração imperfeita.

# 4. Métricas e Impacto em Produto

A correta aplicação da Fitts's Law correlaciona-se diretamente com o desempenho operacional e a eficiência do usuário em sistemas digitais:

*   **Task Completion Time (TCT):** A otimização do *Index of Difficulty* reduz o tempo gasto na conclusão de fluxos operacionais de alta frequência.
*   **Misclick Rate / Error Rate:** A expansão de hitboxes e o espaçamento adequado entre alvos reduzem diretamente o número de cliques ou toques acidentais em elementos adjacentes.
*   **Conversion Rate (CR):** O aumento das dimensões relativas e a localização tática de alvos primários de conversão reduzem a fricção motora do usuário no encerramento da ação.
*   **Throughput (TP):** Métricas padronizadas em normas como a ISO 9241-9 avaliam a eficiência da interação em bits por segundo ($TP = ID / MT$).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

*   [[HicksLaw]] — Define como o tempo de tomada de decisão afeta a seleção de opções antes da execução motora.
*   [[CognitiveLoad]] — Descreve o esforço mental exigido para processar a localização dos alvos visuais.
*   [[Affordance]] — Indica como as pistas visuais sinalizam visualmente a capacidade de interação de um alvo.

## Fontes
*   Fitts, Paul M. "The information capacity of the human motor system in controlling the amplitude of movement." *Journal of Experimental Psychology*, vol. 47, no. 6, 1954, pp. 381–391.
*   Yablonski, Jon. *Laws of UX: Using Psychology to Design Better Products and Services*. O'Reilly Media, 2020.
*   ISO 9241-9:2000. *Ergonomics of human-system interaction — Part 9: Requirements for non-keyboard input devices*. International Organization for Standardization.
