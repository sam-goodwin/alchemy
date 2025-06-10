---
title: Integration
description: Learn how to create, update, and manage AWS Logs Integrations using Alchemy Cloud Control.
---


The Integration resource lets you manage [AWS Logs Integrations](https://docs.aws.amazon.com/logs/latest/userguide/) for collecting and processing log data from various sources.

## Minimal Example

Create a basic integration with required properties:

```ts
import AWS from "alchemy/aws/control";

const logIntegration = await AWS.Logs.Integration("basicIntegration", {
  IntegrationName: "BasicIntegration",
  ResourceConfig: {
    // Resource configuration goes here
  },
  IntegrationType: "AWS::Logs::Integration"
});
```

## Advanced Configuration

Configure an integration with optional properties for enhanced functionality:

```ts
const advancedLogIntegration = await AWS.Logs.Integration("advancedIntegration", {
  IntegrationName: "AdvancedIntegration",
  ResourceConfig: {
    // Resource configuration with additional settings
  },
  IntegrationType: "AWS::Logs::Integration",
  adopt: true // Adopt existing resource if it exists
});
```

## Specific Use Case: CloudWatch Logs Integration

Set up an integration specifically for CloudWatch logs:

```ts
const cloudWatchIntegration = await AWS.Logs.Integration("cloudWatchIntegration", {
  IntegrationName: "CloudWatchLogsIntegration",
  ResourceConfig: {
    LogGroupName: "MyLogGroup",
    RoleArn: "arn:aws:iam::123456789012:role/MyLogsRole"
  },
  IntegrationType: "AWS::Logs::CloudWatchIntegration",
  adopt: false // Do not adopt existing resource
});
```

## Specific Use Case: S3 Logs Integration

Create an integration for processing logs from an S3 bucket:

```ts
const s3LogsIntegration = await AWS.Logs.Integration("s3LogsIntegration", {
  IntegrationName: "S3LogsIntegration",
  ResourceConfig: {
    BucketName: "my-log-bucket",
    Prefix: "logs/"
  },
  IntegrationType: "AWS::Logs::S3Integration",
  adopt: false // Do not adopt existing resource
});
```
