---
title: EventRule
description: Learn how to create, update, and manage AWS Notifications EventRules using Alchemy Cloud Control.
---


The EventRule resource lets you manage [AWS Notifications EventRules](https://docs.aws.amazon.com/notifications/latest/userguide/) to automate notifications based on specific events.

## Minimal Example

Create a basic EventRule that listens for a specific event type and pattern.

```ts
import AWS from "alchemy/aws/control";

const eventRule = await AWS.Notifications.EventRule("basicEventRule", {
  EventType: "AWS::SNS::Notification",
  NotificationConfigurationArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Regions: ["us-east-1"],
  Source: "aws:s3"
});
```

## Advanced Configuration

Configure an EventRule with an event pattern to filter specific notifications.

```ts
const advancedEventRule = await AWS.Notifications.EventRule("advancedEventRule", {
  EventType: "AWS::SNS::Notification",
  NotificationConfigurationArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Regions: ["us-west-2"],
  Source: "aws:ec2",
  EventPattern: JSON.stringify({
    "source": ["aws.ec2"],
    "detail-type": ["EC2 Instance State-change Notification"],
    "detail": {
      "state": ["running"]
    }
  })
});
```

## Adoption of Existing Resources

Adopt an existing EventRule without failing if it already exists in the specified region.

```ts
const adoptEventRule = await AWS.Notifications.EventRule("adoptEventRule", {
  EventType: "AWS::SNS::Notification",
  NotificationConfigurationArn: "arn:aws:sns:us-east-1:123456789012:MyExistingTopic",
  Regions: ["us-east-1"],
  Source: "aws:lambda",
  adopt: true
});
```

## Multi-Region Setup

Set up an EventRule that can listen for events across multiple regions.

```ts
const multiRegionEventRule = await AWS.Notifications.EventRule("multiRegionEventRule", {
  EventType: "AWS::SNS::Notification",
  NotificationConfigurationArn: "arn:aws:sns:us-east-1:123456789012:MyMultiRegionTopic",
  Regions: ["us-east-1", "us-west-1", "us-west-2"],
  Source: "aws:s3",
  EventPattern: JSON.stringify({
    "source": ["aws.s3"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventSource": ["s3.amazonaws.com"],
      "eventName": ["PutObject"]
    }
  })
});
```
