---
title: RateBasedRule
description: Learn how to create, update, and manage AWS WAFRegional RateBasedRules using Alchemy Cloud Control.
---


The RateBasedRule resource allows you to create and manage [AWS WAFRegional RateBasedRules](https://docs.aws.amazon.com/wafregional/latest/userguide/), which help protect your applications from excessive requests from a single IP address.

## Minimal Example

Create a basic rate-based rule that limits requests from an IP address to 1000 requests per 5 minutes.

```ts
import AWS from "alchemy/aws/control";

const basicRateBasedRule = await AWS.WAFRegional.RateBasedRule("basicRateLimitRule", {
  name: "BasicRateLimitRule",
  metricName: "BasicRateLimit",
  rateLimit: 1000,
  rateKey: "IP",
  matchPredicates: [
    {
      type: "ByteMatch",
      dataId: "exampleByteMatchSetId",
      negated: false
    }
  ]
});
```

## Advanced Configuration

Configure a rate-based rule with a more complex matching condition using multiple predicates.

```ts
const advancedRateBasedRule = await AWS.WAFRegional.RateBasedRule("advancedRateLimitRule", {
  name: "AdvancedRateLimitRule",
  metricName: "AdvancedRateLimit",
  rateLimit: 2000,
  rateKey: "IP",
  matchPredicates: [
    {
      type: "ByteMatch",
      dataId: "exampleByteMatchSetId",
      negated: false
    },
    {
      type: "GeoMatch",
      dataId: "exampleGeoMatchSetId",
      negated: false
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing rate-based rule rather than failing if it already exists, you can set the `adopt` property to `true`.

```ts
const adoptExistingRule = await AWS.WAFRegional.RateBasedRule("existingRateLimitRule", {
  name: "ExistingRateLimitRule",
  metricName: "ExistingRateLimit",
  rateLimit: 500,
  rateKey: "IP",
  adopt: true
});
```

## Combining with Other AWS WAF Resources

Combine the RateBasedRule with other WAF resources for comprehensive protection.

```ts
const rateBasedRule = await AWS.WAFRegional.RateBasedRule("combinedRateLimitRule", {
  name: "CombinedRateLimitRule",
  metricName: "CombinedRateLimit",
  rateLimit: 1500,
  rateKey: "IP",
  matchPredicates: [
    {
      type: "ByteMatch",
      dataId: "exampleByteMatchSetId",
      negated: false
    }
  ]
});

const webAcl = await AWS.WAFRegional.WebACL("webAclWithRateLimit", {
  name: "WebAclWithRateLimit",
  defaultAction: {
    type: "ALLOW"
  },
  rules: [
    {
      action: {
        type: "BLOCK"
      },
      priority: 1,
      ruleId: rateBasedRule.id,
      type: "RATE_BASED_RULE"
    }
  ]
});
```
