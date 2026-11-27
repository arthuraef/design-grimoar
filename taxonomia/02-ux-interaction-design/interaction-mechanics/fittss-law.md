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
summary: "Fitts's Law estabelece uma relação matemática preditiva entre o tempo necessário para alcançar um alvo motor, a distância física ou digital até esse alvo e a extensão da sua área de superfície."
tags:
  - "interaction-design"
  - "ergonomics"
  - "usability"
  - "motor-skills"
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
  - "[[Hicks-Law]]"
  - "[[Doherty-Threshold]]"
---

# 1. Definição Canônica

A **Fitts's Law** (Lei de Fitts) é um modelo empírico da ergonomia e do design de interação que quantifica o tempo requerido para mover um apontador até uma área de destino em função da distância e do tamanho do alvo. Na prática de *User Experience* (UX) e *Human-Computer Interaction* (HCI), o princípio dita que objetos significativamente maiores e posicionados mais próximos da localização atual do cursor ou do toque do usuário são acessados de forma mais rápida e com menor taxa de erro, ao passo que elementos distantes e reduzidos demandam tempo de precisão motor superior.

# 2. Fundamentação Teórica e Cognitiva

Proposta originalmente por Paul Morris Fitts em 1954, a formulação aplica a teoria da informação para medir a capacidade do sistema motor humano. A fórmula expressa a dificuldade da tarefa por meio do *Index of Difficulty* ($ID$), calculado logaritmicamente a partir da razão entre a distância percorrida ($D$) e a largura do alvo ($W$).

Sob a perspectiva da psicologia cognitiva e neuromotora, o deslocamento até um elemento visual envolve um movimento primário balístico rápido seguido de microajustes de precisão orientados por *visual feedback*. Alvos de grande dimensão reduzem a necessidade de correções finas na fase terminal do movimento, minimizando a *cognitive load* associada à precisão visual e prevenindo a fadiga física do usuário.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas de Aplicação Positiva
* **Sizing proporcional:** Expandir a superfície interativa dos elementos críticos (como *Primary CTAs*) para além da delimitação estrita dos seus ícones ou rótulos de texto, ampliando a área efetiva de ativação.
* **Exploração de bordas e cantos:** Tirar proveito do efeito de "tamanho infinito" presente nas extremidades da tela, onde os limites físicos impedem o cursor de ultrapassar a meta, facilitando o apontamento imediato.
* **Proximidade contextual:** Agrupar seletores e controles de ação próximos aos elementos gráficos com os quais interagem, reduzindo a distância total de deslocamento no fluxo de trabalho.

### Anti-padrões (*Anti-patterns*)
* **Alvos reduzidos em touch interfaces:** Desenhar áreas clicáveis inferiores às dimensões anatômicas mínimas recomendadas para interação tátil, gerando acionamentos acidentais ou falhas de clique.
* **Dispersão espacial de ações:** Posicionar botões vitais de submissão em pontos distantes do término lógico de leitura ou do centro de foco do usuário.
* **Bounding boxes severamente restritas:** Manter o *padding* interativo limitado estritamente às bordas dos caracteres de texto, forçando o usuário a exercer controle motor refinado desnecessário.

# 4. Métricas e Impacto em Produto

A aplicação consistente da Fitts's Law reflete-se diretamente nos indicadores-chave de desempenho e usabilidade de sistemas interativos:
* **Task Completion Time:** Diminuição substancial do tempo médio despendido para a execução de ações principais e conversões.
* **Interaction Error Rate:** Redução acentuada na frequência de toques e cliques que falham em atingir o alvo primário pretendido.
* **Throughput:** Aumento do número de ações bem-sucedidas executadas por unidade de tempo, correlacionando-se com notas superiores em testes de *System Usability Scale* (SUS).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

* [[Hicks-Law]]
* [[Doherty-Threshold]]
* [[Cognitive-Load]]

### Fontes
* Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*. Journal of Experimental Psychology, 47(6), 381–391.
* Laws of UX. *Fitts’s Law*. Disponível em: [https://lawsofux.com/fittss-law/](https://lawsofux.com/fittss-law/). Acessado em: 6 nov. 2026.