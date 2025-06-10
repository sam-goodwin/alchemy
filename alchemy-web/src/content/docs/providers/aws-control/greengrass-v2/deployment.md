---
title: Deployment
description: Learn how to create, update, and manage AWS GreengrassV2 Deployments using Alchemy Cloud Control.
---


The Deployment resource allows you to manage [AWS GreengrassV2 Deployments](https://docs.aws.amazon.com/greengrassv2/latest/userguide/) for deploying components to IoT devices.

## Minimal Example

Create a basic GreengrassV2 deployment with required properties and a deployment name:

```ts
import AWS from "alchemy/aws/control";

const greengrassDeployment = await AWS.GreengrassV2.Deployment("basicDeployment", {
  TargetArn: "arn:aws:greengrass:us-east-1:123456789012:group/myGreengrassGroup",
  DeploymentName: "BasicDeployment",
  Components: {
    "myComponent": {
      "componentVersion": "1.0.0"
    }
  }
});
```

## Advanced Configuration

Configure a deployment with an IoT job configuration and custom deployment policies:

```ts
const advancedDeployment = await AWS.GreengrassV2.Deployment("advancedDeployment", {
  TargetArn: "arn:aws:greengrass:us-east-1:123456789012:group/myGreengrassGroup",
  DeploymentName: "AdvancedDeployment",
  Components: {
    "myComponent": {
      "componentVersion": "1.0.0"
    }
  },
  IotJobConfiguration: {
    JobExecutionsRetryStrategy: {
      Criteria: {
        "status": {
          "minNumberOfExecuted": 1,
          "minPercentageOfExecuted": 100
        }
      }
    },
    TimeoutInMinutes: 5
  },
  DeploymentPolicies: {
    FailureHandlingPolicy: "ROLLBACK",
    TimeoutInSeconds: 300
  }
});
```

## Deploying with Tags

Create a deployment that includes tags for better resource management:

```ts
const taggedDeployment = await AWS.GreengrassV2.Deployment("taggedDeployment", {
  TargetArn: "arn:aws:greengrass:us-east-1:123456789012:group/myGreengrassGroup",
  DeploymentName: "TaggedDeployment",
  Components: {
    "myComponent": {
      "componentVersion": "1.0.0"
    }
  },
  Tags: {
    "Environment": "Production",
    "Project": "SmartHome"
  }
});
```

## Parent Deployment

Create a deployment that specifies a parent target ARN for hierarchical deployments:

```ts
const parentDeployment = await AWS.GreengrassV2.Deployment("parentDeployment", {
  TargetArn: "arn:aws:greengrass:us-east-1:123456789012:group/myGreengrassGroup",
  ParentTargetArn: "arn:aws:greengrass:us-east-1:123456789012:deployment/parentDeploymentId",
  DeploymentName: "ParentDeployment",
  Components: {
    "myComponent": {
      "componentVersion": "1.0.0"
    }
  }
});
```
