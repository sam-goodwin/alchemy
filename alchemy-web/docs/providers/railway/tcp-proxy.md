---
title: Managing Railway TCP Proxies with Alchemy
description: Learn how to expose TCP services like databases and game servers using Railway TCP proxies with Alchemy.
---

# Railway TCP Proxy

A Railway TCP proxy allows you to expose TCP services (like databases, game servers, or other non-HTTP services) to the internet.

## Game Server Proxy

Set up a TCP proxy for a Minecraft server:

```typescript
import { Environment, Project, Service, TcpProxy } from "alchemy/railway";

const project = await Project("gaming-server", {
  name: "Gaming Server",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("game-server", {
  name: "minecraft-server",
  project: project,
});

const gameProxy = await TcpProxy("minecraft-proxy", {
  applicationPort: 25565,
  proxyPort: 25565,
  service: service,
  environment: environment,
});

console.log(`Connect to: ${gameProxy.domain}:25565`);
```

## Database Proxy

Create a TCP proxy for direct database access:

```typescript
import { Environment, Project, Service, TcpProxy } from "alchemy/railway";

const project = await Project("database-project", {
  name: "Database Project",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const dbService = await Service("postgres-service", {
  name: "postgres",
  project: project,
});

const dbProxy = await TcpProxy("db-proxy", {
  applicationPort: 5432,
  service: dbService,
  environment: environment,
});

console.log(`Database connection: ${dbProxy.domain}:${dbProxy.proxyPort}`);
```

## Custom Port Assignment

Let Railway automatically assign external ports:

```typescript
import { Environment, Project, Service, TcpProxy } from "alchemy/railway";

const project = await Project("tcp-services", {
  name: "TCP Services",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const redisService = await Service("redis-service", {
  name: "redis",
  project: project,
});

const customService = await Service("custom-service", {
  name: "custom-tcp",
  project: project,
});

// Redis proxy with automatic port assignment
const redisProxy = await TcpProxy("redis-proxy", {
  applicationPort: 6379,
  service: redisService,
  environment: environment,
});

// Custom TCP service proxy
const customProxy = await TcpProxy("custom-proxy", {
  applicationPort: 8080,
  service: customService,
  environment: environment,
});

console.log(`Redis: ${redisProxy.domain}:${redisProxy.proxyPort}`);
console.log(`Custom: ${customProxy.domain}:${customProxy.proxyPort}`);
```

## Multiple Game Servers

Set up proxies for different game servers:

```typescript
import { Environment, Project, Service, TcpProxy } from "alchemy/railway";

const project = await Project("game-hosting", {
  name: "Game Hosting Platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const minecraftService = await Service("minecraft-service", {
  name: "minecraft",
  project: project,
});

const csgoService = await Service("csgo-service", {
  name: "csgo",
  project: project,
});

const valheimService = await Service("valheim-service", {
  name: "valheim",
  project: project,
});

// Minecraft server
const minecraftProxy = await TcpProxy("minecraft-proxy", {
  applicationPort: 25565,
  proxyPort: 25565,
  service: minecraftService,
  environment: environment,
});

// CS:GO server
const csgoProxy = await TcpProxy("csgo-proxy", {
  applicationPort: 27015,
  proxyPort: 27015,
  service: csgoService,
  environment: environment,
});

// Valheim server
const valheimProxy = await TcpProxy("valheim-proxy", {
  applicationPort: 2456,
  proxyPort: 2456,
  service: valheimService,
  environment: environment,
});
```

## Development and Production

Set up TCP proxies for different environments:

```typescript
import { Environment, Project, Service, TcpProxy } from "alchemy/railway";

const project = await Project("tcp-app", {
  name: "TCP Application",
});

const development = await Environment("dev-env", {
  name: "development",
  project: project,
});

const production = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("tcp-service", {
  name: "tcp-app",
  project: project,
});

// Development proxy
const devProxy = await TcpProxy("dev-proxy", {
  applicationPort: 3000,
  proxyPort: 3000,
  service: service,
  environment: development,
});

// Production proxy
const prodProxy = await TcpProxy("prod-proxy", {
  applicationPort: 3000,
  proxyPort: 3000,
  service: service,
  environment: production,
});
```

## Using String References

Reference services and environments by their ID strings:

```typescript
import { TcpProxy } from "alchemy/railway";

const tcpProxy = await TcpProxy("my-proxy", {
  applicationPort: 3000,
  proxyPort: 8080,
  service: "service_abc123",
  environment: "env_xyz789",
});
```

## Properties

### Required

- **applicationPort** (number): The port your application listens on inside the container
- **service** (string | Service): The service this proxy belongs to
- **environment** (string | Environment): The environment this proxy belongs to

### Optional

- **proxyPort** (number): The external port to expose. If not specified, Railway will assign one automatically
- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the TCP proxy
- **serviceId** (string): The ID of the parent service
- **environmentId** (string): The ID of the parent environment
- **domain** (string): The domain where the TCP service can be accessed
- **proxyPort** (number): The external port assigned to the proxy
- **createdAt** (string): When the proxy was created
- **updatedAt** (string): When the proxy was last updated
