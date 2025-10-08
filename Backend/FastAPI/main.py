from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel, Field
import logging
import json
import httpx
import os
from typing import List, Optional, Dict, Any
from datetime import datetime

# Configuração de logging estruturado
class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "level": record.levelname,
            "msg": record.getMessage(),
            "logger": record.name,
            "timestamp": datetime.utcnow().isoformat(),
        }
        if record.exc_info:
            payload["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False)

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
logger = logging.getLogger("itfact.catalog")

# FastAPI app
app = FastAPI(
    title="ITFACT - AUTO SERVICES SUITE - API Catalog",
    description="API de Catálogo e Integrações Externas - Sistema de Gestão para Oficinas Mecânicas",
    version="1.0.0"
)

# Middleware de logging
@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    start_time = datetime.utcnow()
    response = await call_next(request)

    process_time = (datetime.utcnow() - start_time).total_seconds()
    logger.info(json.dumps({
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
        "process_time": process_time,
        "ip": request.client.host if request.client else None,
    }))

    return response

# CORS e GZip
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1024)

# ============================================================================
# MODELOS PYDANTIC
# ============================================================================

class SupplierSearchQuery(BaseModel):
    tenantId: str
    q: str

class SupplierProductResponse(BaseModel):
    id: str
    sku: str
    name: str
    price: float
    stock: int
    supplier: str

class SupplierSyncRequest(BaseModel):
    tenantId: str
    supplierId: str
    products: List[Dict[str, Any]]

class WhatsAppWebhookPayload(BaseModel):
    object: str
    entry: List[Dict[str, Any]]

class SupplierWebhookPayload(BaseModel):
    event: str
    data: Dict[str, Any]

# ============================================================================
# DEPENDÊNCIAS E SERVIÇOS
# ============================================================================

async def get_tenant_context(tenant_id: str):
    """Validação básica de tenant - implementar cache Redis futuramente"""
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Tenant ID is required")
    return {"tenant_id": tenant_id}

# ============================================================================
# ENDPOINTS
# ============================================================================

@app.get("/health")
def health():
    return {"status": "ok", "service": "api-catalog"}

@app.post("/suppliers/search")
async def suppliers_search(payload: SupplierSearchQuery):
    """Buscar produtos de fornecedores externos"""
    logger.info(f"Searching products for tenant {payload.tenantId}: {payload.q}")

    # TODO: Implementar busca real nos fornecedores
    # Por enquanto retorna dados mock
    mock_results = [
        SupplierProductResponse(
            id="1",
            sku="FILT-001",
            name="Filtro de Óleo",
            price=45.90,
            stock=10,
            supplier="Bosch"
        ),
        SupplierProductResponse(
            id="2",
            sku="PAST-002",
            name="Pastilha de Freio",
            price=89.90,
            stock=5,
            supplier="Bosch"
        )
    ]

    return {
        "items": mock_results,
        "tenantId": payload.tenantId,
        "query": payload.q,
        "total": len(mock_results)
    }

@app.post("/suppliers/sync")
async def suppliers_sync(request: Request, tenant_id: str = Depends(get_tenant_context)):
    """Receber sincronização de catálogo de fornecedores"""
    body = await request.json()
    logger.info(f"Sync request for tenant {tenant_id}: {len(body.get('products', []))} products")

    # TODO: Processar dados e salvar no MongoDB
    # TODO: Publicar evento no RabbitMQ

    return {
        "accepted": True,
        "received": len(body.get('products', [])),
        "tenantId": tenant_id
    }

@app.post("/webhooks/whatsapp")
async def whatsapp_webhook(payload: WhatsAppWebhookPayload):
    """Webhook para mensagens do WhatsApp Business API"""
    logger.info(f"WhatsApp webhook received: {len(payload.entry)} entries")

    for entry in payload.entry:
        for change in entry.get('changes', []):
            if change.get('field') == 'messages':
                # TODO: Processar mensagem recebida
                # TODO: Salvar no MongoDB (messages_threads)
                # TODO: Publicar evento no RabbitMQ para processamento

                message_data = change.get('value', {})
                logger.info(f"Message received: {message_data}")

    return {"ok": True, "received": True}

@app.post("/webhooks/supplier")
async def supplier_webhook(payload: SupplierWebhookPayload):
    """Webhook genérico para fornecedores"""
    logger.info(f"Supplier webhook received: {payload.event}")

    # TODO: Processar evento do fornecedor
    # TODO: Salvar no MongoDB (webhooks_events)
    # TODO: Publicar evento no RabbitMQ

    return {"ok": True, "received": payload.event}

@app.get("/suppliers/{supplier_id}/products")
async def get_supplier_products(supplier_id: str, tenant_id: str = Depends(get_tenant_context)):
    """Obter produtos de um fornecedor específico"""
    logger.info(f"Getting products for supplier {supplier_id} in tenant {tenant_id}")

    # TODO: Buscar produtos do fornecedor no MongoDB
    # TODO: Aplicar filtros e paginação

    return {
        "supplierId": supplier_id,
        "tenantId": tenant_id,
        "products": [],
        "total": 0
    }

@app.post("/suppliers/{supplier_id}/sync")
async def sync_supplier_catalog(supplier_id: str, tenant_id: str = Depends(get_tenant_context)):
    """Forçar sincronização de catálogo de fornecedor"""
    logger.info(f"Forcing sync for supplier {supplier_id} in tenant {tenant_id}")

    # TODO: Implementar sincronização manual
    # TODO: Fazer requisição HTTP para API do fornecedor
    # TODO: Processar resposta e salvar no MongoDB

    return {
        "supplierId": supplier_id,
        "tenantId": tenant_id,
        "status": "sync_started",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
