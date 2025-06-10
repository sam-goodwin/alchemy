---
title: VerifiedAccessEndpoint
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessEndpoints using Alchemy Cloud Control.
---


The VerifiedAccessEndpoint resource allows you to manage [AWS EC2 Verified Access Endpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) for secure access to your AWS resources.

## Minimal Example

Create a basic Verified Access Endpoint with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const verifiedAccessEndpoint = await AWS.EC2.VerifiedAccessEndpoint("myVerifiedAccessEndpoint", {
  AttachmentType: "load-balancer",
  VerifiedAccessGroupId: "vag-0123456789abcdef0",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  ApplicationDomain: "app.example.com"
});
```

## Advanced Configuration

Configure a Verified Access Endpoint with additional options such as load balancer settings and optional policy document.

```ts
const advancedVerifiedAccessEndpoint = await AWS.EC2.VerifiedAccessEndpoint("advancedVerifiedAccessEndpoint", {
  AttachmentType: "network-interface",
  VerifiedAccessGroupId: "vag-0123456789abcdef0",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  LoadBalancerOptions: {
    TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/abcdef123456",
    ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/abcdef123456"
  },
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "ec2:DescribeInstances",
        Resource: "*"
      }
    ]
  })
});
```

## Custom Network Interface Configuration

Set up a Verified Access Endpoint with specific network interface options.

```ts
const networkInterfaceVerifiedAccessEndpoint = await AWS.EC2.VerifiedAccessEndpoint("networkInterfaceVerifiedAccessEndpoint", {
  AttachmentType: "network-interface",
  VerifiedAccessGroupId: "vag-0123456789abcdef0",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  NetworkInterfaceOptions: {
    AssociatePublicIpAddress: true,
    PrivateIpAddress: "10.0.1.100"
  },
  CidrOptions: {
    CidrBlock: "10.0.0.0/24"
  }
});
```

## Database Endpoint Configuration

Create a Verified Access Endpoint specifically for an RDS instance.

```ts
const rdsVerifiedAccessEndpoint = await AWS.EC2.VerifiedAccessEndpoint("rdsVerifiedAccessEndpoint", {
  AttachmentType: "database",
  VerifiedAccessGroupId: "vag-0123456789abcdef0",
  RdsOptions: {
    DbInstanceIdentifier: "my-db-instance",
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    DbClusterIdentifier: "my-db-cluster"
  },
  PolicyEnabled: true
});
```
