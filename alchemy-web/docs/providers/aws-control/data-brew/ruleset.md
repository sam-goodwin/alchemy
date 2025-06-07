---
title: Managing AWS DataBrew Rulesets with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Rulesets using Alchemy Cloud Control.
---

# Ruleset

The Ruleset resource lets you create and manage [AWS DataBrew Rulesets](https://docs.aws.amazon.com/databrew/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ruleset = await AWS.DataBrew.Ruleset("ruleset-example", {
  TargetArn: "example-targetarn",
  Rules: [],
  Name: "ruleset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A ruleset resource managed by Alchemy",
});
```

## Advanced Configuration

Create a ruleset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRuleset = await AWS.DataBrew.Ruleset("advanced-ruleset", {
  TargetArn: "example-targetarn",
  Rules: [],
  Name: "ruleset-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A ruleset resource managed by Alchemy",
});
```

