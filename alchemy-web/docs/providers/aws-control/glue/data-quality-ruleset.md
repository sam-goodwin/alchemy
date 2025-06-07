---
title: Managing AWS Glue DataQualityRulesets with Alchemy
description: Learn how to create, update, and manage AWS Glue DataQualityRulesets using Alchemy Cloud Control.
---

# DataQualityRuleset

The DataQualityRuleset resource lets you create and manage [AWS Glue DataQualityRulesets](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-dataqualityruleset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataqualityruleset = await AWS.Glue.DataQualityRuleset("dataqualityruleset-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A dataqualityruleset resource managed by Alchemy",
});
```

## Advanced Configuration

Create a dataqualityruleset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataQualityRuleset = await AWS.Glue.DataQualityRuleset(
  "advanced-dataqualityruleset",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A dataqualityruleset resource managed by Alchemy",
  }
);
```

