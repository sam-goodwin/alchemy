---
title: Managing AWS WAFv2 WebACLAssociations with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 WebACLAssociations using Alchemy Cloud Control.
---

# WebACLAssociation

The WebACLAssociation resource lets you create and manage [AWS WAFv2 WebACLAssociations](https://docs.aws.amazon.com/wafv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webaclassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webaclassociation = await AWS.WAFv2.WebACLAssociation("webaclassociation-example", {
  ResourceArn: "example-resourcearn",
  WebACLArn: "example-webaclarn",
});
```

