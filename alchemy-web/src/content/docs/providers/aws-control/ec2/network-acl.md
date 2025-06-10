---
title: NetworkAcl
description: Learn how to create, update, and manage AWS EC2 NetworkAcls using Alchemy Cloud Control.
---


The NetworkAcl resource allows you to manage [AWS EC2 Network Acls](https://docs.aws.amazon.com/ec2/latest/userguide/) for controlling inbound and outbound traffic to and from your subnets.

## Minimal Example

Create a basic NetworkAcl in a specified VPC with a tag.

```ts
import AWS from "alchemy/aws/control";

const basicNetworkAcl = await AWS.EC2.NetworkAcl("basicNetworkAcl", {
  VpcId: "vpc-123abc45",
  Tags: [{ Key: "Name", Value: "BasicNetworkAcl" }]
});
```

## Advanced Configuration

Configure a NetworkAcl with additional tags and adopt existing resources.

```ts
const advancedNetworkAcl = await AWS.EC2.NetworkAcl("advancedNetworkAcl", {
  VpcId: "vpc-678def90",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ],
  adopt: true
});
```

## Example with Security Rules

Create a NetworkAcl that includes specific traffic rules for inbound and outbound access.

```ts
const secureNetworkAcl = await AWS.EC2.NetworkAcl("secureNetworkAcl", {
  VpcId: "vpc-abc123de",
  Tags: [{ Key: "Name", Value: "SecureNetworkAcl" }],
  Rules: [
    {
      RuleAction: "allow",
      RuleNumber: 100,
      Protocol: "tcp",
      PortRange: { From: 22, To: 22 },
      CidrBlock: "0.0.0.0/0",
      Egress: false
    },
    {
      RuleAction: "allow",
      RuleNumber: 101,
      Protocol: "tcp",
      PortRange: { From: 80, To: 80 },
      CidrBlock: "0.0.0.0/0",
      Egress: true
    },
    {
      RuleAction: "deny",
      RuleNumber: 102,
      Protocol: "-1",
      CidrBlock: "0.0.0.0/0",
      Egress: false
    }
  ]
});
```

## Adoption of Existing NetworkAcl

Adopt an existing NetworkAcl with the option to manage it through Alchemy.

```ts
const adoptExistingNetworkAcl = await AWS.EC2.NetworkAcl("adoptNetworkAcl", {
  VpcId: "vpc-existing-01",
  adopt: true
});
```
