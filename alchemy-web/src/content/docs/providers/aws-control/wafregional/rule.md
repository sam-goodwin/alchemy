---
title: Rule
description: Learn how to create, update, and manage AWS WAFRegional Rules using Alchemy Cloud Control.
---


The Rule resource lets you manage [AWS WAFRegional Rules](https://docs.aws.amazon.com/wafregional/latest/userguide/) to control and filter web traffic to your applications.

## Minimal Example

Create a basic WAFRegional Rule with required properties, including a metric name and a name.

```ts
import AWS from "alchemy/aws/control";

const basicRule = await AWS.WAFRegional.Rule("basicRule", {
  Name: "BasicRule",
  MetricName: "BasicRuleMetric",
  Predicates: [] // No predicates defined
});
```

## Advanced Configuration

Configure a WAFRegional Rule with predicates to filter specific traffic patterns.

```ts
import AWS from "alchemy/aws/control";

const advancedRule = await AWS.WAFRegional.Rule("advancedRule", {
  Name: "AdvancedRule",
  MetricName: "AdvancedRuleMetric",
  Predicates: [
    {
      DataId: "exampleDataId",
      Negated: false,
      Type: "IPMatch"
    },
    {
      DataId: "anotherDataId",
      Negated: true,
      Type: "RegexMatch"
    }
  ]
});
```

## Adoption of Existing Resources

Create a WAFRegional Rule that adopts an existing resource instead of failing if it already exists.

```ts
import AWS from "alchemy/aws/control";

const existingRule = await AWS.WAFRegional.Rule("existingRule", {
  Name: "ExistingRule",
  MetricName: "ExistingRuleMetric",
  adopt: true // Adopt existing resource
});
```

## Rule with Multiple Predicates

Define a WAFRegional Rule with multiple predicates to enforce complex filtering logic.

```ts
import AWS from "alchemy/aws/control";

const complexRule = await AWS.WAFRegional.Rule("complexRule", {
  Name: "ComplexRule",
  MetricName: "ComplexRuleMetric",
  Predicates: [
    {
      DataId: "ipSetDataId",
      Negated: false,
      Type: "IPMatch"
    },
    {
      DataId: "sqlInjectionMatchSetId",
      Negated: false,
      Type: "SqlInjectionMatch"
    },
    {
      DataId: "xssMatchSetId",
      Negated: true,
      Type: "XssMatch"
    }
  ]
});
```
