import { PublishResult } from '../plugin-publisher/publisher.js';
import { VerbeteFrontmatter } from '../../schema.js';

export interface StepCompletionNotificationPayload {
  publishResult: PublishResult;
  frontmatter: VerbeteFrontmatter;
  attemptsUsed?: number;
  academicAnchors?: string[];
}

export interface NotificationResult {
  success: boolean;
  delivered: boolean;
  endpoint: string;
  commitHash: string;
  formattedMessage: string;
  sentAt: string;
}

export interface HermesNotifierConfig {
  hermesApiUrl?: string;
  webhookUrl?: string;
  defaultChannel?: string;
}

function sanitizeUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  const match = raw.match(/https?:\/\/[^\s)\]]+/);
  return (match ? match[0] : raw).trim();
}

/**
 * Plugin Hermes Notifier (Nous Research Pattern)
 * 
 * Aciona a API/Webhook do Hermes Agent após a confirmação inequívoca
 * do hash de commit no GitHub para enviar notificação estruturada para o dispositivo.
 */
export class HermesNotifierService {
  private hermesApiUrl: string;
  private webhookUrl?: string;

  constructor(private config: HermesNotifierConfig = {}) {
    this.hermesApiUrl =
      sanitizeUrl(config.hermesApiUrl || process.env.HERMES_AGENT_API_URL) || 'http://localhost:5055/webhook/step-completed';
    this.webhookUrl = sanitizeUrl(config.webhookUrl || process.env.NOTIFICATIONS_WEBHOOK_URL);
  }

  /**
   * Formata a notificação canônica estruturada do Design Grimoar
   */
  formatNotificationMessage(payload: StepCompletionNotificationPayload): string {
    const { publishResult, frontmatter } = payload;
    const shortHash = publishResult.commitHash.slice(0, 7);
    const anchors = payload.academicAnchors?.length
      ? payload.academicAnchors.join(', ')
      : frontmatter.academic_anchors.join(', ');

    return [
      `🧙‍♂️ [Design Grimoar — Publicação Concluída]`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📖 Verbete: ${frontmatter.title} (\`${frontmatter.slug}\`)`,
      `📂 Domínio: ${frontmatter.domain}/${frontmatter.subdomain}`,
      `📌 Commit Git: \`${publishResult.commitHash}\` (${shortHash})`,
      `🧠 Banco Vetorial: ${publishResult.vectorUpdated ? `Indexado (${publishResult.chunksIndexed} seções HNSW)` : 'Gravado'}`,
      `🌐 Front-end (GitHub Pages): ${publishResult.staticSiteSynced ? 'Sincronizado (Notion SSG)' : 'Pendente'}`,
      `🎓 Auditoria Acadêmica: APROVADO`,
      `   * Âncoras: ${anchors}`,
      `🔁 Loop de Verificação: Aprovado (${payload.attemptsUsed ?? 1}/3 tentativas)`,
      `⏱️ Data: ${publishResult.publishedAt}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ].join('\n');
  }

  /**
   * Dispara a notificação após a confirmação do hash do commit
   */
  async notifyStepCompletion(payload: StepCompletionNotificationPayload): Promise<NotificationResult> {
    const formattedMessage = this.formatNotificationMessage(payload);
    const commitHash = payload.publishResult.commitHash;

    console.log(`\n📢 [Hermes Notifier]: Disparando notificação de conclusão para o commit ${commitHash}...`);
    console.log(formattedMessage);

    let delivered = false;
    let targetEndpoint = this.hermesApiUrl;

    // 1. Tentar acionar o endpoint HTTP do Hermes Agent
    try {
      const response = await fetch(this.hermesApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: formattedMessage,
          content: formattedMessage,
          payload: {
            commitHash,
            verbeteSlug: payload.frontmatter.slug,
            verbeteTitle: payload.frontmatter.title,
            domain: payload.frontmatter.domain,
            publishedAt: payload.publishResult.publishedAt,
            attemptsUsed: payload.attemptsUsed ?? 1,
            academicAnchors: payload.academicAnchors || payload.frontmatter.academic_anchors,
          },
        }),
      });

      if (response.ok) {
        delivered = true;
        console.log(`✅ [Hermes Notifier]: Entregue com sucesso via Hermes Agent API (${this.hermesApiUrl}).`);
      }
    } catch (apiErr: any) {
      console.warn(`[Hermes Notifier]: Aviso na API do Hermes (${apiErr.message}). Tentando fallback via webhook direto...`);
    }

    // 2. Fallback direto para NOTIFICATIONS_WEBHOOK_URL se o endpoint local não responder
    if (!delivered && this.webhookUrl) {
      targetEndpoint = this.webhookUrl;
      try {
        const response = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: formattedMessage,
            text: formattedMessage,
          }),
        });

        if (response.ok) {
          delivered = true;
          console.log(`✅ [Hermes Notifier]: Entregue com sucesso via NOTIFICATIONS_WEBHOOK_URL.`);
        }
      } catch (webhookErr: any) {
        console.warn(`[Hermes Notifier]: Falha no webhook direto: ${webhookErr.message}`);
      }
    }

    if (!delivered) {
      console.log('ℹ️ [Hermes Notifier]: Notificação estruturada gerada e registrada no console do sistema.');
    }

    return {
      success: true,
      delivered,
      endpoint: targetEndpoint,
      commitHash,
      formattedMessage,
      sentAt: new Date().toISOString(),
    };
  }
}
