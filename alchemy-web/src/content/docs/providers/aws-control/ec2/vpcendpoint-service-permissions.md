---
title: VPCEndpointServicePermissions
description: Learn how to create, update, and manage AWS EC2 VPCEndpointServicePermissions using Alchemy Cloud Control.
---


The VPCEndpointServicePermissions resource lets you manage permissions for an AWS EC2 VPC Endpoint Service. This resource allows you to specify which AWS accounts can access your endpoint service. For more detailed information, visit the [AWS EC2 VPCEndpointServicePermissions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCEndpointServicePermissions resource with required properties and allow a specific principal.

```ts
import AWS from "alchemy/aws/control";

const vpceServicePermissions = await AWS.EC2.VPCEndpointServicePermissions("vpceServicePermissions", {
  AllowedPrincipals: [
    "arn:aws:iam::123456789012:root" // Allow access to this AWS account
  ],
  ServiceId: "vpce-svc-abcdef1234567890"
});
```

## Advanced Configuration

Configure the VPCEndpointServicePermissions with multiple principals and demonstrate adoption of an existing resource.

```ts
const advancedVpceServicePermissions = await AWS.EC2.VPCEndpointServicePermissions("advancedVpceServicePermissions", {
  AllowedPrincipals: [
    "arn:aws:iam::123456789012:role/MyRole", // Allow a specific IAM role
    "arn:aws:iam::987654321098:root" // Allow another AWS account
  ],
  ServiceId: "vpce-svc-abcdef1234567890",
  adopt: true // Adopt an existing resource if it already exists
});
```

## Use Case: Restricting Access

Set up the permissions to restrict access to a specific set of principals for a more controlled environment.

```ts
const restrictedVpceServicePermissions = await AWS.EC2.VPCEndpointServicePermissions("restrictedVpceServicePermissions", {
  AllowedPrincipals: [
    "arn:aws:iam::123456789012:role/SpecialAccessRole", // Allow a specific role
    "arn:aws:iam::123456789012:role/AnotherRole" // Allow another role from the same account
  ],
  ServiceId: "vpce-svc-abcdef1234567890"
});
```

## Use Case: Updating Permissions

Update the VPCEndpointServicePermissions to change the allowed principals.

```ts
const updateVpceServicePermissions = await AWS.EC2.VPCEndpointServicePermissions("updateVpceServicePermissions", {
  AllowedPrincipals: [
    "arn:aws:iam::123456789012:role/UpdatedRole" // Update to a different role
  ],
  ServiceId: "vpce-svc-abcdef1234567890"
});
```
