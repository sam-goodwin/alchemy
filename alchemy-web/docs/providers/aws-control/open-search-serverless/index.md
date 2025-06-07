---
title: Managing AWS OpenSearchServerless Indexs with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless Indexs using Alchemy Cloud Control.
---

# Index

The Index resource lets you create and manage [AWS OpenSearchServerless Indexs](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-index.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const index = await AWS.OpenSearchServerless.Index("index-example", {
  IndexName: "index-index",
  CollectionEndpoint: "example-collectionendpoint",
});
```

## Advanced Configuration

Create a index with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIndex = await AWS.OpenSearchServerless.Index("advanced-index", {
  IndexName: "index-index",
  CollectionEndpoint: "example-collectionendpoint",
  Settings: "example-settings",
});
```

