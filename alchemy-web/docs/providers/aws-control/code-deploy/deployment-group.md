---
title: Managing AWS CodeDeploy DeploymentGroups with Alchemy
description: Learn how to create, update, and manage AWS CodeDeploy DeploymentGroups using Alchemy Cloud Control.
---

# DeploymentGroup

The DeploymentGroup resource lets you create and manage [AWS CodeDeploy DeploymentGroups](https://docs.aws.amazon.com/codedeploy/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deploymentgroup = await AWS.CodeDeploy.DeploymentGroup("deploymentgroup-example", {
  ApplicationName: "deploymentgroup-application",
  ServiceRoleArn: "example-servicerolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a deploymentgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeploymentGroup = await AWS.CodeDeploy.DeploymentGroup("advanced-deploymentgroup", {
  ApplicationName: "deploymentgroup-application",
  ServiceRoleArn: "example-servicerolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

