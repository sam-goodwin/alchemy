---
title: Rule
description: Learn how to create, update, and manage AWS Events Rules using Alchemy Cloud Control.
---


The Rule resource allows you to manage [AWS Events Rules](https://docs.aws.amazon.com/events/latest/userguide/) that enable you to respond to events across AWS services. You can set up rules to trigger actions based on events, schedules, or specific patterns.

## Minimal Example

Create a basic events rule that triggers on a schedule.

```ts
import AWS from "alchemy/aws/control";

const dailyRule = await AWS.Events.Rule("dailyRule", {
  name: "DailyEventTrigger",
  scheduleExpression: "rate(1 day)",
  description: "This rule triggers once a day."
});
```

## Advanced Configuration

Configure an events rule with an event pattern and multiple targets.

```ts
const patternRule = await AWS.Events.Rule("patternRule", {
  name: "PatternMatchEventTrigger",
  eventPattern: {
    source: ["aws.ec2"],
    detailType: ["AWS API Call via CloudTrail"],
    detail: {
      eventSource: ["ec2.amazonaws.com"],
      eventName: ["RunInstances"]
    }
  },
  targets: [{
    id: "invokeLambda",
    arn: "arn:aws:lambda:us-east-1:123456789012:function:myFunction"
  }],
  description: "Triggers on EC2 instance creation events."
});
```

## Schedule-Based Rule

Create a rule that runs based on a cron schedule.

```ts
const cronRule = await AWS.Events.Rule("cronRule", {
  name: "WeeklyReportTrigger",
  scheduleExpression: "cron(0 12 ? * MON *)", // Every Monday at 12:00 PM UTC
  description: "Triggers every week for generating reports.",
  targets: [{
    id: "generateReportFunction",
    arn: "arn:aws:lambda:us-east-1:123456789012:function:generateReport"
  }]
});
```

## Event Bus Integration

Create a rule that listens to a specific event bus.

```ts
const eventBusRule = await AWS.Events.Rule("eventBusRule", {
  name: "CustomEventBusRule",
  eventBusName: "my-custom-bus",
  eventPattern: {
    source: ["my.application"],
    detailType: ["applicationUpdate"]
  },
  targets: [{
    id: "notifySns",
    arn: "arn:aws:sns:us-east-1:123456789012:myTopic"
  }],
  description: "Triggers notifications on application updates."
});
``` 

## Enabling and Disabling Rules

Create a rule and set its initial state.

```ts
const stateRule = await AWS.Events.Rule("stateRule", {
  name: "StateControlRule",
  scheduleExpression: "rate(1 hour)",
  state: "ENABLED", // Can be "ENABLED" or "DISABLED"
  description: "This rule is enabled and triggers every hour."
});
```
