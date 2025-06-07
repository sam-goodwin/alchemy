# Fly.io Example App

This example demonstrates deploying a Node.js application with persistent storage to Fly.io using Alchemy.

## Features

- Express.js web server
- Persistent data storage with Fly.io volumes
- Environment variables and secrets management
- Static IP allocation
- SSL certificate for custom domains (optional)
- Health check endpoints

## Prerequisites

1. **Fly.io Account**: Sign up at [fly.io](https://fly.io/app/sign-up)
2. **Fly.io CLI**: Install from [fly.io/docs/getting-started/installing-flyctl/](https://fly.io/docs/getting-started/installing-flyctl/)
3. **Docker**: Required for building container images

## Setup

1. **Authenticate with Fly.io**:
   ```sh
   fly auth login
   ```

2. **Get your API token**:
   ```sh
   fly auth token
   ```

3. **Set environment variables**:
   Create a `.env` file in the repository root:
   ```env
   FLY_API_TOKEN=your_api_token_here
   ```

## Deploy

1. **Build the Docker image**:
   ```sh
   bun run build
   ```

2. **Push to Fly.io registry**:
   ```sh
   fly auth docker
   docker push registry.fly.io/alchemy-fly-example:latest
   ```

3. **Deploy with Alchemy**:
   ```sh
   bun run deploy
   ```

## What Gets Created

- **App**: Main Fly.io application container
- **Machine**: Virtual machine running the Express.js server
- **Volume**: 1GB persistent storage for data
- **Secrets**: Environment variables for configuration
- **IP Addresses**: Static IPv4 and IPv6 addresses

## Testing

Once deployed, you can test the application:

```sh
# Health check
curl https://your-app.fly.dev/health

# Store data
curl -X POST https://your-app.fly.dev/data \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Fly.io!"}'

# Retrieve data
curl https://your-app.fly.dev/data
```

## Cleanup

To destroy all resources:

```sh
bun run destroy
```

## Project Structure

```
fly-app/
├── src/
│   └── index.js          # Express.js application
├── Dockerfile            # Container definition
├── alchemy.run.ts        # Infrastructure as code
├── package.json          # Dependencies and scripts
└── README.md             # This file
```