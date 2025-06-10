---
title: Product
description: Learn how to create and manage Stripe Products and SKUs using Alchemy for your e-commerce or subscription service.
---


The Product resource lets you create and manage [Stripe Products](https://stripe.com/docs/api/products) for your Stripe account.

## Minimal Example

Create a basic digital product:

```ts
import { Product } from "alchemy/stripe";

const product = await Product("basic-software", {
  name: "Basic Software License",
  description: "Single-user license for basic software package"
});
```

## Physical Product

Create a physical product with shipping details:

```ts
import { Product } from "alchemy/stripe";

const product = await Product("premium-hardware", {
  name: "Premium Hardware Kit", 
  description: "Complete hardware kit with premium components",
  shippable: true,
  images: ["https://example.com/hardware-kit.jpg"],
  unitLabel: "kit",
  statementDescriptor: "PREMIUM HW KIT"
});
```

## Service Product

Create a service product with tax code:

```ts
import { Product } from "alchemy/stripe";

const product = await Product("consulting", {
  name: "Professional Consulting",
  description: "Expert consulting services", 
  type: "service",
  taxCode: "txcd_10000000",
  metadata: {
    industry: "technology",
    expertise: "cloud"
  }
});
```
