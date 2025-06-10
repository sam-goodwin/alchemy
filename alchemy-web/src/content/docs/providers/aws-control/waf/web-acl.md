---
title: WebACL
description: Learn how to create, update, and manage AWS WAF WebACLs using Alchemy Cloud Control.
---


The WebACL resource lets you manage [AWS WAF WebACLs](https://docs.aws.amazon.com/waf/latest/userguide/) to control web traffic to your applications. A WebACL defines a set of rules that are evaluated for each incoming request.

## Minimal Example

Create a basic WebACL with a default action and a metric name:

```ts
import AWS from "alchemy/aws/control";

const webACL = await AWS.WAF.WebACL("basicWebACL", {
  defaultAction: {
    type: "ALLOW"
  },
  metricName: "basicWebACLMetric",
  name: "BasicWebACL"
});
```

## Advanced Configuration

Configure a WebACL with rules to block specific IP addresses:

```ts
import AWS from "alchemy/aws/control";

const blockedIPs = await AWS.WAF.WebACL("advancedWebACL", {
  defaultAction: {
    type: "BLOCK"
  },
  metricName: "advancedWebACLMetric",
  name: "AdvancedWebACL",
  rules: [
    {
      priority: 1,
      ruleId: "ipBlockRule",
      action: {
        type: "BLOCK"
      },
      type: "RULE_GROUP"
    }
  ]
});
```

## Custom Rules Example

Create a WebACL that includes a custom rule to rate limit requests:

```ts
import AWS from "alchemy/aws/control";

const rateLimitWebACL = await AWS.WAF.WebACL("rateLimitWebACL", {
  defaultAction: {
    type: "ALLOW"
  },
  metricName: "rateLimitMetric",
  name: "RateLimitWebACL",
  rules: [
    {
      priority: 1,
      ruleId: "rateLimitRule",
      action: {
        type: "COUNT"
      },
      type: "RATE_BASED_RULE",
      rateLimit: 2000 // Limit to 2000 requests per 5 minutes
    }
  ]
});
```

## Example with Adopt Option

Create a WebACL while adopting an existing resource if it already exists:

```ts
import AWS from "alchemy/aws/control";

const adoptedWebACL = await AWS.WAF.WebACL("adoptedWebACL", {
  defaultAction: {
    type: "ALLOW"
  },
  metricName: "adoptedWebACLMetric",
  name: "AdoptedWebACL",
  adopt: true // Adopt existing resource instead of failing
});
```
