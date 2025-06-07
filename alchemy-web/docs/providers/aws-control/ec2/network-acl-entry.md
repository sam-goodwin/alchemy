---
title: Managing AWS EC2 NetworkAclEntrys with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkAclEntrys using Alchemy Cloud Control.
---

# NetworkAclEntry

The NetworkAclEntry resource lets you create and manage [AWS EC2 NetworkAclEntrys](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkaclentry.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkaclentry = await AWS.EC2.NetworkAclEntry("networkaclentry-example", {
  NetworkAclId: "example-networkaclid",
  RuleAction: "example-ruleaction",
  RuleNumber: 1,
  Protocol: 1,
});
```

