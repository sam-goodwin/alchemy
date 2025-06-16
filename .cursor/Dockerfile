# Use Ubuntu as base image to match the GitHub Actions environment
FROM ubuntu:22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set working directory
WORKDIR /workspace

# Copy package files first for better caching
COPY package.json bun.lockb ./
COPY alchemy/package.json ./alchemy/
COPY alchemy-web/package.json ./alchemy-web/
COPY stacks/package.json ./stacks/
COPY examples/cloudflare-tanstack-start/package.json ./examples/cloudflare-tanstack-start/

# Install all dependencies at once
RUN bun install

# Copy the rest of the workspace
COPY . .

# Install example dependencies
RUN cd examples/cloudflare-tanstack-start && bun install

# Expose port for the dev server
EXPOSE 3000

# Default command
CMD ["/bin/bash"] 