---
title: VpcEndpoint
description: Learn how to create, update, and manage AWS OpenSearchServerless VpcEndpoints using Alchemy Cloud Control.
---


The VpcEndpoint resource lets you manage [AWS OpenSearchServerless VpcEndpoints](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) for accessing OpenSearch Serverless from within your Amazon VPC.

## Minimal Example

Create a basic VPC endpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const vpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("myVpcEndpoint", {
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ],
  SecurityGroupIds: [
    "sg-0abcd1234efgh5678"
  ],
  Name: "MyOpenSearchVpcEndpoint"
});
```

## Advanced Configuration

Configure a VPC endpoint with multiple security groups for enhanced network security.

```ts
const advancedVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("advancedVpcEndpoint", {
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ],
  SecurityGroupIds: [
    "sg-0abcd1234efgh5678",
    "sg-1abcd1234efgh5678"
  ],
  Name: "AdvancedOpenSearchVpcEndpoint"
});
```

## Adopt Existing Resource

If you want to adopt an existing VPC endpoint instead of failing, use the adopt option.

```ts
const adoptedVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("adoptedVpcEndpoint", {
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-1abcd1234efgh5678"
  ],
  Name: "AdoptedOpenSearchVpcEndpoint",
  adopt: true
});
```
