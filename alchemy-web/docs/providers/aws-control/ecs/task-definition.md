---
title: Managing AWS ECS TaskDefinitions with Alchemy
description: Learn how to create, update, and manage AWS ECS TaskDefinitions using Alchemy Cloud Control.
---

# TaskDefinition

The TaskDefinition resource lets you define an [AWS ECS TaskDefinition](https://docs.aws.amazon.com/ecs/latest/userguide/) that specifies the container specifications and runtime requirements for your application.

## Minimal Example

Create a basic ECS TaskDefinition with the required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicTaskDefinition = await AWS.ECS.TaskDefinition("BasicTaskDefinition", {
  Family: "my-app-family",
  ContainerDefinitions: [{
    Name: "my-app-container",
    Image: "my-app-image:latest",
    Memory: 512,
    Cpu: 256,
    Essential: true,
    PortMappings: [{
      ContainerPort: 80,
      HostPort: 80,
      Protocol: "tcp"
    }]
  }],
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure an ECS TaskDefinition with more advanced settings, including IAM roles and networking.

```ts
const AdvancedTaskDefinition = await AWS.ECS.TaskDefinition("AdvancedTaskDefinition", {
  Family: "my-advanced-app-family",
  TaskRoleArn: "arn:aws:iam::123456789012:role/MyTaskRole",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyExecutionRole",
  NetworkMode: "awsvpc",
  ContainerDefinitions: [{
    Name: "my-advanced-app-container",
    Image: "my-advanced-app-image:latest",
    Memory: 1024,
    Cpu: 512,
    Essential: true,
    PortMappings: [{
      ContainerPort: 443,
      HostPort: 443,
      Protocol: "tcp"
    }],
    Environment: [{
      Name: "ENVIRONMENT",
      Value: "production"
    }]
  }],
  IpcMode: "task",
  RequiresCompatibilities: ["FARGATE"],
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```

## Fault Tolerance Configuration

Set up a TaskDefinition with fault injection capabilities.

```ts
const FaultTolerantTaskDefinition = await AWS.ECS.TaskDefinition("FaultTolerantTaskDefinition", {
  Family: "my-fault-tolerant-app-family",
  EnableFaultInjection: true,
  ContainerDefinitions: [{
    Name: "my-fault-tolerant-container",
    Image: "my-fault-tolerant-image:latest",
    Memory: 512,
    Cpu: 256,
    Essential: true,
    PortMappings: [{
      ContainerPort: 8080,
      HostPort: 8080,
      Protocol: "tcp"
    }],
    Command: ["npm", "start"]
  }],
  Tags: [{ Key: "Environment", Value: "testing" }]
});
```

## Custom Networking Configuration

Create a TaskDefinition that uses a custom VPC configuration.

```ts
const CustomNetworkTaskDefinition = await AWS.ECS.TaskDefinition("CustomNetworkTaskDefinition", {
  Family: "my-custom-network-app-family",
  NetworkMode: "awsvpc",
  ContainerDefinitions: [{
    Name: "my-custom-network-container",
    Image: "my-custom-network-image:latest",
    Memory: 512,
    Cpu: 256,
    Essential: true,
    PortMappings: [{
      ContainerPort: 3000,
      HostPort: 3000,
      Protocol: "tcp"
    }]
  }],
  RequiresCompatibilities: ["FARGATE"],
  Tags: [{ Key: "Environment", Value: "development" }]
});
```