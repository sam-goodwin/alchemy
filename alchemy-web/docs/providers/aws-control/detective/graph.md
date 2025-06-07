---
title: Managing AWS Detective Graphs with Alchemy
description: Learn how to create, update, and manage AWS Detective Graphs using Alchemy Cloud Control.
---

# Graph

The Graph resource lets you manage [AWS Detective Graphs](https://docs.aws.amazon.com/detective/latest/userguide/) for analyzing security data and identifying potential threats.

## Minimal Example

Create a basic Detective Graph with auto-enable members and tags:

```ts
import AWS from "alchemy/aws/control";

const BasicGraph = await AWS.Detective.Graph("BasicGraph", {
  AutoEnableMembers: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a Detective Graph with specific tags and without auto-enabling members:

```ts
const AdvancedGraph = await AWS.Detective.Graph("AdvancedGraph", {
  AutoEnableMembers: false,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" },
    { Key: "Project", Value: "ThreatAnalysis" }
  ]
});
```

## Using Existing Resources

Adopt an existing Detective Graph instead of failing if it already exists:

```ts
const ExistingGraph = await AWS.Detective.Graph("ExistingGraph", {
  AutoEnableMembers: true,
  Tags: [
    { Key: "Environment", Value: "test" }
  ],
  adopt: true
});
```