"""
Hermes Agent (Nous Research Pattern) — Cron & Notification Daemon
Responsável por disparar pipelines agendados, verificar integridade dos verbetes
e disparar notificações para AppFlowy / Webhooks canônicos.
"""

import os
import sys
import time
import logging
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


def send_notification(message: str, payload: dict = None):
    logger.info(f"Notificação: {message}")
    if not NOTIFICATIONS_WEBHOOK_URL:
        return
    try:
        body = {"content": message, "metadata": payload or {}}
        res = requests.post(NOTIFICATIONS_WEBHOOK_URL, json=body, timeout=10)
        res.raise_for_status()
    except Exception as e:
        logger.error(f"Erro ao disparar webhook: {e}")


def check_pipeline_status():
    logger.info("Executando verificação de integridade e fontes pendentes...")
    if not DATABASE_URL:
        logger.warning("DATABASE_URL não configurado.")
        return

    try:
        conn = psycopg2.connect(DATABASE_URL)
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # 1. Checar fontes pendentes de processamento
            cur.execute("SELECT COUNT(*) AS total FROM ingestion_sources WHERE processed = FALSE;")
            pending_sources = cur.fetchone()["total"]

            # 2. Checar total de verbetes canônicos
            cur.execute("SELECT COUNT(*) AS total FROM verbetes WHERE status = 'canonical';")
            canonical_count = cur.fetchone()["total"]

            # 3. Checar verbetes com auditoria pendente
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


def main():
    logger.info("Iniciando Hermes Agent Daemon (Nous Research)...")
    logger.info(f"Cron schedule configurado: '{CRON_SCHEDULE}'")

    scheduler = BlockingScheduler()
    # Adiciona trigger baseado no CRON_SCHEDULE
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

    # Executa uma verificação inicial
    check_pipeline_status()

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Hermes Agent finalizado.")


if __name__ == "__main__":
    main()
