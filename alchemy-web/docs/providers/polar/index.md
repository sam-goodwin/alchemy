---
title: Managing Polar.sh Resources with Alchemy
description: Learn how to create and manage customers, products, subscriptions, and more with the Polar.sh provider for Alchemy.
---

# Polar Provider

The Polar provider lets you create and manage [Polar.sh](https://polar.sh) resources for SaaS billing, customer management, and subscription services using Alchemy.

## Quick Start

```ts
import { Customer, Product, Subscription } from "alchemy/polar";

// Create a customer
const customer = await Customer("my-customer", {
  email: "customer@example.com",
  name: "John Doe"
});

// Create a product
const product = await Product("premium-plan", {
  name: "Premium Plan",
  description: "Access to premium features",
  isRecurring: true
});

// Create a subscription
const subscription = await Subscription("customer-subscription", {
  customer: customer.id,
  product: product.id
});
```

## Authentication

Set your Polar API key as an environment variable:

```bash
export POLAR_API_KEY="your_polar_api_key_here"
```

Or pass it explicitly to any resource:

```ts
import alchemy from "alchemy";
import { Customer } from "alchemy/polar";

const customer = await Customer("my-customer", {
  email: "customer@example.com",
  apiKey: alchemy.secret("POLAR_API_KEY")
});
```

## Environment Support

The Polar provider supports both production and sandbox environments:

```ts
// Production (default)
const prodCustomer = await Customer("prod-customer", {
  email: "customer@example.com",
  environment: "production" // or omit for default
});

// Sandbox
const sandboxCustomer = await Customer("sandbox-customer", {
  email: "test@example.com", 
  environment: "sandbox"
});
```

## Core Resources

### Customer Management

Manage customer accounts and billing relationships:

```ts
import { Customer } from "alchemy/polar";

const customer = await Customer("business-customer", {
  email: "billing@acme.com",
  name: "Acme Corporation",
  metadata: {
    type: "business",
    plan: "enterprise"
  }
});
```

### Product Catalog

Create and manage products with flexible pricing:

```ts
import { Product } from "alchemy/polar";

// Recurring subscription product
const recurringProduct = await Product("monthly-plan", {
  name: "Monthly Premium",
  description: "Premium features billed monthly",
  isRecurring: true
});

// One-time purchase product
const oneTimeProduct = await Product("setup-fee", {
  name: "Setup Fee", 
  description: "One-time setup fee",
  isRecurring: false
});
```

### Subscription Billing

Handle recurring subscriptions with flexible billing intervals:

```ts
import { Subscription } from "alchemy/polar";

const subscription = await Subscription("premium-subscription", {
  customer: customer.id,
  product: product.id,
  recurringInterval: "month",
  currentPeriodStart: new Date().toISOString(),
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
});
```

### Usage Metering

Track and meter usage events for billing:

```ts
import { Meter } from "alchemy/polar";

const apiMeter = await Meter("api-usage", {
  name: "API Usage Meter",
  filter: {
    conjunction: "and",
    clauses: [
      { property: "event_type", operator: "eq", value: "api_call" }
    ]
  },
  aggregation: { type: "count" }
});
```

### Customer Benefits

Manage customer perks and benefits:

```ts
import { Benefit } from "alchemy/polar";

const discordBenefit = await Benefit("discord-access", {
  type: "discord",
  description: "Access to premium Discord server",
  isSelectable: true,
  properties: {
    guildId: "123456789",
    roleId: "987654321"
  }
});
```

### Discount Management

Create discount codes for promotions:

```ts
import { Discount } from "alchemy/polar";

const percentageDiscount = await Discount("summer-sale", {
  type: "percentage",
  name: "Summer Sale",
  basisPoints: 2500, // 25% discount
  code: "SUMMER25"
});

const fixedDiscount = await Discount("new-customer", {
  type: "fixed",
  name: "New Customer Discount",
  amount: 1000, // $10.00 discount
  code: "WELCOME10"
});
```

### Order Processing

Process one-time orders:

```ts
import { Order } from "alchemy/polar";

const order = await Order("customer-order", {
  customer: customer.id,
  product: product.id,
  amount: 5000, // $50.00
  currency: "USD"
});
```

### Organization Settings

Manage your organization configuration:

```ts
import { Organization } from "alchemy/polar";

const organization = await Organization("my-org", {
  name: "Acme Corporation",
  avatarUrl: "https://example.com/logo.png",
  defaultUpfrontSplitToCreators: 80
});
```

## Resource Reference

| Resource | Description | Use Case |
|----------|-------------|----------|
| [Customer](./customer.md) | Customer account management | Track billing relationships |
| [Product](./product.md) | Product catalog management | Define subscription plans and one-time products |
| [Subscription](./subscription.md) | Recurring billing management | Handle subscription lifecycles |
| [Order](./order.md) | One-time purchase processing | Process individual sales |
| [Meter](./meter.md) | Usage tracking and metering | Bill based on API usage or consumption |
| [Benefit](./benefit.md) | Customer perks and rewards | Manage Discord, GitHub, and custom benefits |
| [Discount](./discount.md) | Promotional pricing | Create coupon codes and discounts |
| [Organization](./organization.md) | Account settings | Configure organization-level settings |

## Learn More

- [Polar.sh Documentation](https://docs.polar.sh/)
- [Polar.sh API Reference](https://docs.polar.sh/api-reference/)
- [Polar.sh Dashboard](https://polar.sh/dashboard)