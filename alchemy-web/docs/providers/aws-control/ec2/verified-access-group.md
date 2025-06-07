---
title: Managing AWS EC2 VerifiedAccessGroups with Alchemy
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessGroups using Alchemy Cloud Control.
---

# VerifiedAccessGroup

The VerifiedAccessGroup resource lets you create and manage [AWS EC2 VerifiedAccessGroups](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-verifiedaccessgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const verifiedaccessgroup = await AWS.EC2.VerifiedAccessGroup("verifiedaccessgroup-example", {
  VerifiedAccessInstanceId: "example-verifiedaccessinstanceid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A verifiedaccessgroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a verifiedaccessgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVerifiedAccessGroup = await AWS.EC2.VerifiedAccessGroup(
  "advanced-verifiedaccessgroup",
  {
    VerifiedAccessInstanceId: "example-verifiedaccessinstanceid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A verifiedaccessgroup resource managed by Alchemy",
  }
);
```

