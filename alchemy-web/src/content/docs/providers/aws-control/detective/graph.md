---
title: Graph
description: Learn how to create, update, and manage AWS Detective Graphs using Alchemy Cloud Control.
---


The Graph resource allows you to create and manage [AWS Detective Graphs](https://docs.aws.amazon.com/detective/latest/userguide/) that help you visualize and analyze security-related data across your AWS environment.

## Minimal Example

Create a basic Detective Graph with auto member enabling:

```ts
import AWS from "alchemy/aws/control";

const detectiveGraph = await AWS.Detective.Graph("myDetectiveGraph", {
  AutoEnableMembers: true,
  Tags: [
    { Key: "Project", Value: "Security" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a Detective Graph with custom tags and without auto member enabling:

```ts
const advancedDetectiveGraph = await AWS.Detective.Graph("advancedGraph", {
  AutoEnableMembers: false,
  Tags: [
    { Key: "Compliance", Value: "PCI-DSS" },
    { Key: "Owner", Value: "SecurityTeam" }
  ],
  adopt: true // Allows adoption of existing resource
});
```

## Adoption of Existing Graph

Create a Detective Graph while ensuring it adopts an existing resource if it already exists:

```ts
const existingGraph = await AWS.Detective.Graph("existingGraph", {
  AutoEnableMembers: true,
  Tags: [
    { Key: "Status", Value: "Active" }
  ],
  adopt: true // Ensures the function adopts the existing graph
});
```
