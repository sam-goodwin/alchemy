---
title: Managing AWS VpcLattice ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you create and manage [AWS VpcLattice ResourcePolicys](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-resourcepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcepolicy = await AWS.VpcLattice.ResourcePolicy("resourcepolicy-example", {
  Policy: {},
  ResourceArn: "example-resourcearn",
});
```

