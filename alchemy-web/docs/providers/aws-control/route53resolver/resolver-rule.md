---
title: Managing AWS Route53Resolver ResolverRules with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverRules using Alchemy Cloud Control.
---

# ResolverRule

The ResolverRule resource lets you create and manage [AWS Route53Resolver ResolverRules](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverrule = await AWS.Route53Resolver.ResolverRule("resolverrule-example", {
  RuleType: "example-ruletype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a resolverrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResolverRule = await AWS.Route53Resolver.ResolverRule("advanced-resolverrule", {
  RuleType: "example-ruletype",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

