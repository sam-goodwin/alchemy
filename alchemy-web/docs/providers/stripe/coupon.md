---
title: Managing Stripe Coupons with Alchemy
description: Learn how to create and manage Stripe Coupons for discounts using Alchemy.
---

# Coupon

The Coupon resource lets you create and manage [Stripe Coupons](https://stripe.com/docs/api/coupons) for applying discounts to customers and subscriptions.

## Minimal Example

Create a percentage-based coupon:

```ts
import { Coupon } from "alchemy/stripe";

const percentageCoupon = await Coupon("summer-sale", {
  id: "SUMMER25",
  duration: "once",
  percentOff: 25,
  name: "Summer Sale 25% Off"
});
```

## Fixed Amount Coupon

Create a fixed amount discount coupon:

```ts
import { Coupon } from "alchemy/stripe";

const fixedAmountCoupon = await Coupon("new-customer", {
  id: "WELCOME10",
  duration: "once",
  amountOff: 1000,
  currency: "usd",
  name: "Welcome $10 Off",
  metadata: {
    type: "welcome",
    target: "new_customers"
  }
});
```

## Repeating Coupon

Create a repeating coupon for subscriptions:

```ts
import { Coupon } from "alchemy/stripe";

const subscriptionCoupon = await Coupon("loyal-customer", {
  id: "LOYAL15",
  duration: "repeating",
  durationInMonths: 6,
  percentOff: 15,
  name: "Loyal Customer 15% Off",
  maxRedemptions: 100,
  metadata: {
    type: "loyalty",
    tier: "premium"
  }
});
```
