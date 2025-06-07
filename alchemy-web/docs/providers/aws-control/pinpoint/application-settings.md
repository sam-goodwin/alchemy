---
title: Managing AWS Pinpoint ApplicationSettings with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint ApplicationSettings using Alchemy Cloud Control.
---

# ApplicationSettings

The ApplicationSettings resource lets you manage the settings for an AWS Pinpoint application, including campaign hooks, limits, and quiet time configurations. For more information, visit the [AWS Pinpoint ApplicationSettings documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic application settings configuration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicAppSettings = await AWS.Pinpoint.ApplicationSettings("BasicAppSettings", {
  ApplicationId: "my-pinpoint-app-id",
  Limits: {
    Daily: 1000,
    Total: 5000
  }
});
```

## Advanced Configuration

Configure application settings with additional options like campaign hooks and CloudWatch metrics.

```ts
const AdvancedAppSettings = await AWS.Pinpoint.ApplicationSettings("AdvancedAppSettings", {
  ApplicationId: "my-pinpoint-app-id",
  Limits: {
    Daily: 2000,
    Total: 10000
  },
  CampaignHook: {
    LambdaFunctionName: "myCampaignHookFunction",
    Mode: "FILTER",
    WebUrl: "https://example.com/campaign-hook"
  },
  CloudWatchMetricsEnabled: true
});
```

## Quiet Time Configuration

Set up application settings with a specific quiet time configuration.

```ts
const QuietTimeAppSettings = await AWS.Pinpoint.ApplicationSettings("QuietTimeAppSettings", {
  ApplicationId: "my-pinpoint-app-id",
  QuietTime: {
    Start: "22:00",
    End: "07:00"
  },
  Limits: {
    Daily: 1500,
    Total: 7500
  }
});
```

## Adoption of Existing Resources

Create application settings that will adopt existing resources if they already exist.

```ts
const AdoptExistingAppSettings = await AWS.Pinpoint.ApplicationSettings("AdoptExistingAppSettings", {
  ApplicationId: "my-pinpoint-app-id",
  Limits: {
    Daily: 2500,
    Total: 12500
  },
  adopt: true
});
```