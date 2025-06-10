---
title: EventIntegration
description: Learn how to create, update, and manage AWS AppIntegrations EventIntegrations using Alchemy Cloud Control.
---


The EventIntegration resource lets you manage [AWS AppIntegrations EventIntegrations](https://docs.aws.amazon.com/appintegrations/latest/userguide/) that allow you to integrate applications with event-driven architectures.

## Minimal Example

Create a basic EventIntegration with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicEventIntegration = await AWS.AppIntegrations.EventIntegration("basicEventIntegration", {
  name: "UserSignupEvents",
  eventBridgeBus: "default",
  eventFilter: {
    source: ["com.myapp.user"],
    detailType: ["user.signup"]
  },
  description: "Integration for user signup events"
});
```

## Advanced Configuration

Create an EventIntegration with additional tags for better resource management.

```ts
const taggedEventIntegration = await AWS.AppIntegrations.EventIntegration("taggedEventIntegration", {
  name: "OrderStatusUpdates",
  eventBridgeBus: "default",
  eventFilter: {
    source: ["com.myapp.order"],
    detailType: ["order.created", "order.updated"]
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "Engineering" }
  ]
});
```

## Adoption of Existing Resource

Create an EventIntegration while adopting an existing resource if it already exists.

```ts
const adoptedEventIntegration = await AWS.AppIntegrations.EventIntegration("adoptedEventIntegration", {
  name: "PaymentProcessingEvents",
  eventBridgeBus: "default",
  eventFilter: {
    source: ["com.myapp.payment"],
    detailType: ["payment.success", "payment.failed"]
  },
  adopt: true // Allows adoption of an existing resource
});
```
