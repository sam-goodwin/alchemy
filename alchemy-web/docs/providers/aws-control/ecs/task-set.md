---
title: Managing AWS ECS TaskSets with Alchemy
description: Learn how to create, update, and manage AWS ECS TaskSets using Alchemy Cloud Control.
---

# TaskSet

The TaskSet resource lets you manage [AWS ECS TaskSets](https://docs.aws.amazon.com/ecs/latest/userguide/) within your Elastic Container Service (ECS) environment. TaskSets are a grouping of tasks that together represent a specific version of a service.

## Minimal Example

Create a basic TaskSet with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicTaskSet = await AWS.ECS.TaskSet("basic-taskset", {
  TaskDefinition: "my-app:1",
  Cluster: "my-cluster",
  Service: "my-service",
  PlatformVersion: "1.4.0",
  Scale: {
    Value: 1,
    Unit: "COUNT"
  }
});
```

## Advanced Configuration

Configure a TaskSet with advanced options such as Load Balancers and Network Configuration.

```ts
const AdvancedTaskSet = await AWS.ECS.TaskSet("advanced-taskset", {
  TaskDefinition: "my-app:1",
  Cluster: "my-cluster",
  Service: "my-service",
  LoadBalancers: [
    {
      TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/abc123",
      ContainerName: "my-app-container",
      ContainerPort: 80
    }
  ],
  NetworkConfiguration: {
    AwsVpcConfiguration: {
      Subnets: ["subnet-12345678", "subnet-87654321"],
      SecurityGroups: ["sg-12345678"],
      AssignPublicIp: "ENABLED"
    }
  }
});
```

## Scaling and Tags

Create a TaskSet with scaling options and tags for better resource management.

```ts
const ScalableTaskSet = await AWS.ECS.TaskSet("scalable-taskset", {
  TaskDefinition: "my-app:2",
  Cluster: "my-cluster",
  Service: "my-service",
  Scale: {
    Value: 3,
    Unit: "COUNT"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Service Registries

Demonstrate how to use service registries in a TaskSet configuration.

```ts
const TaskSetWithServiceRegistry = await AWS.ECS.TaskSet("taskset-with-service-registry", {
  TaskDefinition: "my-app:2",
  Cluster: "my-cluster",
  Service: "my-service",
  ServiceRegistries: [
    {
      RegistryArn: "arn:aws:servicediscovery:us-west-2:123456789012:service/srv-example",
      ContainerName: "my-app-container",
      ContainerPort: 80
    }
  ]
});
```