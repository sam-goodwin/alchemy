---
title: Service
description: Learn how to create, update, and manage AWS ECS Services using Alchemy Cloud Control.
---


The Service resource lets you manage [AWS ECS Services](https://docs.aws.amazon.com/ecs/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic ECS service with necessary properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const ecsService = await AWS.ECS.Service("myEcsService", {
  cluster: "myEcsCluster",
  taskDefinition: "myTaskDefinition:1",
  desiredCount: 2,
  launchType: "FARGATE",
  networkConfiguration: {
    awsvpcConfiguration: {
      subnets: ["subnet-0a1b2c3d"],
      securityGroups: ["sg-0a1b2c3d"],
      assignPublicIp: "ENABLED"
    }
  }
});
```

## Advanced Configuration

Configure an ECS service with deployment settings and service discovery.

```ts
const advancedEcsService = await AWS.ECS.Service("advancedEcsService", {
  cluster: "myEcsCluster",
  taskDefinition: "myTaskDefinition:1",
  desiredCount: 3,
  launchType: "FARGATE",
  deploymentConfiguration: {
    maximumPercent: 200,
    minimumHealthyPercent: 100
  },
  serviceRegistries: [{
    registryArn: "arn:aws:servicediscovery:us-east-1:123456789012:service/srv-abcdefg"
  }],
  networkConfiguration: {
    awsvpcConfiguration: {
      subnets: ["subnet-0a1b2c3d"],
      securityGroups: ["sg-0a1b2c3d"],
      assignPublicIp: "ENABLED"
    }
  }
});
```

## Service with Load Balancer

Create an ECS service that utilizes a load balancer for traffic management.

```ts
const loadBalancedEcsService = await AWS.ECS.Service("loadBalancedEcsService", {
  cluster: "myEcsCluster",
  taskDefinition: "myTaskDefinition:1",
  desiredCount: 2,
  launchType: "FARGATE",
  loadBalancers: [{
    targetGroupArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/my-target-group/abcdef123456",
    containerName: "myContainer",
    containerPort: 80
  }],
  networkConfiguration: {
    awsvpcConfiguration: {
      subnets: ["subnet-0a1b2c3d"],
      securityGroups: ["sg-0a1b2c3d"],
      assignPublicIp: "ENABLED"
    }
  }
});
```

## Service with Custom Tags

Create an ECS service while managing custom tags for better resource organization.

```ts
const taggedEcsService = await AWS.ECS.Service("taggedEcsService", {
  cluster: "myEcsCluster",
  taskDefinition: "myTaskDefinition:1",
  desiredCount: 1,
  launchType: "FARGATE",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ],
  networkConfiguration: {
    awsvpcConfiguration: {
      subnets: ["subnet-0a1b2c3d"],
      securityGroups: ["sg-0a1b2c3d"],
      assignPublicIp: "ENABLED"
    }
  }
});
```
