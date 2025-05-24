---
title: Network
description: Create and manage Docker networks with Alchemy
---

# Network

The `Network` resource allows you to create and manage Docker networks using Alchemy, enabling container-to-container communication.

## Usage

```typescript
import * as docker from "alchemy/docker";

const network = await docker.Network("app-network", {
  name: "app-network"
});
```

## Properties

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | `string` | Yes | Network name |
| `driver` | `"bridge" \| "host" \| "none" \| "overlay" \| "macvlan" \| string` | No | Network driver to use |
| `enableIPv6` | `boolean` | No | Enable IPv6 on the network |
| `labels` | `Record<string, string>` | No | Network-scoped alias for containers |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Network ID |
| `createdAt` | `number` | Time when the network was created |

## Example

```typescript
import * as docker from "alchemy/docker";

// Create a simple bridge network
const appNetwork = await docker.Network("app-network", {
  name: "app-network"
});

// Create a custom network with driver
const overlayNetwork = await docker.Network("overlay-network", {
  name: "overlay-network",
  driver: "overlay",
  enableIPv6: true,
  labels: {
    "com.example.description": "Network for application services"
  }
});

// Create containers connected to the network
const service1 = await docker.Container("service1", {
  image: "service1:latest",
  name: "service1",
  networks: [{ name: appNetwork.name }],
  start: true
});

const service2 = await docker.Container("service2", {
  image: "service2:latest",
  name: "service2",
  networks: [{ name: appNetwork.name }],
  environment: {
    // Service discovery using container names
    SERVICE1_URL: `http://service1:8080`
  },
  start: true
});
```

## Network Communication

When containers are connected to the same Docker network, they can communicate with each other using the container names as hostnames. This built-in DNS resolution simplifies service discovery in multi-container applications.

```typescript
const service1 = await docker.Container("service1", {
  image: "service1:latest",
  name: "service1",
  networks: [{ name: appNetwork.name }],
  start: true
});

const service2 = await docker.Container("service2", {
  image: "service2:latest",
  name: "service2",
  networks: [{ name: appNetwork.name }],
  environment: {
    // Service discovery using container names
    SERVICE1_URL: `http://service1:8080`
  },
  start: true
});
```

Or, you can set aliases for the container to make it accessible by multiple names:

```typescript
const service1 = await docker.Container("service1", {
  image: "service1:latest",
  name: "service1",
  networks: [{ name: appNetwork.name, aliases: ["api"] }],
  start: true
});

const service2 = await docker.Container("service2", {
  image: "service2:latest",
  name: "service2",
  networks: [{ name: appNetwork.name }],
  environment: {
    // Service discovery using container names
    SERVICE1_URL: `http://api:8080`
  },
  start: true
});
```
