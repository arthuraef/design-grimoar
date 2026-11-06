---
title: "Affordance"
slug: "affordance"
id: "affordance-02-01"
canonical_id: "affordance-canonical-001"
original_term: "Affordance"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T16:56:46.478Z"
updated_at: "2026-11-06T18:00:00.000Z"
summary: "Propriedade relacional entre as características físicas ou digitais de um artefato e as capacidades perceptivas e motoras de um agente que determinam como ele pode ser utilizado."
definition_core: "Propriedade relacional entre as propriedades físicas de um objeto e as capacidades perceptivas e motoras de um agente."
scope: "Interaction design físico e digital, percepção ecológica e affordances percebidas em interfaces gráficas."
distinction_criteria: "Distingue-se de Signifier (que é a pista perceptual que sinaliza onde e como agir) e de Feedback (resposta sensorial pós-ação)."
tags:
  - "affordance"
  - "interaction-design"
  - "usabilidade"
  - "percepcao"
aliases:
  - "Potencial de Ação"
  - "Perceived Affordance"
academic_anchors:
  - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
  - "Don Norman (1988) - The Design of Everyday Things"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v2"
  audited_at: "2026-11-06T18:00:00.000Z"
  academic_anchor_added: []
typed_relations:
  - target_concept: "signifier"
    relation_type: "distinguished_from"
    rationale: "Affordance define o que o artefato permite fazer; Signifier indica onde e como a ação deve ser executada."
  - target_concept: "cognitive-load"
    relation_type: "influences"
    rationale: "Affordances ambíguas demandam processamento consciente e elevam a carga cognitiva extrínseca."
sources:
  - title: "The Ecological Approach to Visual Perception"
    url: "https://www.routledge.com/The-Ecological-Approach-to-Visual-Perception/Gibson/p/book/9781848725782"
    type: "book"
    accessed_at: "2026-11-06"
  - title: "The Design of Everyday Things"
    url: "https://mitpress.mit.edu/books/design-everyday-things"
    type: "book"
    accessed_at: "2026-11-06"
cross_references:
  - "[[Signifier]]"
  - "[[Feedback Loop]]"
  - "[[Cognitive Load]]"
provenance:
  pipeline_version: "2.1.0"
  generation_mode: "canonical_curation"
  verified_by: "semantic-integrity-gate"
---

# 1. Definição Canônica
*Affordance* (potencial de ação) descreve a relação ontológica e funcional entre as propriedades materiais ou computacionais de um artefato e as capacidades perceptivo-motoras do usuário. O conceito não reside puramente no objeto nem no sujeito, mas na relação interativa entre ambos. Em ambientes de software e interfaces digitais, trata-se da capacidade da interface de permitir ações e transformações de estado pelo usuário.

# 2. Fundamentação Teórica e Cognitiva
O conceito foi cunhado pelo psicólogo James J. Gibson em 1979 na obra seminal *The Ecological Approach to Visual Perception*, no âmbito da psicologia ecológica, definindo o que o ambiente oferece ao animal. Em 1988, Donald Norman adaptou o princípio para a interação humano-computador em *The Design of Everyday Things*, introduzindo a noção de *Perceived Affordances* (affordances percebidas). Norman esclareceu posteriormente (2008, 2013) a distinção fundamental entre affordances (o que é fisicamente ou sistemicamente viável) e *Signifiers* (os sinalizadores visuais e sonoros que comunicam onde e como a ação pode ser executada).

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Alinhar as affordances percebidas às capacidades reais do sistema, tornando evidentes os elementos acionáveis por meio de signifiers inequívocos.
- **Anti-padrão:** Falsa Affordance (False Affordance) — elementos estáticos com aparência de botões ou cartões clicáveis que frustram a expectativa interativa do usuário.
- **Anti-padrão:** Affordance Oculta (Hidden Affordance) — funcionalidades acionáveis que não possuem pistas visuais, dependendo exclusivamente de descoberta acidental ou hover exploratório.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Cliques Errôneos (Misclick Rate / Dead Clicks).
- Otimização do Time to First Interaction (TTFI) e diminuição da latência perceptual na tomada de decisão.
- Minimização do Churn decorrente de frustração motora e cognitiva.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]] — Sinalizadores perceptuais que indicam a presença de affordances.
- [[Cognitive Load]] — Sobrecarga mental decorrente de interfaces com affordances ocultas ou ambíguas.
- [[Feedback Loop]] — Confirmação de que a ação permitida pela affordance foi efetivamente registrada.
