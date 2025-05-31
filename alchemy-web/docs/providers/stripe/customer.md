---
title: Managing Stripe Customers with Alchemy
description: Learn how to create and manage Stripe Customers for billing relationships using Alchemy.
---

# Customer

The Customer resource lets you create and manage [Stripe Customers](https://stripe.com/docs/api/customers) for tracking billing relationships and payment information.

## Minimal Example

Create a basic customer:

```ts
import { Customer } from "alchemy/stripe";

const basicCustomer = await Customer("basic-customer", {
  email: "john@example.com",
  name: "John Doe",
  description: "Premium customer"
});
```

## Customer with Address

Create a customer with full address and shipping information:

```ts
import { Customer } from "alchemy/stripe";

const customerWithAddress = await Customer("customer-with-address", {
  email: "jane@example.com",
  name: "Jane Smith",
  phone: "+1-555-123-4567",
  address: {
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "US"
  },
  shipping: {
    name: "Jane Smith",
    address: {
      line1: "456 Oak Ave",
      city: "Oakland",
      state: "CA",
      postalCode: "94612",
      country: "US"
    }
  }
});
```

## Business Customer

Create a business customer with tax exemption:

```ts
import { Customer } from "alchemy/stripe";

const businessCustomer = await Customer("business-customer", {
  email: "billing@acmecorp.com",
  name: "Acme Corporation",
  description: "Enterprise customer",
  taxExempt: "exempt",
  invoicePrefix: "ACME",
  preferredLocales: ["en"],
  metadata: {
    type: "business",
    industry: "technology",
    employees: "500+"
  }
});
```
