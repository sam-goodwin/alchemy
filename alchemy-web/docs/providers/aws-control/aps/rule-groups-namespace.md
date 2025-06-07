---
title: Managing AWS APS RuleGroupsNamespaces with Alchemy
description: Learn how to create, update, and manage AWS APS RuleGroupsNamespaces using Alchemy Cloud Control.
---

# RuleGroupsNamespace

The RuleGroupsNamespace resource lets you create and manage [AWS APS RuleGroupsNamespaces](https://docs.aws.amazon.com/aps/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-aps-rulegroupsnamespace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rulegroupsnamespace = await AWS.APS.RuleGroupsNamespace("rulegroupsnamespace-example", {
  Data: "example-data",
  Workspace: "example-workspace",
  Name: "rulegroupsnamespace-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a rulegroupsnamespace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRuleGroupsNamespace = await AWS.APS.RuleGroupsNamespace(
  "advanced-rulegroupsnamespace",
  {
    Data: "example-data",
    Workspace: "example-workspace",
    Name: "rulegroupsnamespace-",
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

