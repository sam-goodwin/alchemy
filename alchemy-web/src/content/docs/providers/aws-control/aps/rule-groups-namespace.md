---
title: RuleGroupsNamespace
description: Learn how to create, update, and manage AWS APS RuleGroupsNamespaces using Alchemy Cloud Control.
---


The RuleGroupsNamespace resource allows you to create and manage [AWS APS RuleGroupsNamespaces](https://docs.aws.amazon.com/aps/latest/userguide/) for organizing your rule groups in Amazon Prometheus Service.

## Minimal Example

Create a basic RuleGroupsNamespace with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const ruleGroupsNamespace = await AWS.APS.RuleGroupsNamespace("myRuleGroupsNamespace", {
  Data: "myNamespaceData",
  Tags: [{ Key: "Environment", Value: "Production" }],
  Workspace: "my-workspace-id",
  Name: "MyRuleGroupsNamespace"
});
```

## Advanced Configuration

Configure a RuleGroupsNamespace with additional properties such as adopting an existing resource.

```ts
const advancedRuleGroupsNamespace = await AWS.APS.RuleGroupsNamespace("advancedRuleGroupsNamespace", {
  Data: "advancedNamespaceData",
  Tags: [{ Key: "Team", Value: "DevOps" }],
  Workspace: "my-workspace-id",
  Name: "AdvancedRuleGroupsNamespace",
  adopt: true // Adopt existing resource
});
```

## Example with Multiple Tags

Create a RuleGroupsNamespace with multiple tags for better resource organization.

```ts
const taggedRuleGroupsNamespace = await AWS.APS.RuleGroupsNamespace("taggedRuleGroupsNamespace", {
  Data: "taggedNamespaceData",
  Tags: [
    { Key: "Project", Value: "Monitoring" },
    { Key: "Owner", Value: "TeamA" }
  ],
  Workspace: "my-workspace-id",
  Name: "TaggedRuleGroupsNamespace"
});
```

## Example with Custom Data

Demonstrate creating a RuleGroupsNamespace with custom data for specific namespace requirements.

```ts
const customDataRuleGroupsNamespace = await AWS.APS.RuleGroupsNamespace("customDataRuleGroupsNamespace", {
  Data: JSON.stringify({ key: "value", settings: { alertThreshold: 75 } }), // Custom JSON data
  Tags: [{ Key: "UseCase", Value: "Alerting" }],
  Workspace: "my-workspace-id",
  Name: "CustomDataNamespace"
});
```
