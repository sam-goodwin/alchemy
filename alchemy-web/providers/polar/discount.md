# Polar Discount

The Polar Discount resource allows you to create and manage discount codes for your Polar products.

## Usage

```typescript
import { Discount } from "alchemy/polar";

// Create a percentage discount
const percentageDiscount = await Discount("summer-sale", {
  type: "percentage",
  amount: 25,
  name: "Summer Sale",
  code: "SUMMER25",
  startsAt: "2024-06-01T00:00:00Z",
  endsAt: "2024-08-31T23:59:59Z",
  maxRedemptions: 100,
  metadata: {
    campaign: "summer2024",
    category: "seasonal"
  }
});

// Create a fixed amount discount
const fixedDiscount = await Discount("new-customer", {
  type: "fixed",
  amount: 500,
  currency: "USD",
  name: "New Customer Discount",
  code: "WELCOME5",
  maxRedemptions: 50
});
```

## Properties

### Required

- `type` ("percentage" | "fixed"): Type of discount
- `amount` (number): Discount amount (percentage or cents)

### Optional

- `currency` (string): Currency code (required for fixed discounts)
- `name` (string): Display name for the discount
- `code` (string): Discount code customers can use
- `startsAt` (string): ISO timestamp when discount becomes active
- `endsAt` (string): ISO timestamp when discount expires
- `maxRedemptions` (number): Maximum number of times this discount can be used
- `redemptionsCount` (number): Current number of redemptions
- `organizationId` (string): ID of the organization (usually auto-detected)
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Discount resource returns all input properties plus:

- `id` (string): Unique identifier for the discount
- `createdAt` (string): ISO timestamp when the discount was created
- `modifiedAt` (string): ISO timestamp when the discount was last modified
- `organizationId` (string): ID of the organization the discount belongs to
- `redemptionsCount` (number): Current number of times the discount has been used

## Discount Types

### Percentage
Reduces the price by a percentage (e.g., 25% off).

### Fixed
Reduces the price by a fixed amount in the specified currency (e.g., $5 off).

## API Reference

- [Get Discount](https://docs.polar.sh/api-reference/discounts/get)
- [Create Discount](https://docs.polar.sh/api-reference/discounts/create)
- [Update Discount](https://docs.polar.sh/api-reference/discounts/update)
- [List Discounts](https://docs.polar.sh/api-reference/discounts/list)
