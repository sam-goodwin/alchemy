---
title: Managing AWS Route53Resolver ResolverQueryLoggingConfigAssociations with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverQueryLoggingConfigAssociations using Alchemy Cloud Control.
---

# ResolverQueryLoggingConfigAssociation

The ResolverQueryLoggingConfigAssociation resource lets you create and manage [AWS Route53Resolver ResolverQueryLoggingConfigAssociations](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverqueryloggingconfigassociation =
  await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation(
    "resolverqueryloggingconfigassociation-example",
    {}
  );
```

