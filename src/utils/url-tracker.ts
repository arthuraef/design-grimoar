import fs from 'fs';
import path from 'path';
import { validateVerbete } from '../schema.js';
import { DeadLetterQueue } from './dead-letter-queue.js';

export interface ProcessedUrlEntry {
  url: string;
  slug?: string;
  title?: string;
  sourceId: string;
  processedAt: string;
}

export interface ProcessedUrlsState {
  processedUrls: string[];
  history: ProcessedUrlEntry[];
}

export interface CandidateSource {
  url: string;
  sourceId: string;
  isAudio?: boolean;
  conceptName: string;
  expectedDomain?: string;
}

/**
 * Catálogo Curado de Verbetes e Artigos Seminais das 8 Fontes Oficiais
 * Usado pelo Autonomous Curator no GitHub Actions para avançar continuamente
 * por conceitos fundamentais de design sem repetir URLs.
 */
export const CANONICAL_CANDIDATE_QUEUE: CandidateSource[] = [
  // 1. Laws of UX
  {
    url: 'https://lawsofux.com/jakobs-law/',
    sourceId: 'lawsofux',
    conceptName: "Jakob's Law",
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://lawsofux.com/fitts-law/',
    sourceId: 'lawsofux',
    conceptName: "Fitts's Law",
    expectedDomain: '02-ux-interaction-design',
  },
  {
    url: 'https://lawsofux.com/hicks-law/',
    sourceId: 'lawsofux',
    conceptName: "Hick's Law",
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://lawsofux.com/millers-law/',
    sourceId: 'lawsofux',
    conceptName: "Miller's Law",
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://lawsofux.com/peak-end-rule/',
    sourceId: 'lawsofux',
    conceptName: 'Peak-End Rule',
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://lawsofux.com/aesthetic-usability-effect/',
    sourceId: 'lawsofux',
    conceptName: 'Aesthetic-Usability Effect',
    expectedDomain: '03-ui-visual-design',
  },
  {
    url: 'https://lawsofux.com/von-restorff-effect/',
    sourceId: 'lawsofux',
    conceptName: 'Von Restorff Effect',
    expectedDomain: '01-psicologia-cognitiva',
  },

  // 2. Nielsen Norman Group (NN/g)
  {
    url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
    sourceId: 'nngroup',
    conceptName: '10 Usability Heuristics',
    expectedDomain: '02-ux-interaction-design',
  },
  {
    url: 'https://www.nngroup.com/articles/mental-models/',
    sourceId: 'nngroup',
    conceptName: 'Mental Models',
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://www.nngroup.com/articles/progressive-disclosure/',
    sourceId: 'nngroup',
    conceptName: 'Progressive Disclosure',
    expectedDomain: '02-ux-interaction-design',
  },
  {
    url: 'https://www.nngroup.com/articles/visibility-system-status/',
    sourceId: 'nngroup',
    conceptName: 'Visibility of System Status',
    expectedDomain: '02-ux-interaction-design',
  },

  // 3. Interaction Design Foundation (IxDF)
  {
    url: 'https://www.interaction-design.org/literature/article/gestalt-principles-of-perception',
    sourceId: 'ixdf',
    conceptName: 'Gestalt Principles of Perception',
    expectedDomain: '01-psicologia-cognitiva',
  },
  {
    url: 'https://www.interaction-design.org/literature/article/the-gulf-of-execution-and-evaluation',
    sourceId: 'ixdf',
    conceptName: 'Gulf of Execution and Evaluation',
    expectedDomain: '02-ux-interaction-design',
  },
  {
    url: 'https://www.interaction-design.org/literature/article/feedforward-in-interaction-design',
    sourceId: 'ixdf',
    conceptName: 'Feedforward',
    expectedDomain: '02-ux-interaction-design',
  },

  // 4. Apple Human Interface Guidelines (HIG)
  {
    url: 'https://developer.apple.com/design/human-interface-guidelines/feedback',
    sourceId: 'apple-hig',
    conceptName: 'Feedback & Haptics',
    expectedDomain: '03-ui-visual-design',
  },
  {
    url: 'https://developer.apple.com/design/human-interface-guidelines/spatial-layout',
    sourceId: 'apple-hig',
    conceptName: 'Spatial Layout',
    expectedDomain: '03-ui-visual-design',
  },
  {
    url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility',
    sourceId: 'apple-hig',
    conceptName: 'Inclusive & Accessible Interaction',
    expectedDomain: '02-ux-interaction-design',
  },

  // 5. Google Material Design 3 (M3)
  {
    url: 'https://m3.material.io/foundations/design-tokens/overview',
    sourceId: 'material-design',
    conceptName: 'Design Tokens Architecture',
    expectedDomain: '04-design-systems',
  },
  {
    url: 'https://m3.material.io/foundations/elevation/overview',
    sourceId: 'material-design',
    conceptName: 'Elevation and Surface Light',
    expectedDomain: '04-design-systems',
  },
  {
    url: 'https://m3.material.io/styles/motion/overview',
    sourceId: 'material-design',
    conceptName: 'Motion Easing and Choreography',
    expectedDomain: '03-ui-visual-design',
  },

  // 6. UX Collective
  {
    url: 'https://uxdesign.cc/the-anatomy-of-design-systems-c38d2ef1b833',
    sourceId: 'ux-collective',
    conceptName: 'Design Systems Architecture',
    expectedDomain: '04-design-systems',
  },
  {
    url: 'https://uxdesign.cc/designing-for-cognitive-fluency-9e05d045efc1',
    sourceId: 'ux-collective',
    conceptName: 'Cognitive Fluency in UX',
    expectedDomain: '01-psicologia-cognitiva',
  },

  // 7. Design Systems Repo & W3C WAI
  {
    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    sourceId: 'design-systems-repo',
    conceptName: 'Accessible Modal Dialog',
    expectedDomain: '06-designops-engineering',
  },
  {
    url: 'https://designsystemsrepo.com/design-system-maturity-model/',
    sourceId: 'design-systems-repo',
    conceptName: 'Design System Maturity Model',
    expectedDomain: '06-designops-engineering',
  },

  // 8. UXPodcast (Áudio)
  {
    url: 'https://uxpodcast.com/310-ethical-design/',
    sourceId: 'uxpodcast',
    isAudio: true,
    conceptName: 'Ethical Design & Dark Patterns',
    expectedDomain: '05-product-design-strategy',
  },
  {
    url: 'https://uxpodcast.com/320-design-systems/',
    sourceId: 'uxpodcast',
    isAudio: true,
    conceptName: 'Scaling Design Systems',
    expectedDomain: '04-design-systems',
  },
];

