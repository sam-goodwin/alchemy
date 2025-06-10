---
title: ShippingRate
description: Learn how to create and manage Stripe Shipping Rates for checkout and invoices using Alchemy.
---


The ShippingRate resource lets you create and manage [Stripe Shipping Rates](https://stripe.com/docs/api/shipping_rates) for calculating shipping costs in checkout sessions and invoices.

## Minimal Example

Create a standard shipping rate:

```ts
import { ShippingRate } from "alchemy/stripe";

const standardShipping = await ShippingRate("standard-shipping", {
  displayName: "Standard Shipping",
  type: "fixed_amount",
  fixedAmount: {
    amount: 500,
    currency: "usd"
  },
  deliveryEstimate: {
    minimum: { unit: "business_day", value: 5 },
    maximum: { unit: "business_day", value: 7 }
  }
});
```

## Express Shipping Rate

Create an express shipping option:

```ts
import { ShippingRate } from "alchemy/stripe";

const expressShipping = await ShippingRate("express-shipping", {
  displayName: "Express Shipping",
  type: "fixed_amount",
  fixedAmount: {
    amount: 1500,
    currency: "usd"
  },
  deliveryEstimate: {
    minimum: { unit: "business_day", value: 1 },
    maximum: { unit: "business_day", value: 2 }
  },
  taxBehavior: "exclusive",
  metadata: {
    priority: "high",
    service_level: "express"
  }
});
```

## Free Shipping Rate

Create a free shipping option:

```ts
import { ShippingRate } from "alchemy/stripe";

const freeShipping = await ShippingRate("free-shipping", {
  displayName: "Free Shipping",
  type: "fixed_amount",
  fixedAmount: {
    amount: 0,
    currency: "usd"
  },
  deliveryEstimate: {
    minimum: { unit: "business_day", value: 7 },
    maximum: { unit: "business_day", value: 10 }
  },
  metadata: {
    promotion: "free_shipping_over_50"
  }
});
```
