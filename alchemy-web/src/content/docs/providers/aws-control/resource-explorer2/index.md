---
title: Index
description: Learn how to create, update, and manage AWS ResourceExplorer2 Indexs using Alchemy Cloud Control.
---


The Index resource lets you manage [AWS ResourceExplorer2 Indexs](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/) for indexing your AWS resources for easier discovery and management.

## Minimal Example

Create a basic ResourceExplorer2 Index with required properties and a few optional tags.

```ts
import AWS from "alchemy/aws/control";

const resourceExplorerIndex = await AWS.ResourceExplorer2.Index("myResourceExplorerIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: {
    Environment: "Production",
    Project: "ResourceManagement"
  }
});
```

## Advanced Configuration

Configure the Index with the adoption feature to allow resource adoption if it already exists.

```ts
const adoptResourceExplorerIndex = await AWS.ResourceExplorer2.Index("myAdoptedResourceExplorerIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: {
    Environment: "Development",
    Project: "Experimentation"
  },
  adopt: true
});
```

## Custom Index Settings

Create an Index with specific settings to enhance resource indexing capabilities.

```ts
const customResourceExplorerIndex = await AWS.ResourceExplorer2.Index("myCustomResourceExplorerIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: {
    Environment: "Testing",
    Project: "CustomIndexing"
  },
  adopt: false
});
```
