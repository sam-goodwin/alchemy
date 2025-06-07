---
title: Managing AWS IoT Policys with Alchemy
description: Learn how to create, update, and manage AWS IoT Policys using Alchemy Cloud Control.
---

# Policy

The Policy resource allows you to create and manage [AWS IoT Policys](https://docs.aws.amazon.com/iot/latest/userguide/) that define the permissions for your IoT devices to interact with AWS services.

## Minimal Example

Create a basic IoT policy that allows `iot:Connect` and `iot:Publish` actions.

```ts
import AWS from "alchemy/aws/control";

const BasicIoTPolicy = await AWS.IoT.Policy("BasicIoTPolicy", {
  PolicyName: "BasicIoTPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iot:Connect",
          "iot:Publish"
        ],
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Advanced Configuration

Configure an IoT policy with more specific actions and resource restrictions.

```ts
const AdvancedIoTPolicy = await AWS.IoT.Policy("AdvancedIoTPolicy", {
  PolicyName: "AdvancedIoTPolicy",
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
        Resource: "arn:aws:iot:us-west-2:123456789012:topic/MyDeviceTopic"
      },
      {
        Effect: "Allow",
        Action: "iot:DescribeEndpoint",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Policy for Device Group

Create a policy that allows actions for a specific device group.

```ts
const GroupIoTPolicy = await AWS.IoT.Policy("GroupIoTPolicy", {
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
        Resource: "arn:aws:iot:us-west-2:123456789012:client/MyDeviceGroup/*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Policy for Multiple Actions

Create a policy that allows multiple actions across different resources.

```ts
const MultiActionPolicy = await AWS.IoT.Policy("MultiActionPolicy", {
  PolicyName: "MultiActionPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iot:Connect",
          "iot:Publish",
          "iot:Subscribe"
        ],
        Resource: [
          "arn:aws:iot:us-west-2:123456789012:topic/MyDeviceTopic",
          "arn:aws:iot:us-west-2:123456789012:topicfilter/MyDeviceTopicFilter"
        ]
      },
      {
        Effect: "Deny",
        Action: "iot:DeleteTopicRule",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```