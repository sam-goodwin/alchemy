---
title: Container
description: Deploy and manage Docker containers with Alchemy
---

The `Container` resource allows you to create and manage Docker containers using Alchemy.

## Usage

```typescript
import * as docker from "alchemy/docker";

const myContainer = await docker.Container("my-container", {
  image: "nginx:latest",
  name: "web-server",
  ports: [{ external: 80, internal: 80 }],
  start: true
});
```

## Properties

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `image` | `RemoteImage \| string` | Yes | Docker image to use for the container |
| `name` | `string` | No | Name for the container |
| `command` | `string[]` | No | Command to run in the container |
| `environment` | `Record<string, string>` | No | Environment variables for the container |
| `ports` | `{ external: number \| string, internal: number \| string, protocol?: "tcp" \| "udp" }[]` | No | Port mappings from host to container |
| `volumes` | `{ hostPath: string, containerPath: string, readOnly?: boolean }[]` | No | Volume mappings from host paths to container paths |
| `networks` | `{ name: string, aliases?: string[] }[]` | No | Networks to connect to |
| `restart` | `"no" \| "always" \| "on-failure" \| "unless-stopped"` | No | Restart policy |
| `removeOnExit` | `boolean` | No | Whether to remove the container when it exits |
| `start` | `boolean` | No | Start the container after creation |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | The ID of the container |
| `state` | `"created" \| "running" \| "paused" \| "stopped" \| "exited"` | The current state of the container |
| `createdAt` | `number` | Time when the container was created |

## Example

```typescript
import * as docker from "alchemy/docker";

// Create a Docker network
const network = await docker.Network("app-network", {
  name: "microservices-network"
});

// Pull the Redis image
const redisImage = await docker.RemoteImage("redis-image", {
  name: "redis",
  tag: "alpine"
});

// Run Redis container
const redis = await docker.Container("redis", {
  image: redisImage.imageRef,
  name: "redis",
  networks: [{ name: network.name }],
  start: true
});

// Run the application container
const app = await docker.Container("app", {
  image: "my-node-app:latest",
  name: "web-app",
  ports: [{ external: 3000, internal: 3000 }],
  networks: [{ name: network.name }],
  environment: {
    REDIS_HOST: "redis",
    NODE_ENV: "production"
  },
  volumes: [
    { hostPath: "./logs", containerPath: "/app/logs" }
  ],
  restart: "always",
  start: true
});
```
