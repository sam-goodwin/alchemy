---
title: Managing AWS EC2 EgressOnlyInternetGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 EgressOnlyInternetGateways using Alchemy Cloud Control.
---

# EgressOnlyInternetGateway

The EgressOnlyInternetGateway resource lets you create and manage [AWS EC2 EgressOnlyInternetGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-egressonlyinternetgateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const egressonlyinternetgateway = await AWS.EC2.EgressOnlyInternetGateway(
  "egressonlyinternetgateway-example",
  { VpcId: "example-vpcid" }
);
```

