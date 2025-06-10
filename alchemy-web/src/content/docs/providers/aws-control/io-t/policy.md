---
title: Policy
description: Learn how to create, update, and manage AWS IoT Policies using Alchemy Cloud Control.
---


The Policy resource allows you to manage [AWS IoT Policies](https://docs.aws.amazon.com/iot/latest/userguide/) which define the permissions for AWS IoT devices and applications to interact with AWS IoT services.

## Minimal Example

Create a basic IoT policy with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.IoT.Policy("basicIoTPolicy", {
  PolicyName: "BasicIoTPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iot:Connect",
          "iot:Publish",
          "iot:Subscribe",
          "iot:Receive"
        ],
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a policy with tags for better organization and management.

```ts
const advancedPolicy = await AWS.IoT.Policy("advancedIoTPolicy", {
  PolicyName: "AdvancedIoTPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iot:Connect"
        ],
        Resource: "*"
      },
      {
        Effect: "Allow",
        Action: [
          "iot:Publish",
          "iot:Subscribe",
          "iot:Receive"
        ],
        Resource: [
          "arn:aws:iot:us-west-2:123456789012:topic/MyTopic"
        ]
      }
    ]
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "IoTDeviceManagement"
    }
  ]
});
```

## Policy with Specific Actions

Demonstrate the creation of a policy that limits access to specific resources.

```ts
const specificPolicy = await AWS.IoT.Policy("specificIoTPolicy", {
  PolicyName: "SpecificIoTPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "iot:Publish",
        Resource: "arn:aws:iot:us-east-1:123456789012:topic/MyDeviceTopic"
      },
      {
        Effect: "Deny",
        Action: "iot:Subscribe",
        Resource: "*"
      }
    ]
  }
});
```

## Policy for Device Groups

Create a policy that grants permissions to a group of devices.

```ts
const groupPolicy = await AWS.IoT.Policy("groupIoTPolicy", {
  PolicyName: "GroupIoTPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iot:Connect",
          "iot:Publish"
        ],
        Resource: [
          "arn:aws:iot:us-west-2:123456789012:client/*",
          "arn:aws:iot:us-west-2:123456789012:topic/MyGroupTopic"
        ]
      }
    ]
  }
});
```
