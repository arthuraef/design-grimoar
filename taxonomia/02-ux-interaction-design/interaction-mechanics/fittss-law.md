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
summary: "Fitts's Law (Lei de Fitts) prediz que o tempo necessário para alcançar um alvo é uma função matemática da distância até o alvo e de sua respectiva dimensão."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "target-acquisition"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul M. Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
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
  - "[[HicksLaw]]"
  - "[[DohertyThreshold]]"
---

# 1. Definição Canônica
A **Fitts's Law** (Lei de Fitts) é um princípio fundamental da ergonomia e do design de interação que estabelece que o tempo necessário para mover rapidamente um cursor ou ponteiro até uma área de destino (alvo) é diretamente proporcional à distância espacial até ele e inversamente proporcional ao seu tamanho. Formulada originalmente pelo psicólogo Paul Fitts em 1954, a lei demonstra que alvos maiores e mais próximos exigem menor esforço motor e são atingidos com maior rapidez e precisão do que alvos distantes ou diminutos. No contexto de interfaces digitais, essa dinâmica governa a eficiência mecânica de qualquer elemento acionável, como botões, links e menus.

# 2. Fundamentação Teórica e Cognitiva
Do ponto de vista da biomecânica e do processamento sensório-motor humano, a execução de um movimento direcionado envolve um ciclo contínuo de feedback visual e ajustes neuromusculares. A formulação matemática subjacente, frequentemente expressa por variações do Índice de Dificuldade de Shannon, correlaciona o tempo de movimento ($MT$) com a distância ($D$) e a largura do alvo ($W$). 

Quando um usuário inicia um movimento em direção a um elemento interativo, o cérebro calcula a trajetória estimada. Movimentos de longa distância exigem maior aceleração e, consequentemente, uma fase de desaceleração mais complexa e controlada para garantir a precisão final (evitando o "overshoot", ou ultrapassagem do alvo). Da mesma forma, alvos com menor área superficial comprimem a tolerância ao erro, forçando microajustes motores custosos na fase terminal do gesto. A redução do custo físico e cognitivo associado a esses ajustes otimiza a fluidez da interação, minimizando o desgaste ergonômico em sessões prolongadas de uso.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Aplicação (Boas Práticas)
* **Ampliação de Alvos Críticos:** Dimensionar botões de ação principal (CTAs), como "Confirmar" ou "Salvar", com áreas de clique generosas para reduzir o tempo de aquisição.
* **Aproveitamento das Bordas da Tela:** Utilizar os cantos e as bordas de monitores ou dispositivos móveis para elementos essenciais (como barras de navegação ou menus flutuantes), uma vez que barreiras físicas ou virtuais infinitas impedem que o cursor ultrapasse o alvo, tornando o componente virtualmente infinito em termos de facilidade de alcance.
* **Proximidade Contextual:** Posicionar controles acionáveis correlacionados (por exemplo, botões de paginação ou opções de formulário) próximos ao ponto atual de foco do usuário para mitigar a distância de deslocamento ($D$).

### Anti-padrões (Erros Comuns)
* **Alvos Micrométricos:** Empregar elementos interativos isolados com dimensões inferiores aos padrões mínimos de acessibilidade tátil ou visual (como áreas de clique de 12x12 pixels em interfaces mobile).
* **Desacoplamento Espacial:** Dispor ações sequenciais de um fluxo em extremos opostos da viewport, obrigando o usuário a realizar varreduras visuais e motoras longas e desnecessárias.
* **Áreas de Toque Restritas ao Rótulo:** Restringir a interatividade estritamente aos caracteres do texto do link, ignorando a expansão do *hit box* (área de padding clicável) ao redor do elemento.

# 4. Métricas e Impacto em Produto
A aplicação correta da Lei de Fitts impacta diretamente métricas de usabilidade e performance quantitativa em produtos digitais, tais como:
* **Task Completion Time (Tempo de Conclusão da Tarefa):** Redução mensurável no tempo necessário para finalizar fluxos críticos de conversão (checkout, cadastros).
* **Error Rate (Taxa de Erro):** Diminuição da incidência de cliques ou toques perdidos (*miss-clicks*) em elementos de interface.
* **System Usability Scale (SUS):** Melhoria na percepção subjetiva de facilidade de uso e conforto ergonômico relatada pelos usuários.
* **Throughput (Vazão Motora):** Aumento na velocidade e precisão combinadas do usuário ao operar a interface.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[HicksLaw]]
* [[DohertyThreshold]]
* [[CognitiveLoad]]

### Fontes
* **Laws of UX:** [Fitts’s Law](https://lawsofux.com/fittss-law/)
* **Fitts, P. M. (1954):** *The information capacity of the human motor system in controlling the amplitude of movement.* Journal of Experimental Psychology.