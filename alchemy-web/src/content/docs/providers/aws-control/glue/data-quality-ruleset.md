---
title: DataQualityRuleset
description: Learn how to create, update, and manage AWS Glue DataQualityRulesets using Alchemy Cloud Control.
---


The DataQualityRuleset resource allows you to define and manage [AWS Glue DataQuality Rulesets](https://docs.aws.amazon.com/glue/latest/userguide/). These rulesets enable you to validate the quality of your data within AWS Glue.

## Minimal Example

Create a basic DataQualityRuleset with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const dataQualityRuleset = await AWS.Glue.DataQualityRuleset("basicDataQualityRuleset", {
  Ruleset: JSON.stringify([{ ruleName: "CheckNulls", ruleType: "NullCheck", targetColumn: "customer_id" }]),
  Description: "A basic ruleset to check for null values in customer_id.",
  TargetTable: {
    DatabaseName: "sales_db",
    TableName: "customers"
  },
  Name: "basic_ruleset"
});
```

## Advanced Configuration

Configure a DataQualityRuleset with additional properties for more complex validation rules.

```ts
const advancedDataQualityRuleset = await AWS.Glue.DataQualityRuleset("advancedDataQualityRuleset", {
  Ruleset: JSON.stringify([
    { ruleName: "CheckNulls", ruleType: "NullCheck", targetColumn: "customer_id" },
    { ruleName: "CheckEmailFormat", ruleType: "RegexCheck", targetColumn: "email", regex: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" }
  ]),
  Description: "An advanced ruleset to validate customer data quality.",
  TargetTable: {
    DatabaseName: "sales_db",
    TableName: "customers"
  },
  ClientToken: "unique-client-token-12345",
  Tags: {
    environment: "production",
    team: "data-quality"
  },
  Name: "advanced_ruleset"
});
```

## Using Existing Resources

Create a DataQualityRuleset that adopts an existing resource instead of failing if it already exists.

```ts
const adoptableDataQualityRuleset = await AWS.Glue.DataQualityRuleset("adoptableDataQualityRuleset", {
  Ruleset: JSON.stringify([{ ruleName: "CheckDuplicates", ruleType: "DuplicateCheck", targetColumn: "customer_email" }]),
  Description: "A ruleset that checks for duplicate emails.",
  TargetTable: {
    DatabaseName: "sales_db",
    TableName: "customers"
  },
  adopt: true,
  Name: "adoptable_ruleset"
});
```
