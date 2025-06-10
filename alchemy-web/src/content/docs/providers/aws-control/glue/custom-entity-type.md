---
title: CustomEntityType
description: Learn how to create, update, and manage AWS Glue CustomEntityTypes using Alchemy Cloud Control.
---


The CustomEntityType resource lets you manage [AWS Glue CustomEntityTypes](https://docs.aws.amazon.com/glue/latest/userguide/) for defining custom entities in your data catalog.

## Minimal Example

Create a basic custom entity type with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const customEntityType = await AWS.Glue.CustomEntityType("basicCustomEntity", {
  name: "Invoice",
  contextWords: ["invoice", "billing", "payment"],
  regexString: "INV[0-9]{5}"
});
```

## Advanced Configuration

Configure a custom entity type with additional properties such as tags.

```ts
const advancedCustomEntityType = await AWS.Glue.CustomEntityType("advancedCustomEntity", {
  name: "CustomerProfile",
  contextWords: ["customer", "profile", "user"],
  regexString: "CUST[0-9]{4}",
  tags: {
    department: "Finance",
    project: "CustomerInsights"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing resource instead of failing when the resource already exists, you can set the `adopt` property.

```ts
const adoptedCustomEntityType = await AWS.Glue.CustomEntityType("adoptedCustomEntity", {
  name: "ProductCatalog",
  contextWords: ["product", "catalog", "inventory"],
  regexString: "PROD[0-9]{6}",
  adopt: true
});
```
