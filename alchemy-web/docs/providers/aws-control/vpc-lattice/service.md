---
title: Managing AWS VpcLattice Services with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice Services using Alchemy Cloud Control.
---

# Service

The Service resource lets you create and manage [AWS VpcLattice Services](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-service.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const service = await AWS.VpcLattice.Service("service-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a service with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedService = await AWS.VpcLattice.Service("advanced-service", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

