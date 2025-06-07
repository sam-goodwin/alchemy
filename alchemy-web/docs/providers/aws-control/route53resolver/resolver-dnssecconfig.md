---
title: Managing AWS Route53Resolver ResolverDNSSECConfigs with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverDNSSECConfigs using Alchemy Cloud Control.
---

# ResolverDNSSECConfig

The ResolverDNSSECConfig resource lets you create and manage [AWS Route53Resolver ResolverDNSSECConfigs](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverdnssecconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverdnssecconfig = await AWS.Route53Resolver.ResolverDNSSECConfig(
  "resolverdnssecconfig-example",
  {}
);
```

