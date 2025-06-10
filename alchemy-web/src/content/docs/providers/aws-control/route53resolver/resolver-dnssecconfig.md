---
title: ResolverDNSSECConfig
description: Learn how to create, update, and manage AWS Route53Resolver ResolverDNSSECConfigs using Alchemy Cloud Control.
---


The ResolverDNSSECConfig resource allows you to manage DNSSEC configurations for Route 53 Resolver in AWS. This resource is crucial for ensuring the integrity and authenticity of DNS responses. For more information, refer to the [AWS Route53Resolver ResolverDNSSECConfigs](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic ResolverDNSSECConfig with the required properties:

```ts
import AWS from "alchemy/aws/control";

const resolverDnssecConfig = await AWS.Route53Resolver.ResolverDNSSECConfig("basicDnssecConfig", {
  ResourceId: "rslvr-12345678" // Replace with your actual Resource ID
});
```

## Advanced Configuration

Configure a ResolverDNSSECConfig with the option to adopt an existing resource:

```ts
const advancedResolverDnssecConfig = await AWS.Route53Resolver.ResolverDNSSECConfig("advancedDnssecConfig", {
  ResourceId: "rslvr-87654321", // Replace with your actual Resource ID
  adopt: true // This allows the adoption of an existing resource if it already exists
});
```

## Checking Configuration Properties

Retrieve additional properties such as ARN and timestamps after creation:

```ts
const dnssecConfigDetails = await AWS.Route53Resolver.ResolverDNSSECConfig("dnssecConfigDetails", {
  ResourceId: "rslvr-12345678"
});

// Use the ARN and timestamps for logging or monitoring
console.log(`ARN: ${dnssecConfigDetails.Arn}`);
console.log(`Created At: ${dnssecConfigDetails.CreationTime}`);
console.log(`Last Updated: ${dnssecConfigDetails.LastUpdateTime}`);
```
