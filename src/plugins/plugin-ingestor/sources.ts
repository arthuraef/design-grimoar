import { OfficialDomain } from '../../schema.js';

export interface WebSourceDefinition {
  id: string;
  name: string;
  url: string;
  domain: OfficialDomain;
  subdomain: string;
  scrapeOptions?: {
    onlyMainContent?: boolean;
    waitFor?: number;
  };
  description: string;
}

export interface AudioSourceDefinition {
  id: string;
  name: string;
  feedUrl: string;
  domain: OfficialDomain;
  subdomain: string;
  asrModel: string;
  description: string;
}

/**
 * As 7 Fontes Canônicas Web do Design Grimoar
 */
export const OFFICIAL_WEB_SOURCES: WebSourceDefinition[] = [
  {
    id: 'nngroup',
    name: 'Nielsen Norman Group (NN/g)',
    url: 'https://www.nngroup.com/articles/',
    domain: '02-ux-interaction-design',
    subdomain: '05-heuristicas-e-usabilidade',
    scrapeOptions: { onlyMainContent: true },
    description: 'Referência empírica em usabilidade, heurísticas e arquitetura de informação.',
  },
  {
    id: 'ixdf',
    name: 'Interaction Design Foundation (IxDF)',
    url: 'https://www.interaction-design.org/literature',
    domain: '01-psicologia-cognitiva',
    subdomain: '01-percepcao-e-gestalt',
    scrapeOptions: { onlyMainContent: true },
    description: 'Literatura acadêmica em Interação Humano-Computador e Psicologia Cognitiva.',
  },
  {
    id: 'lawsofux',
    name: 'Laws of UX',
    url: 'https://lawsofux.com/',
    domain: '01-psicologia-cognitiva',
    subdomain: '03-modelos-mentais-e-vieses',
    scrapeOptions: { onlyMainContent: true },
    description: 'Compilado das leis cognitivas e psicológicas aplicadas ao design de interfaces.',
  },
  {
    id: 'apple-hig',
    name: 'Apple Human Interface Guidelines (HIG)',
    url: 'https://developer.apple.com/design/human-interface-guidelines',
    domain: '03-ui-visual-design',
    subdomain: '04-microinteracoes-e-motion',
    scrapeOptions: { onlyMainContent: true },
    description: 'Diretrizes oficiais de design de interação, espacialidade e acessibilidade da Apple.',
  },
  {
    id: 'material-design',
    name: 'Google Material Design (M3)',
    url: 'https://m3.material.io/',
    domain: '04-design-systems',
    subdomain: '01-design-tokens',
    scrapeOptions: { onlyMainContent: true },
    description: 'Especificações formais de Design Tokens, componentes e cores dinâmicas.',
  },
  {
    id: 'ux-collective',
    name: 'UX Collective (Medium)',
    url: 'https://uxdesign.cc/',
    domain: '05-product-design-strategy',
    subdomain: '01-problem-framing-e-discovery',
    scrapeOptions: { onlyMainContent: true },
    description: 'Artigos e reflexões de estratégia de produto, problem framing e impacto em negócios.',
  },
  {
    id: 'design-systems-repo',
    name: 'Design Systems Repo & W3C WAI',
    url: 'https://designsystemsrepo.com/',
    domain: '06-designops-engineering',
    subdomain: '02-handoff-design-eng',
    scrapeOptions: { onlyMainContent: true },
    description: 'Repositório de arquitetura de Design Systems, processos e acessibilidade W3C.',
  },
];

/**
 * Fonte de Áudio: UXPodcast transcrito via VibeVoice ASR
 */
export const OFFICIAL_AUDIO_SOURCE: AudioSourceDefinition = {
  id: 'uxpodcast',
  name: 'UXPodcast',
  feedUrl: 'https://uxpodcast.com/feed/',
  domain: '02-ux-interaction-design',
  subdomain: '03-pesquisa-e-descoberta',
  asrModel: 'Microsoft VibeVoice ASR (0.5B)',
  description: 'Podcast líder sobre design centrado no usuário, negócios digitais e tecnologia.',
};
