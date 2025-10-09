# Portainer Deployment Guide

This guide addresses common issues when deploying the ITFACT Auto Services Suite via Portainer.

## Common Issues and Solutions

### 1. "content digest sha256:...: not found" Error

**Cause**: Docker Hub rate limiting or corrupted image cache.

**Solution**:
1. Use the `docker-compose.portainer.yml` file provided in this repository
2. Pre-pull base images on your Portainer host:
   ```bash
   docker pull node:20-alpine3.19
   docker pull python:3.11-slim
   docker pull nginx:1.25-alpine
   docker pull postgres:17.6
   docker pull mongo:5.0
   docker pull redis:7.0
   docker pull rabbitmq:3.10-management
   ```

### 2. Build Failures

**Cause**: Cached corrupted layers or outdated dependencies.

**Solution**:
1. In Portainer, enable "Build with no cache" option
2. Or use our deployment scripts:
   - Windows: `deploy-portainer-fix.ps1`
   - Linux/Mac: `deploy-portainer-fix.sh`

### 3. File Mounting Issues

**Cause**: Attempting to mount a directory onto a file or vice-versa.

**Solution**:
Our configuration already uses directory-to-directory mounting which is compatible with Portainer:
- `./nginx:/etc/nginx` (directory to directory)
- `./prometheus/config:/etc/prometheus` (directory to directory)
- `./observability/config:/etc/promtail` (directory to directory)

## Deployment Steps

### Option 1: Using Portainer Web UI

1. Log into Portainer
2. Go to "Stacks" > "Add stack"
3. Select "Repository" tab
4. Enter repository URL: `https://github.com/your-repo/ITFACT.git`
5. Use compose path: `docker-compose.portainer.yml`
6. Click "Deploy the stack"

### Option 2: Using Portainer CLI

```bash
# Clone repository
git clone https://github.com/your-repo/ITFACT.git
cd ITFACT

# Deploy stack
docker-compose -f docker-compose.portainer.yml up -d
```

### Option 3: Pre-building Images

To avoid build issues entirely, you can pre-build images:

```bash
# Build images locally
docker-compose -f docker-compose.portainer.yml build

# Push to registry (if using private registry)
docker push itfact-as-frontend:latest
docker push itfact-as-nestjs:latest
docker push itfact-as-fastapi:latest

# Then deploy using images instead of builds
```

## Troubleshooting

### Check Container Logs
```bash
# In Portainer UI: Containers > Select container > Logs

# Or via CLI:
docker logs AS-NESTJS
docker logs AS-FASTAPI
docker logs AS-FRONTEND
```

### Restart Services
```bash
# In Portainer UI: Containers > Select container > Restart

# Or via CLI:
docker-compose -f docker-compose.portainer.yml restart as-nestjs
```

### Clean Deployment
If issues persist:
```bash
# Remove stack
docker-compose -f docker-compose.portainer.yml down

# Clean Docker cache
docker builder prune -a
docker system prune -a

# Redeploy
docker-compose -f docker-compose.portainer.yml up -d
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
POSTGRES_USER=itfact
POSTGRES_PASSWORD=itfactpwd
POSTGRES_DB=itfact

# Redis
REDIS_HOST=as-redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_USER=itfact
RABBITMQ_PASS=itfactpwd

# MongoDB
MONGO_URI=mongodb://as-mongodb:27017/itfact

# MinIO
MINIO_ROOT_USER=itfact
MINIO_ROOT_PASSWORD=itfactpwd
MINIO_ENDPOINT=as-minio:9101

# Grafana
GRAFANA_USER=admin
GRAFANA_PASS=admin

# Web
WEB_PORT=8080
```

## Service Access

After deployment, services will be available at:

- Frontend: http://localhost:8080
- NestJS API: http://localhost:3000
- FastAPI Catalog: http://localhost:8000
- PostgreSQL: localhost:5432
- MongoDB: localhost:27017
- Redis: localhost:6379
- RabbitMQ Management: http://localhost:15672
- MinIO: http://localhost:9101
- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090
- Loki: http://localhost:3100
- n8n: http://localhost:5678

## Support

If you continue to experience issues:

1. Check container logs for specific error messages
2. Ensure all environment variables are set correctly
3. Verify that ports are not blocked by firewall
4. Confirm sufficient system resources (RAM, CPU, disk space)