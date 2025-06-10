---
title: Collection
description: Learn how to create, update, and manage AWS OpenSearchServerless Collections using Alchemy Cloud Control.
---


The Collection resource allows you to create and manage [AWS OpenSearchServerless Collections](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/), which are designed to help you efficiently manage your search workloads without the overhead of traditional OpenSearch clusters.

## Minimal Example

Create a basic OpenSearchServerless Collection with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicCollection = await AWS.OpenSearchServerless.Collection("basic-collection", {
  name: "my-basic-collection",
  type: "search", // Specify the type of collection
  description: "A basic collection for search operations"
});
```

## Advanced Configuration

Configure a collection with standby replicas and tags for better management:

```ts
const advancedCollection = await AWS.OpenSearchServerless.Collection("advanced-collection", {
  name: "my-advanced-collection",
  type: "search",
  description: "An advanced collection with standby replicas and tags",
  standbyReplicas: "2", // Setting standby replicas for high availability
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Search" }
  ]
});
```

## Adoption of Existing Resource

Create a collection that adopts an existing resource instead of failing if it already exists:

```ts
const adoptedCollection = await AWS.OpenSearchServerless.Collection("adopted-collection", {
  name: "my-existing-collection",
  adopt: true // Adopt existing resource
});
```

## Monitoring and Updates

Create a collection and monitor its creation and update times:

```ts
const monitoredCollection = await AWS.OpenSearchServerless.Collection("monitored-collection", {
  name: "my-monitored-collection",
  type: "search",
  description: "A collection to monitor creation and updates"
});

// Use the ARN and timestamps for monitoring
console.log(`Collection ARN: ${monitoredCollection.Arn}`);
console.log(`Created At: ${monitoredCollection.CreationTime}`);
console.log(`Last Updated At: ${monitoredCollection.LastUpdateTime}`);
```
