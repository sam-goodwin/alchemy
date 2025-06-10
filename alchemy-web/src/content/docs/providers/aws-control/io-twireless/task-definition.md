---
title: TaskDefinition
description: Learn how to create, update, and manage AWS IoTWireless TaskDefinitions using Alchemy Cloud Control.
---


The TaskDefinition resource allows you to create and manage [AWS IoTWireless TaskDefinitions](https://docs.aws.amazon.com/iotwireless/latest/userguide/) which are used to define tasks for LoRaWAN gateways, including updates and task creation.

## Minimal Example

Create a basic TaskDefinition with the required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicTaskDefinition = await AWS.IoTWireless.TaskDefinition("basicTaskDefinition", {
  AutoCreateTasks: true,
  Name: "MyBasicTaskDefinition",
  TaskDefinitionType: "UPDATE",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a TaskDefinition with a LoRaWAN update gateway task entry, allowing you to specify detailed updates for your gateways.

```ts
const advancedTaskDefinition = await AWS.IoTWireless.TaskDefinition("advancedTaskDefinition", {
  AutoCreateTasks: true,
  Name: "MyAdvancedTaskDefinition",
  LoRaWANUpdateGatewayTaskEntry: {
    Update: {
      GatewayId: "Gateway123",
      UpdateType: "FIRMWARE",
      FirmwareVersion: "1.0.0"
    }
  },
  Tags: [
    {
      Key: "Project",
      Value: "IoTDeployment"
    }
  ]
});
```

## Custom Update Configuration

Create a TaskDefinition that specifies a custom update, including a different task entry.

```ts
const customUpdateTaskDefinition = await AWS.IoTWireless.TaskDefinition("customUpdateTaskDefinition", {
  AutoCreateTasks: false,
  Name: "MyCustomUpdateTaskDefinition",
  Update: {
    UpdateType: "FIRMWARE",
    GatewayId: "CustomGateway123",
    FirmwareVersion: "2.0.1"
  },
  Tags: [
    {
      Key: "Department",
      Value: "Engineering"
    }
  ]
});
```

## Adoption of Existing Resources

Create a TaskDefinition that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingTaskDefinition = await AWS.IoTWireless.TaskDefinition("adoptTaskDefinition", {
  AutoCreateTasks: true,
  Name: "MyAdoptedTaskDefinition",
  adopt: true,
  Tags: [
    {
      Key: "Status",
      Value: "Adopted"
    }
  ]
});
```
