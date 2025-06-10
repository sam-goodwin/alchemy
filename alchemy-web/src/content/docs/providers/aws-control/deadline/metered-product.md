---
title: MeteredProduct
description: Learn how to create, update, and manage AWS Deadline MeteredProducts using Alchemy Cloud Control.
---


The MeteredProduct resource allows you to manage [AWS Deadline MeteredProducts](https://docs.aws.amazon.com/deadline/latest/userguide/) for licensing and tracking usage in your AWS infrastructure.

## Minimal Example

Create a basic MeteredProduct with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const meteredProduct = await AWS.Deadline.MeteredProduct("myMeteredProduct", {
  LicenseEndpointId: "license-endpoint-12345",
  ProductId: "product-67890"
});
```

## Advanced Configuration

Configure a MeteredProduct with additional optional properties such as adopting an existing resource:

```ts
const advancedMeteredProduct = await AWS.Deadline.MeteredProduct("advancedMeteredProduct", {
  LicenseEndpointId: "license-endpoint-54321",
  ProductId: "product-09876",
  adopt: true // Adopts the existing MeteredProduct instead of failing
});
```

## Usage Tracking

Create a MeteredProduct designed for usage tracking with specific identifiers:

```ts
const usageTrackingMeteredProduct = await AWS.Deadline.MeteredProduct("usageTrackingProduct", {
  LicenseEndpointId: "license-endpoint-11111",
  ProductId: "product-22222",
  adopt: false // This will throw an error if the resource already exists
});
```

## Resource Management

Manage your MeteredProduct over time by updating its properties:

```ts
const updatedMeteredProduct = await AWS.Deadline.MeteredProduct("updatedMeteredProduct", {
  LicenseEndpointId: "license-endpoint-33333",
  ProductId: "product-44444",
  adopt: true // Ensure it adopts if it exists
});
```
