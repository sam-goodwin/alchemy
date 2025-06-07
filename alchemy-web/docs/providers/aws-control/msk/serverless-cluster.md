---
title: Managing AWS MSK ServerlessClusters with Alchemy
description: Learn how to create, update, and manage AWS MSK ServerlessClusters using Alchemy Cloud Control.
---

# ServerlessCluster

The ServerlessCluster resource lets you create and manage [AWS MSK ServerlessClusters](https://docs.aws.amazon.com/msk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-serverlesscluster.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serverlesscluster = await AWS.MSK.ServerlessCluster("serverlesscluster-example", {
  VpcConfigs: [],
  ClusterName: "serverlesscluster-cluster",
  ClientAuthentication: "example-clientauthentication",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a serverlesscluster with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServerlessCluster = await AWS.MSK.ServerlessCluster("advanced-serverlesscluster", {
  VpcConfigs: [],
  ClusterName: "serverlesscluster-cluster",
  ClientAuthentication: "example-clientauthentication",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

