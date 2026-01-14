# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Astro project
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Install production dependencies
COPY package.json ./
RUN npm install --omit=dev

# Expose port
EXPOSE 3000

# Environment variables for proper proxy handling
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the preview server with host binding
CMD ["npm", "run", "preview", "--", "--host"]
