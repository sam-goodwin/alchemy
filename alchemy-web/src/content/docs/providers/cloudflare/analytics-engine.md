---
title: AnalyticsEngineDataset
description: Learn how to bind Cloudflare Analytics Engine datasets to Workers using Alchemy for real-time event tracking and analytics.
---

The AnalyticsEngineDataset component lets you bind [Cloudflare Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) datasets to your Workers for real-time event tracking and analytics data collection.

## Minimal Example

Create a basic Analytics Engine dataset binding.

```ts
import { AnalyticsEngineDataset } from "alchemy/cloudflare";

const analytics = new AnalyticsEngineDataset("analytics", {
  dataset: "my-analytics-dataset",
});
```

## Bind to a Worker

Attach the Analytics Engine dataset to a Worker for event tracking.

```ts
// alchemy.run.ts
import { Worker, AnalyticsEngineDataset } from "alchemy/cloudflare";

const analytics = new AnalyticsEngineDataset("analytics", {
  dataset: "user-events",
});

await Worker("event-tracker", {
  name: "event-tracker",
  entrypoint: "./src/worker.ts",
  bindings: {
    ANALYTICS: analytics,
  },
});
```

## Write Data Points

```ts
// src/worker.ts
export default {
  async fetch(request, env, ctx) {
    // Log a page view event
    env.ANALYTICS.writeDataPoint({
      blobs: ["page_view", "homepage", request.url],
      doubles: [1.0],
      indexes: [request.headers.get("cf-connecting-ip") || "unknown"],
    });

    return new Response("Event logged!");
  },
};
```
