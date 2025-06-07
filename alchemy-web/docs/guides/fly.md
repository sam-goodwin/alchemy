---
order: 6
title: Fly.io
description: Step-by-step guide to deploying containerized applications to Fly.io using Alchemy's Infrastructure-as-Code approach.
---

# Getting Started with Fly.io

This guide demonstrates how to deploy a containerized Node.js application with persistent storage to Fly.io using Alchemy.

## Install

First, ensure you have the Fly.io CLI installed and configured:

::: code-group

```sh [brew]
brew install flyctl
```

```sh [curl]
curl -L https://fly.io/install.sh | sh
```

```sh [windows]
iwr https://fly.io/install.ps1 -useb | iex
```

:::

## Credentials

1. Sign up for a Fly.io account at [fly.io/app/sign-up](https://fly.io/app/sign-up)
2. Authenticate your CLI: `fly auth login`
3. Get your API token: `fly auth token`
4. Store your API token in `.env`:

```env
FLY_API_TOKEN=your_api_token_here
```

## Create a Node.js Application

Create a new Node.js project with a simple web server:

::: code-group

```sh [bun]
mkdir my-fly-app && cd my-fly-app
bun init -y
bun add typescript
bun add -D alchemy @types/node
```

```sh [npm]
mkdir my-fly-app && cd my-fly-app
npm init -y
npm install typescript
npm install --save-dev alchemy @types/node
```

```sh [pnpm]
mkdir my-fly-app && cd my-fly-app
pnpm init
pnpm add express
pnpm add -D alchemy @types/express typescript
```

```sh [yarn]
mkdir my-fly-app && cd my-fly-app
yarn init -y
yarn add express
yarn add -D alchemy @types/express typescript
```

:::

Create a simple Express server in `src/index.js`:

```js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Data persistence endpoint
app.get('/data', async (req, res) => {
  try {
    const dataPath = '/data/app-data.json';
    const data = await fs.readFile(dataPath, 'utf8').catch(() => '{}');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.post('/data', async (req, res) => {
  try {
    const dataPath = '/data/app-data.json';
    await fs.mkdir('/data', { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to write data' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/index.js"]
```

## Create `alchemy.run.ts`

Create your infrastructure configuration with Alchemy:

```ts
/// <reference types="node" />

import alchemy from "alchemy";
import { App, Machine, Volume, FlySecret, IpAddress } from "alchemy/fly";

const stack = await alchemy("my-fly-app", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

// Create the Fly.io application
export const app = await App("web-app", {
  name: "my-web-app",
  primaryRegion: "iad", // Washington DC
  env: {
    NODE_ENV: "production",
  },
});

// Create application secrets
export const dbSecret = await FlySecret("db-secret", {
  app,
  name: "DATABASE_URL",
  value: alchemy.secret("postgresql://user:pass@localhost/mydb"),
});

// Create persistent storage
export const dataVolume = await Volume("app-data", {
  app,
  name: "app-data-volume",
  size_gb: 1, // 1GB for demo
  region: "iad",
  encrypted: true,
});

// Allocate static IP addresses
export const ipv4 = await IpAddress("static-ipv4", {
  app,
  type: "v4",
});

export const ipv6 = await IpAddress("static-ipv6", {
  app,
  type: "v6",
});

// Deploy the application machine
export const webMachine = await Machine("web-server", {
  app,
  region: "iad",
  name: "web-server-1",
  config: {
    image: "my-web-app:latest", // You'll need to build and push this
    env: {
      PORT: "3000",
    },
    guest: {
      cpus: 1,
      memory_mb: 512,
    },
    services: [
      {
        protocol: "tcp",
        internal_port: 3000,
        ports: [
          { port: 80, handlers: ["http"] },
          { port: 443, handlers: ["http", "tls"] },
        ],
        auto_stop_machines: true,
        auto_start_machines: true,
        min_machines_running: 0,
      },
    ],
    mounts: [
      {
        source: dataVolume,
        destination: "/data",
      },
    ],
    restart: {
      policy: "on-failure",
      max_retries: 3,
    },
  },
});

console.log({
  app_name: app.name,
  hostname: app.hostname,
  ipv4_address: ipv4.address,
  ipv6_address: ipv6.address,
  machine_id: webMachine.id,
});

await stack.finalize();
```

## Build and Push Docker Image

Before deploying, you need to build and push your Docker image to the Fly.io registry:

```sh
# Build the image
fly apps create my-web-app
fly deploy --build-only

# Or build locally and push
docker build -t registry.fly.io/my-web-app .
fly auth docker
docker push registry.fly.io/my-web-app
```

Update your `alchemy.run.ts` to use the correct image:

```ts
// In the machine config
image: "registry.fly.io/my-web-app:latest",
```

## Deploy

Run `alchemy.run.ts` script to deploy your infrastructure:

::: code-group

```sh [bun]
bun ./alchemy.run.ts
```

```sh [npm]
npx tsx ./alchemy.run.ts
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts
```

```sh [yarn]
yarn tsx ./alchemy.run.ts
```

:::

The script will output information about your deployed application:

```sh
{
  app_name: "my-web-app",
  hostname: "my-web-app.fly.dev",
  ipv4_address: "1.2.3.4",
  ipv6_address: "2001:db8::1",
  machine_id: "e286de5e5e5e2e"
}
```

## Test Your Application

You can now test your deployed application:

```sh
# Health check
curl https://my-web-app.fly.dev/health

# Test data persistence
curl -X POST https://my-web-app.fly.dev/data \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Fly.io!"}'

curl https://my-web-app.fly.dev/data
```

## Tear Down

To destroy all resources when you're done:

::: code-group

```sh [bun]
bun ./alchemy.run.ts --destroy
```

```sh [npm]
npx tsx ./alchemy.run.ts --destroy
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts --destroy
```

```sh [yarn]
yarn tsx ./alchemy.run.ts --destroy
```

:::

This will clean up all the Fly.io resources including the app, machines, volumes, and IP addresses.