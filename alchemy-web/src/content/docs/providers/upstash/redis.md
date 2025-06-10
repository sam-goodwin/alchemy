---
title: UpstashRedis
description: Learn how to create and manage Upstash Redis databases with global replication.
---


The UpstashRedis component lets you create and manage [Upstash Redis](https://upstash.com/redis) databases with global replication.

## Minimal Example

Create a basic Redis database in a single region.

```ts
import { UpstashRedis } from "alchemy/upstash";

const redis = await UpstashRedis("my-redis", {
  name: "my-redis",
  primaryRegion: "us-east-1"
});
```

## With Read Replicas

Create a Redis database with read replicas in multiple regions for global distribution.

```ts
import { UpstashRedis } from "alchemy/upstash";

const redis = await UpstashRedis("my-redis", {
  name: "my-redis",
  primaryRegion: "us-east-1",
  readRegions: ["us-west-1", "us-west-2"]
});
```

## With Monthly Budget

Create a Redis database with a specified monthly budget limit.

```ts
import { UpstashRedis } from "alchemy/upstash";

const redis = await UpstashRedis("my-redis", {
  name: "my-redis",
  primaryRegion: "us-east-1",
  budget: 100
});
```

## With Eviction Enabled

Create a Redis database with eviction enabled to automatically remove keys when memory is full.

```ts
import { UpstashRedis } from "alchemy/upstash";

const redis = await UpstashRedis("my-redis", {
  name: "my-redis",
  primaryRegion: "us-east-1",
  eviction: true
});
```

## With Custom API Credentials

Create a Redis database using custom API credentials instead of environment variables.

```ts
import { UpstashRedis } from "alchemy/upstash";

const redis = await UpstashRedis("my-redis", {
  name: "my-redis",
  primaryRegion: "us-east-1",
  apiKey: alchemy.secret(process.env.CUSTOM_UPSTASH_API_KEY),
  email: "custom@example.com"
});
```
