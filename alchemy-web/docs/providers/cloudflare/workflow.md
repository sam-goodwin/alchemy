---
title: Managing Cloudflare Workflows with Alchemy
description: Learn how to create and manage Cloudflare Workflows using Alchemy to orchestrate and automate tasks.
---

# Workflow

A [Cloudflare Workflow](https://developers.cloudflare.com/workers/configuration/workflows/) allows you to define reusable logic that can be shared across multiple Workers.

## Minimal Example

Create a basic workflow that can be bound to a Worker.

```ts
import { Workflow } from "alchemy/cloudflare";

const workflow = await Workflow("my-workflow", {
  workflowName: "my-workflow",
  className: "MyWorkflow"
});
```

## Use a Workflow Defined in Another Script

Reference a workflow implemented in a different worker script using `scriptName`.

```ts
import { Workflow } from "alchemy/cloudflare";

const workflow = await Workflow("shared-workflow", {
  workflowName: "my-workflow",
  className: "MyWorkflow",
  scriptName: "shared-worker"
});
```

## Bind to a Worker

Bind a workflow to a Worker to use its functionality.

```ts
import { Worker, Workflow } from "alchemy/cloudflare";

const workflow = await Workflow("my-workflow", {
  workflowName: "my-workflow", 
  className: "MyWorkflow"
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    WORKFLOW: workflow
  }
});
```