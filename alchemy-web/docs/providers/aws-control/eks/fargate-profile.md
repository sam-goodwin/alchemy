---
title: Managing AWS EKS FargateProfiles with Alchemy
description: Learn how to create, update, and manage AWS EKS FargateProfiles using Alchemy Cloud Control.
---

# FargateProfile

The FargateProfile resource lets you create and manage [AWS EKS FargateProfiles](https://docs.aws.amazon.com/eks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eks-fargateprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fargateprofile = await AWS.EKS.FargateProfile("fargateprofile-example", {
  ClusterName: "fargateprofile-cluster",
  PodExecutionRoleArn: "example-podexecutionrolearn",
  Selectors: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a fargateprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFargateProfile = await AWS.EKS.FargateProfile("advanced-fargateprofile", {
  ClusterName: "fargateprofile-cluster",
  PodExecutionRoleArn: "example-podexecutionrolearn",
  Selectors: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

