---
title: NetworkInterfacePermission
description: Learn how to create, update, and manage AWS EC2 NetworkInterfacePermissions using Alchemy Cloud Control.
---


The NetworkInterfacePermission resource allows you to manage permissions on an Amazon EC2 Network Interface. This includes controlling access to network interfaces for other AWS accounts. For more information, refer to the [AWS EC2 NetworkInterfacePermissions](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic NetworkInterfacePermission that grants access to an AWS account.

```ts
import AWS from "alchemy/aws/control";

const networkInterfacePermission = await AWS.EC2.NetworkInterfacePermission("networkPermission", {
  AwsAccountId: "123456789012",
  NetworkInterfaceId: "eni-0abcdef1234567890",
  Permission: "all",
  adopt: true // Optional: Adopt existing resource if it exists
});
```

## Advanced Configuration

Configure a NetworkInterfacePermission with specific permissions for an AWS account.

```ts
const advancedNetworkInterfacePermission = await AWS.EC2.NetworkInterfacePermission("advancedNetworkPermission", {
  AwsAccountId: "987654321098",
  NetworkInterfaceId: "eni-0abcdeffedcba0987",
  Permission: "read", // Specify permission level
  adopt: false // Optional: Do not adopt existing resource
});
```

## Granting Specific Permissions

Demonstrate how to grant specific permissions to an account for a network interface.

```ts
const specificPermission = await AWS.EC2.NetworkInterfacePermission("specificPermission", {
  AwsAccountId: "112233445566",
  NetworkInterfaceId: "eni-0abcdef1234567890",
  Permission: "attach"
});
```

## Revoking Permissions

Show how to revoke permissions for an account from a network interface.

```ts
const revokePermission = await AWS.EC2.NetworkInterfacePermission("revokePermission", {
  AwsAccountId: "998877665544",
  NetworkInterfaceId: "eni-0abcdef1234567890",
  Permission: "detach"
});
```
