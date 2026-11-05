/**
 * Sanitizador de Conteúdo contra Prompt Injection — Design Grimoar
 * 
 * Protege o Lexicógrafo e o Auditor Acadêmico contra injeções de prompt
 * provenientes de páginas web públicas raspadas e transcrições de podcast.
 */

export interface SanitizationResult {
  sanitized: string;
  injectionDetected: boolean;
  threats: string[];
  originalLength: number;
  sanitizedLength: number;
}

// Padrões de ataque de injeção de prompt comuns
const INJECTION_PATTERNS: Array<{ name: string; regex: RegExp; replacement: string }> = [
  // 1. Comandos de anulação de instruções anteriores
  {
    name: 'Instruction Override Attempt',
    regex: /\b(ignore|disregard|forget|bypass|override)\s+(all\s+)?(previous|prior|above|former)\s+(instructions|prompts|commands|rules|context)\b/gi,
    replacement: '[REDACTED: INSTRUCTION OVERRIDE]',
  },
  {
    name: 'New System Directive Attempt',
    regex: /\b(you are now|act as|pretend to be|from now on you are|your new role is)\s+(an unrestricted|an unfiltered|developer mode|dan mode|jailbreak|god mode)\b/gi,
    replacement: '[REDACTED: ROLE HIJACK]',
  },
  // 2. Delimitadores especiais de LLM e ChatML
  {
    name: 'ChatML Token Spoofing',
    regex: /(<\|im_start\|>|<\|im_end\|>|<\|endoftext\|>|<<SYS>>|<<\/SYS>>|\[INST\]|\[\/INST\])/gi,
    replacement: '[REDACTED: SPECIAL TOKEN]',
  },
  // 3. Spoofing de Delimitadores Internos do Grimoar
  {
    name: 'Grimoar Protocol Delimiter Spoofing',
    regex: /\[(MODO|CONTEÚDO_FONTE|VERBETE_ATUAL|CRITÉRIOS_DE_AUDITORIA|SAÍDA_OBRIGATÓRIA)\s*:[^\]]*\]/gi,
    replacement: '[REDACTED: PROTOCOL DELIMITER]',
  },
  // 4. Prefixo de papéis de prompt (System / Assistant / Human)
  {
    name: 'Role Prefix Spoofing',
    regex: /^(System|Assistant|Human|Developer|Auditor|Lexicographer)\s*:/gim,
    replacement: '[SAFE_TEXT]:',
  },
  // 5. Exfiltração de dados via Imagens Markdown
  {
    name: 'Markdown Image Data Exfiltration',
    regex: /!\[[^\]]*\]\((https?:\/\/[^\s)]+(?:\?|&)(?:token|key|cookie|data|secret|prompt|leak)=[^)]*)\)/gi,
    replacement: '[REDACTED: SUSPICIOUS IMAGE]',
  },
  // 6. Tags perigosas de script/iframe/object
  {
    name: 'Executable HTML Tag',
    regex: /<\s*(script|iframe|object|embed|applet)[\s\S]*?>[\s\S]*?<\s*\/\s*\1\s*>/gi,
    replacement: '',
  },
  {
    name: 'Inline Event Handlers',
    regex: /\bon\w+\s*=\s*["'][^"']*["']/gi,
    replacement: '',
  },
];

// Caracteres invisíveis e de controle usados para ofuscação
const ZERO_WIDTH_AND_CONTROL_CHARS = /[\u200B\u200C\u200D\uFEFF\u2060\u202A-\u202E\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/**
 * Sanitiza o conteúdo bruto extraído da Web ou Áudio contra Prompt Injection
 */
export function sanitizeScrapedContent(rawContent: string): SanitizationResult {
  if (!rawContent || typeof rawContent !== 'string') {
    return {
      sanitized: '',
      injectionDetected: false,
      threats: [],
      originalLength: 0,
      sanitizedLength: 0,
    };
  }

  const threats: string[] = [];
  let sanitized = rawContent;

  // 1. Remover caracteres invisíveis e de controle de direção
  const hadZeroWidth = ZERO_WIDTH_AND_CONTROL_CHARS.test(sanitized);
  if (hadZeroWidth) {
    threats.push('Zero-width / Control characters detected');
    sanitized = sanitized.replace(ZERO_WIDTH_AND_CONTROL_CHARS, '');
  }

  // 2. Normalizar espaços em branco e quebras de linha excessivas
  sanitized = sanitized.replace(/\r\n/g, '\n');

  // 3. Aplicar filtros de detecção de injeção
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.regex.test(sanitized)) {
      threats.push(pattern.name);
      sanitized = sanitized.replace(pattern.regex, pattern.replacement);
    }
  }

  // 4. Limpeza de blocos de comentários HTML ocultos que possam carregar payloads
  const hadHtmlComments = /<!--[\s\S]*?-->/g.test(sanitized);
  if (hadHtmlComments) {
    sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');
  }

  return {
    sanitized: sanitized.trim(),
    injectionDetected: threats.length > 0,
    threats,
    originalLength: rawContent.length,
    sanitizedLength: sanitized.length,
  };
}
