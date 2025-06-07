---
title: Managing AWS Glue Registrys with Alchemy
description: Learn how to create, update, and manage AWS Glue Registrys using Alchemy Cloud Control.
---

# Registry

The Registry resource lets you manage [AWS Glue Registrys](https://docs.aws.amazon.com/glue/latest/userguide/) that store metadata for your data assets.

## Minimal Example

Create a basic Glue Registry with a name and description.

```ts
import AWS from "alchemy/aws/control";

const basicRegistry = await AWS.Glue.Registry("BasicRegistry", {
  Name: "CustomerDataRegistry",
  Description: "Registry for customer data assets"
});
```

## Advanced Configuration

Create a Glue Registry with tags for better resource management.

```ts
const taggedRegistry = await AWS.Glue.Registry("TaggedRegistry", {
  Name: "SalesDataRegistry",
  Description: "Registry for sales data assets",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing Glue Registry if it already exists, preventing the creation failure.

```ts
const existingRegistry = await AWS.Glue.Registry("ExistingRegistry", {
  Name: "ExistingCustomerDataRegistry",
  Description: "Adopting existing customer data registry",
  adopt: true
});
```