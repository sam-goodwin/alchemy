---
title: SchemaVersion
description: Learn how to create, update, and manage AWS Glue SchemaVersions using Alchemy Cloud Control.
---


The SchemaVersion resource allows you to manage [AWS Glue SchemaVersions](https://docs.aws.amazon.com/glue/latest/userguide/) for your data catalog. This resource provides capabilities to define and update the schema for your datasets.

## Minimal Example

Create a basic SchemaVersion with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const schemaVersion = await AWS.Glue.SchemaVersion("basicSchemaVersion", {
  SchemaDefinition: JSON.stringify({
    type: "record",
    name: "User",
    fields: [
      { name: "id", type: "int" },
      { name: "name", type: "string" },
      { name: "email", type: "string" }
    ]
  }),
  Schema: {
    Name: "UserSchema",
    Version: 1
  },
  adopt: true // Allows for adoption of an existing schema resource
});
```

## Advanced Configuration

Define a SchemaVersion with a more complex schema definition.

```ts
const advancedSchemaVersion = await AWS.Glue.SchemaVersion("advancedSchemaVersion", {
  SchemaDefinition: JSON.stringify({
    type: "record",
    name: "Order",
    fields: [
      { name: "orderId", type: "string" },
      { name: "userId", type: "int" },
      { name: "items", type: {
        type: "array",
        items: {
          type: "record",
          name: "Item",
          fields: [
            { name: "productId", type: "string" },
            { name: "quantity", type: "int" },
            { name: "price", type: "float" }
          ]
        }
      }},
      { name: "orderDate", type: "string" }
    ]
  }),
  Schema: {
    Name: "OrderSchema",
    Version: 2
  }
});
```

## Version Management

Create a new SchemaVersion to update an existing schema.

```ts
const updatedSchemaVersion = await AWS.Glue.SchemaVersion("updatedSchemaVersion", {
  SchemaDefinition: JSON.stringify({
    type: "record",
    name: "Order",
    fields: [
      { name: "orderId", type: "string" },
      { name: "userId", type: "int" },
      { name: "items", type: {
        type: "array",
        items: {
          type: "record",
          name: "Item",
          fields: [
            { name: "productId", type: "string" },
            { name: "quantity", type: "int" },
            { name: "price", type: "float" }
          ]
        }
      }},
      { name: "orderDate", type: "string" },
      { name: "status", type: "string" } // New field added in this version
    ]
  }),
  Schema: {
    Name: "OrderSchema",
    Version: 3
  }
});
```
