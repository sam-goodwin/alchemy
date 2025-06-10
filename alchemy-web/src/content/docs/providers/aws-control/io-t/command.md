---
title: Command
description: Learn how to create, update, and manage AWS IoT Commands using Alchemy Cloud Control.
---


The Command resource lets you create and manage [AWS IoT Commands](https://docs.aws.amazon.com/iot/latest/userguide/) that can be used to perform actions on IoT devices.

## Minimal Example

Create a basic IoT command with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicCommand = await AWS.IoT.Command("basicCommand", {
  CommandId: "restartDevice",
  Description: "Restarts the IoT device",
  DisplayName: "Restart Device Command",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-command-role",
  Payload: {
    key: "restart",
    value: "true"
  },
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a command with additional parameters and settings for more advanced use cases.

```ts
const advancedCommand = await AWS.IoT.Command("advancedCommand", {
  CommandId: "updateDeviceConfig",
  Description: "Updates the configuration of the IoT device",
  DisplayName: "Update Device Config Command",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-command-role",
  Payload: {
    key: "updateConfig",
    value: JSON.stringify({ settingA: true, settingB: "high" })
  },
  MandatoryParameters: [
    { Name: "deviceId", Type: "String" },
    { Name: "newConfig", Type: "String" }
  ],
  Tags: [
    { Key: "Project", Value: "IoT Management" },
    { Key: "Version", Value: "v1.0" }
  ]
});
```

## Command with Deprecation Handling

Create a command that is marked for deprecation and pending deletion.

```ts
const deprecatedCommand = await AWS.IoT.Command("deprecatedCommand", {
  CommandId: "oldRestartDevice",
  Description: "Deprecated command for restarting IoT device",
  DisplayName: "Old Restart Device Command",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-command-role",
  Deprecated: true,
  PendingDeletion: true,
  Tags: [
    { Key: "Status", Value: "Deprecated" }
  ]
});
```
