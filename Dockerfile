# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the Astro project
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Copy node_modules from builder (much faster than reinstalling)
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json for reference
COPY package.json ./

# Expose port
EXPOSE 4321

# Environment variables for proper proxy handling
ENV HOST=0.0.0.0

# Start the preview server with explicit port and host binding, and allowed hosts
CMD ["npm", "run", "preview", "--", "--host", "--port", "4321", "--allowed-hosts", "int20h.best-kyiv.org,localhost,127.0.0.1"]
