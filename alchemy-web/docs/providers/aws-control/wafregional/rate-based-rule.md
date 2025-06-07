---
title: Managing AWS WAFRegional RateBasedRules with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional RateBasedRules using Alchemy Cloud Control.
---

# RateBasedRule

The RateBasedRule resource lets you create and manage [AWS WAFRegional RateBasedRules](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-ratebasedrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ratebasedrule = await AWS.WAFRegional.RateBasedRule("ratebasedrule-example", {
  MetricName: "ratebasedrule-metric",
  RateLimit: 1,
  RateKey: "example-ratekey",
  Name: "ratebasedrule-",
});
```

