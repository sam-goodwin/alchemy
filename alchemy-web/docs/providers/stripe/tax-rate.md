---
title: Managing Stripe Tax Rates with Alchemy
description: Learn how to create and manage Stripe Tax Rates for automatic tax calculations using Alchemy.
---

# TaxRate

The TaxRate resource lets you create and manage [Stripe Tax Rates](https://stripe.com/docs/api/tax_rates) for automatic tax calculations on invoices and checkout sessions.

## Minimal Example

Create a basic sales tax rate:

```ts
import { TaxRate } from "alchemy/stripe";

const salesTax = await TaxRate("ca-sales-tax", {
  displayName: "CA Sales Tax",
  percentage: 8.5,
  inclusive: false,
  active: true,
  country: "US",
  state: "CA"
});
```

## VAT Tax Rate

Create a VAT tax rate for European customers:

```ts
import { TaxRate } from "alchemy/stripe";

const vatTax = await TaxRate("uk-vat", {
  displayName: "UK VAT",
  percentage: 20.0,
  inclusive: true,
  active: true,
  country: "GB",
  description: "United Kingdom Value Added Tax",
  taxType: "vat",
  metadata: {
    region: "europe",
    tax_authority: "hmrc"
  }
});
```

## City Tax Rate

Create a local city tax rate:

```ts
import { TaxRate } from "alchemy/stripe";

const cityTax = await TaxRate("nyc-tax", {
  displayName: "NYC Local Tax",
  percentage: 4.5,
  inclusive: false,
  active: true,
  country: "US",
  state: "NY",
  jurisdiction: "New York City",
  description: "New York City local sales tax",
  taxType: "sales_tax",
  metadata: {
    locality: "nyc",
    tax_level: "city"
  }
});
```
