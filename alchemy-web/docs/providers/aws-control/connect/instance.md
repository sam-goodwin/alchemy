---
title: Managing AWS Connect Instances with Alchemy
description: Learn how to create, update, and manage AWS Connect Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you create and manage [AWS Connect Instances](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-instance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instance = await AWS.Connect.Instance("instance-example", {
  IdentityManagementType: "example-identitymanagementtype",
  Attributes: "example-attributes",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a instance with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInstance = await AWS.Connect.Instance("advanced-instance", {
  IdentityManagementType: "example-identitymanagementtype",
  Attributes: "example-attributes",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