export class ProcessedUrlsTracker {
  private filePath: string;
  private state: ProcessedUrlsState;
  public dlq: DeadLetterQueue;

  constructor(
    filePath: string = path.resolve('taxonomia/.processed-urls.json'),
    dlq: DeadLetterQueue = new DeadLetterQueue()
  ) {
    this.filePath = filePath;
    this.dlq = dlq;
    this.state = this.loadState();
    this.syncWithExistingTaxonomyMarkdown();
  }

  private loadState(): ProcessedUrlsState {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          processedUrls: Array.isArray(parsed.processedUrls) ? parsed.processedUrls : [],
          history: Array.isArray(parsed.history) ? parsed.history : [],
        };
      } catch (err: any) {
        console.warn(`[UrlTracker]: Aviso ao ler ${this.filePath}: ${err.message}. Reinicializando.`);
      }
    }
    return { processedUrls: [], history: [] };
  }

  /**
   * Varre todos os arquivos Markdown existentes em taxonomia/ para extrair
   * as URLs já registradas no campo `sources`, garantindo idempotência
   * mesmo se o arquivo .processed-urls.json for criado pela primeira vez.
   */
  public syncWithExistingTaxonomyMarkdown(taxonomyDir: string = 'taxonomia'): void {
    const rootPath = path.resolve(taxonomyDir);
    if (!fs.existsSync(rootPath)) return;

    const findMarkdownFiles = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of list) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(findMarkdownFiles(full));
        } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('template-')) {
          results.push(full);
        }
      }
      return results;
    };

    const files = findMarkdownFiles(rootPath);
    let addedCount = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const validation = validateVerbete(content);
        if (!validation.isValid || !validation.frontmatter) continue;

        const fm = validation.frontmatter;
        if (Array.isArray(fm.sources)) {
          for (const s of fm.sources) {
            if (s.url && !this.isProcessed(s.url)) {
              this.state.processedUrls.push(s.url);
              this.state.history.push({
                url: s.url,
                slug: fm.slug,
                title: fm.title,
                sourceId: 'existing-file',
                processedAt: fm.created_at || new Date().toISOString(),
              });
              addedCount++;
            }
          }
        }
      } catch {
        // Ignora arquivos ilegíveis
      }
    }

    if (addedCount > 0) {
      this.saveState();
      console.log(`[UrlTracker]: Sincronizadas ${addedCount} URLs a partir dos arquivos Markdown existentes.`);
    }
  }

  public isProcessed(url: string): boolean {
    const cleanUrl = url.trim().toLowerCase().replace(/\/+$/, '');
    return this.state.processedUrls.some((u) => u.trim().toLowerCase().replace(/\/+$/, '') === cleanUrl);
  }

  public markAsProcessed(url: string, slug?: string, title?: string, sourceId: string = 'curator'): void {
    if (!this.isProcessed(url)) {
      this.state.processedUrls.push(url);
      this.state.history.push({
        url,
        slug,
        title,
        sourceId,
        processedAt: new Date().toISOString(),
      });
      this.saveState();
      console.log(`[UrlTracker]: URL registrada como processada: ${url}`);
    }
  }

  public getNextUnprocessedCandidate(): CandidateSource | null {
    for (const candidate of CANONICAL_CANDIDATE_QUEUE) {
      if (!this.isProcessed(candidate.url) && !this.dlq.isQuarantined(candidate.url)) {
        return candidate;
      }
    }
    return null;
  }

  public getNextUnprocessedBatch(batchSize: number = 2): CandidateSource[] {
    const batch: CandidateSource[] = [];
    for (const candidate of CANONICAL_CANDIDATE_QUEUE) {
      if (!this.isProcessed(candidate.url) && !this.dlq.isQuarantined(candidate.url)) {
        batch.push(candidate);
        if (batch.length >= batchSize) {
          break;
        }
      }
    }
    return batch;
  }

  public getProcessedCount(): number {
    return this.state.processedUrls.length;
  }

  private saveState(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err: any) {
      console.error(`[UrlTracker]: Erro ao salvar ${this.filePath}:`, err.message);
    }
  }
}
