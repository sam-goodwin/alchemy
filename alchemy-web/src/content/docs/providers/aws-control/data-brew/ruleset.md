---
title: Ruleset
description: Learn how to create, update, and manage AWS DataBrew Rulesets using Alchemy Cloud Control.
---


The Ruleset resource allows you to manage [AWS DataBrew Rulesets](https://docs.aws.amazon.com/databrew/latest/userguide/) for data quality checks and validation. With this resource, you can define rules that help ensure your data meets specific criteria before processing or analysis.

## Minimal Example

Create a simple Ruleset with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicRuleset = await AWS.DataBrew.Ruleset("basic-ruleset", {
  Name: "BasicDataQualityRules",
  TargetArn: "arn:aws:databrew:us-east-1:123456789012:dataset/sample-dataset",
  Rules: [
    {
      Name: "CheckForNulls",
      Condition: {
        Field: "customer_id",
        Operator: "is_null"
      },
      Action: {
        ActionType: "FAIL",
        Severity: "HIGH"
      }
    }
  ],
  Description: "A basic ruleset to check for null values in the customer ID."
});
```

## Advanced Configuration

Configure a Ruleset with multiple rules and tags for better management.

```ts
const advancedRuleset = await AWS.DataBrew.Ruleset("advanced-ruleset", {
  Name: "AdvancedDataQualityRules",
  TargetArn: "arn:aws:databrew:us-east-1:123456789012:dataset/advanced-dataset",
  Rules: [
    {
      Name: "CheckForNulls",
      Condition: {
        Field: "customer_id",
        Operator: "is_null"
      },
      Action: {
        ActionType: "FAIL",
        Severity: "HIGH"
      }
    },
    {
      Name: "CheckForDuplicates",
      Condition: {
        Field: "email",
        Operator: "is_duplicate"
      },
      Action: {
        ActionType: "WARN",
        Severity: "MEDIUM"
      }
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "DataQuality"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  Description: "An advanced ruleset for comprehensive data quality checks."
});
```

## Using Adoption Feature

Create a Ruleset that adopts an existing resource instead of failing.

```ts
const adoptableRuleset = await AWS.DataBrew.Ruleset("adoptable-ruleset", {
  Name: "AdoptableDataQualityRules",
  TargetArn: "arn:aws:databrew:us-east-1:123456789012:dataset/adoptable-dataset",
  Rules: [
    {
      Name: "CheckValueRange",
      Condition: {
        Field: "age",
        Operator: "is_in_range",
        Values: ["18", "65"]
      },
      Action: {
        ActionType: "WARN",
        Severity: "LOW"
      }
    }
  ],
  Description: "A ruleset that adopts existing resources.",
  adopt: true
});
```
