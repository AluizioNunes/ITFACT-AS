# ITFACT - AUTO SERVICES SUITE
## TODO LIST - Implementação Completa

**Data de Criação:** 03/10/2025  
**Versão do Documento de Arquitetura:** v1.0

---

## ✅ FASE 0 - PLANEJAMENTO E ESCOPO

### Módulos Comerciais
- [x] Definição dos planos: Basic, Professional, Enterprise, Suite
- [x] Escopo dos módulos mapeado
- [x] Critérios de MVP definidos

### Arquitetura Definida
- [x] Backend híbrido: Node.js (NestJS) + Python (FastAPI)
- [x] Bancos: PostgreSQL + MongoDB + Redis
- [x] Mensageria: RabbitMQ
- [x] Frontend: React + TypeScript + Vite + Ant Design
- [x] BI: Apache ECharts
- [x] Observabilidade: Loki + Promtail + Grafana
- [x] Integrações: n8n + WhatsApp Business API
- [x] Storage: MinIO

---

## 🔄 FASE 1 - INFRAESTRUTURA LOCAL (Docker)

### Estrutura de Pastas
- [x] `/apps/web` - Frontend React (ATUAL: raiz do projeto)
- [ ] **REORGANIZAR:** Mover frontend para `/apps/web`
- [x] `/services/api-core` - NestJS (ATUAL: `/Backend/NestJS`)
- [ ] **REORGANIZAR:** Mover para `/services/api-core`
- [x] `/services/api-catalog` - FastAPI (ATUAL: `/Backend/FastAPI`)
- [ ] **REORGANIZAR:** Mover para `/services/api-catalog`
- [ ] `/packages/shared` - Criar estrutura para contratos/SDKs
- [x] `/deploy/docker` - Docker configs ✅
- [x] `/deploy/docker/init` - Scripts de inicialização ✅
- [x] `/deploy/docker/observability` - Configs Loki/Promtail ✅

### Arquivos de Configuração
- [x] `.env.example` - Criado ✅
- [x] `.env` - Existente ✅
- [ ] **ATUALIZAR:** Renomear referências para "ITFACT - AUTO SERVICES SUITE"

### Dockerfiles
- [x] `Dockerfile` (Frontend) - Existente na raiz ✅
- [ ] **MOVER:** Para `/apps/web/Dockerfile`
- [ ] `services/api-core/Dockerfile` - **CRIAR** (NestJS)
- [x] `services/api-catalog/Dockerfile` - Existente ✅
- [ ] **MOVER:** Para nova estrutura

### Docker Compose
- [x] `deploy/docker/docker-compose.yml` - Existente ✅
- [ ] **AJUSTAR:** Caminhos após reorganização de pastas
- [x] Serviços definidos: web, api-core, api-catalog, postgres, mongo, redis, rabbitmq, minio, loki, promtail, grafana, n8n ✅

### Scripts de Inicialização
- [x] `deploy/docker/init/postgres/001_extensions.sql` - Existente ✅
- [ ] **ADICIONAR:** pgvector extension para IA
- [ ] **CRIAR:** Seeds iniciais (tenants, roles, permissions)

---

## 🗄️ FASE 2 - MODELAGEM DE DADOS

### PostgreSQL - Schema Prisma
- [x] Model `Tenant` - Criado ✅
- [x] Model `UserAccount` - Criado ✅
- [x] Model `Product` - Criado ✅
- [x] Model `ServiceOrder` - Criado ✅
- [x] Model `ServiceOrderItem` - Criado ✅

