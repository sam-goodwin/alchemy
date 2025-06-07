---
title: Managing AWS VpcLattice AuthPolicys with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice AuthPolicys using Alchemy Cloud Control.
---

# AuthPolicy

The AuthPolicy resource lets you create and manage [AWS VpcLattice AuthPolicys](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-authpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const authpolicy = await AWS.VpcLattice.AuthPolicy("authpolicy-example", {
  Policy: {},
  ResourceIdentifier: "example-resourceidentifier",
});
```

