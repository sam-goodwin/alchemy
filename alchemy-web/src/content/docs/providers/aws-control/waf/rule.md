---
title: Rule
description: Learn how to create, update, and manage AWS WAF Rules using Alchemy Cloud Control.
---


The Rule resource allows you to manage [AWS WAF Rules](https://docs.aws.amazon.com/waf/latest/userguide/) for protecting your web applications from common web exploits.

## Minimal Example

Create a basic WAF Rule with required properties and one optional predicate:

```ts
import AWS from "alchemy/aws/control";

const basicRule = await AWS.WAF.Rule("basicWafRule", {
  name: "BasicWafRule",
  metricName: "BasicWafMetric",
  predicates: [
    {
      dataId: "examplePredicateId",
      negated: false,
      type: "IPMatch"
    }
  ]
});
```

## Advanced Configuration

Configure a WAF Rule with multiple predicates to define more complex matching conditions:

```ts
const advancedRule = await AWS.WAF.Rule("advancedWafRule", {
  name: "AdvancedWafRule",
  metricName: "AdvancedWafMetric",
  predicates: [
    {
      dataId: "exampleIPMatchId",
      negated: false,
      type: "IPMatch"
    },
    {
      dataId: "exampleSizeConstraintId",
      negated: true,
      type: "SizeConstraint"
    }
  ]
});
```

## Adoption of Existing Rules

If you want to adopt an existing WAF Rule instead of creating a new one, set the `adopt` property to true:

```ts
const adoptExistingRule = await AWS.WAF.Rule("adoptExistingWafRule", {
  name: "ExistingWafRule",
  metricName: "ExistingWafMetric",
  adopt: true
});
```

## Combining Multiple Conditions

Create a rule that combines multiple conditions with both IP and size constraints:

```ts
const combinedRule = await AWS.WAF.Rule("combinedWafRule", {
  name: "CombinedWafRule",
  metricName: "CombinedWafMetric",
  predicates: [
    {
      dataId: "exampleIPMatchId",
      negated: false,
      type: "IPMatch"
    },
    {
      dataId: "exampleSizeConstraintId",
      negated: false,
      type: "SizeConstraint"
    },
    {
      dataId: "exampleRegexPatternSetId",
      negated: true,
      type: "RegexMatch"
    }
  ]
});
```