#### Modelos FALTANDO (Críticos):
- [ ] **CRIAR:** `Role` (RBAC)
- [ ] **CRIAR:** `Permission` (RBAC)
- [ ] **CRIAR:** `RolePermission` (many-to-many)
- [ ] **CRIAR:** `UserRole` (many-to-many)
- [ ] **CRIAR:** `ApiKey` (autenticação API)
- [ ] **CRIAR:** `ProductCategory`
- [ ] **CRIAR:** `Brand`
- [ ] **CRIAR:** `ServiceCatalog`
- [ ] **CRIAR:** `Customer`
- [ ] **CRIAR:** `Vehicle`
- [ ] **CRIAR:** `ServiceOrderEvent` (histórico/auditoria)
- [ ] **CRIAR:** `Warehouse` (almoxarifados)
- [ ] **CRIAR:** `Stock` (estoque)
- [ ] **CRIAR:** `StockMove` (movimentações)
- [ ] **CRIAR:** `Supplier` (fornecedores)
- [ ] **CRIAR:** `SupplierProduct` (catálogo fornecedor)
- [ ] **CRIAR:** `PurchaseOrder` (ordem de compra)
- [ ] **CRIAR:** `PurchaseOrderItem`
- [ ] **CRIAR:** `GRN` (recebimento de mercadorias)
- [ ] **CRIAR:** `GRNItem`
- [ ] **CRIAR:** `PaymentMethod`
- [ ] **CRIAR:** `Invoice` (fatura)
- [ ] **CRIAR:** `Payment` (pagamento)
- [ ] **CRIAR:** `TaxRule` (regras fiscais)
- [ ] **CRIAR:** `WebhookSubscription`
- [ ] **CRIAR:** `IntegrationProvider`
- [ ] **CRIAR:** `OutboxEvent` (Outbox Pattern)
- [ ] **CRIAR:** `WhatsappMessage`
- [ ] **CRIAR:** `AuditLog` (auditoria completa)
- [ ] **CRIAR:** `LoginAudit`
- [ ] **CRIAR:** `AIJob` (trabalhos de IA)
- [ ] **CRIAR:** `AIDocument` (documentos RAG)
- [ ] **CRIAR:** `AIEmbedding` (vetores pgvector)

### MongoDB - Coleções
- [ ] **CRIAR:** `os_snapshots` (snapshots ricos de OS)
- [ ] **CRIAR:** `catalog_external_products` (catálogos fornecedores)
- [ ] **CRIAR:** `messages_threads` (conversas WhatsApp)
- [ ] **CRIAR:** `webhooks_events` (eventos de webhooks)
- [ ] **CRIAR:** Índices apropriados

### Migrations
- [ ] **EXECUTAR:** `prisma migrate dev` com schema completo
- [ ] **CRIAR:** Seeds de dados iniciais
- [ ] **TESTAR:** Conexão com PostgreSQL via Docker

---

## 📨 FASE 3 - MENSAGERIA (RabbitMQ)

### Exchanges e Filas
- [ ] **CONFIGURAR:** Exchange `domain.exchange` (topic)
- [ ] **CONFIGURAR:** Exchange `integration.exchange` (topic)
- [ ] **CONFIGURAR:** Exchange `retry.exchange` (topic)
- [ ] **CONFIGURAR:** Exchange `dlx.exchange` (dead-letter)

### Filas Principais
- [ ] `os.projection.queue` - Atualiza os_snapshots no Mongo
- [ ] `stock.replenish.queue` - Alertas de estoque baixo
- [ ] `notifications.whatsapp.queue` - Envio WhatsApp
- [ ] `integration.supplier.queue` - Sincronização catálogos
- [ ] `outbox.dispatch.queue` - Despacha eventos do Outbox

### Implementação
- [ ] **IMPLEMENTAR:** Outbox Pattern no NestJS
- [ ] **IMPLEMENTAR:** Workers/Consumers no FastAPI
- [ ] **IMPLEMENTAR:** Idempotência com Redis
- [ ] **IMPLEMENTAR:** DLQ com retry exponencial

---

## 📊 FASE 4 - LOGS, AUDITORIA E OBSERVABILIDADE

### Logs Estruturados
- [x] FastAPI com logs JSON ✅
- [ ] **IMPLEMENTAR:** NestJS com logs JSON estruturados
- [ ] **ADICIONAR:** Campos: tenantId, userId, correlationId, requestId
- [ ] **IMPLEMENTAR:** Mascaramento de PII

### Coleta e Visualização
- [x] Loki configurado no docker-compose ✅
- [x] Promtail configurado ✅
- [x] Grafana configurado ✅
- [ ] **CRIAR:** Dashboards Grafana (Logs, Métricas, Erros)
- [ ] **CONFIGURAR:** Data sources no Grafana

### Auditoria
- [ ] **IMPLEMENTAR:** Triggers de auditoria no Postgres
- [ ] **IMPLEMENTAR:** Middleware de auditoria no NestJS
- [ ] **IMPLEMENTAR:** Login audit completo

### Tracing
- [ ] **ADICIONAR:** OpenTelemetry Collector ao docker-compose
- [ ] **INSTRUMENTAR:** APIs com OpenTelemetry

### Métricas
- [ ] **EXPOR:** Endpoint `/metrics` no NestJS
- [ ] **EXPOR:** Endpoint `/metrics` no FastAPI
- [ ] **CONFIGURAR:** Prometheus (opcional)

---

