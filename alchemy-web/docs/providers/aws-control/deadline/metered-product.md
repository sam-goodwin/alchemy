---
title: Managing AWS Deadline MeteredProducts with Alchemy
description: Learn how to create, update, and manage AWS Deadline MeteredProducts using Alchemy Cloud Control.
---

# MeteredProduct

The MeteredProduct resource lets you manage [AWS Deadline MeteredProducts](https://docs.aws.amazon.com/deadline/latest/userguide/) and their configurations.

## Minimal Example

Create a basic MeteredProduct with required properties:

```ts
import AWS from "alchemy/aws/control";

const BasicMeteredProduct = await AWS.Deadline.MeteredProduct("BasicMeteredProduct", {
  LicenseEndpointId: "endpoint-1234",
  ProductId: "product-5678"
});
```

## Advanced Configuration

Configure a MeteredProduct with adoption of existing resources:

```ts
import AWS from "alchemy/aws/control";

const AdvancedMeteredProduct = await AWS.Deadline.MeteredProduct("AdvancedMeteredProduct", {
  LicenseEndpointId: "endpoint-4321",
  ProductId: "product-8765",
  adopt: true // Adopt existing resource if it exists
});
```

## Creating with Additional Attributes

Demonstrate creating a MeteredProduct while capturing additional attributes like ARN and creation time:

```ts
import AWS from "alchemy/aws/control";

const DetailedMeteredProduct = await AWS.Deadline.MeteredProduct("DetailedMeteredProduct", {
  LicenseEndpointId: "endpoint-9999",
  ProductId: "product-0001"
});

// Access additional properties
const { Arn, CreationTime, LastUpdateTime } = DetailedMeteredProduct;
console.log(`ARN: ${Arn}, Created At: ${CreationTime}, Last Updated At: ${LastUpdateTime}`);
```