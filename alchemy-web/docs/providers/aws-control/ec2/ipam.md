---
title: Managing AWS EC2 IPAMs with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMs using Alchemy Cloud Control.
---

# IPAM

The IPAM resource lets you create and manage [AWS EC2 IPAMs](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-ipam.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ipam = await AWS.EC2.IPAM("ipam-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A ipam resource managed by Alchemy",
});
```

## Advanced Configuration

Create a ipam with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIPAM = await AWS.EC2.IPAM("advanced-ipam", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A ipam resource managed by Alchemy",
});
```