## 🔌 FASE 5 - INTEGRAÇÕES

### n8n
- [x] Serviço n8n no docker-compose ✅
- [ ] **CONFIGURAR:** Credenciais e secrets
- [ ] **CRIAR:** Workflows de exemplo (OS → Email/Slack)
- [ ] **IMPLEMENTAR:** Webhooks de saída (api-core → n8n)
- [ ] **IMPLEMENTAR:** Validação HMAC

### WhatsApp Business API
- [ ] **ESCOLHER:** Meta Cloud API vs Twilio
- [ ] **REGISTRAR:** Conta WhatsApp Business
- [ ] **CONFIGURAR:** Templates aprovados
- [ ] **IMPLEMENTAR:** Envio de mensagens (outbound)
- [ ] **IMPLEMENTAR:** Recebimento de mensagens (webhook)
- [ ] **IMPLEMENTAR:** Mapeamento status OS → Mensagens
- [ ] **IMPLEMENTAR:** Opt-in de clientes
- [ ] **IMPLEMENTAR:** Rate limiting

### Fornecedores Externos
- [ ] **IMPLEMENTAR:** Endpoint `/suppliers/search` (FastAPI)
- [ ] **IMPLEMENTAR:** Endpoint `/suppliers/sync` (FastAPI)
- [ ] **IMPLEMENTAR:** Workers de sincronização
- [ ] **IMPLEMENTAR:** Mapeamento de produtos

---

## 🤖 FASE 6 - IA EMBUTIDA

### Infraestrutura
- [ ] **ADICIONAR:** pgvector ao schema Prisma
- [ ] **CONFIGURAR:** Provider de LLM (OpenAI/Anthropic/Local)
- [ ] **IMPLEMENTAR:** Abstração provider-agnostic

### Casos de Uso
- [ ] **IMPLEMENTAR:** Estimativa inteligente de orçamento
- [ ] **IMPLEMENTAR:** Sumário de OS para cliente
- [ ] **IMPLEMENTAR:** Classificação de mensagens WhatsApp
- [ ] **IMPLEMENTAR:** RAG com manuais técnicos

### Pipeline
- [ ] **IMPLEMENTAR:** Upload e processamento de documentos
- [ ] **IMPLEMENTAR:** Chunking e embedding
- [ ] **IMPLEMENTAR:** Busca vetorial
- [ ] **IMPLEMENTAR:** Workers para ai_job
- [ ] **IMPLEMENTAR:** Cache de respostas no Redis

---

## 💻 FASE 7 - FRONTEND (React + Vite + Ant Design)

### Estrutura Atual
- [x] React 19 + TypeScript ✅
- [x] Vite 7 (rolldown) ✅
- [x] Ant Design 5 ✅
- [x] React Router 6 ✅
- [x] TanStack Query ✅
- [x] Framer Motion ✅
- [x] ECharts ✅

### Reorganização
- [ ] **MOVER:** Frontend para `/apps/web`
- [ ] **CRIAR:** Estrutura de módulos completa
- [ ] **ATUALIZAR:** Imports após reorganização

### Módulos/Páginas Existentes
- [x] Login ✅
- [x] Dashboard ✅
- [x] Orders (OS) ✅
- [x] Catalog (Catálogo) ✅
- [x] Estoque ✅
- [x] Financeiro ✅
- [x] Integrações ✅
- [x] Cadastros (PF, PJ, Veículos) ✅
- [x] Sistema (Usuários, Perfil, Permissões) ✅

### Implementações FALTANDO
- [ ] **IMPLEMENTAR:** CRUD completo de OS
- [ ] **IMPLEMENTAR:** CRUD completo de Catálogo
- [ ] **IMPLEMENTAR:** CRUD completo de Estoque
- [ ] **IMPLEMENTAR:** CRUD completo de Compras
- [ ] **IMPLEMENTAR:** CRUD completo de Fornecedores
- [ ] **IMPLEMENTAR:** Gestão de Clientes
- [ ] **IMPLEMENTAR:** Gestão de Veículos
- [ ] **IMPLEMENTAR:** Financeiro completo
- [ ] **IMPLEMENTAR:** RBAC (esconder menus por permissão)
- [ ] **IMPLEMENTAR:** Multi-tenant (seleção/subdomínio)

### Componentes e Features
- [ ] **IMPLEMENTAR:** Upload de arquivos (MinIO)
- [ ] **IMPLEMENTAR:** Presigned URLs
- [ ] **CRIAR:** Componentes reutilizáveis (tabelas, forms)
- [ ] **CRIAR:** Wrappers ECharts customizados

