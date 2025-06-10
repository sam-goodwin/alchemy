---
title: WebACL
description: Learn how to create, update, and manage AWS WAFRegional WebACLs using Alchemy Cloud Control.
---


The WebACL resource lets you manage [AWS WAFRegional WebACLs](https://docs.aws.amazon.com/wafregional/latest/userguide/) for controlling access to your web applications.

## Minimal Example

Create a basic WebACL with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicWebACL = await AWS.WAFRegional.WebACL("basicWebACL", {
  name: "basic-web-acl",
  metricName: "BasicWebACLMetric",
  defaultAction: {
    type: "ALLOW" // Default action to allow requests
  }
});
```

## Advanced Configuration

Configure a WebACL with rules and an explicit default action.

```ts
const advancedWebACL = await AWS.WAFRegional.WebACL("advancedWebACL", {
  name: "advanced-web-acl",
  metricName: "AdvancedWebACLMetric",
  defaultAction: {
    type: "BLOCK" // Block requests by default
  },
  rules: [{
    priority: 1,
    ruleId: "exampleRuleId",
    action: {
      type: "ALLOW" // Allow requests matching the rule
    },
    type: "REGULAR"
  }]
});
```

## Adding Multiple Rules

Demonstrate how to add multiple rules to a WebACL.

```ts
const multiRuleWebACL = await AWS.WAFRegional.WebACL("multiRuleWebACL", {
  name: "multi-rule-web-acl",
  metricName: "MultiRuleWebACLMetric",
  defaultAction: {
    type: "ALLOW"
  },
  rules: [
    {
      priority: 1,
      ruleId: "exampleRuleId1",
      action: {
        type: "BLOCK"
      },
      type: "REGULAR"
    },
    {
      priority: 2,
      ruleId: "exampleRuleId2",
      action: {
        type: "ALLOW"
      },
      type: "REGULAR"
    }
  ]
});
```

## Adoption of Existing Resources

Use the adopt feature to manage an existing WebACL without failing if it already exists.

```ts
const adoptedWebACL = await AWS.WAFRegional.WebACL("adoptedWebACL", {
  name: "adopted-web-acl",
  metricName: "AdoptedWebACLMetric",
  defaultAction: {
    type: "ALLOW"
  },
  adopt: true // Adopt existing resource if it exists
});
```
