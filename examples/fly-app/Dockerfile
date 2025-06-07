# Use Bun Alpine image for smaller size and better performance
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Create app user for security
RUN addgroup -g 1001 -S bunjs
RUN adduser -S bunjs -u 1001

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy application source
COPY src/ ./src/

# Create data directory and set permissions
RUN mkdir -p /data && chown -R bunjs:bunjs /data && chown -R bunjs:bunjs /app

# Switch to non-root user
USER bunjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the application
CMD ["bun", "run", "src/index.ts"]