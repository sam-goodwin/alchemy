# Alchemy Docker Provider Example

This example demonstrates how to use the Alchemy Docker provider to manage Docker resources declaratively. It follows the [Pulumi Fundamentals tutorial](https://www.pulumi.com/tutorials/pulumi-fundamentals/) for Docker, setting up a three-tier web application with a frontend, backend, and MongoDB database.

## Overview

This example:

1. Creates a Docker network for all services
2. Pulls the necessary container images (frontend, backend, MongoDB)
3. Deploys a MongoDB container
4. Deploys a backend API container
5. Deploys a frontend container
6. Connects all containers to the network

## Prerequisites

- Docker installed and running on your machine
- Alchemy installed

## Configuration

This example uses environment variables to configure the application. The variables are defined in the `.env` file at the root of the example:

```
mongoHost=mongodb://mongo:27017
database=cart
nodeEnvironment=development
protocol=http://
```

You can modify these values to customize the application behavior.

## Running the Example

1. Navigate to the example directory:
   ```bash
   cd examples/docker
   ```

2. Run the example with Alchemy:
   ```bash
   bun run deploy
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

1. **Resource Dependencies**: The frontend, backend, and MongoDB containers are deployed in an order that maintains their dependencies. Environment variables are used to connect the containers (like setting `DATABASE_HOST` and `HTTP_PROXY`).

2. **Container Images**: Shows how to pull and use Docker images with the `Image` resource.

3. **Networking**: Creates a Docker network and connects all containers to it, allowing inter-container communication.

4. **Stack-Based Resources**: Uses the Alchemy stack name to create unique resource identifiers, enabling multi-environment deployments.

## Cleaning Up

To destroy all resources created by this example, run:

```bash
bun run destroy
```

This will stop and remove all containers and networks created by the example.
