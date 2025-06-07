---
title: Managing AWS EC2 VPCBlockPublicAccessOptionss with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCBlockPublicAccessOptionss using Alchemy Cloud Control.
---

# VPCBlockPublicAccessOptions

The VPCBlockPublicAccessOptions resource allows you to manage the public access options for Virtual Private Clouds (VPCs) in AWS EC2. This resource helps in controlling whether or not public access is allowed to resources within your VPC. For more information, refer to the [AWS EC2 VPCBlockPublicAccessOptions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCBlockPublicAccessOptions resource with the required properties:

```ts
import AWS from "alchemy/aws/control";

const vpcBlockPublicAccessOptions = await AWS.EC2.VPCBlockPublicAccessOptions("MyVPCBlockPublicAccessOptions", {
  InternetGatewayBlockMode: "block",
  adopt: true // Allows adopting existing VPCBlockPublicAccessOptions
});
```

## Advanced Configuration

Configure a VPCBlockPublicAccessOptions resource with additional properties:

```ts
const advancedVpcBlockPublicAccessOptions = await AWS.EC2.VPCBlockPublicAccessOptions("AdvancedVPCOptions", {
  InternetGatewayBlockMode: "allow",
  adopt: false // Do not adopt existing resources
});
```

## Use Case: Restricting Public Access

This example demonstrates how to restrict public access to a specific VPC by setting the Internet Gateway Block Mode to block:

```ts
const restrictedVpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("RestrictedVPCOptions", {
  InternetGatewayBlockMode: "block",
  adopt: false
});
```

## Use Case: Allowing Public Access

In this example, public access is allowed to the resources in the VPC by setting the Internet Gateway Block Mode to allow:

```ts
const publicVpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("PublicVPCOptions", {
  InternetGatewayBlockMode: "allow",
  adopt: true // Adopts existing VPCBlockPublicAccessOptions if present
});
```