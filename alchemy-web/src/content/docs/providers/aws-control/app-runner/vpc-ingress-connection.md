---
title: VpcIngressConnection
description: Learn how to create, update, and manage AWS AppRunner VpcIngressConnections using Alchemy Cloud Control.
---


The VpcIngressConnection resource allows you to create and manage [AWS AppRunner VpcIngressConnections](https://docs.aws.amazon.com/apprunner/latest/userguide/) that enable secure connections between your AppRunner services and your Amazon VPC.

## Minimal Example

Create a basic VpcIngressConnection with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const vpcIngressConnection = await AWS.AppRunner.VpcIngressConnection("myVpcIngressConnection", {
  ServiceArn: "arn:aws:apprunner:us-east-1:123456789012:service/myService",
  IngressVpcConfiguration: {
    VpcId: "vpc-0abcd1234efgh5678",
    SecurityGroupIds: [
      "sg-0abcd1234efgh5678"
    ],
    Subnets: [
      "subnet-0abcd1234efgh5678"
    ]
  },
  VpcIngressConnectionName: "MyVpcConnection",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a VpcIngressConnection with detailed ingress VPC settings and multiple tags for better resource management.

```ts
const advancedVpcIngressConnection = await AWS.AppRunner.VpcIngressConnection("advancedVpcIngressConnection", {
  ServiceArn: "arn:aws:apprunner:us-east-1:123456789012:service/myAdvancedService",
  IngressVpcConfiguration: {
    VpcId: "vpc-0abcd1234efgh5678",
    SecurityGroupIds: [
      "sg-0abcd1234efgh5678"
    ],
    Subnets: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  VpcIngressConnectionName: "AdvancedVpcConnection",
  Tags: [
    {
      Key: "Project",
      Value: "MyApp"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ]
});
```

## Resource Adoption Example

Create a VpcIngressConnection that adopts an existing resource instead of failing.

```ts
const adoptVpcIngressConnection = await AWS.AppRunner.VpcIngressConnection("adoptVpcIngressConnection", {
  ServiceArn: "arn:aws:apprunner:us-east-1:123456789012:service/myAdoptedService",
  IngressVpcConfiguration: {
    VpcId: "vpc-0abcd1234efgh5678",
    SecurityGroupIds: [
      "sg-0abcd1234efgh5678"
    ],
    Subnets: [
      "subnet-0abcd1234efgh5678"
    ]
  },
  VpcIngressConnectionName: "AdoptedVpcConnection",
  adopt: true
});
```
