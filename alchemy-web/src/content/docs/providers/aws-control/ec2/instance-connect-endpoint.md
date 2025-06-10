---
title: InstanceConnectEndpoint
description: Learn how to create, update, and manage AWS EC2 InstanceConnectEndpoints using Alchemy Cloud Control.
---


The InstanceConnectEndpoint resource allows you to manage [AWS EC2 InstanceConnectEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) which enable secure connections to your EC2 instances using temporary SSH keys.

## Minimal Example

Create a basic InstanceConnectEndpoint with required properties and some optional settings.

```ts
import AWS from "alchemy/aws/control";

const instanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("myInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  PreserveClientIp: true,
  SecurityGroupIds: ["sg-0abcd1234efgh5678"]
});
```

## Advanced Configuration

Configure an InstanceConnectEndpoint with additional options such as client token and tags for better resource management.

```ts
const advancedInstanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("advancedInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  ClientToken: "unique-client-token",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing InstanceConnectEndpoint instead of failing, use the `adopt` property.

```ts
const adoptInstanceConnectEndpoint = await AWS.EC2.InstanceConnectEndpoint("adoptedInstanceConnectEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  adopt: true
});
```
