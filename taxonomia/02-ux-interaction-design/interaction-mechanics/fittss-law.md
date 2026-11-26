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
summary: "Fitts's Law modela o tempo necessário para alcançar um alvo interativo como uma função matemática direta da distância até o alvo e de sua respectiva área de superfície."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "interaction-mechanics"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul Morris Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added:
    - "Paul Morris Fitts (1954)"
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
**Fitts's Law** (Lei de Fitts) é um princípio preditivo da ergonomia e da interação humano-computador (IHC) que estabelece que o tempo necessário para adquirir um alvo (como um botão ou elemento interativo em uma interface) é uma função matemática direta da distância percorrida até o alvo e do tamanho (dimensão) do próprio alvo. Em termos práticos, quanto mais distante e menor for o elemento, maior será o tempo e o esforço motor necessários para interagir com ele.

# 2. Fundamentação Teórica e Cognitiva
Formulado originalmente pelo psicólogo Paul Morris Fitts em 1954, o modelo quantifica o sistema motor humano utilizando a teoria da informação de Shannon. O princípio demonstra que o movimento físico humano em direção a um estímulo espacial é regulado por um compromisso entre velocidade e precisão. 

Do ponto de vista cognitivo e biomecânico, o cérebro calcula constantemente o custo energético e o esforço neuromuscular para realizar uma ação de apontamento (*pointing*). Alvos amplos exigem menor controle motor fino e reduzem o risco de erro de sobreposição de cursor, enquanto alvos próximos reduzem drasticamente o tempo de trânsito cinemético. Consequentemente, interfaces que desrespeitam essa relação impõem uma sobrecarga motora desnecessária, aumentando a taxa de frustração e a fadiga física do usuário após interações repetidas.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas de Aplicação:
* **Maximizar a Área de Toque/Clique:** Projetar botões de Call-to-Action (CTA) primários com dimensões físicas confortáveis (ex: mínimo de 44x44 pixels para dispositivos táteis).
* **Explorar as Bordas da Tela:** Utilizar os cantos e as margens extremas de telas desktop para elementos críticos (como o menu iniciar ou botões de fechar), pois as bordas funcionam como barreiras infinitas que facilitam o posicionamento cego do cursor.
* **Proximidade Contextual:** Posicionar elementos de ação secundários ou sequenciais próximos uns dos outros para minimizar a distância de deslocamento do cursor ou do polegar.

## Anti-padrões Comuns:
* **Alvos Microscópicos:** Utilizar links de texto isolados e sem padding adequado para interações por toque ou clique rápido.
* **Dispersão Espacial Irrisória:** Distribuir botões inter relacionados em cantos opostos da viewport, forçando o usuário a percorrer grandes distâncias visuais e motoras sem justificativa ergonômica.
* **Ignorar as Margens:** Posicionar elementos de alta frequência de uso flutuando no centro absoluto da tela, longe das zonas de alcance natural dos dedos em dispositivos móveis (*thumb zone*).

# 4. Métricas e Impacto em Produto
A aplicação correta da Lei de Fitts impacta diretamente métricas de usabilidade e performance de tarefas:
* **Task Completion Time (Tempo de Conclusão de Tarefa):** Reduz significativamente o tempo necessário para finalizar fluxos críticos de conversão (ex: checkout ou cadastro).
* **Error Rate (Taxa de Erro):** Diminui cliques acidentais ou falhas de direcionamento (*misclicks*).
* **System Usability Scale (SUS):** Melhora a percepção subjetiva de fluidez e conforto ergonômico da aplicação.
* **Conversion Rate (Taxa de Conversão):** Eleva os índices de cliques em CTAs principais quando estes possuem dimensões otimizadas e posicionamento estratégico.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[Hick's Law]]
* [[Cognitive Load]]
* [[Paradox of the Active User]]

**Fontes:**
- *Laws of UX* - [Fitts's Law](https://lawsofux.com/fittss-law/)
- *Fitts, P. M. (1954)* - *The information capacity of the human motor system in controlling the amplitude of movement.* Journal of Experimental Psychology.