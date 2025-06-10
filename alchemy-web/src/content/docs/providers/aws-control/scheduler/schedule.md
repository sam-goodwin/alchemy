---
title: Schedule
description: Learn how to create, update, and manage AWS Scheduler Schedules using Alchemy Cloud Control.
---


The Schedule resource lets you manage [AWS Scheduler Schedules](https://docs.aws.amazon.com/scheduler/latest/userguide/) for automating tasks and events based on a defined schedule.

## Minimal Example

Create a basic schedule that triggers a Lambda function at a specified interval.

```ts
import AWS from "alchemy/aws/control";

const lambdaSchedule = await AWS.Scheduler.Schedule("lambdaSchedule", {
  scheduleExpression: "rate(5 minutes)",
  target: {
    arn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
    roleArn: "arn:aws:iam::123456789012:role/service-role/myLambdaRole"
  },
  flexibleTimeWindow: {
    mode: "OFF"
  },
  description: "Schedule to trigger my Lambda function every 5 minutes."
});
```

## Advanced Configuration

Configure a schedule with a specific start and end date, as well as a custom time zone.

```ts
const advancedSchedule = await AWS.Scheduler.Schedule("advancedSchedule", {
  scheduleExpression: "cron(0 12 * * ? *)", // Every day at 12 PM UTC
  target: {
    arn: "arn:aws:sns:us-east-1:123456789012:mySnsTopic",
    roleArn: "arn:aws:iam::123456789012:role/service-role/mySnsRole"
  },
  startDate: "2023-11-01T00:00:00Z",
  endDate: "2023-12-01T00:00:00Z",
  scheduleExpressionTimezone: "UTC",
  flexibleTimeWindow: {
    mode: "OFF"
  },
  description: "Daily notification to SNS at 12 PM UTC from Nov 1 to Dec 1."
});
```

## Using a KMS Key for Encryption

Create a schedule that uses a KMS key for encrypting the target's data.

```ts
const encryptedSchedule = await AWS.Scheduler.Schedule("encryptedSchedule", {
  scheduleExpression: "rate(1 hour)",
  target: {
    arn: "arn:aws:lambda:us-east-1:123456789012:function:mySecureLambdaFunction",
    roleArn: "arn:aws:iam::123456789012:role/service-role/mySecureLambdaRole"
  },
  kmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-efgh-5678-ijkl-91011mnopqr",
  flexibleTimeWindow: {
    mode: "OFF"
  },
  description: "Securely triggers my Lambda function every hour using KMS."
});
```

## Adoption of Existing Resources

Create a schedule while adopting an existing resource if it already exists.

```ts
const adoptedSchedule = await AWS.Scheduler.Schedule("adoptedSchedule", {
  scheduleExpression: "cron(0 18 * * ? *)", // Every day at 6 PM UTC
  target: {
    arn: "arn:aws:ecs:us-west-2:123456789012:service/myEcsService",
    roleArn: "arn:aws:iam::123456789012:role/service-role/myEcsRole"
  },
  adopt: true, // Adopt existing resource
  flexibleTimeWindow: {
    mode: "OFF"
  },
  description: "Adopt existing schedule to trigger ECS service daily at 6 PM UTC."
});
```
