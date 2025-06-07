---
title: Managing AWS Glue CustomEntityTypes with Alchemy
description: Learn how to create, update, and manage AWS Glue CustomEntityTypes using Alchemy Cloud Control.
---

# CustomEntityType

The CustomEntityType resource allows you to define and manage custom entity types in AWS Glue, which can be used for entity recognition in data processing tasks. For more information, refer to the [AWS Glue CustomEntityTypes documentation](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

Create a basic CustomEntityType with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicCustomEntityType = await AWS.Glue.CustomEntityType("BasicCustomEntityType", {
  Name: "CustomerID",
  ContextWords: ["customer", "id"],
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a CustomEntityType with a regex string for more complex entity recognition.

```ts
const AdvancedCustomEntityType = await AWS.Glue.CustomEntityType("AdvancedCustomEntityType", {
  Name: "OrderNumber",
  ContextWords: ["order", "number"],
  RegexString: "^\\d{4}-\\d{3}-\\d{2}$", // Matches a format like 1234-567-89
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing CustomEntityType instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const AdoptedCustomEntityType = await AWS.Glue.CustomEntityType("AdoptedCustomEntityType", {
  Name: "ProductSKU",
  ContextWords: ["product", "sku"],
  adopt: true
});
```

## Entity Type with Multiple Context Words

Define a CustomEntityType that recognizes multiple context words for enhanced accuracy.

```ts
const MultiContextCustomEntityType = await AWS.Glue.CustomEntityType("MultiContextCustomEntityType", {
  Name: "EmployeeID",
  ContextWords: ["employee", "id", "staff", "identifier"],
  Tags: [
    { Key: "Environment", Value: "staging" }
  ]
});
```