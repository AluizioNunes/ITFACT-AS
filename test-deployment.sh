#!/bin/bash

# Simple test script to verify deployment fixes

echo "Testing deployment fixes..."

# Check if docker-compose.portainer.yml exists
if [ ! -f "docker-compose.portainer.yml" ]; then
    echo "ERROR: docker-compose.portainer.yml not found!"
    exit 1
fi

# Check if deployment scripts exist
if [ ! -f "deploy-portainer-fix.sh" ]; then
    echo "ERROR: deploy-portainer-fix.sh not found!"
    exit 1
fi

if [ ! -f "deploy-portainer-fix.ps1" ]; then
    echo "ERROR: deploy-portainer-fix.ps1 not found!"
    exit 1
fi

# Check if documentation exists
if [ ! -f "PORTAINER_DEPLOYMENT.md" ]; then
    echo "ERROR: PORTAINER_DEPLOYMENT.md not found!"
    exit 1
fi

# Check if .dockerignore files exist
if [ ! -f ".dockerignore" ]; then
    echo "ERROR: .dockerignore not found!"
    exit 1
fi

if [ ! -f "Backend/NestJS/.dockerignore" ]; then
    echo "ERROR: Backend/NestJS/.dockerignore not found!"
    exit 1
fi

if [ ! -f "Backend/FastAPI/.dockerignore" ]; then
    echo "ERROR: Backend/FastAPI/.dockerignore not found!"
    exit 1
fi

# Check if Dockerfiles use specific versions
if ! grep -q "node:20-alpine3.19" "Dockerfile"; then
    echo "ERROR: Root Dockerfile doesn't use node:20-alpine3.19"
    exit 1
fi

if ! grep -q "node:20-alpine3.19" "Backend/NestJS/Dockerfile"; then
    echo "ERROR: NestJS Dockerfile doesn't use node:20-alpine3.19"
    exit 1
fi

if ! grep -q "python:3.11-slim" "Backend/FastAPI/Dockerfile"; then
    echo "ERROR: FastAPI Dockerfile doesn't use python:3.11-slim"
    exit 1
fi

echo "All deployment fixes verified successfully!"
echo "You can now deploy via Portainer without the common issues."