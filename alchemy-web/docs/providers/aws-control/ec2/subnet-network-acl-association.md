---
title: Managing AWS EC2 SubnetNetworkAclAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 SubnetNetworkAclAssociations using Alchemy Cloud Control.
---

# SubnetNetworkAclAssociation

The SubnetNetworkAclAssociation resource lets you create and manage [AWS EC2 SubnetNetworkAclAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnetnetworkaclassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subnetnetworkaclassociation = await AWS.EC2.SubnetNetworkAclAssociation(
  "subnetnetworkaclassociation-example",
  { NetworkAclId: "example-networkaclid", SubnetId: "example-subnetid" }
);
```

