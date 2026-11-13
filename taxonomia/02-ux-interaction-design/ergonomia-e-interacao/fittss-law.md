---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomia-e-interacao"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de movimento humano que estabelece que o tempo necessário para alcançar um alvo é uma função matemática direta da distância até ele e inversamente proporcional ao seu tamanho."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ihc"
  - "ergonomia"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added:
    - "Paul Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[SteeringLaw]]"
---

# 1. Definição Canônica

**Fitts's Law** (traduzido formalmente para o português como *Lei de Fitts*) é um princípio fundamental da ergonomia e da *Human-Computer Interaction* (HCI) que estabelece que o tempo necessário para mover um apontador até uma área de destino (*target*) é determinado pela combinação da distância (*distance*) até esse elemento e de sua dimensão física ou espacial (*size*).

Em termos práticos de design de interface, a lei dita que quanto menor e mais distante estiver um elemento interativo da posição atual do cursor ou do polegar do usuário, mais demorada e propensa a erros será a tentativa de seleção.

# 2. Fundamentação Teórica e Cognitiva

Formulada originalmente pelo psicólogo Paul Fitts em 1954 no contexto do controle motor humano, a lei foi estendida para o domínio de interfaces digitais por Stuart Card, Thomas Moran e Allen Newell na década de 1980.

A relação matemática clássica é expressa pela equação:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- $MT$ (*Movement Time*): tempo total necessário para completar o movimento.
- $a$ e $b$: constantes empíricas derivadas do dispositivo de entrada e do operador.
- $D$ (*Distance*): distância do ponto inicial ao centro do alvo.
- $W$ (*Width*): largura do alvo ao longo do eixo de movimento.
- $\log_2 \left( \frac{2D}{W} \right)$: representa o *Index of Difficulty* (ID), medido em *bits*.

Do ponto de vista da psicologia cognitiva e da neurociência motora, o movimento em direção a um alvo ocorre em duas fases principais:
1. **Movimento Balístico Inicial**: um salto motor rápido e aproximado em direção ao alvo executado pelo sistema nervoso central.
2. **Correção Feedback-Visual Fine-Tuning**: ajustes finos contínuos baseados na alça de feedback visual conforme o apontador se aproxima dos limites de $W$.

Em ambientes de *desktop GUI*, os cantos e bordas da tela possuem uma dimensão efetiva $W$ teoricamente infinita, pois o cursor físico não pode ultrapassar o limite do display. Isso torna os cantos de tela as posições de menor *Index of Difficulty* e mais rápidas de atingir.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Direcionais
- **Maximizar a Hit Area de Elementos Interativos**: expandir a superfície clicável através de *padding* interno transparente, sem necessariamente inflar a representação visual do ícone ou texto.
- **Otimização por Proximidade Temporal**: posicionar ações primárias contextuais (ex: menus suspensos, popovers ou botões de ação contíguos) o mais próximo possível da posição corrente do foco ou cursor.
- **Aproveitamento de Bordas e Cantos**: em sistemas desktop, posicionar elementos operacionais críticos (como barras de navegação ou botões de fechamento) nas extremidades físicas do display para tirar proveito da borda infinita.
- **Adaptação para Thumb Zone em Mobile**: projetar fluxos móveis alinhando os principais *Call to Action* (CTA) à região inferior central da tela, acessível ao alcance natural do polegar.

### Anti-padrões
- **Micro Touch Targets**: botões ou links isolados com dimensões inferiores às diretrizes mínimas de acessibilidade (ex: menores que $44 \times 44$ pt no iOS ou $48 \times 48$ dp no Android).
- **Dispersão de Elementos Correlatos**: exigir que o usuário percorra grandes distâncias na tela para acionar confirmações subsequentes a um preenchimento de formulário.
- **Hit Boxes Desalinhadas com a Representação Visual**: botões cujo limite clicável é estritamente restrito ao traço tipográfico do texto, ignorando a caixa envolvente.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT)**: redução direta do tempo total gasto para conclusão de tarefas operacionais ao otimizar a trajetória do input.
- **Error Rate / Misclick Rate**: diminuição na taxa de acionamentos acidentais em elementos adjacentes devida ao aumento da área efetiva ($W$).
- **Throughput (TP)**: métrica padronizada pela norma ISO 9241-9 que mede a eficiência de dispositivos de apontamento calculada em $bits/segundo$.
- **Conversion Rate**: aumento mensurável no alcance de CTAs essenciais quando posicionados em zonas de menor *Index of Difficulty*.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — trata do impacto do número de opções no tempo de tomada de decisão pré-motor.
- [[CognitiveLoad]] — fundamenta a redução do esforço visual e motor exigido na interface.
- [[SteeringLaw]] — extensão da Fitts's Law para trajetórias restritas por túneis ou caminhos.

### Fontes
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- CARD, Stuart K.; MORAN, Thomas P.; NEWELL, Allen. *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum Associates, 1983.
- LAWS OF UX. *Fitts’s Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.