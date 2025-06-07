---
title: Managing AWS Route53Resolver ResolverConfigs with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverConfigs using Alchemy Cloud Control.
---

# ResolverConfig

The ResolverConfig resource lets you create and manage [AWS Route53Resolver ResolverConfigs](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverconfig = await AWS.Route53Resolver.ResolverConfig("resolverconfig-example", {
  ResourceId: "example-resourceid",
  AutodefinedReverseFlag: "example-autodefinedreverseflag",
});
```

