---
title: Managing AWS Shield Protections with Alchemy
description: Learn how to create, update, and manage AWS Shield Protections using Alchemy Cloud Control.
---

# Protection

The Protection resource lets you create and manage [AWS Shield Protections](https://docs.aws.amazon.com/shield/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-shield-protection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const protection = await AWS.Shield.Protection("protection-example", {
  ResourceArn: "example-resourcearn",
  Name: "protection-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a protection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProtection = await AWS.Shield.Protection("advanced-protection", {
  ResourceArn: "example-resourcearn",
  Name: "protection-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

