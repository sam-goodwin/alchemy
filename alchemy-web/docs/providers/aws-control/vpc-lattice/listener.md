---
title: Managing AWS VpcLattice Listeners with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice Listeners using Alchemy Cloud Control.
---

# Listener

The Listener resource lets you create and manage [AWS VpcLattice Listeners](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-listener.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const listener = await AWS.VpcLattice.Listener("listener-example", {
  DefaultAction: "example-defaultaction",
  Protocol: "example-protocol",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a listener with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedListener = await AWS.VpcLattice.Listener("advanced-listener", {
  DefaultAction: "example-defaultaction",
  Protocol: "example-protocol",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

