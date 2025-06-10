---
title: VPCEndpoint
description: Learn how to create, update, and manage AWS EC2 VPCEndpoints using Alchemy Cloud Control.
---


The VPCEndpoint resource lets you manage [AWS EC2 VPCEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) for connecting your VPC to supported AWS services and VPC endpoint services. 

## Minimal Example

Create a basic VPC endpoint with required properties and a couple of common optional ones such as `PrivateDnsEnabled` and `SecurityGroupIds`.

```ts
import AWS from "alchemy/aws/control";

const vpcEndpoint = await AWS.EC2.VPCEndpoint("myVpcEndpoint", {
  VpcId: "vpc-12345678",
  ServiceName: "com.amazonaws.us-east-1.s3",
  PrivateDnsEnabled: true,
  SecurityGroupIds: ["sg-12345678"]
});
```

## Advanced Configuration

Configure a VPC endpoint with advanced settings including custom DNS options and routing table associations.

```ts
const advancedVpcEndpoint = await AWS.EC2.VPCEndpoint("advancedVpcEndpoint", {
  VpcId: "vpc-12345678",
  ServiceName: "com.amazonaws.us-east-1.s3",
  PrivateDnsEnabled: true,
  DnsOptions: {
    DnsRecords: [
      {
        DomainName: "myservice.internal",
        RecordType: "A"
      }
    ]
  },
  RouteTableIds: ["rtb-12345678", "rtb-87654321"],
  SecurityGroupIds: ["sg-12345678"]
});
```

## Custom IAM Policy

Create a VPC endpoint with a custom IAM policy that allows specific S3 actions.

```ts
const vpcEndpointWithPolicy = await AWS.EC2.VPCEndpoint("vpcEndpointWithPolicy", {
  VpcId: "vpc-12345678",
  ServiceName: "com.amazonaws.us-east-1.s3",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:ListBucket",
          "s3:GetObject"
        ],
        Resource: [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
      }
    ]
  }
});
```

## Network Configuration

Set up a VPC endpoint with specific subnet IDs and the IPv4 address type.

```ts
const networkVpcEndpoint = await AWS.EC2.VPCEndpoint("networkVpcEndpoint", {
  VpcId: "vpc-12345678",
  ServiceName: "com.amazonaws.us-east-1.s3",
  IpAddressType: "ipv4",
  SubnetIds: ["subnet-12345678", "subnet-87654321"],
  SecurityGroupIds: ["sg-12345678"]
});
```
