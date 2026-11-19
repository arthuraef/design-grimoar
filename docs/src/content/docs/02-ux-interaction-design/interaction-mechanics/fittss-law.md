---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-mechanics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para alcançar um alvo é uma função matemática da distância até ele e de sua respectiva dimensão."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul Morris Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX - Fitts's Law"
    url: "https://lawsofux.com/fittss-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[Hick's Law]]"
  - "[[Cognitive Load]]"
---

# 1. Definição Canônica
Fitts's Law (Lei de Fitts) é um princípio preditivo da ergonomia e da interação humano-computador que postula que o tempo necessário para adquirir um alvo (target) através de um dispositivo apontador é uma função direta da distância a ser percorrida até o alvo e inversamente proporcional ao tamanho do próprio alvo. Em termos práticos de design de interface, elementos maiores e mais próximos da posição atual do cursor ou toque humano são ativados com maior velocidade e precisão.

# 2. Fundamentação Teórica e Cognitiva
Originada no campo da psicologia experimental e da engenharia de fatores humanos através do trabalho pioneiro de Paul M. Fitts em 1954, a lei modela quantitativamente o sistema motor humano. Do ponto de vista cognitivo e biomecânico, o movimento de alcançar um objeto não é um ato unitário, mas um processo de feedback corretivo contínuo. 

A formulação matemática clássica (frequentemente expressa através do Índice de Dificuldade de Shannon, $ID = \log_2(2D/W)$, onde $D$ é a distância e $W$ é a largura do alvo) demonstra que o custo metabólico e cognitivo-motor aumenta logaritmicamente conforme o alvo se afasta ou se torna exíguo. O cérebro humano despende mais recursos neurais e tempo de processamento para coordenar microajustes motores quando a margem de erro permitida pelas bordas do alvo é reduzida.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
Para otimizar fluxos de interação digital com base nesta lei, os designers devem aplicar diretrizes estruturais estritas na hierarquia de posicionamento e dimensionamento de elementos interativos:

*   **Heurística de Proximidade Crítica:** Posicione ações frequentes ou subsequentes (como botões de confirmação em modais) adjacentes ao local onde o usuário concluiu a ação anterior, minimizando a distância ($D$).
*   **Heurística de Escala Adequada:** Assegure dimensões de toque e clique generosas ($W$), especialmente em dispositivos móveis, respeitando os limiares ergonômicos recomendados para dedos e cursores.
*   **Aproveitamento de Cantos e Bordas:** Utilize as extremidades da tela (cantos de monitores em desktops) para elementos críticos (como menus de sistema ou botões de fechar), uma vez que barreiras físicas ou virtuais infinitas reduzem o problema de mira para zero dimensão efetiva.
*   **Anti-padrão de Alvos Isolados e Minúsculos:** Agrupar ações destrutivas ou de alta frequência (ex: excluir/cancelar) em áreas de difícil acesso visual e motor, distantes do foco primário de leitura do usuário.
*   **Anti-padrão de Assimetria Escalar:** Projetar botões de CTA primários com tamanhos idênticos ou inferiores a links secundários irrelevantes, violando a proporção de esforço motor esperado.

# 4. Métricas e Impacto em Produto
A aplicação correta da Lei de Fitts impacta diretamente métricas de usabilidade e performance quantitativa:
*   **Task Completion Time (Tempo de Conclusão de Tarefa):** Reduz o tempo médio necessário para finalizar fluxos críticos de conversão (checkout, cadastros).
*   **Error Rate (Taxa de Erro):** Diminui os índices de cliques errados (mis-clicks) ou toques perdidos em interfaces touch, elevando a precisão geral da interação.
*   **System Usability Scale (SUS):** Melhora a percepção subjetiva de fluidez e facilidade de uso do produto digital.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
*   [[Hick's Law]]
*   [[Cognitive Load]]
*   [[Jakob's Law]]