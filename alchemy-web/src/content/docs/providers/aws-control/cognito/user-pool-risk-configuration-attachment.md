---
title: UserPoolRiskConfigurationAttachment
description: Learn how to create, update, and manage AWS Cognito UserPoolRiskConfigurationAttachments using Alchemy Cloud Control.
---


The UserPoolRiskConfigurationAttachment resource allows you to manage the risk configuration settings for AWS Cognito user pools. This resource is essential for enhancing security by managing account takeover and compromised credential risks. For more information, refer to the [AWS Cognito UserPoolRiskConfigurationAttachments documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic UserPoolRiskConfigurationAttachment with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const userPoolRiskConfig = await AWS.Cognito.UserPoolRiskConfigurationAttachment("userPoolRiskConfig", {
  UserPoolId: "us-east-1_123456789",
  ClientId: "abcde12345",
  CompromisedCredentialsRiskConfiguration: {
    Actions: {
      EventAction: "BLOCK"
    },
    NotifyConfiguration: {
      From: "noreply@example.com",
      Sender: "Example Notifications",
      ReplyTo: "support@example.com"
    }
  }
});
```

## Advanced Configuration

Configure a UserPoolRiskConfigurationAttachment with advanced settings for account takeover risk management.

```ts
const advancedRiskConfig = await AWS.Cognito.UserPoolRiskConfigurationAttachment("advancedRiskConfig", {
  UserPoolId: "us-east-1_123456789",
  ClientId: "abcde12345",
  AccountTakeoverRiskConfiguration: {
    NotifyConfiguration: {
      From: "noreply@example.com",
      Sender: "Example Notifications",
      ReplyTo: "support@example.com"
    },
    Actions: {
      EventAction: "MFA_IF_CONFIGURED"
    },
    RiskExceptionConfiguration: {
      BlockedIPRangeList: ["192.168.1.0/24"],
      SkipIPRangeList: ["10.0.0.0/8"]
    }
  }
});
```

## Risk Exception Configuration

Create a UserPoolRiskConfigurationAttachment that includes specific risk exception settings.

```ts
const exceptionConfig = await AWS.Cognito.UserPoolRiskConfigurationAttachment("exceptionConfig", {
  UserPoolId: "us-east-1_123456789",
  ClientId: "abcde12345",
  RiskExceptionConfiguration: {
    BlockedIPRangeList: ["203.0.113.0/24"],
    SkipIPRangeList: ["192.0.2.0/24"]
  }
});
```