### Dashboards BI
- [ ] **CRIAR:** Dashboard de OS por status
- [ ] **CRIAR:** Dashboard de giro de estoque
- [ ] **CRIAR:** Dashboard de receita por período
- [ ] **CRIAR:** Dashboard de performance técnicos
- [ ] **CRIAR:** Dashboard de compras

### API Client
- [ ] **IMPLEMENTAR:** Cliente Axios com interceptors
- [ ] **IMPLEMENTAR:** Gestão de tokens JWT
- [ ] **IMPLEMENTAR:** Refresh token automático
- [ ] **IMPLEMENTAR:** Error handling global

---

## 🔐 FASE 8 - SEGURANÇA E COMPLIANCE

### Autenticação e Autorização
- [ ] **IMPLEMENTAR:** Hash Argon2 para senhas
- [ ] **IMPLEMENTAR:** JWT com rotação
- [ ] **IMPLEMENTAR:** Refresh tokens
- [ ] **IMPLEMENTAR:** RBAC completo
- [ ] **IMPLEMENTAR:** API Keys para integrações
- [ ] **CONSIDERAR:** RLS (Row-Level Security) no Postgres

### Segurança de APIs
- [ ] **IMPLEMENTAR:** CORS configurado
- [ ] **IMPLEMENTAR:** Rate limiting (Redis)
- [ ] **IMPLEMENTAR:** Helmet.js
- [ ] **IMPLEMENTAR:** Validação forte (DTOs, Pydantic)
- [ ] **IMPLEMENTAR:** Sanitização de inputs

### Dados
- [ ] **IMPLEMENTAR:** Criptografia em repouso (TDE)
- [ ] **IMPLEMENTAR:** KMS para MinIO (SSE-S3)
- [ ] **CONFIGURAR:** Backups automatizados (Postgres, Mongo, MinIO)
- [ ] **IMPLEMENTAR:** Política de retenção de logs

### LGPD/GDPR
- [ ] **IMPLEMENTAR:** Consentimento WhatsApp
- [ ] **IMPLEMENTAR:** Anonimização em logs
- [ ] **IMPLEMENTAR:** Portabilidade de dados
- [ ] **DOCUMENTAR:** Propósito e políticas

---

## ✅ FASE 9 - CRITÉRIOS DE ACEITAÇÃO MVP

### Fluxo Completo de OS
- [ ] Criar OS com cliente/veículo
- [ ] Adicionar peças e serviços
- [ ] Aprovar orçamento
- [ ] Consumir estoque automaticamente
- [ ] Concluir OS
- [ ] Faturar
- [ ] Registrar pagamento

### Catálogo
- [ ] Cadastro local de peças/serviços
- [ ] Consulta a fornecedor externo

### Estoque
- [ ] Movimentação automática por OS
- [ ] Recebimento de compras
- [ ] Alertas de mínimo

### Compras
- [ ] Criar PO
- [ ] Receber GRN
- [ ] Atualizar custo médio

### WhatsApp
- [ ] Envio automático de status
- [ ] Registro de mensagens recebidas

### Dashboards
- [ ] OS por status (ECharts)
- [ ] Giro de estoque
- [ ] Receita por período

### Logs e Auditoria
- [ ] Todas ações em audit_log
- [ ] Logs centralizados no Grafana

### Integrações
- [ ] Webhook n8n funcionando
- [ ] Evento os.updated sendo enviado

---

## 🚀 FASE 10 - DEPLOY E PRÓXIMOS PASSOS

### Reorganização do Monorepo
- [ ] **EXECUTAR:** Reorganização de pastas
- [ ] **ATUALIZAR:** docker-compose.yml
- [ ] **TESTAR:** `docker compose up -d`

### NestJS (api-core)
- [ ] **CRIAR:** Dockerfile
- [ ] **IMPLEMENTAR:** Módulos:
  - [ ] Auth (JWT, refresh, login)
  - [ ] Tenants
  - [ ] Users
  - [ ] Customers
  - [ ] Vehicles
  - [ ] ServiceOrders
  - [ ] Inventory (Stock, Warehouses, StockMoves)
  - [ ] Suppliers
  - [ ] Purchases (PO, GRN)
  - [ ] Finance (Invoices, Payments)
  - [ ] Integrations (Webhooks, n8n)
  - [ ] Audit
  - [ ] AI

