---
title: PromotionCode
description: Learn how to create and manage Stripe Promotion Codes for coupons using Alchemy.
---


The PromotionCode resource lets you create and manage [Stripe Promotion Codes](https://stripe.com/docs/api/promotion_codes) for distributing coupons to customers.

## Minimal Example

Create a basic promotion code:

```ts
import { PromotionCode } from "alchemy/stripe";

const basicPromoCode = await PromotionCode("summer-promo", {
  coupon: "SUMMER25",
  code: "SAVE25NOW",
  active: true
});
```

## Customer-Specific Promotion Code

Create a promotion code for a specific customer:

```ts
import { PromotionCode } from "alchemy/stripe";

const customerPromoCode = await PromotionCode("vip-discount", {
  coupon: "VIP15",
  code: "VIP15OFF",
  customer: "cus_xyz123",
  maxRedemptions: 1,
  expiresAt: Math.floor(Date.now() / 1000) + 86400 * 30,
  metadata: {
    type: "vip_exclusive",
    tier: "gold"
  }
});
```

## Promotion Code with Restrictions

Create a promotion code with usage restrictions:

```ts
import { PromotionCode } from "alchemy/stripe";

const restrictedPromoCode = await PromotionCode("first-time-buyer", {
  coupon: "WELCOME10",
  code: "FIRSTTIME10",
  restrictions: {
    firstTimeTransaction: true,
    minimumAmount: 5000,
    minimumAmountCurrency: "usd"
  },
  maxRedemptions: 1000,
  metadata: {
    campaign: "new_customer_acquisition",
    minimum_order: "50_usd"
  }
});
```
