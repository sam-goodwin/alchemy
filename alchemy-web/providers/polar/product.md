# Polar Product

The Polar Product resource allows you to create and manage products in your Polar organization.

## Usage

```typescript
import { Product } from "alchemy/polar";

// Create a product
const product = await Product("my-product", {
  name: "Premium Plan",
  description: "Access to premium features",
  isRecurring: true,
  metadata: {
    category: "subscription",
    tier: "premium"
  }
});

// Access product properties
console.log(product.id);
console.log(product.name);
console.log(product.prices);
```

## Properties

### Required

- `name` (string): The product name

### Optional

- `description` (string): Description of the product
- `isRecurring` (boolean): Whether this is a recurring product
- `isArchived` (boolean): Whether the product is archived
- `organizationId` (string): ID of the organization (usually auto-detected)
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Product resource returns all input properties plus:

- `id` (string): Unique identifier for the product
- `createdAt` (string): ISO timestamp when the product was created
- `modifiedAt` (string): ISO timestamp when the product was last modified
- `organizationId` (string): ID of the organization the product belongs to
- `prices` (array): Array of associated price objects

## API Reference

- [Get Product](https://docs.polar.sh/api-reference/products/get)
- [Create Product](https://docs.polar.sh/api-reference/products/create)
- [Update Product](https://docs.polar.sh/api-reference/products/update)
- [List Products](https://docs.polar.sh/api-reference/products/list)
