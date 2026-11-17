---
title: "Fitts's Law"
slug: "fitts-law"
id: "fitts-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-principles"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Modelo preditivo de controle motor e ergonomia de interfaces que estabelece que o tempo exigido para alcançar um alvo é uma função matemática da proporção entre a distância até o alvo e sua dimensão física."
tags:
  - "interaction-design"
  - "usability"
  - "ergonomics"
  - "hci"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
academic_anchors:
  - "Paul M. Fitts (1954) - The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement"
  - "ISO 9241-9 (2000) - Ergonomic requirements for office work with visual display terminals (VDTs) — Requirements for non-keyboard input devices"
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
  - "[[SteeringLaw]]"
  - "[[Affordance]]"
---

# 1. Definição Canônica

Fitts's Law (Lei de Fitts) é um modelo formal empírico de controle psicomotor aplicado ao *Interaction Design* e à *Human-Computer Interaction (HCI)*. O princípio estabelece que o tempo necessário para mover um apontador até uma área de destino definida é uma função logarítmica da distância até esse alvo dividida por sua dimensão física na direção do movimento. 

Formulado originalmente para mensurar o desempenho motor em ambientes de controle físico, o conceito é universalmente empregado no dimensionamento, espaçamento e posicionamento de elementos interativos em interfaces gráficas (*Graphical User Interfaces - GUI*) e de toque (*Touch User Interfaces*).

---

# 2. Fundamentação Teórica e Cognitiva

Formulada pelo psicólogo Paul Fitts em 1954, a lei deriva da Teoria da Informação de Shannon-Weaver. O modelo quantifica a capacidade de processamento de informação do sistema neuro-motor humano por meio do cálculo do *Index of Difficulty (ID)*, expresso na unidade *bits*:

$$ID = \log_2 \left( \frac{2D}{W} \right)$$

Onde:
- **$D$** representa a distância (*Distance*) ou amplitude do movimento até o centro do alvo.
- **$W$** representa a largura (*Width*) ou dimensão efetiva do alvo ao longo do eixo de trajetória.

O tempo total de movimento (*Movement Time - MT*) é derivado da equação linear:

$$MT = a + b \cdot ID$$

Em termos de psicologia cognitiva e controle motor, a execução do movimento ocorre em duas etapas subsequentes:
1. **Ballistic Phase (Fase Balística):** Movimento inicial rápido de alta amplitude em direção ao alvo geral, guiado por programação motora prévia.
2. **Corrective Phase (Fase Corretiva):** Ajuste fino de desaceleração conduzido sob constante *visual feedback*, exigindo maior esforço atencional à medida que o alvo se torna proporcionalmente menor.

Reduzir o *Index of Difficulty* diminui a dependência da *corrective phase*, minimizando a carga cognitiva e o esforço neuromuscular. Em ambientes digitais de desktop, os cantos e bordas superiores/inferiores da tela possuem dimensão efetiva infinitamente grande ($W = \infty$), pois o limite do display impede o cursor de ultrapassar a área estipulada (*screen-edge advantage*), tornando o tempo de acionamento teoricamente ideal.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas (Boas Práticas)
- **Target Sizing Adaptativo:** Dimensionar zonas clicáveis (*touch targets*) observando padrões mínimos de ergonomia física (e.g., no mínimo 48x48 dp em Android e 44x44 pt em iOS) para acomodar a imprecisão inerente do toque com o polegar.
- **Bounding Box Extension:** Expandir a área de captura interativa para além dos limites estéticos do ativo gráfico (utilizando *padding* invisível em ícones e botões pequenos).
- **Proximity-Based Workflows:** Posicionar menus contextuais e botões de confirmação em alinhamento imediato à posição atual do cursor ou ao ponto final da entrada de dados prévia.
- **Utilization of Edge Horizons:** Alocar elementos cruciais ou de alta frequência (como barras de ferramentas e navegações principais) nas bordas absolutas da viewport em aplicações de desktop.

### Anti-padrões
- **Tiny Touch Targets:** Links puramente textuais ou ícones reduzidos posicionados sem *padding* suplementar em interfaces móbiles.
- **Decoupled Action Buttons:** Dispersar espacialmente elementos de confirmação (e.g., botões de *submit*) em relação ao campo de formulário ou ponto de foco atencional do usuário.
- **Screen Edge Margins:** Inserir margens vazias de poucos pixels entre a borda da janela/tela e o elemento interativo, anulando o benefício de borda infinita em aplicações *full screen*.

---

# 4. Métricas e Impacto em Produto

- **Task Completion Time (TCT):** Aumento substancial na velocidade de execução de fluxos operacionais críticos devido ao menor tempo de posicionamento e desaceleração.
- **Error Rate (Taxa de Erro):** Redução de interações incorretas e cliques acidentais (*misclicks* ou *mis-taps*) resultantes de metas pequenas ou inadequadamente espaçadas.
- **Throughput (TP):** Elevação da taxa de transferência do operador, calculada como a razão entre a dificuldade da tarefa (*ID*) e o tempo gasto (*MT*), padrão de avaliação de usabilidade parametrizado pela norma **ISO 9241-9**.
- **Conversion Rates em CTAs:** Incremento direto no pipeline de conversão ao otimizar a proeminência dimensional e a posição dos botões de *Call-to-Action (CTA)*.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

### Referências Cruzadas
- [[HicksLaw]] — Define a latência na tomada de decisão em função do número de opções, complementando o tempo motor da Fitts's Law.
- [[CognitiveLoad]] — Descreve o impacto do esforço mental despendido durante ajustes visuais na *corrective phase*.
- [[SteeringLaw]] — Extensão da Fitts's Law para trajetórias delimitadas ou afuniladas (como menus suspensos encadeados).
- [[Affordance]] — Propriedade física ou visual que denota a utilidade de um alvo proporcional ao seu tamanho.

### Fontes Consultadas
- FITTS, Paul M. The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, v. 47, n. 6, p. 381-391, 1954.
- ISO 9241-9:2000. *Ergonomic requirements for office work with visual display terminals (VDTs) — Part 9: Requirements for non-keyboard input devices*. International Organization for Standardization, 2000.
- YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media, 2020.