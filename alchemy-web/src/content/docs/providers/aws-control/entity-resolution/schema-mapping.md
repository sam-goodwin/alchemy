---
title: SchemaMapping
description: Learn how to create, update, and manage AWS EntityResolution SchemaMappings using Alchemy Cloud Control.
---


The SchemaMapping resource allows you to create and manage AWS EntityResolution SchemaMappings, which define how input fields are mapped to a specific schema. For more details, visit the [AWS EntityResolution SchemaMappings documentation](https://docs.aws.amazon.com/entityresolution/latest/userguide/).

## Minimal Example

Create a basic SchemaMapping with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicSchemaMapping = await AWS.EntityResolution.SchemaMapping("basicSchemaMapping", {
  SchemaName: "CustomerData",
  MappedInputFields: [
    { InputField: "customerId", OutputField: "id" },
    { InputField: "customerName", OutputField: "name" }
  ],
  Description: "Basic mapping for customer data"
});
```

## Advanced Configuration

Configure a SchemaMapping with additional tags and an optional description:

```ts
const advancedSchemaMapping = await AWS.EntityResolution.SchemaMapping("advancedSchemaMapping", {
  SchemaName: "OrderData",
  MappedInputFields: [
    { InputField: "orderId", OutputField: "id" },
    { InputField: "orderAmount", OutputField: "amount" },
    { InputField: "orderDate", OutputField: "date" }
  ],
  Description: "Advanced mapping for order data",
  Tags: [
    { Key: "Project", Value: "ECommerce" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adopting Existing Resources

Create a SchemaMapping that adopts an existing resource if it already exists:

```ts
const adoptSchemaMapping = await AWS.EntityResolution.SchemaMapping("adoptSchemaMapping", {
  SchemaName: "ProductData",
  MappedInputFields: [
    { InputField: "productId", OutputField: "id" },
    { InputField: "productName", OutputField: "name" },
    { InputField: "productCategory", OutputField: "category" }
  ],
  adopt: true
});
```
