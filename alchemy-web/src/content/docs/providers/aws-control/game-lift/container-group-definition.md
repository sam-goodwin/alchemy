---
title: ContainerGroupDefinition
description: Learn how to create, update, and manage AWS GameLift ContainerGroupDefinitions using Alchemy Cloud Control.
---


The ContainerGroupDefinition resource allows you to define a group of containers that run on AWS GameLift. This resource is essential for deploying game server processes in a containerized environment. For more details, refer to the [AWS GameLift ContainerGroupDefinitions documentation](https://docs.aws.amazon.com/gamelift/latest/userguide/).

## Minimal Example

Create a basic ContainerGroupDefinition with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicContainerGroup = await AWS.GameLift.ContainerGroupDefinition("basicContainerGroup", {
  OperatingSystem: "Linux",
  TotalMemoryLimitMebibytes: 2048,
  TotalVcpuLimit: 2,
  Name: "MyBasicContainerGroup",
  VersionDescription: "Initial version of the container group"
});
```

## Advanced Configuration

Define a ContainerGroupDefinition with additional options for memory limits and tags for better management.

```ts
const advancedContainerGroup = await AWS.GameLift.ContainerGroupDefinition("advancedContainerGroup", {
  OperatingSystem: "Linux",
  TotalMemoryLimitMebibytes: 4096,
  TotalVcpuLimit: 4,
  Name: "MyAdvancedContainerGroup",
  GameServerContainerDefinition: {
    Image: "my-game-server-image:latest",
    Port: 7777,
    RuntimeConfiguration: {
      ServerProcesses: [
        {
          ConcurrentExecutions: 10,
          LaunchPath: "server.sh",
          Parameters: "--port 7777"
        }
      ]
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "GameDevTeam" }
  ]
});
```

## Custom Container Definitions

Create a ContainerGroupDefinition that supports multiple container definitions for complex game server requirements.

```ts
const multiContainerGroup = await AWS.GameLift.ContainerGroupDefinition("multiContainerGroup", {
  OperatingSystem: "Linux",
  TotalMemoryLimitMebibytes: 8192,
  TotalVcpuLimit: 8,
  Name: "MyMultiContainerGroup",
  SupportContainerDefinitions: [
    {
      Image: "my-game-server-image:latest",
      Port: 7777,
      RuntimeConfiguration: {
        ServerProcesses: [
          {
            ConcurrentExecutions: 5,
            LaunchPath: "server.sh",
            Parameters: "--port 7777"
          }
        ]
      }
    },
    {
      Image: "my-helper-service-image:latest",
      Port: 8080,
      RuntimeConfiguration: {
        ServerProcesses: [
          {
            ConcurrentExecutions: 3,
            LaunchPath: "helper.sh",
            Parameters: "--mode active"
          }
        ]
      }
    }
  ]
});
``` 

## Adoption of Existing Resources

If you want to adopt an existing ContainerGroupDefinition instead of creating a new one, you can set the `adopt` property to `true`.

```ts
const adoptedContainerGroup = await AWS.GameLift.ContainerGroupDefinition("adoptedContainerGroup", {
  OperatingSystem: "Linux",
  TotalMemoryLimitMebibytes: 2048,
  TotalVcpuLimit: 2,
  Name: "MyAdoptedContainerGroup",
  adopt: true
});
```