### FastAPI (api-catalog)
- [x] Dockerfile existente ✅
- [ ] **IMPLEMENTAR:** Rotas completas:
  - [ ] `/suppliers/search`
  - [ ] `/suppliers/sync`
  - [ ] `/webhooks/whatsapp`
  - [ ] `/webhooks/supplier`
- [ ] **IMPLEMENTAR:** Conexão MongoDB
- [ ] **IMPLEMENTAR:** Conexão Redis
- [ ] **IMPLEMENTAR:** RabbitMQ consumers

### Outbox Pattern
- [ ] **IMPLEMENTAR:** Tabela outbox_event
- [ ] **IMPLEMENTAR:** Worker de dispatch
- [ ] **IMPLEMENTAR:** Consumers

### Testes
- [ ] **CRIAR:** Testes unitários (NestJS)
- [ ] **CRIAR:** Testes de integração
- [ ] **CRIAR:** Testes E2E (opcional Playwright)

### Grafana
- [ ] **CONFIGURAR:** Datasources (Loki)
- [ ] **CRIAR:** Dashboard de logs por serviço
- [ ] **CRIAR:** Dashboard de erros por minuto
- [ ] **CRIAR:** Dashboard de latência média

### WhatsApp Sandbox
- [ ] **REGISTRAR:** Template aprovado
- [ ] **TESTAR:** Envio via sandbox

### Documentação
- [ ] **CRIAR:** README principal
- [ ] **CRIAR:** API docs (Swagger/OpenAPI)
- [ ] **CRIAR:** Guia de desenvolvimento
- [ ] **CRIAR:** Guia de deploy

---

## 📝 AJUSTES DE NOMENCLATURA

### Renomear para "ITFACT - AUTO SERVICES SUITE"
- [ ] **ATUALIZAR:** package.json (name)
- [ ] **ATUALIZAR:** Backend/NestJS/package.json (name)
- [ ] **ATUALIZAR:** README.md (título e descrição)
- [ ] **ATUALIZAR:** FastAPI title em main.py
- [ ] **ATUALIZAR:** Comentários e documentação
- [ ] **ATUALIZAR:** Títulos de páginas no frontend
- [ ] **ATUALIZAR:** Meta tags HTML

---

## 📊 RESUMO DO STATUS ATUAL

### ✅ O QUE JÁ ESTÁ FEITO:
1. **Estrutura básica do projeto criada**
2. **Docker Compose completo** com todos os serviços
3. **Frontend React + Vite + Ant Design** funcionando
4. **Rotas básicas** do frontend mapeadas
5. **FastAPI básico** com endpoints de exemplo
6. **NestJS básico** com Prisma
7. **Schema Prisma inicial** (4 models básicos)
8. **Observabilidade** (Loki, Promtail, Grafana) configurada
9. **Variáveis de ambiente** estruturadas

### 🔄 EM PROGRESSO:
1. Modelagem completa de dados (70+ tabelas faltando)
2. Implementação dos módulos de negócio
3. Integrações (WhatsApp, n8n)

### ❌ NÃO INICIADO:
1. Reorganização de pastas (monorepo)
2. Outbox Pattern e mensageria
3. IA embutida
4. RBAC completo
5. Auditoria avançada
6. Implementações completas de CRUD
7. Dashboards BI
8. Segurança avançada
9. Testes automatizados

---

## 🎯 PRIORIDADES IMEDIATAS (PRÓXIMOS PASSOS)

### 1. REORGANIZAÇÃO (Alta Prioridade)
- Reorganizar estrutura de pastas conforme documento
- Criar Dockerfile do NestJS
- Ajustar docker-compose.yml

### 2. MODELAGEM DE DADOS (Crítico)
- Completar schema Prisma com todas as 39 tabelas
- Executar migrations
- Criar seeds iniciais

### 3. RENOMEAÇÃO (Rápido)
- Atualizar todos os nomes para "ITFACT - AUTO SERVICES SUITE"

### 4. BACKEND CORE (Alto Impacto)
- Implementar módulos Auth, Customers, Vehicles, ServiceOrders
- Implementar Outbox Pattern
- Conectar RabbitMQ

### 5. FRONTEND CRUD (Médio Prazo)
- Implementar formulários completos de OS
- Implementar gestão de catálogo
- Implementar dashboards básicos

---

**ÚLTIMA ATUALIZAÇÃO:** 03/10/2025 15:13  
**RESPONSÁVEL:** Cascade AI + Renata  
**PRÓXIMA REVISÃO:** Após reorganização de pastas e renomeação
