---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "ergonomics-and-interaction"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo ergonômico preditivo que estabelece o tempo necessário para mover um apontador até um alvo como função da distância e do tamanho da superfície de destino."
tags:
  - "usabilidade"
  - "interaction-design"
  - "ergonomia"
  - "fitts-law"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Fitts, P. M. (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
  - "MacKenzie, I. S. (1992) - Fitts' law as a research and design model in human-computer interaction"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX: Fitts's Law"
    url: "https://lawsofux.com/en/fitts-law/"
    type: "article"
    accessed_at: "2026-11-06"
cross_references:
  - "[[HicksLaw]]"
  - "[[CognitiveLoad]]"
  - "[[MillerLaw]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts em português) é um modelo psicofísico de interação humano-computador que estabelece que o tempo necessário para alcançar e selecionar um alvo (*target*) é determinado por uma relação funcional entre a distância até a sua localização e a dimensão física do próprio elemento. Em termos práticos de design de interface, elementos menores e mais afastados do ponto de origem do cursor ou do gesto de toque requerem um intervalo de tempo significativamente maior para ativação, além de apresentarem maiores taxas de desvio motriz.

# 2. Fundamentação Teórica e Cognitiva

Desenvolvida originalmente por Paul Fitts em 1954 no domínio da psicologia experimental do controle motor e posteriormente introduzida à área de *Human-Computer Interaction* (HCI) por Card, Moran e Newell, a equação clássica é parametrizada como:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Nesta formulação:
- $MT$ denota o *Movement Time* (tempo total de movimento).
- $a$ e $b$ representam parâmetros empíricos (*regression coefficients*) que dependem da dinâmica do dispositivo de entrada (*pointing device*) e da especificidade biomecânica do usuário.
- $D$ representa a distância (*distance*) do ponto inicial ao centro do *target*.
- $W$ refere-se à largura (*width*) do *target* alinhada com o vetor do movimento.
- O componente logarítmico $\log_2(2D/W)$ define o *Index of Difficulty* (ID), quantificado em bits.

Análises neurocognitivas demonstram que a execução de trajetória motora até um *target* não ocorre como um único impulso balístico contínuo. Trata-se de um modelo de controle motor em malha fechada (*closed-loop motor control*), caracterizado por uma fase inicial de projeção primária rápida (aproximação do cursor) seguida por sucessivos ciclos de micro-ajustes de desaceleração guiados por visual feedback. À medida que o fator $W$ diminui em proporção a $D$, a necessidade de correções finas de alta precisão cresce exponencialmente, elevando a carga física e cognitiva empregada no ato de apontamento.

No contexto de interfaces de desktop, as extremidades físicas do display atuam como alvos de tamanho infinito (*infinite targets*). Uma vez que o movimento do cursor é interrompido pelas bordas da tela, o parâmetro $W$ tende ao infinito, anulando a exigência de micro-ajustes no término do deslocamento.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas Direcionais
- **Dimensionamento proporcional de *Touch Targets***: Estabelecer áreas mínimas de contato em ambientes sensíveis ao toque (e.g., 48x48dp no Material Design ou 44x44pt no iOS Human Interface Guidelines), mitigando erros decorrentes de *fat-finger effect*.
- **Exploração estratégica de bordas e cantos (*Infinite Targets*)**: Posicionar elementos de alta frequência de uso ou ações críticas nas bordas extremas ou nos cantos da tela, aproveitando a barreira do cursor para acelerar a aquisição sem necessidade de frenagem precisa.
- **Redução da distância espacial entre passos de workflow**: Posicionar menus de contexto, *popovers* e confirmações de formulário na vizinhança imediata do ponto do último clique, minimizando a variável $D$.
- **Expansão da área clicável (*Hit Area*) suplementar**: Ampliar a *bounding box* interativa de ícones pequenos através de delimitadores e preenchimentos (*padding*) transparentes, aumentando $W$ sem comprometer a densidade visual.

### Anti-padrões
- **Micro-targets em densidades elevadas**: Disponibilizar botões de interações críticas ou ícones de fechamento (*close buttons*) com dimensões extremamente reduzidas em visores de alta resolução.
- **Dispersão entre campos de entrada e ações primárias**: Posicionar botões de disparo (*submit*) em cantos remotos em relação aos campos de texto de um formulário, forçando deslocamentos pontuais extensos.
- **Adjacência sem zona de proteção entre ações de polaridades opostas**: Dispor botões de ação destrutiva imediatamente contíguos a ações de salvamento ou avanço com tamanhos reduzidos, propiciando cliques acidentais.

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT)**: A otimização dos fatores $D$ e $W$ resulta em uma diminuição direta no tempo total acumulado para navegação e preenchimento de formulários.
- **Click Accuracy e Hit Rate**: Redução perceptível do índice de cliques incorretos e toques em áreas mortas da interface.
- **Throughput (TP / Index of Performance)**: Métrica estandardizada pela norma ISO 9241-9 que avalia a eficiência de dispositivos e layouts medindo a velocidade e precisão em bits por segundo (bps).
- **First-Click Success Rate**: Aumento da taxa de acerto no primeiro movimento em elementos de alta prioridade estratégica, como botões de *call-to-action* (CTA).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]]
- [[CognitiveLoad]]
- [[MillerLaw]]
- [[TeslerLaw]]

### Fontes
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391.
- MacKenzie, I. S. (1992). Fitts' law as a research and design model in human-computer interaction. *Human-Computer Interaction*, 7(1), 91-139.
- Yablonski, J. (2020). *Laws of UX: Fitts's Law*. Disponível em: <https://lawsofux.com/en/fitts-law/>. Acesso em: 06 nov. 2026.