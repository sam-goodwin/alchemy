---
title: LogDeliveryConfiguration
description: Learn how to create, update, and manage AWS Cognito LogDeliveryConfigurations using Alchemy Cloud Control.
---


The LogDeliveryConfiguration resource allows you to manage the logging settings for AWS Cognito User Pools. This includes configuring log delivery to different destinations for monitoring and analysis. For more details, refer to the [AWS Cognito LogDeliveryConfigurations documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic LogDeliveryConfiguration with the required UserPoolId and a simple log configuration.

```ts
import AWS from "alchemy/aws/control";

const basicLogDeliveryConfig = await AWS.Cognito.LogDeliveryConfiguration("basicLogConfig", {
  UserPoolId: "us-east-1_aBcDeFGhI",
  LogConfigurations: [
    {
      Destination: {
        S3Bucket: "my-cognito-logs",
        S3Prefix: "user-pool-logs/"
      },
      LogType: "ALL",
      Status: "ENABLED"
    }
  ]
});
```

## Advanced Configuration

Configure a LogDeliveryConfiguration with multiple log types and destinations for enhanced monitoring.

```ts
const advancedLogDeliveryConfig = await AWS.Cognito.LogDeliveryConfiguration("advancedLogConfig", {
  UserPoolId: "us-east-1_aBcDeFGhI",
  LogConfigurations: [
    {
      Destination: {
        S3Bucket: "my-cognito-logs",
        S3Prefix: "user-pool-logs/"
      },
      LogType: "SIGN_IN",
      Status: "ENABLED"
    },
    {
      Destination: {
        CloudWatchLogs: {
          LogGroup: "CognitoUserPoolLogs",
          LogStream: "UserPoolSignIn"
        }
      },
      LogType: "SIGN_OUT",
      Status: "ENABLED"
    }
  ]
});
```

## Custom Log Delivery Configuration

Set up a LogDeliveryConfiguration with a custom log format and specify the adoption of existing resources.

```ts
const customLogDeliveryConfig = await AWS.Cognito.LogDeliveryConfiguration("customLogConfig", {
  UserPoolId: "us-east-1_aBcDeFGhI",
  LogConfigurations: [
    {
      Destination: {
        S3Bucket: "my-custom-logs",
        S3Prefix: "custom-logs/"
      },
      LogType: "ALL",
      Status: "ENABLED"
    }
  ],
  adopt: true // Will adopt existing resource if it already exists
});
```
