---
title: Managing AWS OpenSearchServerless Collections with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless Collections using Alchemy Cloud Control.
---

# Collection

The Collection resource lets you create and manage [AWS OpenSearchServerless Collections](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-collection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const collection = await AWS.OpenSearchServerless.Collection("collection-example", {
  Name: "collection-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A collection resource managed by Alchemy",
});
```

## Advanced Configuration

Create a collection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCollection = await AWS.OpenSearchServerless.Collection("advanced-collection", {
  Name: "collection-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A collection resource managed by Alchemy",
});
```

