---
title: VPCBlockPublicAccessOptions
description: Learn how to create, update, and manage AWS EC2 VPCBlockPublicAccessOptions using Alchemy Cloud Control.
---


The VPCBlockPublicAccessOptions resource allows you to manage the public access settings for your Amazon EC2 VPCs. This resource helps ensure that your VPCs are configured to block public access as per your security requirements. For more information, refer to the [AWS EC2 VPCBlockPublicAccessOptions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCBlockPublicAccessOptions resource with the required properties.

```ts
import AWS from "alchemy/aws/control";

const vpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("vpcBlockPublicAccessOptions", {
  InternetGatewayBlockMode: "block", // Set to 'block' or 'allow'
  adopt: false // Default is false: does not adopt existing resources
});
```

## Advanced Configuration

Configure a VPCBlockPublicAccessOptions resource with an existing resource adoption.

```ts
const existingVpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("existingVpcBlockPublicAccessOptions", {
  InternetGatewayBlockMode: "allow", // Allow public access through the internet gateway
  adopt: true // Adopt existing resource if it already exists
});
```

## Specific Use Case: Enforcing Block Public Access

Set up a VPCBlockPublicAccessOptions resource to enforce stricter security by blocking all public access.

```ts
const secureVpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("secureVpcBlockPublicAccessOptions", {
  InternetGatewayBlockMode: "block", // Block all public access
  adopt: false // Ensure it's a new resource, not adopting
});
```

## Specific Use Case: Allowing Select Public Access

Create a VPCBlockPublicAccessOptions resource that allows certain configurations for public access.

```ts
const selectiveVpcOptions = await AWS.EC2.VPCBlockPublicAccessOptions("selectiveVpcBlockPublicAccessOptions", {
  InternetGatewayBlockMode: "allow", // Allow public access through the internet gateway
  adopt: true // Adopt existing configurations if available
});
```
