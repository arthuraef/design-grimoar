# Forensic Audit Log — Conceptual Contamination Quarantine

**Audit Date:** 2026-11-06  
**Auditor:** Senior Epistemic Architect & Forensic Auditor  
**Incident:** Conceptual contamination in `/usabilidade-cognitiva/` and cross-contamination in `/affordance/`.

---

## 1. Forensic Root Cause Analysis

### 1.1 Affected Artifact
- **File:** `taxonomia/02-ux-interaction-design/02-affordances-e-signifiers/usabilidade-cognitiva.md`
- **Initial Commit:** `befb217` (`chore(verbete): [canonical] Usabilidade Cognitiva (usabilidade-cognitiva)`)
- **Symptoms of Contamination:**
  1. **Title vs. Definition Divergence:** Title declared `Usabilidade Cognitiva`, but Section 1 (*Definição Canônica*) defined *Affordance*: `"Affordance descreve a relação física e digital..."`.
  2. **Academic Anchor Epistemic Chimera:** Anchored simultaneously in James J. Gibson (1979 - Ecological Perception), Don Norman (1988 - Everyday Things), and John Sweller (1988 - Cognitive Load Theory). Gibson and Sweller represent entirely distinct theoretical paradigms; Sweller does not formulate or anchor Affordance.
  3. **Taxonomy Mismatch:** Classified under `02-ux-interaction-design/02-affordances-e-signifiers` while bearing a title associated with cognitive psychology (`01-psicologia-cognitiva`).

### 1.2 Identified Mechanisms in Pipeline
1. **Deterministic Fallback Chimera (`src/plugins/plugin-synthesizer/synthesizer.ts:195-250`):**
   - The fallback generator had an inline conditional: `slug = includes('affordance') ? 'affordance' : 'usabilidade-cognitiva'`.
   - Regardless of slug, it emitted a fixed body with Affordance definitions and cross-stitched Sweller as an academic anchor.
2. **Semantic Vector Routing Insufficiency (`src/plugins/plugin-ingestor/semantic-router.ts:231,320`):**
   - The router used cosine similarity threshold `>= 0.82` as sufficient condition to merge concepts.
   - Line 320 contained an artificial boost: `dot = Math.max(dot, 0.88)` if keywords overlapped.
   - Vector embeddings cannot differentiate between related concepts sharing vocabulary (*Affordance*, *Signifier*, *Cognitive Load*, *Usability*) and conceptually identical concepts.
3. **Absence of Epistemic/Semantic Gate:**
   - No pre-commit verification ensured that the title matched the definition term or that academic citations were epistemically valid for the specific concept.
4. **Permissive Publisher:**
   - `publisher.ts` wrote files directly to `taxonomia/` and synced them to `docs/src/content/docs/` without enforcing `status === 'canonical'` and `audit.status === 'APPROVED'`.

---

## 2. Actions Taken & Remediation

| Target | Action | Status | Notes |
| :--- | :--- | :--- | :--- |
| `usabilidade-cognitiva.md` | Quarantined to `taxonomia/_archive/quarantine-usabilidade-cognitiva.md` | Preserved | Removed from public docs and Pagefind search index |
| `affordance.md` | Cleaned epistemic anchors; removed Sweller | Canonical Approved | Anchored strictly on Gibson (1979) and Norman (1988/2013) with typed relations |
| `src/plugins/semantic-integrity-gate.ts` | Created deterministic Semantic Integrity Gate | Active | Validates Title-Definition consistency, anchor validity, and taxonomy |
| `src/plugins/plugin-ingestor/semantic-router.ts` | Conceptual Equivalence Gate added | Active | Bi-encoder similarity used only for candidate retrieval; MERGE requires strict conceptual equivalence; otherwise routes to CREATE with typed relations |
| `src/plugins/plugin-academic-validator/validator.ts` | Strict epistemic validation | Active | Forbids name-dropping and cross-concept anchor contamination |
| `src/plugins/plugin-publisher/publisher.ts` | Staging quarantine isolation | Active | Only `status: canonical` and `audit: APPROVED` published to public docs; drafts kept in `taxonomia/_staging/` |
| `docs/src/content.config.ts`, `[...slug].astro`, etc. | Front-end gating | Active | Excludes staging/archive and unapproved verbetes from static paths and search |
