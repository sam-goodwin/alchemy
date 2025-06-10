---
title: Meter
description: Learn how to create and manage Stripe Meters for usage-based billing using Alchemy in your applications.
---


The Meter resource lets you create and manage [Stripe Billing Meters](https://stripe.com/docs/billing/usage-based-billing/meters) for your Stripe account. Meters define how usage of a product is measured and aggregated for billing purposes.

## Minimal Example

Create a basic meter to track API calls:

```ts
import { Meter } from "alchemy/stripe";

const apiCallMeter = await Meter("apiUsageMeter", {
  displayName: "API Call Usage",
  eventName: "api.call.recorded",
  defaultAggregation: {
    formula: "sum"
  },
  customerMapping: {
    eventPayloadKey: "customer_id",
    type: "by_id"
  },
  valueSettings: {
    eventPayloadKey: "count"
  }
});
```

## Last-Value Meter

Create a meter that captures the last reported value during a billing period:

```ts
import { Meter } from "alchemy/stripe";

const storageMeter = await Meter("dataStorageMeter", {
  displayName: "Data Storage GB",
  eventName: "data.storage.reported",
  defaultAggregation: {
    formula: "last_during_period"
  },
  customerMapping: {
    eventPayloadKey: "user_stripe_id",
    type: "by_id"
  },
  valueSettings: {
    eventPayloadKey: "gb_used"
  }
});
```

## Inactive Meter

Create a meter that is initially inactive:

```ts
import { Meter } from "alchemy/stripe";

const inactiveFeatureMeter = await Meter("featureUsageMeter", {
  displayName: "Feature Usage",
  eventName: "feature.usage.recorded",
  status: "inactive",
  defaultAggregation: {
    formula: "sum"
  },
  customerMapping: {
    eventPayloadKey: "customer_id",
    type: "by_id"
  },
  valueSettings: {
    eventPayloadKey: "feature_count"
  }
});
```
