---
title: MatchmakingRuleSet
description: Learn how to create, update, and manage AWS GameLift MatchmakingRuleSets using Alchemy Cloud Control.
---


The MatchmakingRuleSet resource allows you to define the rules and conditions for matchmaking in AWS GameLift, enabling you to create balanced game sessions for players. For more details, visit the [AWS GameLift MatchmakingRuleSets documentation](https://docs.aws.amazon.com/gamelift/latest/userguide/).

## Minimal Example

Create a basic matchmaking rule set with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicMatchmakingRuleSet = await AWS.GameLift.MatchmakingRuleSet("basicRuleSet", {
  Name: "BasicMatchmakingRules",
  RuleSetBody: JSON.stringify({
    Version: "1.0",
    Rules: [
      {
        Name: "SkillBasedMatch",
        Description: "Match players based on skill levels",
        Rule: {
          Type: "Matchmaking",
          Value: {
            Skill: {
              ComparisonType: "GreaterThan",
              Threshold: 1500
            }
          }
        }
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a matchmaking rule set with additional rules and tags for more complex matchmaking scenarios:

```ts
const advancedMatchmakingRuleSet = await AWS.GameLift.MatchmakingRuleSet("advancedRuleSet", {
  Name: "AdvancedMatchmakingRules",
  RuleSetBody: JSON.stringify({
    Version: "1.0",
    Rules: [
      {
        Name: "SkillBasedMatch",
        Description: "Match players based on skill levels",
        Rule: {
          Type: "Matchmaking",
          Value: {
            Skill: {
              ComparisonType: "Between",
              Minimum: 1200,
              Maximum: 1800
            }
          }
        }
      },
      {
        Name: "RegionMatch",
        Description: "Match players in the same region",
        Rule: {
          Type: "Matchmaking",
          Value: {
            Region: {
              ComparisonType: "Equals",
              Value: "us-west-2"
            }
          }
        }
      }
    ]
  }),
  Tags: [
    { Key: "Game", Value: "Battle Royale" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Special Use Case: Custom Matchmaking Logic

Create a matchmaking rule set that incorporates custom logic for matchmaking, such as party size and latency considerations:

```ts
const customMatchmakingRuleSet = await AWS.GameLift.MatchmakingRuleSet("customRuleSet", {
  Name: "CustomMatchmakingRules",
  RuleSetBody: JSON.stringify({
    Version: "1.0",
    Rules: [
      {
        Name: "PartySizeMatch",
        Description: "Match based on party size",
        Rule: {
          Type: "Matchmaking",
          Value: {
            PartySize: {
              ComparisonType: "Equals",
              Value: 4
            }
          }
        }
      },
      {
        Name: "LatencyMatch",
        Description: "Match players with low latency",
        Rule: {
          Type: "Matchmaking",
          Value: {
            Latency: {
              ComparisonType: "LessThan",
              Value: 100 // Latency in milliseconds
            }
          }
        }
      }
    ]
  }),
  Tags: [
    { Key: "Game", Value: "Team Shooter" },
    { Key: "Environment", Value: "Staging" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```
