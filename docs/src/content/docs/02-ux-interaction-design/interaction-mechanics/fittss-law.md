---
title: "Fitts's Law"
slug: "fittss-law"
id: "fittss-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "interaction-mechanics"
status: "canonical"
version: "1.0.1"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Fitts's Law estabelece que o tempo necessário para alcançar um alvo é uma função matemática da distância até o alvo e de sua dimensão."
tags:
  - "interaction-design"
  - "ergonomia"
  - "usabilidade"
  - "mobile-design"
aliases:
  - "Lei de Fitts"
academic_anchors:
  - "Paul M. Fitts (1954) - The information capacity of the human motor system in controlling the amplitude of movement"
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
  - "[[Hick's Law]]"
  - "[[Cognitive Load]]"
---

---

# 1. Definição Canônica
Fitts's Law (Lei de Fitts) é um princípio preditivo da ergonomia e da interação humano-computador que postula que o tempo necessário para adquirir um alvo (target acquisition) é diretamente proporcional à distância percorrida até ele e inversamente proporcional ao seu tamanho. Em termos práticos de design de interface (UI), elementos interativos maiores e posicionados mais próximos do ponto de origem do cursor ou toque exigem menos esforço físico e tempo de resposta do usuário.

# 2. Fundamentação Teórica e Cognitiva
Derivada originalmente dos estudos de psicologia experimental e biomecânica realizados por Paul Fitts em 1954, a lei modela o sistema motor humano. O processo cognitivo e neuromuscular envolve o cálculo da trajetória e o ajuste fino (feedback visual) no momento final do movimento. 

Matematicamente formulada através do índice de dificuldade ($ID$), a relação demonstra que alvos minúsculos distantes aumentam drasticamente a carga motora e o tempo de processamento cinestésico. O princípio também se beneficia da "borda da tela" (screen edge), onde o tamanho efetivo de um alvo alinhado à borda torna-se teoricamente infinito, pois o cursor físico ou o limite de toque impedem que o usuário ultrapasse o elemento, reduzindo a necessidade de precisão milimétrica.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

### Heurísticas (Boas Práticas)
* **Ampliação de Áreas de Toque (Hit Targets):** Garantir que elementos acionáveis em dispositivos móveis tenham uma área mínima de toque (por exemplo, 48x48dp), independentemente de seu apelo visual estético.
* **Posicionamento Estratégico:** Alocar ações primárias e recorrentes (como botões de confirmação ou barras de navegação inferiores) em zonas de alcance natural e de alta proximidade para o polegar em interfaces mobile.
* **Utilização de Bordas e Cantos:** Posicionar elementos críticos (como menus de sistema ou botões de fechar) nos cantos e bordas de telas desktop, aproveitando o dimensionamento infinito das margens.

### Anti-padrões (Erros Comuns)
* **Alvos Minúsculos e Isolados:** Inserir links textuais com espaçamento insuficiente entre linhas ou elementos de interface pequenos posicionados no centro de telas amplas sem contexto de proximidade.
* **Dispersão de Ações Relacionadas:** Distribuir botões de etapas sequenciais (ex: "Voltar" e "Avançar") em extremidades opostas e distantes de um formulário longo, forçando deslocamentos visuais e motores excessivos.
* **Ignorar Limites Físicos:** Tratar as bordas da tela da mesma forma que o centro do viewport, desperdiçando a vantagem ergonômica natural das extremidades do monitor ou display.

# 4. Métricas e Impacto em Produto
A aplicação correta da Lei de Fitts impacta diretamente métricas fundamentais de produto:
* **Task Completion Time (Tempo de Conclusão de Tarefa):** Reduz o tempo total necessário para finalizar fluxos críticos de conversão (checkout, cadastros).
* **Error Rate (Taxa de Erro):** Diminui cliques acidentais ou toques perdidos (mis-taps), especialmente em contextos móveis sob estresse ou movimento.
* **System Usability Scale (SUS):** Eleva a percepção subjetiva de fluidez e facilidade de uso da interface.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
* [[Hick's Law]]
* [[Cognitive Load]]
* [[Goal-Gradient Effect]]