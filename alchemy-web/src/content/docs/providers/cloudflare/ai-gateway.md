---
title: AiGateway
description: Learn how to create and configure Cloudflare AI Gateway using Alchemy to route and manage AI requests.
---


The AiGateway resource lets you create and manage [Cloudflare AI Gateway](https://developers.cloudflare.com/workers-ai/get-started/workers-ai-gateway/) configurations for accessing AI models through Cloudflare Workers.

## Minimal Example

Create a basic AI Gateway with default settings:

```ts
import { AiGateway } from "alchemy/cloudflare";

const gateway = await AiGateway("my-ai-gateway", {
  name: "my-ai-gateway"
});
```

## With Authentication and Rate Limiting

Configure an AI Gateway with authentication and rate limiting:

```ts
import { AiGateway } from "alchemy/cloudflare";

const secureGateway = await AiGateway("secure-gateway", {
  name: "secure-gateway",
  authentication: true,
  rateLimitingInterval: 60,
  rateLimitingLimit: 100,
  rateLimitingTechnique: "sliding"
});
```

## With Logging and Logpush

Create an AI Gateway with logging and logpush enabled:

```ts
import { AiGateway } from "alchemy/cloudflare";

const loggingGateway = await AiGateway("logging-gateway", {
  name: "logging-gateway",
  collectLogs: true,
  logpush: true,
  logpushPublicKey: "mypublickey..."
});
```

## Bind to a Worker

Use the AI Gateway in a Cloudflare Worker:

```ts
import { Worker, AiGateway } from "alchemy/cloudflare";

const gateway = await AiGateway("my-gateway", {
  name: "my-gateway"
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    AI: gateway
  }
});
```

## Worker Example with AI Model Usage

Here's a simple example showing how to use AI Gateway in a Cloudflare Worker:

```ts
import { Worker, AiGateway } from "alchemy/cloudflare";

const aiGateway = await AiGateway("chat-gateway", {
  rateLimitingInterval: 60,
  rateLimitingLimit: 100,
  collectLogs: true
});

await Worker("chat-worker", {
  entrypoint: "./src/worker.ts",
  bindings: {
    AI: aiGateway
  }
});
```

```ts
// src/worker.ts
export default {
  async fetch(request, env) {
    const { message } = await request.json();
    
    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [{ role: "user", content: message }]
    });

    return Response.json({ response: response.response });
  }
};
```
