---
title: R2Object
description: Create and manage objects within Cloudflare R2 Buckets using Alchemy.
---

Creates and manages individual objects within [Cloudflare R2 Buckets](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

## Minimal Example

Create a text object in an R2 bucket:

```ts
import { R2Bucket, R2Object } from "alchemy/cloudflare";

const bucket = await R2Bucket("my-bucket", {
  name: "my-bucket",
});

const textObject = await R2Object("readme", {
  bucket: bucket,
  key: "README.txt",
  content: "Hello, world!",
});
```

## JSON Data

Store JSON configuration:

```ts
const configObject = await R2Object("config", {
  bucket: bucket,
  key: "config/app.json",
  content: JSON.stringify({ version: "1.0.0" }),
});
```

## Binary Data

Store binary content:

```ts
const imageObject = await R2Object("avatar", {
  bucket: bucket,
  key: "images/avatar.png",
  content: imageBuffer, // ArrayBuffer
});
```

## Properties

### `bucket` (required)
- **Type**: `R2Bucket`
- **Description**: The R2 bucket where the object will be stored

### `key` (required)
- **Type**: `string`
- **Description**: The object key/path within the bucket

### `content` (required)
- **Type**: `ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob`
- **Description**: The content to store in the object
