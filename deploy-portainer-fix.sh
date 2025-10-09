#!/bin/bash

# Script to simulate Portainer deployment with fixes for common issues

echo "=== ITFACT AUTO SERVICES SUITE DEPLOYMENT ==="
echo "Applying fixes for Portainer deployment issues..."

# 1. Clean Docker build cache
echo "1. Cleaning Docker build cache..."
docker builder prune -f
docker system prune -f

# 2. Pull base images to avoid digest issues
echo "2. Pre-pulling base images..."
docker pull node:20-alpine3.19
docker pull python:3.11-slim
docker pull nginx:alpine
docker pull postgres:17.6
docker pull mongo:latest
docker pull redis:latest
docker pull rabbitmq:3-management
docker pull minio/minio:latest

# 3. Build with no cache to avoid cached corrupted layers
echo "3. Building services with no cache..."
docker-compose build --no-cache

# 4. Bring up services
echo "4. Starting services..."
docker-compose up -d

# 5. Check service status
echo "5. Checking service status..."
docker-compose ps

echo "=== DEPLOYMENT COMPLETE ==="
echo "If any services are still showing errors, check their logs with:"
echo "docker logs <container_name>"