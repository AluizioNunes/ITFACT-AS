# PowerShell test script to verify deployment fixes

Write-Host "Testing deployment fixes..." -ForegroundColor Green

# Check if docker-compose.portainer.yml exists
if (-not (Test-Path "docker-compose.portainer.yml")) {
    Write-Host "ERROR: docker-compose.portainer.yml not found!" -ForegroundColor Red
    exit 1
}

# Check if deployment scripts exist
if (-not (Test-Path "deploy-portainer-fix.sh")) {
    Write-Host "ERROR: deploy-portainer-fix.sh not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "deploy-portainer-fix.ps1")) {
    Write-Host "ERROR: deploy-portainer-fix.ps1 not found!" -ForegroundColor Red
    exit 1
}

# Check if documentation exists
if (-not (Test-Path "PORTAINER_DEPLOYMENT.md")) {
    Write-Host "ERROR: PORTAINER_DEPLOYMENT.md not found!" -ForegroundColor Red
    exit 1
}

# Check if .dockerignore files exist
if (-not (Test-Path ".dockerignore")) {
    Write-Host "ERROR: .dockerignore not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "Backend/NestJS/.dockerignore")) {
    Write-Host "ERROR: Backend/NestJS/.dockerignore not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "Backend/FastAPI/.dockerignore")) {
    Write-Host "ERROR: Backend/FastAPI/.dockerignore not found!" -ForegroundColor Red
    exit 1
}

# Check if Dockerfiles use specific versions
$rootDockerfile = Get-Content "Dockerfile" -Raw
if (-not ($rootDockerfile -match "NODE_VERSION=20-alpine3.19")) {
    Write-Host "ERROR: Root Dockerfile doesn't use NODE_VERSION=20-alpine3.19" -ForegroundColor Red
    exit 1
}

$nestJsDockerfile = Get-Content "Backend/NestJS/Dockerfile" -Raw
if (-not ($nestJsDockerfile -match "NODE_VERSION=20-alpine3.19")) {
    Write-Host "ERROR: NestJS Dockerfile doesn't use NODE_VERSION=20-alpine3.19" -ForegroundColor Red
    exit 1
}

$fastApiDockerfile = Get-Content "Backend/FastAPI/Dockerfile" -Raw
if (-not ($fastApiDockerfile -match "PYTHON_VERSION=3.11-slim")) {
    Write-Host "ERROR: FastAPI Dockerfile doesn't use PYTHON_VERSION=3.11-slim" -ForegroundColor Red
    exit 1
}

Write-Host "All deployment fixes verified successfully!" -ForegroundColor Green
Write-Host "You can now deploy via Portainer without the common issues." -ForegroundColor Yellow