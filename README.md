# ITFACT - AUTO SERVICES SUITE

Sistema completo de gestão para oficinas mecânicas com backend híbrido (NestJS + FastAPI), frontend moderno (React + Vite + Ant Design) e integrações avançadas.

## 🚀 Tecnologias

### Frontend
- React 19 + TypeScript
- Vite 7 (Rolldown)
- Ant Design 5
- ECharts para BI
- TanStack Query
- Framer Motion

### Backend
- **API Core:** NestJS + TypeScript + Prisma
- **API Catalog:** FastAPI + Python + Pydantic

### Infraestrutura
- PostgreSQL 16 (transacional)
- MongoDB 7 (documentos/snapshots)
- Redis 7 (cache/locks)
- RabbitMQ 3 (mensageria)
- MinIO (storage S3-compatible)
- Grafana + Loki + Promtail (observabilidade)
- n8n (automações)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## 🚀 Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Portainer Deployment Fixes
If you encounter deployment errors in Portainer (like "content digest not found"), use our deployment scripts:

**Windows:**
```powershell
./deploy-portainer-fix.ps1
```

**Linux/Mac:**
```bash
./deploy-portainer-fix.sh
```

These scripts will:
1. Clean Docker build cache
2. Pre-pull base images
3. Build with no cache
4. Start services

### Common Portainer Issues & Solutions
1. **Digest errors**: Caused by Docker Hub rate limiting or corrupted cache
2. **Build failures**: Often due to outdated image layers
3. **Mounting issues**: Fixed by using directory-to-directory mounts

## 🛠️ Troubleshooting

### If containers keep restarting:
```bash
# Check logs for specific container
docker logs <container_name>

# Restart specific service
docker-compose restart <service_name>
```

### If build fails with cache issues:
```bash
# Clean build cache
docker builder prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### If services can't connect:
1. Check if all dependencies are listed in `depends_on`
2. Verify environment variables in `.env` file
3. Ensure ports are not blocked by firewall

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
