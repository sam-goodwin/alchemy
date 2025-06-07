---
title: Managing AWS Glue Triggers with Alchemy
description: Learn how to create, update, and manage AWS Glue Triggers using Alchemy Cloud Control.
---

# Trigger

The Trigger resource allows you to manage [AWS Glue Triggers](https://docs.aws.amazon.com/glue/latest/userguide/) which are used to start jobs based on certain events or schedules.

## Minimal Example

Create a basic AWS Glue Trigger that starts on job creation.

```ts
import AWS from "alchemy/aws/control";

const basicTrigger = await AWS.Glue.Trigger("BasicTrigger", {
  Type: "SCHEDULED",
  StartOnCreation: true,
  Actions: [
    {
      JobName: "ETLJob",
      Arguments: {
        "--key": "value"
      }
    }
  ],
  Schedule: "cron(0 12 * * ? *)", // Every day at 12 PM UTC
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a trigger with advanced options including predicates and event batching conditions.

```ts
const advancedTrigger = await AWS.Glue.Trigger("AdvancedTrigger", {
  Type: "CONDITIONAL",
  StartOnCreation: false,
  Actions: [
    {
      JobName: "DataProcessingJob",
      Arguments: {
        "--input": "s3://input-bucket/",
        "--output": "s3://output-bucket/"
      }
    }
  ],
  Predicate: {
    Conditions: [
      {
        JobName: "DependentJob",
        State: "SUCCEEDED" // Trigger only if the dependent job succeeded
      }
    ]
  },
  EventBatchingCondition: {
    BatchSize: 5,
    BatchWindow: 60 // 60 seconds
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Scheduled Trigger Example

Create a trigger that runs on a specific schedule.

```ts
const scheduledTrigger = await AWS.Glue.Trigger("ScheduledTrigger", {
  Type: "SCHEDULED",
  StartOnCreation: true,
  Actions: [
    {
      JobName: "DailyDataIngestion",
      Arguments: {
        "--source": "s3://data-source/",
        "--target": "s3://data-target/"
      }
    }
  ],
  Schedule: "cron(0 6 * * ? *)", // Every day at 6 AM UTC
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Event-Driven Trigger Example

Set up a trigger that responds to specific events.

```ts
const eventDrivenTrigger = await AWS.Glue.Trigger("EventDrivenTrigger", {
  Type: "EVENT",
  Actions: [
    {
      JobName: "EventHandlingJob",
      Arguments: {
        "--eventType": "S3:ObjectCreated:*"
      }
    }
  ],
  EventBatchingCondition: {
    BatchSize: 10,
    BatchWindow: 120 // 120 seconds
  },
  Tags: [
    { Key: "Environment", Value: "QA" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```