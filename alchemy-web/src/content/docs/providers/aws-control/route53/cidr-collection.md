---
title: CidrCollection
description: Learn how to create, update, and manage AWS Route53 CidrCollections using Alchemy Cloud Control.
---


The CidrCollection resource lets you manage [AWS Route53 CidrCollections](https://docs.aws.amazon.com/route53/latest/userguide/) for grouping and managing CIDR blocks.

## Minimal Example

Create a basic CIDR collection with a name and optional locations.

```ts
import AWS from "alchemy/aws/control";

const basicCidrCollection = await AWS.Route53.CidrCollection("basicCidrCollection", {
  Name: "MyCidrCollection",
  Locations: [
    { Location: "192.0.2.0/24" },
    { Location: "203.0.113.0/24" }
  ]
});
```

## Advanced Configuration

Configure a CIDR collection with adoption of existing resources.

```ts
const advancedCidrCollection = await AWS.Route53.CidrCollection("advancedCidrCollection", {
  Name: "AdvancedCidrCollection",
  Locations: [
    { Location: "198.51.100.0/24" },
    { Location: "192.0.2.0/24" }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Custom Name with Multiple Locations

Create a CIDR collection with multiple locations for improved management.

```ts
const multiLocationCidrCollection = await AWS.Route53.CidrCollection("multiLocationCidrCollection", {
  Name: "MultiLocationCidrCollection",
  Locations: [
    { Location: "10.0.0.0/8" },
    { Location: "172.16.0.0/12" },
    { Location: "192.168.0.0/16" }
  ]
});
```

## Add Existing Resource

Demonstrate how to adopt an existing CIDR collection.

```ts
const adoptExistingCidrCollection = await AWS.Route53.CidrCollection("adoptExistingCidrCollection", {
  Name: "AdoptedCidrCollection",
  adopt: true // This will adopt an existing CIDR collection
});
```
