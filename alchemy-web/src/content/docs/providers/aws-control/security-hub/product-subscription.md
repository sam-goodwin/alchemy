---
title: ProductSubscription
description: Learn how to create, update, and manage AWS SecurityHub ProductSubscriptions using Alchemy Cloud Control.
---


The ProductSubscription resource allows you to manage subscriptions for AWS SecurityHub products, enabling you to receive alerts and insights from various security services. For more information, refer to the [AWS SecurityHub ProductSubscriptions documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/).

## Minimal Example

Create a ProductSubscription with the required ProductArn property.

```ts
import AWS from "alchemy/aws/control";

const productSubscription = await AWS.SecurityHub.ProductSubscription("myProductSubscription", {
  ProductArn: "arn:aws:securityhub:us-east-1:123456789012:product/my-product",
  adopt: true // If true, adopts the existing resource if it already exists
});
```

## Advanced Configuration

Configure a ProductSubscription with additional properties for enhanced management.

```ts
const advancedProductSubscription = await AWS.SecurityHub.ProductSubscription("advancedProductSubscription", {
  ProductArn: "arn:aws:securityhub:us-east-1:123456789012:product/my-advanced-product",
  adopt: false // Default is false, will fail if the resource already exists
});
```

## Handling Subscription Updates

Handle updates to an existing ProductSubscription, ensuring you maintain current configurations.

```ts
const updateProductSubscription = await AWS.SecurityHub.ProductSubscription("updateProductSubscription", {
  ProductArn: "arn:aws:securityhub:us-east-1:123456789012:product/my-updated-product",
  adopt: true // Adopt existing resource if already present
});
```

## Monitoring Subscription Details

Retrieve details about the created ProductSubscription to verify its configuration.

```ts
const subscriptionDetails = await AWS.SecurityHub.ProductSubscription("subscriptionDetails", {
  ProductArn: "arn:aws:securityhub:us-east-1:123456789012:product/my-product"
});

// Accessing additional properties after creation
console.log(`Subscription ARN: ${subscriptionDetails.Arn}`);
console.log(`Created at: ${subscriptionDetails.CreationTime}`);
console.log(`Last updated at: ${subscriptionDetails.LastUpdateTime}`);
```
