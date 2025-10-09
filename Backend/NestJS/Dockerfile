# Backend/NestJS/Dockerfile
ARG NODE_VERSION=20-alpine3.19
FROM node:${NODE_VERSION}
WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy dependency files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]