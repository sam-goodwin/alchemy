---
title: DetectorModel
description: Learn how to create, update, and manage AWS IoTEvents DetectorModels using Alchemy Cloud Control.
---


The DetectorModel resource allows you to manage [AWS IoTEvents DetectorModels](https://docs.aws.amazon.com/iotevents/latest/userguide/) for monitoring events from IoT devices and triggering actions based on defined conditions.

## Minimal Example

Create a basic DetectorModel with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicDetectorModel = await AWS.IoTEvents.DetectorModel("basicDetectorModel", {
  DetectorModelDefinition: {
    InitialStateName: "initialState",
    States: [
      {
        StateName: "initialState",
        OnEnter: {
          Events: [
            {
              EventName: "event1",
              Condition: "true",
              Actions: [
                {
                  SetVariable: {
                    VariableName: "variable1",
                    Value: "value1"
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-events-role",
  EvaluationMethod: "BATCH"
});
```

## Advanced Configuration

Configure a DetectorModel with additional properties like description and tags for better management:

```ts
const advancedDetectorModel = await AWS.IoTEvents.DetectorModel("advancedDetectorModel", {
  DetectorModelDefinition: {
    InitialStateName: "advancedState",
    States: [
      {
        StateName: "advancedState",
        OnEnter: {
          Events: [
            {
              EventName: "event2",
              Condition: "temperature > 30",
              Actions: [
                {
                  SetVariable: {
                    VariableName: "status",
                    Value: "overheating"
                  }
                },
                {
                  TriggerNotification: {
                    NotificationArn: "arn:aws:sns:us-east-1:123456789012:myTopic"
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  DetectorModelName: "AdvancedDetectorModel",
  DetectorModelDescription: "A detector model to monitor temperature.",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-events-role",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Custom Evaluation Method

Create a DetectorModel that uses a custom evaluation method:

```ts
const customEvaluationDetectorModel = await AWS.IoTEvents.DetectorModel("customEvalDetectorModel", {
  DetectorModelDefinition: {
    InitialStateName: "customState",
    States: [
      {
        StateName: "customState",
        OnEnter: {
          Events: [
            {
              EventName: "event3",
              Condition: "humidity < 40",
              Actions: [
                {
                  SetVariable: {
                    VariableName: "humidityStatus",
                    Value: "low"
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/iot-events-role",
  EvaluationMethod: "SERIAL"
});
```
