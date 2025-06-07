---
title: Managing AWS VpcLattice ResourceGateways with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ResourceGateways using Alchemy Cloud Control.
---

# ResourceGateway

The ResourceGateway resource allows you to manage [AWS VpcLattice ResourceGateways](https://docs.aws.amazon.com/vpclattice/latest/userguide/) for routing and load balancing within your Virtual Private Cloud (VPC).

## Minimal Example

Create a simple ResourceGateway with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const simpleResourceGateway = await AWS.VpcLattice.ResourceGateway("SimpleResourceGateway", {
  Name: "SimpleGateway",
  VpcIdentifier: "vpc-12345678",
  SubnetIds: ["subnet-12345678", "subnet-87654321"],
  IpAddressType: "ipv4",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a ResourceGateway with multiple optional settings, including security groups.

```ts
const advancedResourceGateway = await AWS.VpcLattice.ResourceGateway("AdvancedResourceGateway", {
  Name: "AdvancedGateway",
  VpcIdentifier: "vpc-87654321",
  SubnetIds: ["subnet-23456789", "subnet-98765432"],
  IpAddressType: "ipv6",
  SecurityGroupIds: ["sg-12345678"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Adoption of Existing Resource

Create a ResourceGateway that adopts an existing resource if it already exists.

```ts
const adoptResourceGateway = await AWS.VpcLattice.ResourceGateway("AdoptResourceGateway", {
  Name: "ExistingGateway",
  VpcIdentifier: "vpc-13579246",
  SubnetIds: ["subnet-24681357", "subnet-75315984"],
  adopt: true // This enables adoption of the existing resource
});
```

## Tags for Resource Management

Demonstrate the use of tags to manage resources effectively.

```ts
const taggedResourceGateway = await AWS.VpcLattice.ResourceGateway("TaggedResourceGateway", {
  Name: "TaggedGateway",
  VpcIdentifier: "vpc-24680135",
  SubnetIds: ["subnet-86420975"],
  Tags: [
    { Key: "Project", Value: "VpcLatticeDemo" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```