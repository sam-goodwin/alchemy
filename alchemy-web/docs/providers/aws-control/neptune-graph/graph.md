---
title: Managing AWS NeptuneGraph Graphs with Alchemy
description: Learn how to create, update, and manage AWS NeptuneGraph Graphs using Alchemy Cloud Control.
---

# Graph

The Graph resource lets you create and manage [AWS NeptuneGraph Graphs](https://docs.aws.amazon.com/neptunegraph/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-neptunegraph-graph.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const graph = await AWS.NeptuneGraph.Graph("graph-example", {
  ProvisionedMemory: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a graph with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGraph = await AWS.NeptuneGraph.Graph("advanced-graph", {
  ProvisionedMemory: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

