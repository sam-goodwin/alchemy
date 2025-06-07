---
title: Managing AWS GameLift MatchmakingRuleSets with Alchemy
description: Learn how to create, update, and manage AWS GameLift MatchmakingRuleSets using Alchemy Cloud Control.
---

# MatchmakingRuleSet

The MatchmakingRuleSet resource lets you create and manage [AWS GameLift MatchmakingRuleSets](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const matchmakingruleset = await AWS.GameLift.MatchmakingRuleSet("matchmakingruleset-example", {
  RuleSetBody: "example-rulesetbody",
  Name: "matchmakingruleset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a matchmakingruleset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMatchmakingRuleSet = await AWS.GameLift.MatchmakingRuleSet(
  "advanced-matchmakingruleset",
  {
    RuleSetBody: "example-rulesetbody",
    Name: "matchmakingruleset-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

