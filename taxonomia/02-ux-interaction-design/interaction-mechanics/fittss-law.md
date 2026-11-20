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
summary: "Fitts's Law modeliza o tempo necessário para alcançar um alvo interativo como uma função matemática direta da distância até o objetivo e de sua área dimensionada."
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
  academic_anchor_added:
    - "Paul Morris Fitts (1954)"
sources:
  - title: "Laws of UX"
    url: "https://lawsofux.com/fittss-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[Hicks Law]]"
  - "[[Cognitive Load]]"
---

# 1. Definição Canônica
Fitts's Law (Lei de Fitts) é um princípio fundamental da ergonomia e da interação humano-computador que estabelece que o tempo necessário para adquirir um alvo interativo (como um botão, ícone ou elemento de interface) é uma função direta da distância física até o objeto e do tamanho do próprio alvo. Em termos práticos, quanto mais distante o elemento e quanto menor a sua área de clique, maior será o tempo de aquisição motora e a propensão a erros operacionais.

# 2. Fundamentação Teórica e Cognitiva
Derivada originalmente da psicologia experimental e da biomecânica humana por Paul M. Fitts em 1954, a lei fundamenta-se na limitação do sistema motor humano ao processar movimentos guiados por feedback visual e cinestésico. O modelo matemático subjacente relaciona o Índice de Dificuldade ($ID$), medido em bits, com a distância ao alvo ($D$) e a largura do alvo na direção do movimento ($W$), expressa pela fórmula genérica $ID = \log_2(2D/W)$. 

Cognitivamente e fisicamente, o ato de apontar e clicar exige um processo iterativo: a fase inicial balística (movimento rápido em direção à área geral do alvo) seguida pela fase de correção guiada por feedback visual de curto alcance. Reduzir a distância ou ampliar a superfície clicável minimiza o esforço neuromotor necessário, diminuindo o estresse cognitivo associado à precisão motora fina exigida da interface.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Aplicação (Boas Práticas)
* **Ampliação de Alvos Críticos:** Projetar botões de alta conversão ou ações destrutivas (como "Excluir" ou "Comprar") com dimensões físicas generosas para facilitar a aquisição rápida.
* **Aproveitamento das Bordas da Tela:** Utilizar os cantos e as margens extremas do viewport para elementos de navegação primários. Como o ponteiro do mouse cessa o movimento na borda, a largura efetiva do alvo torna-se teoricamente infinita, reduzindo a zero o erro de overshoot.
* **Zonas de Toque Expandidas:** Garantir que elementos gráficos pequenos (como ícones de fechar em modais) possuam áreas de toque (*hit targets*) invisíveis mas amplificadas, respeitando o mínimo ergonômico recomendado (ex: 48x48dp em plataformas móveis).

### Anti-padrões (Erros Comuns)
* **Micro-alvos Isolados:** Posicionar botões de ação crítica em áreas de difícil acesso (como o centro superior de telas amplas) combinados com dimensões reduzidas.
* **Agrupamento Excessivo de Alvos Distintos:** Colocar múltiplos elementos interativos densamente aglomerados sem espaçamento adequado, induzindo a cliques acidentais e erros de mira (*fat-finger syndrome*).
* **Desconsideração do Contexto Físico:** Projetar interfaces móveis que exigem precisão cirúrgica de toque com o polegar em áreas distantes da zona natural de alcance da mão.

# 4. Métricas e Impacto em Produto
A aplicação correta de Fitts's Law gera impactos diretos nas métricas de usabilidade e eficiência de negócios:
* **Task Completion Time (Tempo de Conclusão de Tarefa):** Reduz significativamente o tempo médio para finalizar fluxos críticos de conversão.
* **Error Rate (Taxa de Erro):** Diminui os cliques acidentais ou errôneos, minimizando a frustração do usuário e o suporte ao cliente.
* **System Usability Scale (SUS):** Eleva a percepção geral de fluidez e ergonomia do produto digital.
* **Conversion Rate (Taxa de Conversão):** Otimiza funis de vendas ao posicionar CTAs (*Call to Actions*) em locais de alta acessibilidade motora.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[Hicks Law]]
* [[Cognitive Load]]
* [[Law of Proximity]]

**Fontes Consultadas:**
* Fitts, Paul M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology.
* Laws of UX - Fitts’s Law: [https://lawsofux.com/fittss-law/](https://lawsofux.com/fittss-law/)
