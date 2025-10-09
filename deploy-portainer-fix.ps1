# PowerShell script to simulate Portainer deployment with fixes for common issues

Write-Host "=== ITFACT AUTO SERVICES SUITE DEPLOYMENT ===" -ForegroundColor Green
Write-Host "Applying fixes for Portainer deployment issues..." -ForegroundColor Yellow

# 1. Clean Docker build cache
Write-Host "1. Cleaning Docker build cache..." -ForegroundColor Cyan
docker builder prune -f
docker system prune -f

# 2. Pull base images to avoid digest issues
Write-Host "2. Pre-pulling base images..." -ForegroundColor Cyan
docker pull node:20-alpine3.19
docker pull python:3.11-slim
docker pull nginx:alpine
docker pull postgres:17.6
docker pull mongo:latest
docker pull redis:latest
docker pull rabbitmq:3-management
docker pull minio/minio:latest

# 3. Build with no cache to avoid cached corrupted layers
Write-Host "3. Building services with no cache..." -ForegroundColor Cyan
docker-compose build --no-cache

# 4. Bring up services
Write-Host "4. Starting services..." -ForegroundColor Cyan
docker-compose up -d

# 5. Check service status
Write-Host "5. Checking service status..." -ForegroundColor Cyan
docker-compose ps

Write-Host "=== DEPLOYMENT COMPLETE ===" -ForegroundColor Green
Write-Host "If any services are still showing errors, check their logs with:" -ForegroundColor Yellow
Write-Host "docker logs <container_name>" -ForegroundColor Yellow