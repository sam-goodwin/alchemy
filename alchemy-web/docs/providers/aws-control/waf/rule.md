---
title: Managing AWS WAF Rules with Alchemy
description: Learn how to create, update, and manage AWS WAF Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you create and manage [AWS WAF Rules](https://docs.aws.amazon.com/waf/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-waf-rule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rule = await AWS.WAF.Rule("rule-example", { MetricName: "rule-metric", Name: "rule-" });
```

