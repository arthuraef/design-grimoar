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
summary: "Modelo preditivo do movimento humano que estabelece que o tempo necessário para atingir um alvo é uma função da distância até ele e da sua dimensão física."
tags:
  - "usability"
  - "interaction-design"
  - "ergonomics"
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
  - "[[HicksLaw]]"
  - "[[JakobsLaw]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica
**Fitts's Law** (Lei de Fitts) é um princípio ergonômico e um modelo preditivo de *interaction design* que postula que o tempo necessário para selecionar ou alcançar um determinado alvo é determinado pela razão entre a distância total até ele e a dimensão física do próprio alvo. Quanto mais próximo o ponto de controle estiver do elemento interativo e quanto maior for a superfície de aquisição desse elemento, maior será a velocidade e a precisão do movimento executado pelo usuário.

# 2. Fundamentação Teórica e Cognitiva
Formulada originalmente por Paul Fitts em 1954 no contexto da psicologia experimental e do controle neuromuscular humano, a equação quantifica a capacidade de processamento de informação do sistema psicomotor. Matematicamente expressa através do *Index of Difficulty* (ID), a lei descreve a movimentação motora humana como uma sequência bifurcada de fases:

1. **Movimento Balístico Inicial:** Um deslocamento rápido e bruto em direção ao objetivo estimado pelo sistema nervoso.
2. **Ajuste Fino de Precisão:** Correções contínuas impulsionadas pelo *feedback* visual e cinestésico à medida que a extremidade do cursor ou dedo se aproxima das bordas do elemento.

Alvos diminutos ou posicionados a longas distâncias aumentam significativamente o tempo de processamento visual e muscular, forçando o usuário a desacelerar para evitar o *overshooting* (ultrapassar os limites da área interativa). Por outro lado, alvos maiores minimizam a necessidade dessa fase de ajuste fino, aliviando o esforço psicomotor.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Aplicação:
* **Maximização do Interactive Hit Target:** Expandir as áreas de toque ou clique para além dos limites estritamente visuais dos ícones e textos através do uso defensivo de *padding*, fornecendo maior margem para acionamentos imprecisos.
* **Aproveitamento de Bordas e Cantos (Infinite Target Size):** Posicionar elementos críticos de comando nas extremidades da tela de exibições *desktop*, aproveitando o fato de que o cursor físico é detido pela borda do monitor, conferindo virtualmente uma dimensão infinita ao alvo.
* **Otimização de Trajetória e Proximidade:** Dispor opções complementares e fluxos contextuais imediatos próximos do ponto de origem do ponteiro ou do alcance primário dos polegares em dispositivos móveis.

### Anti-padrões:
* **Micro-alvos Interativos:** Implementar botões, links ou seletores com dimensões reduzidas (abaixo de 44x44 pixels em telas de *touch*), aumentando a taxa de erro manual.
* **Dispersão Espacial Sequencial:** Espaçar fisicamente botões de ações sequenciais ou dependentes, obrigando o usuário a realizar percursos extensos e repetitivos no ambiente digital.

# 4. Métricas e Impacto em Produto
A aplicação consistente dos princípios derivados deste modelo afeta diretamente o desempenho operacional em produtos digitais, podendo ser avaliada por:
* **Task Completion Time:** Diminuição no tempo total demandado para a execução de fluxos e comandos de alta frequência.
* **Error Rate (Missclick Rate):** Queda percentual no volume de cliques ou toques acidentais fora do *hit target* correto.
* **Throughput:** Aumento da eficiência e da densidade de interações bem-sucedidas por unidade de tempo sem perda de exatidão.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[HicksLaw]]
* [[JakobsLaw]]
* [[CognitiveLoad]]

### Fontes:
* [Laws of UX - Fitts's Law](https://lawsofux.com/fittss-law/)