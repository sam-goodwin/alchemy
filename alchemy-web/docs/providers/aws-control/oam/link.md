---
title: Managing AWS Oam Links with Alchemy
description: Learn how to create, update, and manage AWS Oam Links using Alchemy Cloud Control.
---

# Link

The Link resource lets you create and manage [AWS Oam Links](https://docs.aws.amazon.com/oam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-oam-link.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const link = await AWS.Oam.Link("link-example", {
  SinkIdentifier: "example-sinkidentifier",
  ResourceTypes: ["example-resourcetypes-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a link with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLink = await AWS.Oam.Link("advanced-link", {
  SinkIdentifier: "example-sinkidentifier",
  ResourceTypes: ["example-resourcetypes-1"],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

