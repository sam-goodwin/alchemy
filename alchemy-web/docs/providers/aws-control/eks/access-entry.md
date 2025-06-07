---
title: Managing AWS EKS AccessEntrys with Alchemy
description: Learn how to create, update, and manage AWS EKS AccessEntrys using Alchemy Cloud Control.
---

# AccessEntry

The AccessEntry resource lets you create and manage [AWS EKS AccessEntrys](https://docs.aws.amazon.com/eks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eks-accessentry.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accessentry = await AWS.EKS.AccessEntry("accessentry-example", {
  PrincipalArn: "example-principalarn",
  ClusterName: "accessentry-cluster",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a accessentry with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAccessEntry = await AWS.EKS.AccessEntry("advanced-accessentry", {
  PrincipalArn: "example-principalarn",
  ClusterName: "accessentry-cluster",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

