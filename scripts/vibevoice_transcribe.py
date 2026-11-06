#!/usr/bin/env python3
"""
Microsoft VibeVoice ASR (0.5B) — Transcritor de Áudio
Usado para transcrever episódios do UXPodcast para o Design Grimoar.

Suporta:
1. Serviço HTTP / API dedicado (VIBEVOICE_API_URL / ASR_API_URL)
2. Inferência local via Hugging Face Transformers / PyTorch (microsoft/VibeVoice-ASR-0.5B)
3. API Whisper/OpenAI para fallback de nuvem
4. Modo mock/fallback estritamente para testes (NODE_ENV=test ou ALLOW_TEST_FALLBACKS=true)
"""

import sys
import os
import json
import argparse
import urllib.request
import urllib.error

def transcribe_via_http_api(api_url: str, audio_path_or_url: str) -> dict:
    """Envia áudio para serviço ASR dedicado via HTTP POST."""
    payload = json.dumps({
        "audio_url": audio_path_or_url,
        "model": os.getenv("VIBEVOICE_MODEL_ID", "microsoft/VibeVoice-ASR-0.5B"),
        "language": "en"
    }).encode("utf-8")

    req = urllib.request.Request(
        api_url,
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))
        return {
            "status": "success",
            "audio_source": audio_path_or_url,
            "model": "microsoft/VibeVoice-ASR-0.5B",
            "duration_seconds": data.get("duration", 0.0),
            "language": data.get("language", "en"),
            "transcript": data.get("transcript") or data.get("text", ""),
            "segments": data.get("segments", [])
        }

def transcribe_local_transformers(audio_path: str) -> dict:
    """Executa inferência local via Hugging Face Transformers."""
    import torch
    from transformers import pipeline

    model_id = os.getenv("VIBEVOICE_MODEL_ID", "microsoft/VibeVoice-ASR-0.5B")
    device = "cuda:0" if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else "cpu")
    
    pipe = pipeline("automatic-speech-recognition", model=model_id, device=device)
    result = pipe(audio_path, return_timestamps=True)

    return {
        "status": "success",
        "audio_source": audio_path,
        "model": model_id,
        "duration_seconds": 0.0,
        "language": "en",
        "transcript": result.get("text", ""),
        "segments": result.get("chunks", [])
    }

def transcribe(audio_path_or_url: str) -> dict:
    api_url = os.getenv("VIBEVOICE_API_URL") or os.getenv("ASR_API_URL")
    node_env = os.getenv("NODE_ENV", "development").lower()
    allow_fallback = os.getenv("ALLOW_TEST_FALLBACKS", "false").lower() == "true" or node_env == "test"

    # 1. Tentar API HTTP dedicada
    if api_url:
        try:
            return transcribe_via_http_api(api_url, audio_path_or_url)
        except Exception as e:
            if not allow_fallback:
                raise RuntimeError(f"Falha ao conectar com VIBEVOICE_API_URL ({api_url}): {e}")

    # 2. Tentar execução local de PyTorch / Transformers
    try:
        import torch
        import transformers
        # Se for um arquivo de áudio existente no disco, tenta inferência local
        if os.path.exists(audio_path_or_url):
            return transcribe_local_transformers(audio_path_or_url)
    except ImportError:
        pass
    except Exception as e:
        if not allow_fallback:
            raise RuntimeError(f"Falha na inferência local VibeVoice: {e}")

    # 3. Fallback estrito apenas para ambiente de teste (NODE_ENV=test)
    if allow_fallback:
        return {
            "status": "success",
            "audio_source": audio_path_or_url,
            "model": "microsoft/VibeVoice-ASR-0.5B",
            "duration_seconds": 1820.0,
            "language": "en",
            "transcript": (
                "Welcome to UX Podcast. In today's episode, we discuss cognitive load theory, "
                "affordances, and how design systems shape modern software usability. "
                "Don Norman once noted that perceived affordance is what truly matters in interface design, "
                "allowing users to intuit action possibilities without instructions."
            ),
            "segments": [
                {
                    "start": 0.0,
                    "end": 15.2,
                    "speaker": "Host",
                    "text": "Welcome to UX Podcast. In today's episode, we discuss cognitive load theory."
                },
                {
                    "start": 15.3,
                    "end": 35.0,
                    "speaker": "Guest",
                    "text": "Perceived affordance is what truly matters in interface design."
                }
            ]
        }

    # 4. Se estiver em produção e nenhum backend real estiver configurado
    raise RuntimeError(
        "Nenhum motor de ASR disponível em produção. Configure VIBEVOICE_API_URL no .env "
        "ou instale PyTorch e transformers com o modelo microsoft/VibeVoice-ASR-0.5B."
    )

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Transcrever áudio via VibeVoice ASR (0.5B)")
    parser.add_argument("audio", help="Caminho do arquivo de áudio ou URL")
    args = parser.parse_args()

    try:
        result = transcribe(args.audio)
        print(json.dumps(result, ensure_ascii=False))
    except Exception as err:
        print(json.dumps({"status": "error", "message": str(err)}), file=sys.stderr)
        sys.exit(1)
