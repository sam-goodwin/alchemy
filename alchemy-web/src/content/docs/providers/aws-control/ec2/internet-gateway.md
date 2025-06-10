---
title: InternetGateway
description: Learn how to create, update, and manage AWS EC2 InternetGateways using Alchemy Cloud Control.
---


The InternetGateway resource allows you to manage [AWS EC2 InternetGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) which are used to enable communication between instances in your Virtual Private Cloud (VPC) and the internet.

## Minimal Example

Create a basic InternetGateway with a tag for identification.

```ts
import AWS from "alchemy/aws/control";

const internetGateway = await AWS.EC2.InternetGateway("myInternetGateway", {
  Tags: [
    {
      Key: "Name",
      Value: "MyInternetGateway"
    }
  ]
});
```

## Advanced Configuration

Configure an InternetGateway to adopt an existing resource if it already exists.

```ts
const existingInternetGateway = await AWS.EC2.InternetGateway("existingGateway", {
  adopt: true,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Attach to a VPC

Demonstrate how to attach the InternetGateway to a VPC for internet access.

```ts
import AWS from "alchemy/aws/control";

const myVpc = await AWS.EC2.Vpc("myVpc", {
  CidrBlock: "10.0.0.0/16",
  Tags: [
    {
      Key: "Name",
      Value: "MyVPC"
    }
  ]
});

const internetGateway = await AWS.EC2.InternetGateway("vpcInternetGateway", {
  Tags: [
    {
      Key: "Name",
      Value: "VPCInternetGateway"
    }
  ]
});

// Attach the InternetGateway to the VPC
await AWS.EC2.AttachInternetGateway("attachGateway", {
  InternetGatewayId: internetGateway.id,
  VpcId: myVpc.id
});
```

## Detach from a VPC

Detach the InternetGateway from a VPC when no longer needed.

```ts
await AWS.EC2.DetachInternetGateway("detachGateway", {
  InternetGatewayId: internetGateway.id,
  VpcId: myVpc.id
});
```
