---
title: Managing AWS EKS IdentityProviderConfigs with Alchemy
description: Learn how to create, update, and manage AWS EKS IdentityProviderConfigs using Alchemy Cloud Control.
---

# IdentityProviderConfig

The IdentityProviderConfig resource lets you create and manage [AWS EKS IdentityProviderConfigs](https://docs.aws.amazon.com/eks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-eks-identityproviderconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const identityproviderconfig = await AWS.EKS.IdentityProviderConfig(
  "identityproviderconfig-example",
  {
    Type: "example-type",
    ClusterName: "identityproviderconfig-cluster",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a identityproviderconfig with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIdentityProviderConfig = await AWS.EKS.IdentityProviderConfig(
  "advanced-identityproviderconfig",
  {
    Type: "example-type",
    ClusterName: "identityproviderconfig-cluster",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

