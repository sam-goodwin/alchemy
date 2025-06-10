---
title: ResolverConfig
description: Learn how to create, update, and manage AWS Route53Resolver ResolverConfigs using Alchemy Cloud Control.
---


The ResolverConfig resource allows you to manage [AWS Route53Resolver ResolverConfigs](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for configuring DNS resolution in your AWS environment.

## Minimal Example

Create a basic ResolverConfig with required properties.

```ts
import AWS from "alchemy/aws/control";

const resolverConfig = await AWS.Route53Resolver.ResolverConfig("basicResolverConfig", {
  ResourceId: "rslvr-12345678",
  AutodefinedReverseFlag: "ENABLED"
});
```

## Advanced Configuration

Adopt an existing ResolverConfig by setting the adopt property.

```ts
const existingResolverConfig = await AWS.Route53Resolver.ResolverConfig("existingResolverConfig", {
  ResourceId: "rslvr-87654321",
  AutodefinedReverseFlag: "DISABLED",
  adopt: true
});
```

## Custom Reverse DNS Configuration

Create a ResolverConfig with specific reverse DNS settings.

```ts
const customReverseResolverConfig = await AWS.Route53Resolver.ResolverConfig("customReverseResolverConfig", {
  ResourceId: "rslvr-11223344",
  AutodefinedReverseFlag: "ENABLED"
});
```

## Retrieve Configuration Details

Retrieve the ARN and creation time of a ResolverConfig.

```ts
const resolverConfigDetails = await AWS.Route53Resolver.ResolverConfig("resolverConfigDetails", {
  ResourceId: "rslvr-55667788",
  AutodefinedReverseFlag: "DISABLED"
});

console.log(`ResolverConfig ARN: ${resolverConfigDetails.Arn}`);
console.log(`Created at: ${resolverConfigDetails.CreationTime}`);
```
