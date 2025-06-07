---
title: Managing AWS EC2 EC2Fleets with Alchemy
description: Learn how to create, update, and manage AWS EC2 EC2Fleets using Alchemy Cloud Control.
---

# EC2Fleet

The EC2Fleet resource lets you create and manage [AWS EC2 EC2Fleets](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-ec2fleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ec2fleet = await AWS.EC2.EC2Fleet("ec2fleet-example", {
  TargetCapacitySpecification: "example-targetcapacityspecification",
  LaunchTemplateConfigs: [],
});
```

