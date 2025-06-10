---
title: Application
description: Learn how to create, update, and manage AWS ApplicationInsights Applications using Alchemy Cloud Control.
---


The Application resource allows you to manage [AWS ApplicationInsights Applications](https://docs.aws.amazon.com/applicationinsights/latest/userguide/), which automatically sets up monitoring for your applications and resources.

## Minimal Example

Create a basic ApplicationInsights application with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const appInsightsApplication = await AWS.ApplicationInsights.Application("myApplication", {
  ResourceGroupName: "myResourceGroup",
  AutoConfigurationEnabled: true,
  OpsCenterEnabled: true
});
```

## Advanced Configuration

Configure an ApplicationInsights application with advanced settings for custom components and log pattern sets.

```ts
const advancedAppInsightsApplication = await AWS.ApplicationInsights.Application("advancedApplication", {
  ResourceGroupName: "myResourceGroup",
  AutoConfigurationEnabled: true,
  CustomComponents: [
    {
      ComponentName: "myCustomComponent",
      ComponentType: "AWS::EC2::Instance",
      ComponentMonitoringSettings: {
        LogPatternSets: [
          {
            Name: "ErrorLogPattern",
            Pattern: "ERROR",
            Rank: 1
          }
        ]
      }
    }
  ],
  LogPatternSets: [
    {
      Name: "GeneralLogPattern",
      Pattern: "INFO",
      Rank: 0
    }
  ],
  SNSNotificationArn: "arn:aws:sns:us-east-1:123456789012:MyTopic"
});
```

## Adoption of Existing Resources

Use the adoption feature to manage existing resources without causing failure if they are already present.

```ts
const adoptedApplication = await AWS.ApplicationInsights.Application("existingApplication", {
  ResourceGroupName: "myResourceGroup",
  adopt: true
});
```

## Configuring Notifications

Set up an ApplicationInsights application with an SNS topic for notifications.

```ts
const notifiedAppInsightsApplication = await AWS.ApplicationInsights.Application("notifiedApplication", {
  ResourceGroupName: "myResourceGroup",
  AutoConfigurationEnabled: true,
  SNSNotificationArn: "arn:aws:sns:us-west-2:123456789012:MyNotifications"
});
```
