---
title: OutpostResolver
description: Learn how to create, update, and manage AWS Route53Resolver OutpostResolvers using Alchemy Cloud Control.
---


The OutpostResolver resource allows you to create and manage AWS Route53Resolver OutpostResolvers, enabling DNS resolution for resources in your AWS Outposts. For more information, visit the [AWS Route53Resolver OutpostResolvers documentation](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic OutpostResolver with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const outpostResolver = await AWS.Route53Resolver.OutpostResolver("basicOutpostResolver", {
  outpostArn: "arn:aws:outposts:us-east-1:123456789012:outpost/op-0abcd1234efgh5678",
  preferredInstanceType: "r5.large",
  instanceCount: 2, // Optional: specify the number of instances
  name: "BasicOutpostResolver"
});
```

## Advanced Configuration

Configure an OutpostResolver with tags for better resource management.

```ts
const taggedOutpostResolver = await AWS.Route53Resolver.OutpostResolver("taggedOutpostResolver", {
  outpostArn: "arn:aws:outposts:us-west-2:123456789012:outpost/op-1abcd1234efgh5678",
  preferredInstanceType: "r5.xlarge",
  instanceCount: 4,
  name: "TaggedOutpostResolver",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "DNSManagement" }
  ]
});
```

## Scaling and Resource Management

Create an OutpostResolver and later update it to scale the instance count based on demand.

```ts
const scalableOutpostResolver = await AWS.Route53Resolver.OutpostResolver("scalableOutpostResolver", {
  outpostArn: "arn:aws:outposts:eu-central-1:123456789012:outpost/op-2abcd1234efgh5678",
  preferredInstanceType: "m5.large",
  instanceCount: 3,
  name: "ScalableOutpostResolver"
});

// Later, scale up the instance count to 6
await AWS.Route53Resolver.OutpostResolver.update("scalableOutpostResolver", {
  instanceCount: 6
});
```
