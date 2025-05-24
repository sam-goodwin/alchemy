---
title: Image
description: Build and manage Docker images with Alchemy
---

# Image

The `Image` resource allows you to build and manage Docker images from local Dockerfiles using Alchemy.

## Usage

```typescript
import * as docker from "alchemy/docker";

const myImage = await docker.Image("app-image", {
  name: "my-app",
  tag: "v1.0",
  build: {
    context: "./app"
  }
});
```

## Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Docker image name |
| `tag` | `string` | No | Tag for the image (defaults to "latest") |
| `build` | `{ context: string, dockerfile?: string, target?: string, buildArgs?: Record<string, string> }` | Yes | Build configuration |
| `build.context` | `string` | Yes | Path to the build context (directory containing Dockerfile) |
| `build.dockerfile` | `string` | No | Path to the Dockerfile (relative to context, defaults to "Dockerfile") |
| `build.target` | `string` | No | Target stage to build in multi-stage Dockerfiles |
| `build.buildArgs` | `Record<string, string>` | No | Build arguments to pass to Docker build |
| `skipPush` | `boolean` | No | Skip pushing the image to a registry (default: true) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `imageRef` | `string` | Full image reference (name:tag) |
| `imageId` | `string` | Docker image ID |
| `createdAt` | `number` | Time when the image was built |

## Example

```typescript
import * as docker from "alchemy/docker";

// Build a Docker image from a Dockerfile
const appImage = await docker.Image("app-image", {
  name: "my-node-app",
  tag: "1.0",
  build: {
    context: "./app",
    dockerfile: "Dockerfile.prod",
    buildArgs: {
      NODE_ENV: "production",
      API_VERSION: "v2"
    }
  }
});

// Use the built image in a container
const appContainer = await docker.Container("app", {
  image: appImage,
  ports: [{ external: 3000, internal: 3000 }],
  restart: "always",
  start: true
});

// For multi-stage builds, you can target a specific stage
const builderImage = await docker.Image("builder", {
  name: "app-builder",
  tag: "latest",
  build: {
    context: "./app",
    target: "builder" // Target the 'builder' stage in a multi-stage Dockerfile
  },
  skipPush: true
});
```
