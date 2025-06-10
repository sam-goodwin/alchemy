---
title: Trigger
description: Learn how to create, update, and manage AWS Glue Triggers using Alchemy Cloud Control.
---


The Trigger resource lets you manage [AWS Glue Triggers](https://docs.aws.amazon.com/glue/latest/userguide/) which are used to start jobs based on specific events or schedules.

## Minimal Example

Create a basic Glue Trigger that starts on job creation:

```ts
import AWS from "alchemy/aws/control";

const glueTrigger = await AWS.Glue.Trigger("myGlueTrigger", {
  Type: "SCHEDULED",
  StartOnCreation: true,
  Actions: [
    {
      JobName: "myGlueJob",
      Arguments: {
        "--input": "s3://my-bucket/input",
        "--output": "s3://my-bucket/output"
      }
    }
  ],
  Schedule: "cron(0 12 * * ? *)" // Every day at noon UTC
});
```

## Advanced Configuration

Configure a Glue Trigger with event batching conditions and a predicate:

```ts
const advancedGlueTrigger = await AWS.Glue.Trigger("advancedGlueTrigger", {
  Type: "EVENT",
  StartOnCreation: false,
  Actions: [
    {
      JobName: "myAdvancedGlueJob",
      Arguments: {
        "--input": "s3://my-bucket/advanced-input",
        "--output": "s3://my-bucket/advanced-output"
      }
    }
  ],
  EventBatchingCondition: {
    BatchSize: 10,
    BatchWindow: 60 // seconds
  },
  Predicate: {
    Conditions: [
      {
        JobName: "myGlueJob",
        State: "SUCCEEDED"
      }
    ]
  }
});
```

## Scheduled Trigger Example

Create a Glue Trigger that runs a job daily at a specific time:

```ts
const dailyGlueTrigger = await AWS.Glue.Trigger("dailyGlueTrigger", {
  Type: "SCHEDULED",
  StartOnCreation: true,
  Actions: [
    {
      JobName: "myDailyJob",
      Arguments: {
        "--input": "s3://my-bucket/daily-input",
        "--output": "s3://my-bucket/daily-output"
      }
    }
  ],
  Schedule: "cron(0 15 * * ? *)" // Every day at 3 PM UTC
});
```

## Event-Based Trigger Example

Set up a Glue Trigger that responds to an event from another service:

```ts
const eventBasedGlueTrigger = await AWS.Glue.Trigger("eventBasedGlueTrigger", {
  Type: "EVENT",
  StartOnCreation: true,
  Actions: [
    {
      JobName: "myEventJob",
      Arguments: {
        "--input": "s3://my-bucket/event-input",
        "--output": "s3://my-bucket/event-output"
      }
    }
  ],
  Predicate: {
    Conditions: [
      {
        JobName: "myEventJob",
        State: "FAILED"
      }
    ]
  }
});
```
