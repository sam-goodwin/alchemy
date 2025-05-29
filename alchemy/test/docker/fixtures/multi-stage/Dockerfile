# Stage 1: Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Create a simple index.js file
RUN echo 'console.log("Hello from Alchemy multi-stage build");' > index.js

# Stage 2: Production stage
FROM node:16-alpine AS production

WORKDIR /app

# Copy only what we need from the builder stage
COPY --from=builder /app/index.js .

# Set the command
CMD ["node", "index.js"]
