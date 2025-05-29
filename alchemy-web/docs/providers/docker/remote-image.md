---
title: RemoteImage
description: Pull and manage Docker images with Alchemy
---

# RemoteImage

The `RemoteImage` resource allows you to pull and manage Docker images using Alchemy.

## Usage

```typescript
import * as docker from "alchemy/docker";

const myImage = await docker.RemoteImage("nginx", {
  name: "nginx",
  tag: "latest",
});
```

## Properties

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | `string` | Yes | Docker image name (e.g., "nginx") |
| `tag` | `string` | No | Tag for the image (e.g., "latest" or "1.19-alpine") |
| `alwaysPull` | `boolean` | No | Always attempt to pull the image, even if it exists locally |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `imageRef` | `string` | Full image reference (name:tag) |
| `createdAt` | `number` | Time when the image was created or pulled |

## Example

```typescript
import * as docker from "alchemy/docker";

// Pull the nginx image
const nginxImage = await docker.RemoteImage("nginx", {
  name: "nginx",
  tag: "latest"
});

// Pull a specific version of Node.js
const nodeImage = await docker.RemoteImage("node-app", {
  name: "node",
  tag: "16-alpine",
  alwaysPull: true
});

// The full image reference can be used when creating containers
console.log(`Pulled image: ${nginxImage.imageRef}`);
```
