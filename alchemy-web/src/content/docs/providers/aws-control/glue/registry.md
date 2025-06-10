---
title: Registry
description: Learn how to create, update, and manage AWS Glue Registrys using Alchemy Cloud Control.
---


The Registry resource lets you manage [AWS Glue Registrys](https://docs.aws.amazon.com/glue/latest/userguide/) for organizing and managing schemas in AWS Glue Data Catalog.

## Minimal Example

Create a basic registry with a name and description.

```ts
import AWS from "alchemy/aws/control";

const basicRegistry = await AWS.Glue.Registry("basic-registry", {
  name: "MyDataRegistry",
  description: "This registry holds schemas for my data assets."
});
```

## Advanced Configuration

Configure a registry with tags for better management and organization.

```ts
const taggedRegistry = await AWS.Glue.Registry("tagged-registry", {
  name: "MyTaggedDataRegistry",
  description: "This registry holds schemas for my data assets with tags.",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "Finance" }
  ]
});
```

## Adoption of Existing Registry

Adopt an existing registry instead of failing if it already exists.

```ts
const adoptRegistry = await AWS.Glue.Registry("adopt-registry", {
  name: "ExistingDataRegistry",
  description: "This registry will adopt an existing resource.",
  adopt: true
});
```
