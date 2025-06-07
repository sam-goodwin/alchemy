# Polar Customer

The Polar Customer resource allows you to create and manage customers in your Polar organization.

## Usage

```typescript
import { Customer } from "alchemy/polar";

// Create a customer
const customer = await Customer("my-customer", {
  email: "customer@example.com",
  name: "John Doe",
  metadata: {
    source: "website",
    plan: "premium"
  }
});

// Access customer properties
console.log(customer.id);
console.log(customer.email);
console.log(customer.name);
```

## Properties

### Required

- `email` (string): The customer's email address

### Optional

- `name` (string): The customer's name
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Customer resource returns all input properties plus:

- `id` (string): Unique identifier for the customer
- `createdAt` (string): ISO timestamp when the customer was created
- `modifiedAt` (string): ISO timestamp when the customer was last modified
- `organizationId` (string): ID of the organization the customer belongs to

## API Reference

- [Get Customer](https://docs.polar.sh/api-reference/customers/get)
- [Create Customer](https://docs.polar.sh/api-reference/customers/create)
- [Update Customer](https://docs.polar.sh/api-reference/customers/update)
- [Delete Customer](https://docs.polar.sh/api-reference/customers/delete)
