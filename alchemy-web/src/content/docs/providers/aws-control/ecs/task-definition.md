---
title: TaskDefinition
description: Learn how to create, update, and manage AWS ECS TaskDefinitions using Alchemy Cloud Control.
---


The TaskDefinition resource lets you manage [AWS ECS TaskDefinitions](https://docs.aws.amazon.com/ecs/latest/userguide/) which define how your containers should run, including specifying the CPU, memory, and networking configurations.

## Minimal Example

Create a basic ECS TaskDefinition with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicTaskDefinition = await AWS.ECS.TaskDefinition("basicTask", {
  family: "web-app",
  containerDefinitions: [{
    name: "web",
    image: "nginx:latest",
    memory: "512",
    cpu: "256",
    portMappings: [{
      containerPort: 80,
      hostPort: 80,
      protocol: "tcp"
    }]
  }],
  executionRoleArn: "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  taskRoleArn: "arn:aws:iam::123456789012:role/ecsTaskRole"
});
```

## Advanced Configuration

Configure an ECS TaskDefinition with additional options including networking and fault injection.

```ts
const advancedTaskDefinition = await AWS.ECS.TaskDefinition("advancedTask", {
  family: "advanced-web-app",
  containerDefinitions: [{
    name: "web",
    image: "nginx:latest",
    memory: "1024",
    cpu: "512",
    portMappings: [{
      containerPort: 80,
      hostPort: 80,
      protocol: "tcp"
    }]
  }],
  networkMode: "awsvpc",
  placementConstraints: [{
    type: "memberOf",
    expression: "attribute:ecs.availability-zone in [us-west-2a, us-west-2b]"
  }],
  enableFaultInjection: true,
  requiresCompatibilities: ["FARGATE"],
  memory: "2048",
  cpu: "1024"
});
```

## Resource with Multiple Containers

Define a TaskDefinition that runs multiple containers for a microservices architecture.

```ts
const multiContainerTaskDefinition = await AWS.ECS.TaskDefinition("multiContainerTask", {
  family: "microservices-app",
  containerDefinitions: [
    {
      name: "api",
      image: "myorg/api:latest",
      memory: "512",
      cpu: "256",
      portMappings: [{
        containerPort: 8080,
        hostPort: 8080,
        protocol: "tcp"
      }]
    },
    {
      name: "worker",
      image: "myorg/worker:latest",
      memory: "256",
      cpu: "128"
    }
  ],
  executionRoleArn: "arn:aws:iam::123456789012:role/ecsExecutionRole",
  taskRoleArn: "arn:aws:iam::123456789012:role/ecsWorkerRole"
});
```

## Using Inference Accelerators

Create a TaskDefinition that utilizes inference accelerators for machine learning workloads.

```ts
const mlTaskDefinition = await AWS.ECS.TaskDefinition("mlTask", {
  family: "ml-app",
  containerDefinitions: [{
    name: "ml-model",
    image: "myorg/ml-model:latest",
    memory: "2048",
    cpu: "1024"
  }],
  inferenceAccelerators: [{
    deviceName: "device1",
    deviceType: "ml.g4dn.xlarge"
  }],
  executionRoleArn: "arn:aws:iam::123456789012:role/ecsExecutionRole"
});
```
