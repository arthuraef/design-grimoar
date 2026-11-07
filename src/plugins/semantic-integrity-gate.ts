import { VerbeteFrontmatter, extractFrontmatterAndBody, MANDATORY_SECTIONS } from '../schema.js';

export interface IntegrityCheckDetail {
  checkName: string;
  passed: boolean;
  message: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

export interface SemanticIntegrityResult {
  passed: boolean;
  score: number; // 0 a 100
  criticalInconsistencies: string[];
  warnings: string[];
  checks: Record<string, boolean>;
  details: IntegrityCheckDetail[];
}

/**
 * Assinaturas ontológicas canônicas dos conceitos fundamentais
 * Usadas para detecção de contaminação cruzada e falsas atribuições
 */
interface ConceptFingerprint {
  primaryKeywords: string[];
  forbiddenAnchorsInPrimaryRole: string[];
  exclusiveAliases: string[];
  expectedSubdomains?: string[];
  definitionMarkers: string[];
}

const CANONICAL_FINGERPRINTS: Record<string, ConceptFingerprint> = {
  affordance: {
    primaryKeywords: ['affordance', 'potencial de ação', 'propriedade relacional', 'ação física'],
    forbiddenAnchorsInPrimaryRole: ['sweller', 'cognitive load theory', 'carga cognitiva'],
    exclusiveAliases: ['potencial de ação', 'pista de uso', 'action possibility'],
    expectedSubdomains: ['02-affordances-e-signifiers', 'affordances', 'interaction-design'],
    definitionMarkers: ['affordance', 'relação física', 'possibilidades de ação', 'gibson'],
  },
  'cognitive-load': {
    primaryKeywords: ['cognitive load', 'carga cognitiva', 'memória de trabalho', 'esforço mental'],
    forbiddenAnchorsInPrimaryRole: ['gibson', 'ecological approach'],
    exclusiveAliases: ['carga mental', 'mental workload'],
    expectedSubdomains: ['02-carga-cognitiva-e-memoria', 'memoria', 'psicologia-cognitiva'],
    definitionMarkers: ['carga cognitiva', 'cognitive load', 'memória de trabalho', 'sweller'],
  },
  signifier: {
    primaryKeywords: ['signifier', 'significante', 'pista perceptível', 'indicador visual'],
    forbiddenAnchorsInPrimaryRole: ['sweller'],
    exclusiveAliases: ['significante', 'perceived signifier'],
    expectedSubdomains: ['02-affordances-e-signifiers', 'signifiers'],
    definitionMarkers: ['signifier', 'significante', 'sinalizador', 'pista visual perceptível'],
  },
  usability: {
    primaryKeywords: ['usabilidade', 'usability', 'eficácia', 'eficiência', 'satisfação', 'heurística'],
    forbiddenAnchorsInPrimaryRole: [],
    exclusiveAliases: ['facilidade de uso', 'ease of use'],
    expectedSubdomains: ['02-heuristics', 'usability-laws', '02-affordances-e-signifiers'],
    definitionMarkers: ['usabilidade', 'usability', 'iso 9241', 'nielsen'],
  },
};

/**
 * Semantic Integrity Gate (Hard Gate de Integridade Conceitual)
 * Cumpre o Objetivo 4: Avalia coerência estruturada entre Título, Definição,
 * Fundamentação, Taxonomia, Aliases e Âncoras Acadêmicas.
 */
export class SemanticIntegrityGate {
  /**
   * Avalia a integridade semântica de um verbete (frontmatter + corpo Markdown)
   */
  public evaluate(frontmatter: VerbeteFrontmatter, markdownContent: string): SemanticIntegrityResult {
    const details: IntegrityCheckDetail[] = [];
    const criticalInconsistencies: string[] = [];
    const warnings: string[] = [];
    const checks: Record<string, boolean> = {};

    const { body } = extractFrontmatterAndBody(markdownContent);
    const slugLower = frontmatter.slug.toLowerCase().trim();
    const titleLower = frontmatter.title.toLowerCase().trim();

    // Extrai Seção 1: Definição Canônica
    const section1Match = body.match(/# 1\. Definição Canônica\s*([\s\S]*?)(?=(# 2\.|$))/i);
    const section1Text = section1Match ? section1Match[1].trim() : '';
    const section1Lower = section1Text.toLowerCase();

    // Extrai Seção 2: Fundamentação Teórica
    const section2Match = body.match(/# 2\. Fundamentação Teórica e Cognitiva\s*([\s\S]*?)(?=(# 3\.|$))/i);
    const section2Text = section2Match ? section2Match[1].trim() : '';

    // ------------------------------------------------------------------------
    // CHECK 1: Coerência entre Título e Definição Canônica
    // ------------------------------------------------------------------------
    let titleDefMatch = true;
    if (!section1Text) {
      titleDefMatch = false;
      criticalInconsistencies.push('Seção 1 (Definição Canônica) está vazia ou ausente.');
      details.push({
        checkName: 'title_definition_match',
        passed: false,
        message: 'Seção 1 vazia.',
        severity: 'CRITICAL',
      });
    } else {
      const section1Lower = section1Text.toLowerCase();

      // Detecta contaminação explícita: Título não menciona Affordance, mas a Seção 1 começa definindo Affordance
      if (!titleLower.includes('affordance') && !slugLower.includes('affordance')) {
        if (
          section1Lower.startsWith('*affordance*') ||
          section1Lower.startsWith('affordance') ||
          section1Lower.includes('*affordance* descreve a relação física')
        ) {
          titleDefMatch = false;
          criticalInconsistencies.push(
            `[Divergência Crítica de Definição]: O verbete intitulado "${frontmatter.title}" define explicitamente "Affordance" na Seção 1 em vez de definir seu próprio título.`
          );
        }
      }

      // Detecta contaminação de Carga Cognitiva no título de outro conceito
      if (!titleLower.includes('carga cognitiva') && !titleLower.includes('cognitive load') && !slugLower.includes('cognitive-load')) {
        if (section1Lower.startsWith('*carga cognitiva*') || section1Lower.startsWith('*cognitive load*')) {
          titleDefMatch = false;
          criticalInconsistencies.push(
            `[Divergência Crítica de Definição]: O verbete intitulado "${frontmatter.title}" define "Cognitive Load" na Seção 1 em vez de definir o conceito do título.`
          );
        }
      }

      // Verifica se o termo do título (ou parte dele) é referenciado na definição
      const normalizedTitleWords = titleLower.split(/[\s-]+/).filter((w) => w.length > 3);
      const titleWordPresent = normalizedTitleWords.some((w) => section1Lower.includes(w));
      if (!titleWordPresent && titleDefMatch) {
        warnings.push(`O título "${frontmatter.title}" não é diretamente mencionado na Definição Canônica.`);
      }

      details.push({
        checkName: 'title_definition_match',
        passed: titleDefMatch,
        message: titleDefMatch
          ? 'Definição canônica alinhada com o título do verbete.'
          : 'Divergência ontológica entre o título e a definição.',
        severity: titleDefMatch ? 'INFO' : 'CRITICAL',
      });
    }
    checks['titleDefinitionMatch'] = titleDefMatch;

    // ------------------------------------------------------------------------
    // CHECK 2: Coerência de Aliases e Não-Apropriação Indevida
    // ------------------------------------------------------------------------
    let aliasCoherence = true;
    const aliases = (frontmatter.aliases || []).map((a) => a.toLowerCase().trim());

    // Se o conceito não for affordance, não pode ter aliases exclusivos de affordance
    if (!slugLower.includes('affordance') && !titleLower.includes('affordance')) {
      const affordanceFingerprint = CANONICAL_FINGERPRINTS['affordance'];
      for (const forbiddenAlias of affordanceFingerprint.exclusiveAliases) {
        if (aliases.includes(forbiddenAlias)) {
          aliasCoherence = false;
          criticalInconsistencies.push(
            `[Contaminação de Aliases]: O alias "${forbiddenAlias}" é exclusivo do conceito "Affordance" e não pode constar no verbete "${frontmatter.title}".`
          );
        }
      }
    }

    details.push({
      checkName: 'alias_coherence',
      passed: aliasCoherence,
      message: aliasCoherence ? 'Aliases compatíveis com o escopo do conceito.' : 'Aliases atribuídos indevidamente.',
      severity: aliasCoherence ? 'INFO' : 'CRITICAL',
    });
    checks['aliasCoherence'] = aliasCoherence;

    // ------------------------------------------------------------------------
    // CHECK 3: Vinculação Epistêmica das Âncoras Acadêmicas
    // ------------------------------------------------------------------------
    let academicAnchorEpistemicMatch = true;
    const anchors = (frontmatter.academic_anchors || []).map((a) => a.toLowerCase());

    // Regra Estrita: Sweller (Cognitive Load Theory) NÃO pode ser âncora de Affordance
    const isAffordanceContext = 
      slugLower.includes('affordance') || 
      titleLower.includes('affordance') || 
      section1Lower.includes('affordance');

    if (isAffordanceContext) {
      const hasSweller = anchors.some((a) => a.includes('sweller') || a.includes('cognitive load'));
      if (hasSweller) {
        academicAnchorEpistemicMatch = false;
        criticalInconsistencies.push(
          `[Inconsistência Epistêmica]: A teoria de John Sweller (Cognitive Load Theory) foi atribuída indevidamente como âncora de "Affordance". Gibson e Norman são os autores canônicos.`
        );
      }
    }

    // Regra Estrita: Gibson NÃO pode ser âncora primária de Cognitive Load
    if (slugLower.includes('cognitive-load') || titleLower.includes('carga cognitiva')) {
      const hasGibson = anchors.some((a) => a.includes('gibson') || a.includes('ecological approach'));
      if (hasGibson) {
        academicAnchorEpistemicMatch = false;
        criticalInconsistencies.push(
          `[Inconsistência Epistêmica]: James J. Gibson (Psicologia Ecológica/Affordance) foi atribuído indevidamente como âncora de "Cognitive Load". Sweller e Paas são os autores fundamentais.`
        );
      }
    }

    details.push({
      checkName: 'academic_anchor_epistemic_match',
      passed: academicAnchorEpistemicMatch,
      message: academicAnchorEpistemicMatch
        ? 'Âncoras acadêmicas epistemicamente vinculadas ao conceito.'
        : 'Âncoras bibliográficas sem suporte ontológico para este conceito.',
      severity: academicAnchorEpistemicMatch ? 'INFO' : 'CRITICAL',
    });
    checks['academicAnchorEpistemicMatch'] = academicAnchorEpistemicMatch;

    // ------------------------------------------------------------------------
    // CHECK 4: Coerência Taxonômica (Domínio e Subdomínio)
    // ------------------------------------------------------------------------
    let subdomainCoherence = true;
    const subdomainLower = frontmatter.subdomain.toLowerCase().trim();

    // Se o conceito é "Usabilidade Cognitiva" geral, não deve estar arbitrariamente dentro de "02-affordances-e-signifiers"
    if (
      slugLower === 'usabilidade-cognitiva' &&
      subdomainLower.includes('affordances-e-signifiers') &&
      !section1Text.toLowerCase().includes('signifier')
    ) {
      subdomainCoherence = false;
      criticalInconsistencies.push(
        `[Classificação Taxonômica Inconsistente]: Verbete "${frontmatter.title}" classificado no subdomínio "${frontmatter.subdomain}" sem tratar primariamente de Affordances ou Signifiers.`
      );
    }

    details.push({
      checkName: 'subdomain_coherence',
      passed: subdomainCoherence,
      message: subdomainCoherence ? 'Taxonomia condizente com o conceito.' : 'Incompatibilidade entre taxonomia e escopo.',
      severity: subdomainCoherence ? 'INFO' : 'CRITICAL',
    });
    checks['subdomainCoherence'] = subdomainCoherence;

    // ------------------------------------------------------------------------
    // CHECK 5: Conteúdo Substantivo em Todas as 5 Seções
    // ------------------------------------------------------------------------
    let sectionsSubstantive = true;
    for (const section of MANDATORY_SECTIONS) {
      const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const secMatch = body.match(new RegExp(`${escaped}\\s*([\\s\\S]*?)(?=(# \\d+\\.|$))`, 'i'));
      const secContent = secMatch ? secMatch[1].trim() : '';

      if (secContent.length < 30) {
        sectionsSubstantive = false;
        criticalInconsistencies.push(`Seção "${section}" contém conteúdo insuficiente ou está vazia (${secContent.length} caracteres).`);
      }
    }

    details.push({
      checkName: 'sections_substantive',
      passed: sectionsSubstantive,
      message: sectionsSubstantive ? 'Todas as 5 seções obrigatórias contêm conteúdo substantivo.' : 'Seções obrigatórias insuficientes.',
      severity: sectionsSubstantive ? 'INFO' : 'CRITICAL',
    });
    checks['sectionsSubstantive'] = sectionsSubstantive;

    // ------------------------------------------------------------------------
    // CHECK 6: Relações Tipadas Válidas (Objetivo 2 e 3)
    // ------------------------------------------------------------------------
    let typedRelationsValid = true;
    if (frontmatter.typed_relations && frontmatter.typed_relations.length > 0) {
      for (const rel of frontmatter.typed_relations) {
        if (rel.target_slug === frontmatter.slug) {
          typedRelationsValid = false;
          criticalInconsistencies.push(`Relação tipada autorreferencial inválida para "${rel.target_slug}".`);
        }
      }
    }
    details.push({
      checkName: 'typed_relations_valid',
      passed: typedRelationsValid,
      message: typedRelationsValid ? 'Relações tipadas válidas.' : 'Relações tipadas inconsistentes.',
      severity: typedRelationsValid ? 'INFO' : 'CRITICAL',
    });
    checks['typedRelationsValid'] = typedRelationsValid;

    // ------------------------------------------------------------------------
    // CHECK 7: Granularidade Atômica (Bloqueio de Páginas de Índice / Compêndio)
    // ------------------------------------------------------------------------
    let atomicGranularity = true;
    const indexPatterns = [
      /(\b|_|-)(lexicon|index|glossary|glossario|compendium|compendio|catalog|catalogo|overview|panoramica|sumario|resumo-geral)(\b|_|-)/i,
      /^laws-of-ux-lexicon$/i,
      /^design-heuristics-index$/i,
      /^indice-/i,
      /^glossario-/i,
    ];

    const isIndexTitleOrSlug = indexPatterns.some(
      (pat) => pat.test(slugLower) || pat.test(titleLower)
    );

    const isIndexDescription = 
      /(\bcompêndio estruturado\b|\bléxico de\b|\blistagem de leis\b|\bcatalogo de conceitos\b|\bíndice geral\b)/i.test(frontmatter.summary) ||
      /(\bcompêndio de\b|\bconjunto de leis\b|\blista de princípios\b|\bguia panorâmico\b)/i.test(section1Text);

    if (isIndexTitleOrSlug || isIndexDescription) {
      atomicGranularity = false;
      criticalInconsistencies.push(
        `[Filtro de Granularidade]: O verbete "${frontmatter.title}" (${frontmatter.slug}) foi identificado como índice, compêndio ou léxico geral agregado. O Design Grimoar exige exclusivamente conceitos atômicos singulares.`
      );
    }

    details.push({
      checkName: 'atomic_granularity',
      passed: atomicGranularity,
      message: atomicGranularity
        ? 'Granularidade atômica confirmada (conceito singular).'
        : 'Violação de granularidade: índices, compêndios e compilações gerais são proibidos.',
      severity: atomicGranularity ? 'INFO' : 'CRITICAL',
    });
    checks['atomicGranularity'] = atomicGranularity;

    // ------------------------------------------------------------------------
    // CÁLCULO DO SCORE DE INTEGRIDADE (0 a 100)
    // ------------------------------------------------------------------------
    const totalChecks = Object.keys(checks).length;
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const score = Math.round((passedChecks / totalChecks) * 100);
    const passed = criticalInconsistencies.length === 0;

    return {
      passed,
      score,
      criticalInconsistencies,
      warnings,
      checks,
      details,
    };
  }
}
