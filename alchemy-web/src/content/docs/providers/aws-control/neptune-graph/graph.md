---
title: Graph
description: Learn how to create, update, and manage AWS NeptuneGraph Graphs using Alchemy Cloud Control.
---


The Graph resource lets you manage [AWS NeptuneGraph Graphs](https://docs.aws.amazon.com/neptunegraph/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic NeptuneGraph graph with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicGraph = await AWS.NeptuneGraph.Graph("myBasicGraph", {
  ProvisionedMemory: 16,
  GraphName: "MyFirstGraph",
  PublicConnectivity: true
});
```

## Advanced Configuration

Create a graph with additional configuration options such as replication count and deletion protection.

```ts
const advancedGraph = await AWS.NeptuneGraph.Graph("myAdvancedGraph", {
  ProvisionedMemory: 32,
  GraphName: "AdvancedGraph",
  ReplicaCount: 2,
  DeletionProtection: true,
  VectorSearchConfiguration: {
    vectorSearchType: "ANN",
    distanceMetric: "cosine"
  }
});
```

## Tagging for Management

Add tags to your graph for better resource management and cost allocation.

```ts
const taggedGraph = await AWS.NeptuneGraph.Graph("myTaggedGraph", {
  ProvisionedMemory: 64,
  GraphName: "TaggedGraph",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GraphAnalytics" }
  ]
});
```

## Adoption of Existing Resource

Configure the graph to adopt an existing resource instead of failing if it already exists.

```ts
const existingGraph = await AWS.NeptuneGraph.Graph("existingGraph", {
  ProvisionedMemory: 16,
  GraphName: "ExistingGraph",
  adopt: true
});
```
