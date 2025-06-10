---
title: ResolverEndpoint
description: Learn how to create, update, and manage AWS Route53Resolver ResolverEndpoints using Alchemy Cloud Control.
---


The ResolverEndpoint resource lets you manage [AWS Route53Resolver ResolverEndpoints](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for handling DNS queries in a hybrid environment or between Amazon VPCs.

## Minimal Example

Create a basic ResolverEndpoint with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResolverEndpoint = await AWS.Route53Resolver.ResolverEndpoint("basicResolverEndpoint", {
  IpAddresses: [
    {
      Ip: "192.0.2.1",
      Port: 53
    }
  ],
  Direction: "OUTBOUND",
  SecurityGroupIds: ["sg-1234567890abcdef0"],
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a ResolverEndpoint with multiple IP addresses and additional settings.

```ts
const advancedResolverEndpoint = await AWS.Route53Resolver.ResolverEndpoint("advancedResolverEndpoint", {
  IpAddresses: [
    {
      Ip: "192.0.2.2",
      Port: 53
    },
    {
      Ip: "192.0.2.3",
      Port: 53
    }
  ],
  Protocols: ["UDP", "TCP"],
  SecurityGroupIds: ["sg-abcdef1234567890"],
  OutpostArn: "arn:aws:outposts:us-east-1:123456789012:outpost/op-1234567890abcdef0",
  Name: "AdvancedResolverEndpoint"
});
```

## Using Preferred Instance Type

Create a ResolverEndpoint that specifies a preferred instance type.

```ts
const preferredInstanceTypeResolverEndpoint = await AWS.Route53Resolver.ResolverEndpoint("preferredInstanceTypeResolverEndpoint", {
  IpAddresses: [
    {
      Ip: "203.0.113.4",
      Port: 53
    }
  ],
  Direction: "INBOUND",
  SecurityGroupIds: ["sg-0abcdef1234567890"],
  PreferredInstanceType: "r5.large",
  Tags: [
    {
      Key: "Project",
      Value: "Migration"
    }
  ]
});
```

## Adopting Existing Resources

Create a ResolverEndpoint that adopts an existing resource if it already exists.

```ts
const adoptExistingResolverEndpoint = await AWS.Route53Resolver.ResolverEndpoint("adoptExistingResolverEndpoint", {
  IpAddresses: [
    {
      Ip: "198.51.100.5",
      Port: 53
    }
  ],
  Direction: "OUTBOUND",
  SecurityGroupIds: ["sg-0987654321fedcba0"],
  adopt: true
});
```
