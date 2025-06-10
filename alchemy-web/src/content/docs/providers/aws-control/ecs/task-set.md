---
title: TaskSet
description: Learn how to create, update, and manage AWS ECS TaskSets using Alchemy Cloud Control.
---


The TaskSet resource lets you manage [AWS ECS TaskSets](https://docs.aws.amazon.com/ecs/latest/userguide/) that define a group of tasks within an AWS ECS service. This allows for deployment and scaling of containerized applications.

## Minimal Example

Create a basic TaskSet with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const taskSet = await AWS.ECS.TaskSet("myTaskSet", {
  TaskDefinition: "myTaskDefinition:1",
  Cluster: "myCluster",
  Service: "myService",
  PlatformVersion: "1.4.0" // Optional: specify a platform version
});
```

## Advanced Configuration

Configure a TaskSet with load balancers and scaling options for more advanced scenarios.

```ts
import AWS from "alchemy/aws/control";

const taskSetWithLoadBalancer = await AWS.ECS.TaskSet("myAdvancedTaskSet", {
  TaskDefinition: "myTaskDefinition:1",
  Cluster: "myCluster",
  Service: "myService",
  LoadBalancers: [{
    TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/abcdef123456",
    ContainerName: "myContainer",
    ContainerPort: 80
  }],
  Scale: {
    Value: 1,
    Unit: "COUNT" // Scale by number of tasks
  }
});
```

## Network Configuration Example

Set up a TaskSet with specific network configurations.

```ts
import AWS from "alchemy/aws/control";

const networkConfiguredTaskSet = await AWS.ECS.TaskSet("myNetworkTaskSet", {
  TaskDefinition: "myTaskDefinition:1",
  Cluster: "myCluster",
  Service: "myService",
  NetworkConfiguration: {
    AwsvpcConfiguration: {
      Subnets: ["subnet-12345678", "subnet-87654321"],
      SecurityGroups: ["sg-12345678"],
      AssignPublicIp: "ENABLED" // Assign a public IP
    }
  }
});
```

## Using Tags for Resource Management

Create a TaskSet with tags for better resource management and cost tracking.

```ts
import AWS from "alchemy/aws/control";

const taggedTaskSet = await AWS.ECS.TaskSet("myTaggedTaskSet", {
  TaskDefinition: "myTaskDefinition:1",
  Cluster: "myCluster",
  Service: "myService",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Project",
    Value: "MyProject"
  }]
});
```
