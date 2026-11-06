"""
Hermes Agent (Nous Research Pattern) — Cron, Notification Daemon & Webhook Server
Responsável por:
1. Agendador Cron de integridade e auditoria da taxonomia
2. Servidor HTTP / Webhook para receber notificações estruturadas de publicação
3. Disparo de alertas para o dispositivo do usuário (Telegram/Discord/AppFlowy/ntfy)
"""

import os
import sys
import json
import logging
from threading import Thread
from http.server import HTTPServer, BaseHTTPRequestHandler
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [HermesAgent] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger("HermesAgent")

DATABASE_URL = os.getenv("DATABASE_URL")
NOTIFICATIONS_WEBHOOK_URL = os.getenv("NOTIFICATIONS_WEBHOOK_URL")
CRON_SCHEDULE = os.getenv("CRON_SCHEDULE", "0 3 * * *")
HERMES_PORT = int(os.getenv("HERMES_PORT", "5055"))


def send_notification(message: str, payload: dict = None):
    logger.info(f"📢 [Disparo Hermes]:\n{message}")
    if not NOTIFICATIONS_WEBHOOK_URL:
        logger.info("ℹ️ NOTIFICATIONS_WEBHOOK_URL não configurado. Notificação registrada apenas em log.")
        return {"status": "logged", "message": message}
    try:
        body = {
            "content": message,
            "text": message,
            "metadata": payload or {},
            "sender": "Hermes Agent (Nous Research)"
        }
        res = requests.post(NOTIFICATIONS_WEBHOOK_URL, json=body, timeout=10)
        res.raise_for_status()
        logger.info("✅ Notificação entregue com sucesso via webhook.")
        return {"status": "delivered", "code": res.status_code}
    except Exception as e:
        logger.error(f"❌ Erro ao disparar webhook de notificação: {e}")
        return {"status": "error", "error": str(e)}


def check_pipeline_status():
    logger.info("Executando verificação de integridade e fontes pendentes...")
    if not DATABASE_URL:
        logger.warning("DATABASE_URL não configurado.")
        return

    try:
        conn = psycopg2.connect(DATABASE_URL)
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT COUNT(*) AS total FROM ingestion_sources WHERE processed = FALSE;")
            pending_sources = cur.fetchone()["total"]

            cur.execute("SELECT COUNT(*) AS total FROM verbetes WHERE status = 'canonical';")
            canonical_count = cur.fetchone()["total"]

            cur.execute("SELECT COUNT(*) AS total FROM verbetes WHERE status = 'in_review';")
            review_count = cur.fetchone()["total"]

            msg = (
                f"📊 [Design Grimoar - Relatório Diário Hermes]\n"
                f"- Verbetes Canônicos (SSOT): {canonical_count}\n"
                f"- Verbetes em Revisão Acadêmica: {review_count}\n"
                f"- Fontes pendentes de ingestão: {pending_sources}"
            )
            send_notification(msg, {
                "canonical_count": canonical_count,
                "review_count": review_count,
                "pending_sources": pending_sources
            })
        conn.close()
    except Exception as e:
        logger.error(f"Erro ao conectar com PostgreSQL: {e}")


class HermesWebhookHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "service": "hermes-agent"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")

        try:
            data = json.loads(body) if body else {}
        except Exception:
            data = {"raw": body}

        if self.path in ["/api/notify", "/webhook/step-completed", "/webhook/notify"]:
            message = data.get("message") or data.get("content") or "Etapa concluída no Design Grimoar."
            payload = data.get("payload") or data.get("metadata") or {}

            result = send_notification(message, payload)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "delivery": result}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        # Redireciona logs do HTTP server para o logger padrão
        logger.debug("%s - - [%s] %s" % (self.client_address[0], self.log_date_time_string(), format % args))


def start_http_server():
    server = HTTPServer(("0.0.0.0", HERMES_PORT), HermesWebhookHandler)
    logger.info(f"🌐 Servidor Webhook do Hermes Agent ouvindo em http://0.0.0.0:{HERMES_PORT}")
    server.serve_forever()


def main():
    logger.info("Iniciando Hermes Agent Daemon (Nous Research)...")
    logger.info(f"Cron schedule configurado: '{CRON_SCHEDULE}'")

    # Inicia o servidor HTTP em uma thread secundária
    http_thread = Thread(target=start_http_server, daemon=True)
    http_thread.start()

    scheduler = BlockingScheduler()
    try:
        parts = CRON_SCHEDULE.split()
        if len(parts) == 5:
            trigger = CronTrigger(
                minute=parts[0],
                hour=parts[1],
                day=parts[2],
                month=parts[3],
                day_of_week=parts[4]
            )
            scheduler.add_job(check_pipeline_status, trigger)
        else:
            scheduler.add_job(check_pipeline_status, "interval", hours=24)
    except Exception as e:
        logger.error(f"Erro ao configurar CronTrigger: {e}. Usando intervalo de 24h.")
        scheduler.add_job(check_pipeline_status, "interval", hours=24)

    # Executa verificação inicial
    check_pipeline_status()

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Hermes Agent finalizado.")


if __name__ == "__main__":
    main()
