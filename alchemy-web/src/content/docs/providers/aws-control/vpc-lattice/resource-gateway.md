---
title: ResourceGateway
description: Learn how to create, update, and manage AWS VpcLattice ResourceGateways using Alchemy Cloud Control.
---


The ResourceGateway resource allows you to manage [AWS VpcLattice ResourceGateways](https://docs.aws.amazon.com/vpclattice/latest/userguide/) which connect your VPCs and resources through a unified gateway interface.

## Minimal Example

This example demonstrates how to create a basic ResourceGateway with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResourceGateway = await AWS.VpcLattice.ResourceGateway("basicResourceGateway", {
  name: "my-resource-gateway",
  vpcIdentifier: "vpc-12345678",
  subnetIds: [
    "subnet-87654321", 
    "subnet-12345678"
  ],
  ipAddressType: "ipv4" // Optional
});
```

## Advanced Configuration

This example shows how to configure a ResourceGateway with additional settings such as security groups and tags for better management and identification.

```ts
const advancedResourceGateway = await AWS.VpcLattice.ResourceGateway("advancedResourceGateway", {
  name: "advanced-resource-gateway",
  vpcIdentifier: "vpc-12345678",
  subnetIds: [
    "subnet-87654321", 
    "subnet-12345678"
  ],
  securityGroupIds: [
    "sg-12345678", 
    "sg-87654321"
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "MyProject" }
  ]
});
```

## Adoption of Existing Resources

This example demonstrates how to adopt an existing ResourceGateway instead of failing if the resource already exists.

```ts
const adoptedResourceGateway = await AWS.VpcLattice.ResourceGateway("adoptedResourceGateway", {
  name: "existing-resource-gateway",
  vpcIdentifier: "vpc-12345678",
  subnetIds: [
    "subnet-87654321", 
    "subnet-12345678"
  ],
  adopt: true // This enables the adoption of existing resources
});
```

## Security Group Configuration

Here’s how to configure a ResourceGateway with specific security group settings to control inbound and outbound traffic.

```ts
const securedResourceGateway = await AWS.VpcLattice.ResourceGateway("securedResourceGateway", {
  name: "secured-resource-gateway",
  vpcIdentifier: "vpc-12345678",
  subnetIds: [
    "subnet-87654321", 
    "subnet-12345678"
  ],
  securityGroupIds: [
    "sg-12345678"
  ],
  ipAddressType: "ipv4"
});
```
