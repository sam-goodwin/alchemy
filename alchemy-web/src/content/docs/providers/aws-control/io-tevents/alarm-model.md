---
title: AlarmModel
description: Learn how to create, update, and manage AWS IoTEvents AlarmModels using Alchemy Cloud Control.
---


The AlarmModel resource lets you create and manage [AWS IoTEvents AlarmModels](https://docs.aws.amazon.com/iotevents/latest/userguide/) which are used to monitor and respond to events in your IoT environment.

## Minimal Example

Create a basic AlarmModel with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAlarmModel = await AWS.IoTEvents.AlarmModel("basicAlarmModel", {
  AlarmRule: {
    // Define your alarm rule here
    // Example: A condition that checks if a temperature exceeds a threshold
    condition: "temperature > 75", 
    // Define the actions that should be taken when the rule is triggered
    actions: [{ 
      // Example action: Send notification 
      notify: "user@example.com"
    }]
  },
  RoleArn: "arn:aws:iam::123456789012:role/iotevents-role",
  AlarmModelName: "BasicAlarmModel"
});
```

## Advanced Configuration

Configure an AlarmModel with additional properties such as severity and alarm capabilities.

```ts
const advancedAlarmModel = await AWS.IoTEvents.AlarmModel("advancedAlarmModel", {
  AlarmRule: {
    condition: "temperature > 80",
    actions: [{ 
      notify: "admin@example.com"
    }]
  },
  RoleArn: "arn:aws:iam::123456789012:role/iotevents-role",
  AlarmModelName: "AdvancedAlarmModel",
  Severity: 3,
  AlarmCapabilities: {
    autoResolve: true,
    reset: { 
      condition: "temperature < 75", 
      actions: [{ 
        notify: "admin@example.com"
      }]
    }
  }
});
```

## Alarm Event Actions

Create an AlarmModel that specifies alarm event actions for notifications and updates.

```ts
const eventActionAlarmModel = await AWS.IoTEvents.AlarmModel("eventActionAlarmModel", {
  AlarmRule: {
    condition: "humidity > 90",
    actions: [{ 
      notify: "alert@example.com"
    }]
  },
  RoleArn: "arn:aws:iam::123456789012:role/iotevents-role",
  AlarmEventActions: {
    notify: [{ 
      target: "alert@example.com", 
      message: "High humidity detected!" 
    }],
    log: [{ 
      target: "log-group-name", 
      message: "Humidity alarm triggered" 
    }]
  },
  AlarmModelName: "EventActionAlarmModel"
});
``` 

## Using Tags for Organization

Create an AlarmModel with tags for better organization and management.

```ts
const taggedAlarmModel = await AWS.IoTEvents.AlarmModel("taggedAlarmModel", {
  AlarmRule: {
    condition: "batteryLevel < 20",
    actions: [{ 
      notify: "maintenance@example.com"
    }]
  },
  RoleArn: "arn:aws:iam::123456789012:role/iotevents-role",
  AlarmModelName: "TaggedAlarmModel",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```
