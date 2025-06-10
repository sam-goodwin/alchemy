---
title: ServiceNetwork
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworks using Alchemy Cloud Control.
---


The ServiceNetwork resource allows you to manage [AWS VpcLattice ServiceNetworks](https://docs.aws.amazon.com/vpclattice/latest/userguide/) that facilitate service communication and discovery across VPCs.

## Minimal Example

Create a basic ServiceNetwork with a name and authentication type.

```ts
import AWS from "alchemy/aws/control";

const basicServiceNetwork = await AWS.VpcLattice.ServiceNetwork("basicServiceNetwork", {
  name: "MyServiceNetwork",
  authType: "NONE", // No authentication required
});
```

## Advanced Configuration

Configure a ServiceNetwork with sharing options and tags for better organization.

```ts
const advancedServiceNetwork = await AWS.VpcLattice.ServiceNetwork("advancedServiceNetwork", {
  name: "AdvancedServiceNetwork",
  authType: "IAM",
  sharingConfig: {
    allowExternal: true,
    externalPrincipals: ["arn:aws:iam::123456789012:role/ExternalServiceRole"]
  },
  tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "ServiceDiscovery" }
  ]
});
```

## Adoption of Existing Resource

Create a ServiceNetwork that adopts an existing resource rather than failing if it already exists.

```ts
const existingServiceNetwork = await AWS.VpcLattice.ServiceNetwork("existingServiceNetwork", {
  name: "ExistingServiceNetwork",
  adopt: true // Adopt an existing resource if it already exists
});
```

## Tagging for Organization

Demonstrate how to use tags to organize your ServiceNetworks effectively.

```ts
const taggedServiceNetwork = await AWS.VpcLattice.ServiceNetwork("taggedServiceNetwork", {
  name: "TaggedServiceNetwork",
  tags: [
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Purpose", Value: "Testing" }
  ]
});
```
