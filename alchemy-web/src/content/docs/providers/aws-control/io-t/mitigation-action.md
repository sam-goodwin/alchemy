---
title: MitigationAction
description: Learn how to create, update, and manage AWS IoT MitigationActions using Alchemy Cloud Control.
---


The MitigationAction resource allows you to create and manage [AWS IoT Mitigation Actions](https://docs.aws.amazon.com/iot/latest/userguide/) that are used to apply specific actions in response to detected security issues within your IoT environment.

## Minimal Example

Create a basic MitigationAction with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicMitigationAction = await AWS.IoT.MitigationAction("basicMitigation", {
  ActionName: "DisableDevice",
  ActionParams: {
    // Example ActionParams structure, replace with actual parameters as needed
    disableDeviceParams: {
      deviceId: "device-123",
      reason: "Security Breach"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTMitigationRole",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a MitigationAction with additional parameters for more complex actions.

```ts
const advancedMitigationAction = await AWS.IoT.MitigationAction("advancedMitigation", {
  ActionName: "RebootDevice",
  ActionParams: {
    rebootDeviceParams: {
      deviceId: "device-456",
      delay: 30 // Delay in seconds before action is taken
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTMitigationRole",
  Tags: [
    {
      Key: "Application",
      Value: "IoTMonitoring"
    }
  ]
});
```

## Multiple Actions

Create multiple MitigationActions to handle different scenarios.

```ts
const mitigationAction1 = await AWS.IoT.MitigationAction("mitigationAction1", {
  ActionName: "BlockDevice",
  ActionParams: {
    blockDeviceParams: {
      deviceId: "device-789",
      blockDuration: 60 // Duration in minutes
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTMitigationRole"
});

const mitigationAction2 = await AWS.IoT.MitigationAction("mitigationAction2", {
  ActionName: "NotifyAdmin",
  ActionParams: {
    notifyAdminParams: {
      email: "admin@example.com",
      message: "A device has been compromised."
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTMitigationRole"
});
```
