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
summary: "A lei de Fitts estabelece que o tempo necessário para alcançar um alvo interativo é uma função matemática direta da distância até o alvo e de suas dimensões físicas."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "ergonomia digital"
aliases:
  - "Lei de Fitts"
  - "Fitts' Law"
academic_anchors:
  - "Paul Morris Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX"
    url: "https://lawsofux.com/fittss-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[Hicks Law]]"
  - "[[Miller's Law]]"
---

# 1. Definição Canônica
A **Fitts's Law** (Lei de Fitts) é um princípio preditivo da ergonomia e da interação humano-computador que postula que o tempo necessário para mover rapidamente um ponteiro (ou dedo) em direção a uma área de alvo (target) é uma função da distância até o alvo dividida pelo seu tamanho. Em termos práticos de *User Experience* (experiência do usuário) e *Interaction Design* (design de interação), quanto maior o elemento interativo e mais próximo ele estiver do ponto de partida do cursor ou do toque, menor será o esforço motor e o tempo de aquisição necessários para acioná-lo.

# 2. Fundamentação Teórica e Cognitiva
Originalmente formulada pelo psicólogo Paul Morris Fitts em 1954, a lei fundamenta-se nos limites do sistema motor humano e na biomecânica dos movimentos direcionados. Cognitivamente e fisicamente, o ato de apontar e clicar exige um cálculo neuromuscular contínuo que equilibra a velocidade do movimento com a precisão espacial. 

Matematicamente expressa por variações do índice de dificuldade de Shannon ($ID = \log_2(2D/W)$, onde $D$ é a distância e $W$ é a largura do alvo), a teoria demonstra que alvos diminutos posicionados em pontos distantes exigem um ajuste fino e demorado na fase final da trajetória do cursor (conhecida como fase corretiva). Por outro lado, cantos e bordas da tela possuem uma largura teórica infinita em ambientes de computação de desktop, tornando-os alvos de aquisição extremamente otimizados, pois o movimento do cursor é interrompido mecanicamente pelas margens do monitor.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas de Aplicação (Do's)
* **Ampliação de Touch Targets:** Projetar elementos clicáveis em dispositivos móveis com dimensões mínimas adequadas à ergonomia dos dedos (ex: padrão mínimo recomendável de 48x48dp).
* **Posicionamento Estratégico:** Alocar ações primárias e recorrentes (*call to actions*, botões de confirmação) em locais de fácil acesso visual e motor.
* **Aproveitamento de Bordas e Cantos:** Utilizar as bordas de telas e interfaces *full-screen* para menus fixos, barras de navegação ou botões críticos, aproveitando a largura infinita das margens.
* **Menus Radiais:** Empregar interfaces circulares onde todas as opções equidistantem do ponto central de disparo, otimizando o tempo de acesso.

## Anti-padrões a Evitar (Don'ts)
* **Dispersão de Controles Relacionados:** Espalhar elementos de um fluxo sequencial por cantos opostos da tela, forçando o usuário a percorrer grandes distâncias motoras.
* **Alvos Micrométricos:** Inserir botões com áreas de clique diminutas (< 24px) isolados no meio de áreas vazias, aumentando a taxa de erro (*miss-clicks*).
* **Ignorar a Lei em Versões Mobile:** Manter elementos fixados em cantos superiores difíceis de alcançar com o uso de uma única mão em smartphones.

# 4. Métricas e Impacto em Produto
A aplicação correta da **Fitts's Law** impacta diretamente métricas fundamentais de produto:
* **Task Completion Time (Tempo de Conclusão da Tarefa):** Reduz o tempo total gasto em fluxos transacionais e interativos.
* **Error Rate (Taxa de Erro):** Diminui significativamente os cliques perdidos ou toques acidentais em elementos adjacentes.
* **System Usability Scale (SUS):** Melhora a percepção de fluidez ergonômica e eficiência geral da interface.
* **Conversion Rate (Taxa de Conversão):** Eleva a conversão em funis de checkout e landing pages ao tornar os botões de ação primária instantaneamente acessíveis.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[Hicks Law]]
* [[Miller's Law]]
* [[Postel's Law]]

## Fontes
* [Laws of UX - Fitts’s Law](https://lawsofux.com/fittss-law/)