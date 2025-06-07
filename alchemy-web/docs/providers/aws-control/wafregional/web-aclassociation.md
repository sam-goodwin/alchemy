---
title: Managing AWS WAFRegional WebACLAssociations with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional WebACLAssociations using Alchemy Cloud Control.
---

# WebACLAssociation

The WebACLAssociation resource lets you create and manage [AWS WAFRegional WebACLAssociations](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-webaclassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webaclassociation = await AWS.WAFRegional.WebACLAssociation("webaclassociation-example", {
  ResourceArn: "example-resourcearn",
  WebACLId: "example-webaclid",
});
```

