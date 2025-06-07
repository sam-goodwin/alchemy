---
title: Managing AWS GreengrassV2 Deployments with Alchemy
description: Learn how to create, update, and manage AWS GreengrassV2 Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource lets you create and manage [AWS GreengrassV2 Deployments](https://docs.aws.amazon.com/greengrassv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-deployment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deployment = await AWS.GreengrassV2.Deployment("deployment-example", {
  TargetArn: "example-targetarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a deployment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeployment = await AWS.GreengrassV2.Deployment("advanced-deployment", {
  TargetArn: "example-targetarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

