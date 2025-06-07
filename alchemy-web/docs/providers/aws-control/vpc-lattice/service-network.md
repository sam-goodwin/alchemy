---
title: Managing AWS VpcLattice ServiceNetworks with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworks using Alchemy Cloud Control.
---

# ServiceNetwork

The ServiceNetwork resource lets you create and manage [AWS VpcLattice ServiceNetworks](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-servicenetwork.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const servicenetwork = await AWS.VpcLattice.ServiceNetwork("servicenetwork-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a servicenetwork with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServiceNetwork = await AWS.VpcLattice.ServiceNetwork("advanced-servicenetwork", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

