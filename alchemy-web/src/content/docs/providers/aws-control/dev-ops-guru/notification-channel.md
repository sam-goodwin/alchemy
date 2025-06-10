---
title: NotificationChannel
description: Learn how to create, update, and manage AWS DevOpsGuru NotificationChannels using Alchemy Cloud Control.
---


The NotificationChannel resource lets you manage [AWS DevOpsGuru NotificationChannels](https://docs.aws.amazon.com/devopsguru/latest/userguide/) for receiving notifications about AWS DevOpsGuru insights and recommendations.

## Minimal Example

Create a basic NotificationChannel with essential properties.

```ts
import AWS from "alchemy/aws/control";

const notificationChannel = await AWS.DevOpsGuru.NotificationChannel("myNotificationChannel", {
  Config: {
    Sns: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:my-topic",
      Severity: "HIGH"
    }
  },
  adopt: false // Default is false: will fail if the resource already exists
});
```

## Advanced Configuration

Configure a NotificationChannel with additional settings such as multiple SNS topics and severity levels.

```ts
const advancedNotificationChannel = await AWS.DevOpsGuru.NotificationChannel("advancedNotificationChannel", {
  Config: {
    Sns: {
      TopicArn: "arn:aws:sns:us-west-2:123456789012:another-topic",
      Severity: "MEDIUM" // Options: LOW, MEDIUM, HIGH
    },
    Config: {
      Email: {
        Address: "alerts@example.com",
        Severity: "LOW"
      }
    }
  },
  adopt: true // Adopts existing resources if they already exist
});
```

## Example with Multiple Notification Types

Demonstrate how to set up a NotificationChannel that sends notifications via both SNS and email.

```ts
const multiTypeNotificationChannel = await AWS.DevOpsGuru.NotificationChannel("multiTypeNotificationChannel", {
  Config: {
    Sns: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:multi-topic",
      Severity: "HIGH"
    },
    Email: {
      Address: "team@example.com",
      Severity: "MEDIUM"
    }
  },
  adopt: false
});
```
