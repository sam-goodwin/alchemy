---
title: ConfigurationSet
description: Learn how to create, update, and manage AWS SES ConfigurationSets using Alchemy Cloud Control.
---


The ConfigurationSet resource allows you to manage [AWS SES ConfigurationSets](https://docs.aws.amazon.com/ses/latest/userguide/) which are used to enable different sending options and features for your email sending activities.

## Minimal Example

Create a basic configuration set with a name and sending options.

```ts
import AWS from "alchemy/aws/control";

const basicConfigurationSet = await AWS.SES.ConfigurationSet("basicConfigurationSet", {
  Name: "DefaultConfigurationSet",
  SendingOptions: {
    SendingEnabled: true
  }
});
```

## Advanced Configuration

Configure a configuration set with suppression options and tracking options for enhanced management.

```ts
const advancedConfigurationSet = await AWS.SES.ConfigurationSet("advancedConfigurationSet", {
  Name: "AdvancedConfigurationSet",
  SendingOptions: {
    SendingEnabled: true
  },
  SuppressionOptions: {
    SuppressedReasons: ["BOUNCE", "COMPLAINT"]
  },
  TrackingOptions: {
    CustomRedirectDomain: "tracking.example.com"
  }
});
```

## Reputation Options

Set reputation options for a configuration set to manage sending limits and feedback loops.

```ts
const reputationConfigurationSet = await AWS.SES.ConfigurationSet("reputationConfigurationSet", {
  Name: "ReputationConfigurationSet",
  ReputationOptions: {
    ReputationMetricsEnabled: true,
    LastFreshStart: new Date().toISOString()
  }
});
```

## VDM Options

Configure VDM options to send personalized email messages based on engagement data.

```ts
const vdmConfigurationSet = await AWS.SES.ConfigurationSet("vdmConfigurationSet", {
  Name: "VdmConfigurationSet",
  VdmOptions: {
    VdmEnabled: true,
    BrandId: "brand-12345",
    TrackingOptions: {
      CustomRedirectDomain: "vdm-tracking.example.com"
    }
  }
});
```
