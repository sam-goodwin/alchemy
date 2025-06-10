---
title: Index
description: Learn how to create, update, and manage AWS OpenSearchServerless Indexs using Alchemy Cloud Control.
---


The Index resource lets you manage [AWS OpenSearchServerless Indexs](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic OpenSearchServerless index with required properties and a common optional setting:

```ts
import AWS from "alchemy/aws/control";

const basicIndex = await AWS.OpenSearchServerless.Index("basicIndex", {
  IndexName: "my-first-index",
  CollectionEndpoint: "https://my-collection-endpoint.com",
  Mappings: {
    properties: {
      title: { type: "text" },
      createdAt: { type: "date" }
    }
  }
});
```

## Advanced Configuration

Configure an index with advanced settings such as custom analysis and replica count:

```ts
const advancedIndex = await AWS.OpenSearchServerless.Index("advancedIndex", {
  IndexName: "my-advanced-index",
  CollectionEndpoint: "https://my-collection-endpoint.com",
  Mappings: {
    properties: {
      title: { type: "text" },
      description: { type: "text" },
      createdAt: { type: "date" }
    }
  },
  Settings: {
    number_of_replicas: 2,
    analysis: {
      analyzer: {
        my_custom_analyzer: {
          type: "custom",
          tokenizer: "standard",
          filter: ["lowercase"]
        }
      }
    }
  }
});
```

## Basic Index with Settings

Create an index that specifies both mappings and index settings for performance tuning:

```ts
const tunedIndex = await AWS.OpenSearchServerless.Index("tunedIndex", {
  IndexName: "performance-tuned-index",
  CollectionEndpoint: "https://my-collection-endpoint.com",
  Mappings: {
    properties: {
      title: { type: "text" },
      content: { type: "text", index: true },
      createdAt: { type: "date" }
    }
  },
  Settings: {
    number_of_shards: 3,
    number_of_replicas: 1
  }
});
```

## Adopting Existing Index

Configure an index to adopt an existing resource if it already exists:

```ts
const adoptedIndex = await AWS.OpenSearchServerless.Index("adoptedIndex", {
  IndexName: "existing-index",
  CollectionEndpoint: "https://my-collection-endpoint.com",
  adopt: true // This will adopt the existing index if it is found
});
```
