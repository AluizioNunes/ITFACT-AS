from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel
import logging
import json

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "level": record.levelname,
            "msg": record.getMessage(),
            "logger": record.name,
        }
        if record.exc_info:
            payload["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False)

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
logger = logging.getLogger("itfact.catalog")

app = FastAPI(
    title="ITFACT - AUTO SERVICES SUITE - API Catalog",
    description="API de Catálogo e Integrações Externas - Sistema de Gestão para Oficinas Mecânicas",
    version="1.0.0"
)

@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    response = await call_next(request)
    logger.info(json.dumps({
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
    }))
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1024)

@app.get("/health")
def health():
    return {"status": "ok"}

class SupplierSearchQuery(BaseModel):
    tenantId: str
    q: str

@app.post("/suppliers/search")
async def suppliers_search(payload: SupplierSearchQuery):
    return {"items": [], "tenantId": payload.tenantId, "q": payload.q}

@app.post("/suppliers/sync")
async def suppliers_sync(request: Request):
    body = await request.json()
    return {"accepted": True, "received": body}

@app.post("/webhooks/whatsapp")
async def whatsapp_webhook(request: Request):
    body = await request.json()
    return {"ok": True, "received": body}

@app.post("/webhooks/supplier")
async def supplier_webhook(request: Request):
    body = await request.json()
    return {"ok": True, "received": body}
