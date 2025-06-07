---
title: Managing AWS Events Rules with Alchemy
description: Learn how to create, update, and manage AWS Events Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you manage [AWS Events Rules](https://docs.aws.amazon.com/events/latest/userguide/) for controlling event-driven architecture in your applications.

## Minimal Example

Create a basic event rule that triggers on a specific event pattern.

```ts
import AWS from "alchemy/aws/control";

const BasicEventRule = await AWS.Events.Rule("BasicEventRule", {
  Name: "MyBasicEventRule",
  EventPattern: {
    source: ["aws.ec2"],
    detailType: ["EC2 Instance State-change Notification"],
    detail: {
      state: ["running"]
    }
  },
  Description: "Triggers when an EC2 instance enters the running state",
  State: "ENABLED",
  Targets: [{
    Arn: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction",
    Id: "TargetFunctionV1"
  }]
});
```

## Advanced Configuration

Configure an event rule with a schedule expression for periodic events.

```ts
const ScheduledEventRule = await AWS.Events.Rule("ScheduledEventRule", {
  Name: "MyScheduledEventRule",
  ScheduleExpression: "rate(5 minutes)",
  Description: "Triggers every 5 minutes",
  State: "ENABLED",
  Targets: [{
    Arn: "arn:aws:lambda:us-west-2:123456789012:function:MyScheduledLambdaFunction",
    Id: "ScheduledTargetV1"
  }]
});
```

## Event Bus Integration

Create an event rule that listens to a specific event bus.

```ts
const EventBusRule = await AWS.Events.Rule("EventBusRule", {
  Name: "MyEventBusRule",
  EventBusName: "MyCustomEventBus",
  EventPattern: {
    source: ["my.custom.source"],
    detail: {
      eventType: ["eventA", "eventB"]
    }
  },
  Description: "Triggers on specific events from a custom event bus",
  State: "ENABLED",
  Targets: [{
    Arn: "arn:aws:sqs:us-west-2:123456789012:MyQueue",
    Id: "MySqsTarget"
  }]
});
```

## Using IAM Role for Permissions

Set up an event rule with an IAM role ARN that grants permissions to invoke targets.

```ts
const RoleEventRule = await AWS.Events.Rule("RoleEventRule", {
  Name: "MyRoleEventRule",
  EventPattern: {
    source: ["aws.s3"],
    detailType: ["AWS API Call via CloudTrail"],
    detail: {
      eventSource: ["s3.amazonaws.com"],
      eventName: ["PutObject"]
    }
  },
  Description: "Triggers when an object is put into S3",
  State: "ENABLED",
  RoleArn: "arn:aws:iam::123456789012:role/MyEventRuleRole",
  Targets: [{
    Arn: "arn:aws:lambda:us-west-2:123456789012:function:ProcessS3Event",
    Id: "S3EventProcessor"
  }]
});
```