---
title: SubscriptionDefinition
description: Learn how to create, update, and manage AWS Greengrass SubscriptionDefinitions using Alchemy Cloud Control.
---


The SubscriptionDefinition resource allows you to manage [AWS Greengrass SubscriptionDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) that enable communication between Greengrass components.

## Minimal Example

Create a basic SubscriptionDefinition with required properties and one optional parameter.

```ts
import AWS from "alchemy/aws/control";

const subscriptionDefinition = await AWS.Greengrass.SubscriptionDefinition("mySubscriptionDefinition", {
  Name: "MySubscriptionDefinition",
  InitialVersion: {
    Subscriptions: [
      {
        Id: "mySubscription",
        Source: "myPublisher",
        Subject: "my/topic",
        Target: "mySubscriber"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a SubscriptionDefinition with multiple subscriptions and tags for better management.

```ts
const advancedSubscriptionDefinition = await AWS.Greengrass.SubscriptionDefinition("advancedSubscriptionDefinition", {
  Name: "AdvancedSubscriptionDefinition",
  Tags: {
    Environment: "Production",
    Project: "MyGreengrassProject"
  },
  InitialVersion: {
    Subscriptions: [
      {
        Id: "subscription1",
        Source: "publisher1",
        Subject: "topic1",
        Target: "subscriber1"
      },
      {
        Id: "subscription2",
        Source: "publisher2",
        Subject: "topic2",
        Target: "subscriber2"
      }
    ]
  }
});
```

## Using Tags for Resource Management

Manage resources effectively by adding tags to the SubscriptionDefinition.

```ts
const taggedSubscriptionDefinition = await AWS.Greengrass.SubscriptionDefinition("taggedSubscriptionDefinition", {
  Name: "TaggedSubscriptionDefinition",
  Tags: {
    Owner: "Dev Team",
    CostCenter: "12345"
  },
  InitialVersion: {
    Subscriptions: [
      {
        Id: "taggedSubscription",
        Source: "taggedPublisher",
        Subject: "tagged/topic",
        Target: "taggedSubscriber"
      }
    ]
  }
});
```

## Adoption of Existing Resources

Configure the SubscriptionDefinition to adopt an existing resource if it already exists.

```ts
const adoptExistingSubscriptionDefinition = await AWS.Greengrass.SubscriptionDefinition("existingSubscriptionDefinition", {
  Name: "ExistingSubscriptionDefinition",
  adopt: true,
  InitialVersion: {
    Subscriptions: [
      {
        Id: "existingSubscription",
        Source: "existingPublisher",
        Subject: "existing/topic",
        Target: "existingSubscriber"
      }
    ]
  }
});
```
