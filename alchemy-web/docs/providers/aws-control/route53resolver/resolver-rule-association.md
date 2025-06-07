---
title: Managing AWS Route53Resolver ResolverRuleAssociations with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverRuleAssociations using Alchemy Cloud Control.
---

# ResolverRuleAssociation

The ResolverRuleAssociation resource lets you create and manage [AWS Route53Resolver ResolverRuleAssociations](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverruleassociation = await AWS.Route53Resolver.ResolverRuleAssociation(
  "resolverruleassociation-example",
  { VPCId: "example-vpcid", ResolverRuleId: "example-resolverruleid" }
);
```

