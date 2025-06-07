---
title: Managing AWS EC2 InternetGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 InternetGateways using Alchemy Cloud Control.
---

# InternetGateway

The InternetGateway resource lets you create and manage [AWS EC2 InternetGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-internetgateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const internetgateway = await AWS.EC2.InternetGateway("internetgateway-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a internetgateway with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInternetGateway = await AWS.EC2.InternetGateway("advanced-internetgateway", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

