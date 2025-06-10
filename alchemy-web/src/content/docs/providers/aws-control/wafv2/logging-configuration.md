---
title: LoggingConfiguration
description: Learn how to create, update, and manage AWS WAFv2 LoggingConfigurations using Alchemy Cloud Control.
---


The LoggingConfiguration resource allows you to manage [AWS WAFv2 LoggingConfigurations](https://docs.aws.amazon.com/wafv2/latest/userguide/) for logging web traffic data to specified destinations.

## Minimal Example

Create a basic LoggingConfiguration with required properties and one optional property for redacting fields.

```ts
import AWS from "alchemy/aws/control";

const loggingConfig = await AWS.WAFv2.LoggingConfiguration("basicLoggingConfig", {
  ResourceArn: "arn:aws:wafv2:us-west-2:123456789012:regional/webacl/my-web-acl",
  LogDestinationConfigs: [
    "arn:aws:s3:::my-logs-bucket",
    "arn:aws:kinesis:us-west-2:123456789012:stream/my-kinesis-stream"
  ],
  RedactedFields: [
    {
      Type: "URI",
      Data: "sensitive-path"
    }
  ]
});
```

## Advanced Configuration

Configure a LoggingConfiguration with a custom logging filter to control which requests are logged.

```ts
const advancedLoggingConfig = await AWS.WAFv2.LoggingConfiguration("advancedLoggingConfig", {
  ResourceArn: "arn:aws:wafv2:us-west-2:123456789012:regional/webacl/my-web-acl",
  LogDestinationConfigs: [
    "arn:aws:s3:::my-logs-bucket",
    "arn:aws:kinesis:us-west-2:123456789012:stream/my-kinesis-stream"
  ],
  LoggingFilter: {
    FilterEnabled: true,
    Filter: {
      LogDestinationConfig: "arn:aws:kinesis:us-west-2:123456789012:stream/my-kinesis-stream",
      LogFormat: "json"
    }
  }
});
```

## Using Multiple Log Destinations

Demonstrate how to set up a LoggingConfiguration that logs to multiple destinations without redacted fields.

```ts
const multiDestinationLoggingConfig = await AWS.WAFv2.LoggingConfiguration("multiDestinationLoggingConfig", {
  ResourceArn: "arn:aws:wafv2:us-west-2:123456789012:regional/webacl/my-web-acl",
  LogDestinationConfigs: [
    "arn:aws:s3:::my-logs-bucket",
    "arn:aws:kinesis:us-west-2:123456789012:stream/my-kinesis-stream",
    "arn:aws:cloudwatch:us-west-2:123456789012:log-group:/aws/waf/my-log-group"
  ]
});
```
