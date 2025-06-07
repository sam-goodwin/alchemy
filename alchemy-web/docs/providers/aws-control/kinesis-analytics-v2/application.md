---
title: Managing AWS KinesisAnalyticsV2 Applications with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS KinesisAnalyticsV2 Applications](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.KinesisAnalyticsV2.Application("application-example", {
  RuntimeEnvironment: "example-runtimeenvironment",
  ServiceExecutionRole: "example-serviceexecutionrole",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.KinesisAnalyticsV2.Application("advanced-application", {
  RuntimeEnvironment: "example-runtimeenvironment",
  ServiceExecutionRole: "example-serviceexecutionrole",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

