---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-ergonomics"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico e psicomotor que estabelece que o tempo necessário para mover um apontador até uma área de destino é uma função logarítmica da distância até o alvo dividida por sua dimensão."
tags:
  - "usabilidade"
  - "ergonomia"
  - "interaction-design"
  - "fitts-law"
aliases:
  - "Fitts Law"
  - "Lei de Fitts"
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
  - "[[LawOfProximity]]"
---

# 1. Definição Canônica

Fitts's Law (traduzida historicamente como Lei de Fitts) é um princípio fundamental da ergonomia e do *Interaction Design* que prevê o tempo de resposta psicomotor necessário para um indivíduo mover um dispositivo apontador (como cursor de mouse, caneta óptica ou o próprio dedo) até uma região de destino específica.

Formulada matematicamente, a lei postula que o *Movement Time* ($MT$) é diretamente proporcional à distância ($D$) percorrida até o objeto e inversamente proporcional à largura ou dimensão ($W$, de *Width*) do alvo ao longo do eixo de movimento. Sua expressão canônica é dada por:

$$MT = a + b \cdot \log_2\left(\frac{2D}{W}\right)$$

Onde a componente logarítmica $\log_2\left(\frac{2D}{W}\right)$ é denominada *Index of Difficulty* ($ID$), mensurada em bits, enquanto $a$ e $b$ representam constantes empíricas derivadas do hardware de entrada e da capacidade motora do usuário.

---

# 2. Fundamentação Teórica e Cognitiva

A base científica da Fitts's Law origina-se da Teoria da Informação de Claude Shannon, adaptada por Paul Fitts em 1954 para avaliar a capacidade de processamento do sistema motor humano. O ato de alcançar um elemento interativo não é uma trajetória contínua simples, mas um processo composto por duas fases distintas:

1. **Fase Balística Inicial:** Um movimento macroscópico rápido e impreciso direcionado à região aproximada do alvo, conduzido pelo planejamento motor primário.
2. **Fase de Correção Fina (Homing Phase):** Uma série de pequenos ajustes guiados por um *feedback loop* visual contínuo à medida que o apontador se aproxima dos limites do alvo.

Alvos menores exigem um número significativamente maior de ciclos de *feedback* visual e correções motoras de alta precisão, o que expande o *Index of Difficulty* e encarece a carga física e cognitiva da tarefa. 

Em ambientes de *Graphical User Interface* (GUI) operados por mouses, as bordas e cantos da tela possuem uma propriedade matemática singular conhecida como *Infinite Target Size*: como o cursor é fisicamente impedido de ultrapassar os limites do *display*, a dimensão efetiva do alvo ($W$) tende ao infinito naquela direção, reduzindo drasticamente o $MT$ necessário para a aquisição do elemento.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Design
* **Dimensionamento Adequado de Touch Targets:** Elementos interativos em interfaces de toque devem possuir áreas manipuláveis mínimas recomendadas (ex: 48x48 dp no Material Design ou 44x44 pt no iOS Human Interface Guidelines) para reduzir o tempo de aquisição e a taxa de erros.
* **Aproveitamento de Cantos e Bordas (Edge Targeting):** Posicionar elementos de acesso frequente, como menus globais, botões de fechamento ou barras de navegação, nas extremidades físicas da tela para explorar a propriedade de tamanho infinito.
* **Proximidade Contextual de Ações Relacionadas:** Reduzir a distância ($D$) agrupando espacialmente elementos que dependem da sequência direta do fluxo de trabalho (ex: popovers com botões de confirmação posicionados próximos ao gatilho original).
* **Expansão da Área Clicável Interna:** Ampliar o *hitbox* visual e invisível de botões, links em texto e ícones através de *padding* generoso, preservando o aspecto estético sem sacrificar a dimensão ($W$) operacional.

### Anti-padrões
* **Tiny Target Syndrome:** Apresentar elementos de ação primários ou críticos (*Call-to-Action*) com dimensões interativas extremamente reduzidas, forçando o usuário a desacelerar para efetuar correções micro-motoras.
* **Excessive Travel Distance:** Dispor elementos que operam em sequência lógica em polos opostos do layout (ex: um formulário no canto superior esquerdo com o botão de submissão no canto inferior direito de uma tela ultrawide).
* **Sub-menu Hover Traps:** Estruturas de menus cascateados aninhados e estreitos que exigem que o cursor seja movido em trajetórias perfeitamente retilíneas dentro de faixas reduzidas, sob o risco de fechar o menu ao menor desvio lateral.

---

# 4. Métricas e Impacto em Produto

A aplicação criteriosa de Fitts's Law afeta diretamente a eficiência operacional da interface e a percepção de fluidez da experiência:

* **Task Completion Time (TCT):** A otimização do $ID$ em fluxos de alta frequência reduz comprovadamente a latência motora agregada na realização de tarefas repetitivas.
* **Error Rate / Misclick Rate:** A expansão de *Touch Targets* reduz drasticamente os cliques ou toques acidentais fora do limite do elemento, diminuindo a frustração do usuário.
* **Conversion Rate (CR):** O aumento da dimensão e o posicionamento proeminente de *Call-to-Action* (CTA) primários minimizam a atrito motor nos pontos de conversão crítica (ex: botões de *Checkout* ou *Sign Up*).

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
* [[HicksLaw]]
* [[CognitiveLoad]]
* [[LawOfProximity]]

### Fontes
* FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
* MACKENZIE, I. Scott. Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, v. 7, n. 1, p. 91-139, 1992.
* YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media, 2020.
* LAWS OF UX. *Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026."
}