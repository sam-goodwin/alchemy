---
title: Managing AWS EC2 InstanceConnectEndpoints with Alchemy
description: Learn how to create, update, and manage AWS EC2 InstanceConnectEndpoints using Alchemy Cloud Control.
---

# InstanceConnectEndpoint

The InstanceConnectEndpoint resource allows you to manage [AWS EC2 InstanceConnectEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) which facilitate secure and efficient connections to EC2 instances.

## Minimal Example

Create a basic InstanceConnectEndpoint with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicInstanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("BasicInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  PreserveClientIp: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an InstanceConnectEndpoint with additional optional properties such as client token and security group IDs.

```ts
const advancedInstanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("AdvancedInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  ClientToken: "unique-client-token-12345",
  SecurityGroupIds: ["sg-01234abcd5678efgh"],
  PreserveClientIp: false,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Service", Value: "WebApp" }
  ]
});
```

## Using a Client Token

This example demonstrates how to use a client token to ensure idempotency when creating an InstanceConnectEndpoint.

```ts
const instanceConnectEndpointWithToken = await AWS.EC2.InstanceConnectEndpoint("InstanceConnectWithToken", {
  SubnetId: "subnet-0abcd1234efgh5678",
  ClientToken: "token-for-idempotency-98765",
  Tags: [
    { Key: "Project", Value: "NewFeature" }
  ]
});
```

## Security Group Configuration

Here’s how to configure an InstanceConnectEndpoint with specific security group settings for enhanced security.

```ts
const secureInstanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("SecureInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  SecurityGroupIds: ["sg-01234abcd5678efgh", "sg-12345ijkl6789mnop"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ]
});
```