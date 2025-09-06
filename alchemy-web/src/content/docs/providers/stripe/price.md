---
title: Price
description: Learn how to create and manage Stripe Prices for your products and subscriptions using Alchemy.
---

The Price resource lets you create and manage [Stripe Prices](https://stripe.com/docs/api/prices) for products.

## Minimal Example

Create a one-time fixed price for a product:

```ts
import { Price } from "alchemy/stripe";

const price = await Price("basic-license", {
  currency: "usd",
  unitAmount: 2999, // $29.99
  product: "prod_xyz",
});
```

## Recurring Subscription Price

Create a recurring subscription price with fixed monthly billing:

```ts
import { Price } from "alchemy/stripe";

const subscriptionPrice = await Price("pro-monthly", {
  currency: "usd",
  unitAmount: 1499, // $14.99/month
  product: "prod_xyz",
  recurring: {
    interval: "month",
    usageType: "licensed",
  },
});
```

## Metered Usage Price

Create a metered price for usage-based billing:

```ts
import { Price, Meter } from "alchemy/stripe";

const storageUsageMeter = await Meter("storageUsageMeter", {
  displayName: "Storage Usage",
  eventName: "storage.usage.recorded",
  defaultAggregation: {
    formula: "sum",
  },
  customerMapping: {
    type: "by_id",
  },
  valueSettings: {
    eventPayloadKey: "gigabytes",
  },
});

const meteredPrice = await Price("storage", {
  currency: "usd",
  unitAmount: 25, // $0.25 per GB
  product: "prod_xyz",
  recurring: {
    interval: "month",
    usageType: "metered",
    aggregateUsage: "sum",
		meter: storageUsageMeter,
  },
});
```

## Tiered Pricing

### Graduated Tiers

With graduated tiered pricing, different portions of usage are charged at different rates:

```ts
import { Price, Meter } from "alchemy/stripe";

const apiUsageMeter = await Meter("apiUsageMeter", {
  displayName: "API Usage",
  eventName: "api.call.made",
  defaultAggregation: {
    formula: "sum",
  },
  customerMapping: {
    type: "by_id",
  },
  valueSettings: {
    eventPayloadKey: "calls",
  },
});

const apiUsagePrice = await Price("api-usage", {
  currency: "usd",
  product: "prod_xyz",
  billingScheme: "tiered",
  tiersMode: "graduated",
  recurring: {
    interval: "month",
    usageType: "metered",
    meter: apiUsageMeter,
  },
  tiers: [
    {
      upTo: 10000,
      unitAmount: 0, // First 10k API calls free
    },
    {
      upTo: 50000,
      unitAmount: 2, // $0.02 per call from 10k-50k
    },
    {
      upTo: "inf",
      unitAmount: 1, // $0.01 per call beyond 50k
    },
  ],
});
```

### Volume-Based Tiers

With volume-based pricing, the total quantity determines the rate for ALL units:

```ts
import { Price } from "alchemy/stripe";

const storagePrice = await Price("storage-volume", {
  currency: "usd",
  product: "prod_xyz",
  billingScheme: "tiered",
  tiersMode: "volume",
  recurring: {
    interval: "month",
  },
  tiers: [
    {
      upTo: 100,
      unitAmount: 500, // $5 per GB for up to 100GB total
    },
    {
      upTo: 1000,
      unitAmount: 400, // $4 per GB for 101-1000GB total
    },
    {
      upTo: "inf",
      unitAmount: 300, // $3 per GB for over 1000GB total
    },
  ],
});
```

### Overage Cap with Flat Amount

Protect customers from bill shock with a flat fee cap:

```ts
import { Price, Meter } from "alchemy/stripe";

const cappedApiUsageMeter = await Meter("cappedApiUsageMeter", {
  displayName: "Capped API Usage",
  eventName: "api.call.capped",
  defaultAggregation: {
    formula: "sum",
  },
  customerMapping: {
    type: "by_id",
  },
  valueSettings: {
    eventPayloadKey: "calls",
  },
});

const cappedUsagePrice = await Price("api-calls-capped", {
  currency: "usd",
  product: "prod_xyz",
  billingScheme: "tiered",
  tiersMode: "graduated",
  recurring: {
    interval: "month",
    usageType: "metered",
    meter: cappedApiUsageMeter,
  },
  tiers: [
    {
      upTo: 100000,
      unitAmount: 1, // $0.01 per call up to 100k
    },
    {
      upTo: "inf",
      flatAmount: 100000, // Cap at $1000 for unlimited usage
    },
  ],
});
```

**Note**: Meters can only be associated with prices that have `recurring.usageType = 'metered'`.
