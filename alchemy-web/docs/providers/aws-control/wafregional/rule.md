---
title: Managing AWS WAFRegional Rules with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you create and manage [AWS WAFRegional Rules](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-rule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rule = await AWS.WAFRegional.Rule("rule-example", {
  MetricName: "rule-metric",
  Name: "rule-",
});
```

