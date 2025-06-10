---
title: ConfigurationSet
description: Learn how to create, update, and manage AWS PinpointEmail ConfigurationSets using Alchemy Cloud Control.
---


The ConfigurationSet resource lets you manage [AWS PinpointEmail ConfigurationSets](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) which are essential for controlling email sending settings and tracking options in Amazon Pinpoint.

## Minimal Example

Create a basic ConfigurationSet with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicConfigurationSet = await AWS.PinpointEmail.ConfigurationSet("basicConfigSet", {
  Name: "MyBasicConfigurationSet",
  SendingOptions: {
    SendingEnabled: true
  }
});
```

## Advanced Configuration

Configure a ConfigurationSet with advanced tracking and reputation options.

```ts
const advancedConfigurationSet = await AWS.PinpointEmail.ConfigurationSet("advancedConfigSet", {
  Name: "MyAdvancedConfigurationSet",
  SendingOptions: {
    SendingEnabled: true
  },
  TrackingOptions: {
    CustomRedirectDomain: "tracking.example.com"
  },
  ReputationOptions: {
    ReputationMetricsEnabled: true,
    LastFreshStart: "2023-10-01T00:00:00Z"
  }
});
```

## Configuration with Delivery Options

Create a ConfigurationSet that includes delivery options for better control over email sending.

```ts
const deliveryOptionsConfigurationSet = await AWS.PinpointEmail.ConfigurationSet("deliveryOptionsConfigSet", {
  Name: "MyDeliveryOptionsConfigurationSet",
  SendingOptions: {
    SendingEnabled: true
  },
  DeliveryOptions: {
    SendingPoolId: "mySendingPool",
    TlsPolicy: "Require"
  }
});
```

## Configuration with Tags

Add tags to a ConfigurationSet for resource management and identification.

```ts
const taggedConfigurationSet = await AWS.PinpointEmail.ConfigurationSet("taggedConfigSet", {
  Name: "MyTaggedConfigurationSet",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EmailCampaign" }
  ]
});
```
