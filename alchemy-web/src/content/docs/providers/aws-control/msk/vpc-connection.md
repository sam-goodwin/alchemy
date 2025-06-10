---
title: VpcConnection
description: Learn how to create, update, and manage AWS MSK VpcConnections using Alchemy Cloud Control.
---


The VpcConnection resource lets you manage [AWS MSK VpcConnections](https://docs.aws.amazon.com/msk/latest/userguide/) which provide connectivity between your Amazon Managed Streaming for Apache Kafka (MSK) cluster and your VPC.

## Minimal Example

Create a basic VpcConnection with the required properties and a couple of common optional properties.

```ts
import AWS from "alchemy/aws/control";

const vpcConnection = await AWS.MSK.VpcConnection("myVpcConnection", {
  SecurityGroups: ["sg-0123456789abcdef0"],
  TargetClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-efgh-5678-ijkl-90mnopqrstuv-1",
  ClientSubnets: ["subnet-01234abcd", "subnet-abcdef012"],
  VpcId: "vpc-0123456789abcdef0",
  Authentication: "IAM",
  Tags: {
    Environment: "production",
    Project: "kafka-integration"
  }
});
```

## Advanced Configuration

Configure a VpcConnection with specific security group settings and multiple client subnets.

```ts
const advancedVpcConnection = await AWS.MSK.VpcConnection("advancedVpcConnection", {
  SecurityGroups: ["sg-0987654321abcdef0"],
  TargetClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/another-cluster/wxyz1234-abcd-5678-efgh-90ijklmnopqrst-1",
  ClientSubnets: ["subnet-56789efgh", "subnet-fedcba987"],
  VpcId: "vpc-0987654321abcdef0",
  Authentication: "SASL_SCRAM_256",
  Tags: {
    Environment: "staging",
    Project: "kafka-staging"
  },
  adopt: true
});
```

## Example with Custom Tags

Create a VpcConnection and apply custom tags for better resource management and identification.

```ts
const taggedVpcConnection = await AWS.MSK.VpcConnection("taggedVpcConnection", {
  SecurityGroups: ["sg-1122334455abcdef0"],
  TargetClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/yet-another-cluster/qrst1234-abcd-5678-efgh-90ijklmnopqrst-1",
  ClientSubnets: ["subnet-11111aaaa", "subnet-bbbbbccccc"],
  VpcId: "vpc-1122334455abcdef0",
  Authentication: "IAM",
  Tags: {
    Environment: "development",
    Owner: "team-alpha",
    Purpose: "testing"
  }
});
```
