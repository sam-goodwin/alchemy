---
title: ResolverRule
description: Learn how to create, update, and manage AWS Route53Resolver ResolverRules using Alchemy Cloud Control.
---


The ResolverRule resource allows you to manage [AWS Route53Resolver ResolverRules](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for DNS resolution configurations, enabling you to specify how DNS queries are resolved.

## Minimal Example

Create a basic ResolverRule with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResolverRule = await AWS.Route53Resolver.ResolverRule("basicResolverRule", {
  RuleType: "FORWARD",
  DomainName: "example.com",
  ResolverEndpointId: "re-1234567890abcdef",
  Name: "Example Rule"
});
```

## Advanced Configuration

Configure a ResolverRule with additional settings including target IP addresses and tags.

```ts
const advancedResolverRule = await AWS.Route53Resolver.ResolverRule("advancedResolverRule", {
  RuleType: "FORWARD",
  DomainName: "service.example.com",
  ResolverEndpointId: "re-0987654321fedcba",
  TargetIps: [
    { Ip: "192.0.2.1", Port: 53 },
    { Ip: "192.0.2.2", Port: 53 }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  Name: "Service Rule"
});
```

## Custom Rule for Specific Use Case

Create a ResolverRule specifically for a private hosted zone with a unique configuration.

```ts
const privateHostedZoneRule = await AWS.Route53Resolver.ResolverRule("privateHostedZoneRule", {
  RuleType: "SYSTEM",
  DomainName: "internal.example.com",
  Tags: [
    { Key: "UseCase", Value: "Internal Resolution" }
  ],
  Name: "Internal Rule"
});
```

## Conditional Rule Adoption

Demonstrate adopting an existing ResolverRule if it already exists, preventing failure.

```ts
const conditionalAdoptResolverRule = await AWS.Route53Resolver.ResolverRule("conditionalAdoptResolverRule", {
  RuleType: "FORWARD",
  DomainName: "adopted.example.com",
  ResolverEndpointId: "re-abcdef1234567890",
  adopt: true, // Allows adopting existing resource
  Name: "Adopted Rule"
});
```
