---
title: Managing Fly.io Machines with Alchemy
description: Learn how to create, configure, and manage Fly.io machines (containers) using Alchemy.
---

# Machine

The Machine resource lets you create and manage [Fly.io machines](https://fly.io/docs/machines/) (virtual machines/containers).

## Basic Web Server

Create a simple web server machine:

```ts
import { Machine } from "alchemy/fly";

const machine = await Machine("web-server", {
  app: "my-app",
  config: {
    image: "nginx:alpine",
    services: [{
      protocol: "tcp",
      internal_port: 80,
      ports: [{ port: 80, handlers: ["http"] }]
    }]
  }
});
```

## Machine with Custom Resources

Create a machine with specific CPU, memory, and environment variables:

```ts
import { Machine } from "alchemy/fly";

const machine = await Machine("api-server", {
  app: myApp,
  region: "sea",
  config: {
    image: "node:18-alpine",
    env: {
      NODE_ENV: "production",
      PORT: "3000"
    },
    guest: {
      cpus: 2,
      memory_mb: 1024
    },
    services: [{
      protocol: "tcp",
      internal_port: 3000,
      ports: [{ port: 80, handlers: ["http"] }]
    }]
  }
});
```

## Machine with Volume Mounts

Create a machine with persistent storage:

```ts
import { Machine, Volume } from "alchemy/fly";

const volume = await Volume("db-volume", {
  app: myApp,
  size_gb: 10
});

const machine = await Machine("database", {
  app: myApp,
  config: {
    image: "postgres:15",
    env: {
      POSTGRES_PASSWORD: alchemy.secret("mypassword")
    },
    mounts: [{
      source: volume,
      destination: "/var/lib/postgresql/data"
    }],
    guest: {
      cpus: 1,
      memory_mb: 512
    }
  }
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `app` | `string \| App` | Yes | App this machine belongs to |
| `config` | `MachineConfig` | Yes | Machine configuration |
| `region` | `string` | No | Region where the machine will be created (default: "iad") |
| `name` | `string` | No | Machine name (defaults to resource ID) |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Machine Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `image` | `string` | Yes | Container image to run |
| `env` | `Record<string, string \| Secret>` | No | Environment variables |
| `services` | `MachineService[]` | No | Services configuration |
| `guest` | `MachineGuest` | No | Guest configuration (CPU and memory) |
| `mounts` | `MachineMount[]` | No | Volume mounts |
| `restart` | `MachineRestart` | No | Restart policy |
| `init` | `object` | No | Command to run |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The ID of the machine |
| `name` | `string` | The name of the machine |
| `state` | `string` | Current state of the machine |
| `region` | `string` | Region where the machine is running |
| `instance_id` | `string` | Instance ID |
| `private_ip` | `string` | Private IP address |
| `config` | `MachineConfig` | Machine configuration |
| `image_ref` | `object` | Image reference information |
| `created_at` | `string` | Time at which the machine was created |
| `updated_at` | `string` | Time at which the machine was last updated |