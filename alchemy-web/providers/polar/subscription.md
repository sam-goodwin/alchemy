# Polar Subscription

The Polar Subscription resource allows you to create and manage customer subscriptions in your Polar organization.

## Usage

```typescript
import { Subscription } from "alchemy/polar";

// Create a subscription
const subscription = await Subscription("my-subscription", {
  customerId: "customer_123",
  productId: "product_456",
  amount: 2999,
  currency: "USD",
  recurringInterval: "month",
  metadata: {
    source: "website",
    campaign: "summer2024"
  }
});

// Access subscription properties
console.log(subscription.id);
console.log(subscription.status);
console.log(subscription.currentPeriodEnd);
```

## Properties

### Required for Creation

- `customerId` (string): ID of the customer
- `productId` (string): ID of the product

### Optional

- `amount` (number): Subscription amount in cents
- `currency` (string): Currency code (e.g., "USD", "EUR")
- `recurringInterval` ("month" | "year"): Billing interval
- `status` (string): Subscription status
- `currentPeriodStart` (string): Start of current billing period
- `currentPeriodEnd` (string): End of current billing period
- `cancelAtPeriodEnd` (boolean): Whether to cancel at period end
- `startedAt` (string): When the subscription started
- `endedAt` (string): When the subscription ended
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Subscription resource returns all input properties plus:

- `id` (string): Unique identifier for the subscription
- `createdAt` (string): ISO timestamp when the subscription was created
- `modifiedAt` (string): ISO timestamp when the subscription was last modified

## API Reference

- [Get Subscription](https://docs.polar.sh/api-reference/subscriptions/get)
- [Create Subscription](https://docs.polar.sh/api-reference/subscriptions/create)
- [Update Subscription](https://docs.polar.sh/api-reference/subscriptions/update)
- [List Subscriptions](https://docs.polar.sh/api-reference/subscriptions/list)
