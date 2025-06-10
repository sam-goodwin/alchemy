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
  product: "prod_xyz"
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
    usageType: "licensed"
  }
});
```

## Metered Usage Price

Create a metered price for usage-based billing:

```ts
import { Price } from "alchemy/stripe";

const meteredPrice = await Price("storage", {
  currency: "usd", 
  unitAmount: 25, // $0.25 per GB
  product: "prod_xyz",
  recurring: {
    interval: "month",
    usageType: "metered",
    aggregateUsage: "sum"
  }
});
```
