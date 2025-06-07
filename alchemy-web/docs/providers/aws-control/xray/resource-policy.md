---
title: Managing AWS XRay ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS XRay ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you create and manage [AWS XRay ResourcePolicys](https://docs.aws.amazon.com/xray/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-xray-resourcepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcepolicy = await AWS.XRay.ResourcePolicy("resourcepolicy-example", {
  PolicyName: "resourcepolicy-policy",
  PolicyDocument: "example-policydocument",
});
```

