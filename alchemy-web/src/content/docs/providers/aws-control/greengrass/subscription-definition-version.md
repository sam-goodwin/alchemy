---
title: SubscriptionDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass SubscriptionDefinitionVersions using Alchemy Cloud Control.
---


The SubscriptionDefinitionVersion resource allows you to manage versions of subscription definitions in AWS Greengrass, enabling you to define how different components of your IoT application communicate with each other. For more information, see the [AWS Greengrass SubscriptionDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic SubscriptionDefinitionVersion with required properties.

```ts
import AWS from "alchemy/aws/control";

const subscriptionDefinitionVersion = await AWS.Greengrass.SubscriptionDefinitionVersion("basicSubscriptionVersion", {
  SubscriptionDefinitionId: "mySubscriptionDefinitionId",
  Subscriptions: [
    {
      Id: "mySubscription",
      Source: {
        Id: "mySource",
        Type: "device"
      },
      Subject: "topic/my/topic",
      Target: {
        Id: "myTarget",
        Type: "function"
      }
    }
  ]
});
```

## Advanced Configuration

Configure a SubscriptionDefinitionVersion with additional options.

```ts
const advancedSubscriptionDefinitionVersion = await AWS.Greengrass.SubscriptionDefinitionVersion("advancedSubscriptionVersion", {
  SubscriptionDefinitionId: "myAdvancedSubscriptionDefinitionId",
  Subscriptions: [
    {
      Id: "myAdvancedSubscription",
      Source: {
        Id: "myAdvancedSource",
        Type: "device"
      },
      Subject: "topic/advanced/topic",
      Target: {
        Id: "myAdvancedTarget",
        Type: "function"
      }
    }
  ],
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Multiple Subscriptions

Define multiple subscriptions in a single SubscriptionDefinitionVersion.

```ts
const multiSubscriptionDefinitionVersion = await AWS.Greengrass.SubscriptionDefinitionVersion("multiSubscriptionVersion", {
  SubscriptionDefinitionId: "myMultiSubscriptionDefinitionId",
  Subscriptions: [
    {
      Id: "subscriptionOne",
      Source: {
        Id: "sourceDeviceOne",
        Type: "device"
      },
      Subject: "topic/one",
      Target: {
        Id: "targetFunctionOne",
        Type: "function"
      }
    },
    {
      Id: "subscriptionTwo",
      Source: {
        Id: "sourceDeviceTwo",
        Type: "device"
      },
      Subject: "topic/two",
      Target: {
        Id: "targetFunctionTwo",
        Type: "function"
      }
    }
  ]
});
```
