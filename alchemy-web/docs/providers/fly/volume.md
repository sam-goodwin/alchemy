---
title: Managing Fly.io Volumes with Alchemy
description: Learn how to create, configure, and manage Fly.io persistent volumes using Alchemy.
---

# Volume

The Volume resource lets you create and manage [Fly.io persistent volumes](https://fly.io/docs/volumes/) for data storage.

## Basic Volume

Create a simple volume for persistent storage:

```ts
import { Volume } from "alchemy/fly";

const volume = await Volume("app-data", {
  app: "my-app",
  size_gb: 10
});
```

## Volume with Custom Settings

Create a volume in a specific region with custom settings:

```ts
import { Volume } from "alchemy/fly";

const volume = await Volume("db-storage", {
  app: myApp,
  name: "postgres-data",
  region: "sea",
  size_gb: 50,
  encrypted: true
});
```

## Volume from Snapshot

Create a volume from an existing snapshot:

```ts
import { Volume } from "alchemy/fly";

const volume = await Volume("restored-data", {
  app: myApp,
  size_gb: 20,
  snapshot_id: "snap_1234567890abcdef"
});
```

## Volume Cloning

Create a volume by cloning from another volume:

```ts
import { Volume } from "alchemy/fly";

const clonedVolume = await Volume("cloned-data", {
  app: myApp,
  size_gb: 15,
  source_volume_id: "vol_1234567890abcdef"
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `app` | `string \| App` | Yes | App this volume belongs to |
| `size_gb` | `number` | Yes | Size of the volume in GB |
| `name` | `string` | No | Volume name (defaults to resource ID) |
| `region` | `string` | No | Region where the volume will be created (default: "iad") |
| `source_volume_id` | `string` | No | Source volume ID to clone from |
| `snapshot_id` | `string` | No | Snapshot ID to restore from |
| `encrypted` | `boolean` | No | Whether the volume should be encrypted (default: true) |
| `require_unique_zone` | `boolean` | No | Whether to require unique zone placement (default: false) |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The ID of the volume |
| `name` | `string` | The name of the volume |
| `size_gb` | `number` | Size of the volume in GB |
| `region` | `string` | Region where the volume is located |
| `zone` | `string` | Zone where the volume is located |
| `state` | `string` | Current state of the volume |
| `encrypted` | `boolean` | Whether the volume is encrypted |
| `attached_alloc_id` | `string` | Attached allocation ID (if attached) |
| `attached_machine_id` | `string` | Attached machine ID (if attached) |
| `created_at` | `string` | Time at which the volume was created |

## Notes

- Volumes can only be extended (increased in size), not shrunk
- Volumes are region-specific and cannot be moved between regions
- Encrypted volumes cannot be converted to unencrypted (or vice versa) after creation