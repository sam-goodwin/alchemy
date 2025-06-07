---
title: Managing AWS EC2 VerifiedAccessInstances with Alchemy
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessInstances using Alchemy Cloud Control.
---

# VerifiedAccessInstance

The VerifiedAccessInstance resource lets you create and manage [AWS EC2 VerifiedAccessInstances](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-verifiedaccessinstance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const verifiedaccessinstance = await AWS.EC2.VerifiedAccessInstance(
  "verifiedaccessinstance-example",
  {
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A verifiedaccessinstance resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a verifiedaccessinstance with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVerifiedAccessInstance = await AWS.EC2.VerifiedAccessInstance(
  "advanced-verifiedaccessinstance",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A verifiedaccessinstance resource managed by Alchemy",
  }
);
```

