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
summary: "Fitts's Law (Lei de Fitts) prediz que o tempo necessário para alcançar um alvo é uma função matemática da distância até ele e de sua dimensão física."
tags:
  - "interaction-design"
  - "usabilidade"
  - "ergonomia"
  - "ergonomia-digital"
aliases:
  - "Lei de Fitts"
  - "Fitts Law"
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
  - "[[Hicks-Law]]"
  - "[[Touch-Target-Size]]"
---

# 1. Definição Canônica
Fitts's Law (Lei de Fitts) é um princípio fundamental da ergonomia e da interação humano-computador (IHC) que estabelece que o tempo requerido para mover rapidamente um cursor ou toque em direção a uma área-alvo é diretamente proporcional à distância percorrida até o alvo e inversamente proporcional ao tamanho desse mesmo alvo. Em termos práticos no *Digital Product Design*, elementos interativos maiores e posicionados mais próximos do ponto de origem do usuário exigem menor esforço motor e reduzem drasticamente o tempo de conclusão da tarefa.

# 2. Fundamentação Teórica e Cognitiva
Derivada originalmente da psicologia experimental e da biomecânica por Paul M. Fitts em 1954, a formulação matemática modela o sistema motor humano através da Teoria da Informação de Shannon. O tempo de movimento ($MT$) para atingir um alvo de largura $W$ a uma distância $D$ é expresso pela equação:

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Onde $a$ e $b$ são constantes empíricas dependentes do dispositivo de entrada e do usuário. Do ponto de vista cognitivo e neuromuscular, o ato de apontar e clicar não é um movimento puramente balístico, mas sim um processo de feedback em malha fechada. Inicialmente, o usuário executa um movimento macro em alta velocidade em direção ao estímulo visual e, à medida que se aproxima do alvo, micro-correções visuais e proprioceptivas são aplicadas para garantir a precisão. Reduzir a distância (*D*) diminui o tempo do primeiro vetor de movimento, enquanto expandir a área de toque (*W*) reduz a exigência de acurácia milimétrica na fase terminal de desaceleração.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas de Aplicação Positiva
* **Zonas de Polegar (*Thumb Zones*):** Em interfaces móveis, posicione as ações primárias de conversão (como botões de *CTA*) na zona natural de alcance do polegar na parte inferior da tela, minimizando a distância de deslocamento do dedo.
* **Bordas e Cantos da Tela:** Aproveite o limite físico de monitores e telas (*Edge Constraints*), onde o alvo possui largura virtual infinita, tornando impossível passar do ponto com o cursor do mouse (comum em menus de sistema operacionais e barras de navegação fixas).
* **Dimensionamento Adequado de *Touch Targets*:** Garanta que alvos táteis em dispositivos móveis tenham dimensões mínimas recomendadas (ex: 48x48 dp), expandindo a área clicável para além do ícone visual (*padding* invisível).

## Anti-padrões (*Anti-patterns*)
* **Elementos Críticos Isolados:** Posicionar botões de ação destrutiva ou de alta frequência (como "Excluir conta") nos cantos mais distantes e ocultos da interface sem justificativa estrutural.
* **Alvos Micrométricos:** Utilizar links de texto excessivamente curtos e próximos uns dos outros em interfaces móveis, gerando erros de toque (*Fat-Finger Error*).
* **Desacoplamento Espacial:** Separar visualmente um botão de submissão do formulário correspondente, forçando o usuário a realizar um percurso visual e motor desnecessário pela tela.

# 4. Métricas e Impacto em Produto
A aplicação correta da Lei de Fitts impacta diretamente métricas de desempenho de usabilidade e eficiência de negócio:
* **Task Completion Time (Tempo de Conclusão de Tarefa):** Reduz o tempo médio gasto para finalizar fluxos críticos (checkout, cadastros).
* **Error Rate (Taxa de Erro):** Diminui os índices de cliques errados (*misclicks*) e toques frustrados em elementos interativos.
* **System Usability Scale (SUS):** Eleva a percepção geral de fluidez e facilidade de uso do produto digital.
* **Conversion Rate (Taxa de Conversão):** Remove atritos motores em CTAs principais, elevando o volume de conversões bem-sucedidas.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[Hicks-Law]]
* [[Touch-Target-Size]]
* [[Cognitive-Load]]

## Fontes
* Fitts, Paul M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology.
* [Laws of UX - Fitts's Law](https://lawsofux.com/fittss-law/)