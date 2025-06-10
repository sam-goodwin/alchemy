---
title: LoggingConfiguration
description: Learn how to create, update, and manage AWS IVSChat LoggingConfigurations using Alchemy Cloud Control.
---


The LoggingConfiguration resource allows you to manage logging configurations for AWS IVSChat, enabling you to capture chat events and send them to specified destinations. For more details, refer to the [AWS IVSChat LoggingConfigurations documentation](https://docs.aws.amazon.com/ivschat/latest/userguide/).

## Minimal Example

Create a basic LoggingConfiguration with essential properties and a name.

```ts
import AWS from "alchemy/aws/control";

const loggingConfig = await AWS.IVSChat.LoggingConfiguration("basicLoggingConfig", {
  destinationConfiguration: {
    destinationType: "S3", // Example destination type
    s3: {
      bucketName: "my-chat-logs-bucket",
      prefix: "chat-logs/"
    }
  },
  name: "MyChatLoggingConfig"
});
```

## Advanced Configuration

Set up a LoggingConfiguration with additional optional properties, such as tags for better organization.

```ts
const advancedLoggingConfig = await AWS.IVSChat.LoggingConfiguration("advancedLoggingConfig", {
  destinationConfiguration: {
    destinationType: "Kinesis", // Example destination type
    kinesis: {
      streamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/my-kinesis-stream",
      roleArn: "arn:aws:iam::123456789012:role/myKinesisRole"
    }
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Service", value: "IVSChat" }
  ],
  name: "AdvancedChatLoggingConfig"
});
```

## Custom Logging Destination

Create a LoggingConfiguration that sends logs to a custom logging service.

```ts
const customLoggingConfig = await AWS.IVSChat.LoggingConfiguration("customLoggingConfig", {
  destinationConfiguration: {
    destinationType: "Custom",
    custom: {
      endpoint: "https://my-custom-logging-service.com/logs",
      method: "POST",
      headers: {
        "Authorization": "Bearer my-secret-token"
      }
    }
  },
  name: "CustomChatLoggingConfig"
});
```
