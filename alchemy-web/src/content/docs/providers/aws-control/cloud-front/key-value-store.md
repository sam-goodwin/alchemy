---
title: KeyValueStore
description: Learn how to create, update, and manage AWS CloudFront KeyValueStores using Alchemy Cloud Control.
---


The KeyValueStore resource lets you manage [AWS CloudFront KeyValueStores](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for storing key-value pairs that can be used in your applications.

## Minimal Example

Create a basic KeyValueStore with the required properties and a comment.

```ts
import AWS from "alchemy/aws/control";

const basicKeyValueStore = await AWS.CloudFront.KeyValueStore("basicKeyValueStore", {
  name: "primary-store",
  comment: "This is the primary KeyValueStore for my application."
});
```

## Advanced Configuration

Configure a KeyValueStore with an import source and adopt existing resources.

```ts
const advancedKeyValueStore = await AWS.CloudFront.KeyValueStore("advancedKeyValueStore", {
  name: "secondary-store",
  comment: "This KeyValueStore will import from an existing source.",
  importSource: {
    type: "existing",
    sourceId: "source-id-123"
  },
  adopt: true
});
```

## Using with Existing Resources

Adopt an existing KeyValueStore instead of creating a new one if it already exists.

```ts
const adoptedKeyValueStore = await AWS.CloudFront.KeyValueStore("adoptedKeyValueStore", {
  name: "existing-store",
  adopt: true
});
```

## Managing Resource Properties

Access properties of the KeyValueStore such as ARN and timestamps.

```ts
const keyValueStore = await AWS.CloudFront.KeyValueStore("keyValueStore", {
  name: "my-key-value-store"
});

// Log the ARN and timestamps
console.log(`ARN: ${keyValueStore.Arn}`);
console.log(`Creation Time: ${keyValueStore.CreationTime}`);
console.log(`Last Update Time: ${keyValueStore.LastUpdateTime}`);
```
