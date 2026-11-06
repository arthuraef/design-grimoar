---
title: "Jakob's Law"
slug: "jakobs-law"
id: "jakobs-law-02-01"
domain: "02-ux-interaction-design"
subdomain: "usability-laws"
status: "canonical"
version: "1.0.0"
created_at: "2026-11-06T00:00:00Z"
updated_at: "2026-11-06T00:00:00Z"
summary: "Princípio de usabilidade formulado por Jakob Nielsen que estabelece que usuários transferem expectativas de produtos consolidados para novas interfaces, exigindo conformidade com convenções de mercado."
tags:
  - "usability"
  - "mental-models"
  - "interaction-design"
  - "cognitive-load"
aliases:
  - "Lei de Jakob"
  - "Jakob's Law of Internet User Experience"
academic_anchors:
  - "Nielsen, J. (2000) - Designing Web Usability: The Practice of Simplicity"
  - "Yablonski, J. (2020) - Laws of UX"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "2026-11-06T00:00:00Z"
  academic_anchor_added: []
sources:
  - title: "Laws of UX: Jakob's Law"
    url: "https://lawsofux.com/jakobs-law/"
    type: "article"
    accessed_at: "2026-11-06"
  - title: "Jakob's Law of Internet User Experience"
    url: "https://www.nngroup.com/videos/jakobs-law-internet-ux/"
    type: "video"
    accessed_at: "2026-11-06"
cross_references:
  - "[[MentalModel]]"
  - "[[AestheticUsabilityEffect]]"
  - "[[ChoiceOverload]]"
---

# 1. Definição Canônica

A **Jakob's Law** (Lei de Jakob) é um princípio fundamental de *Interaction Design* formulado pelo pioneiro em usabilidade Jakob Nielsen. O postulado estabelece que os usuários passam a maior parte do seu tempo interagindo com outros produtos digitais; consequentemente, eles esperam que o seu sistema funcione da mesma forma que todas as outras interfaces com as quais já estão familiarizados.

A premissa central é que a eficiência de uso é diretamente proporcional ao grau em que a interface alavanca os *Mental Models* pré-existentes. Ao adotar convenções de navegação, arquitetura de informação e padrões de interatividade amplamente aceitos no ecossistema digital, o sistema minimiza o atrito inicial e permite que o usuário foque no alcance de seus objetivos funcionais, eliminando a necessidade de reaprender a mecânica de navegação.

---

# 2. Fundamentação Teórica e Cognitiva

O embasamento científico da Jakob's Law fundamenta-se nos princípios da psicologia cognitiva, especificamente na Teoria dos Esquemas (*Schema Theory*) e na dinâmica de *Transfer of Learning*.

* **Teoria dos Esquemas e *Mental Models*:** O sistema cognitivo humano organiza o conhecimento através de estruturas mentais abstratas chamadas esquemas. Quando o usuário navega pela web ou utilitários virtuais, ele desenvolve esquemas para componentes como barras de busca, carrinhos de compra e menus de navegação. Replicar estes padrões reduz a *Cognitive Load*, permitindo que o processamento da informação ocorra prioritariamente na memória implícita.
* **Ordem Histórica e *Skeuomorphism*:** Elementos clássicos de *User Interface* (UI) derivaram diretamente de artefatos analógicos. Controles digitais como botões de alternância (*toggles*), botões de rádio (*radio buttons*) e chaves seletores foram desenhados espelhando suas físicas táteis pré-existentes, facilitando o *Transfer of Learning* da física do mundo real para os ambientes virtuais.
* **Power Law of Learning:** A velocidade de execução de uma tarefa por um indivíduo cresce em uma curva logarítmica com a prática continuada. Interfaces que violam convenções estabelecidas forçam a interrupção do processamento automático do cérebro, exigindo o engajamento do processamento controlado, o que eleva a taxa de latência e de cometimento de erros.

---

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)

## Heurísticas de Design
* **Emprego de *Design Systems* e *UI Patterns* Padronizados:** Reutilize componentes visuais consolidados no setor (ex.: *Material Design*, *Human Interface Guidelines*) para solucionar problemas recorrentes de navegação e entrada de dados.
* **Migração Controlada em Redesigns (*Opt-in/Opt-out Systems*):** Durante a reformulação de produtos de uso contínuo, implemente uma transição gradual. Ofereça um período em que o usuário possa experimentar a nova versão via *preview*, com o controle explicito para retornar temporariamente à interface antiga, reduzindo o choque de adequação cognitiva.
* **Manutenção da Semântica Visual (*Signifiers* e *Affordances*):** Assegure que elementos interativos apresentem sinalizadores estáticos e dinâmicos tradicionais (ex.: ícone de lupa associado a inputs de pesquisa, cor distinta para hiperlinks e ícones operacionais universais).

## Anti-padrões (*Anti-patterns*)
* **Reinvenção Prematura (*Reinventing the Wheel*):** Modificar drasticamente comportamentos e posições de navegação primárias sem uma necessidade funcional clara e validada, puramente por apelo visual ou diferenciação estética.
* **Ruptura Interativa (*Abrupt Redesign*):** Lançar versões completamente reformuladas sem suporte ao processo de transição, provocando forte rejeição funcional devido ao desalinhar repentino dos *Mental Models*.
* **Sobrecarga de Novidade (*Novelty Overhead*):** Implementar metáforas de interação proprietárias complexas que exijam tutoriais extensos para a realização de operações corriqueiras.

---

# 4. Métricas e Impacto em Produto

A adesão ou violação da Jakob's Law reflete diretamente nos indicadores de desempenho de produto:

* **Time-on-Task:** O alinhamento às expectativas prévias reduz o tempo consumido pelo usuário para localizar controles e concluir jornadas essenciais.
* **Task Completion Rate:** A redução da incerteza visual e operacional se traduz no aumento da taxa de sucesso de fluxos estratégicos, como processos de *checkout* ou cadastro.
* **Error Rate:** Minimiza a frequência de cliques incorretos e entradas inválidas decorrentes de interpretações errôneas de componentes visuais não convencionais.
* **System Usability Scale (SUS):** Aumenta as pontuações em testes quantitativos de usabilidade, indicando menor percepção de complexidade e maior conforto de utilização.
* **Churn Rate pós-atualizações:** Reduz a perda de retenção de usuários ativos que costumeiramente ocorre após grandes atualizações de interface.

---

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes

## Referências Cruzadas
* [[MentalModel]] — Representação cognitiva interna desenvolvida pelo usuário acerca do funcionamento de um sistema.
* [[AestheticUsabilityEffect]] — Fenômeno no qual designs esteticamente agradáveis são percebidos como mais fáceis de usar.
* [[ChoiceOverload]] — Estado de paralisia decisória desencadeado pela presença de excesso de escolhas ou desordem cognitiva.

## Fontes
* NIELSEN, Jakob. *Designing Web Usability: The Practice of Simplicity*. New Riders Publishing, 2000.
* NIELSEN NORMAN GROUP. *Jakob's Law of Internet User Experience*. Disponível em: <https://www.nngroup.com/videos/jakobs-law-internet-ux/>. Acesso em: 06 nov. 2026.
* YABLONSKI, Jon. *Laws of UX: Using Psychology to Design Better Products & Services*. O'Reilly Media, 2020.