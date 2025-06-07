---
title: Managing AWS Timestream ScheduledQuerys with Alchemy
description: Learn how to create, update, and manage AWS Timestream ScheduledQuerys using Alchemy Cloud Control.
---

# ScheduledQuery

The ScheduledQuery resource lets you create and manage [AWS Timestream ScheduledQuerys](https://docs.aws.amazon.com/timestream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-timestream-scheduledquery.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scheduledquery = await AWS.Timestream.ScheduledQuery("scheduledquery-example", {
  ScheduledQueryExecutionRoleArn: "example-scheduledqueryexecutionrolearn",
  ErrorReportConfiguration: "example-errorreportconfiguration",
  ScheduleConfiguration: "example-scheduleconfiguration",
  QueryString: "example-querystring",
  NotificationConfiguration: "example-notificationconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a scheduledquery with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedScheduledQuery = await AWS.Timestream.ScheduledQuery("advanced-scheduledquery", {
  ScheduledQueryExecutionRoleArn: "example-scheduledqueryexecutionrolearn",
  ErrorReportConfiguration: "example-errorreportconfiguration",
  ScheduleConfiguration: "example-scheduleconfiguration",
  QueryString: "example-querystring",
  NotificationConfiguration: "example-notificationconfiguration",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

