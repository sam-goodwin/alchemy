# Alchemy Docker Provider Example

This example demonstrates how to use the Alchemy Docker provider to manage Docker resources declaratively. It sets up a simple web application with Redis for counting page views.

## Overview

This example:

1. Creates a Docker network
2. Builds a custom Node.js application image
3. Deploys a Redis container
4. Deploys the Node.js application container
5. Connects both containers to the network

## Prerequisites

- Docker installed and running on your machine
- Alchemy installed

## Running the Example

1. Navigate to the example directory:
   ```bash
   cd examples/docker-example
   ```

2. Run the example with Alchemy:
   ```bash
   bun run alchemy.run.ts
   ```

3. Once deployed, you can access the application at http://localhost:3000

## Application Structure

- `alchemy.run.ts` - Main Alchemy configuration file that defines the Docker resources
- `app/` - Sample Node.js application
  - `index.js` - Express.js application with Redis integration
  - `package.json` - Node.js dependencies
  - `Dockerfile` - Docker image definition

## How It Works

The example demonstrates key Alchemy concepts:

1. **Resource Dependencies**: The app container depends on the Redis container, which is expressed by referencing `redisContainer.name` in the environment variables.

2. **Custom Images**: Shows how to build a custom Docker image using `DockerImage` with a local Dockerfile.

3. **Networking**: Creates a Docker network and connects containers to it for communication.

## Cleaning Up

To destroy all resources created by this example, run:

```bash
bun run alchemy.run.ts destroy
```

This will stop and remove all containers and networks created by the example.
