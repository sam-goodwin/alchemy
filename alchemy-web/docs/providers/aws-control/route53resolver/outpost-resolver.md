---
title: Managing AWS Route53Resolver OutpostResolvers with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver OutpostResolvers using Alchemy Cloud Control.
---

# OutpostResolver

The OutpostResolver resource lets you manage [AWS Route53Resolver OutpostResolvers](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for DNS resolution within an AWS Outpost.

## Minimal Example

Create a basic OutpostResolver with essential properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const BasicOutpostResolver = await AWS.Route53Resolver.OutpostResolver("BasicOutpostResolver", {
  OutpostArn: "arn:aws:outposts:us-west-2:123456789012:outpost/op-1234567890abcdef",
  PreferredInstanceType: "r5.large",
  InstanceCount: 2,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Network" }
  ],
  Name: "DevOutpostResolver"
});
```

## Advanced Configuration

Configure an OutpostResolver with additional settings for instance count and tags.

```ts
const AdvancedOutpostResolver = await AWS.Route53Resolver.OutpostResolver("AdvancedOutpostResolver", {
  OutpostArn: "arn:aws:outposts:us-east-1:123456789012:outpost/op-abcdef1234567890",
  PreferredInstanceType: "m5.xlarge",
  InstanceCount: 4,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "Operations" }
  ],
  Name: "ProdOutpostResolver"
});
```

## Custom Name and Instance Count

Create an OutpostResolver with a unique name and specific instance count based on workload.

```ts
const CustomNameOutpostResolver = await AWS.Route53Resolver.OutpostResolver("CustomNameOutpostResolver", {
  OutpostArn: "arn:aws:outposts:us-west-1:123456789012:outpost/op-0987654321fedcba",
  PreferredInstanceType: "c5.large",
  InstanceCount: 3,
  Name: "CustomResolverForApp",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```