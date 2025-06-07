---
title: Managing AWS LakeFormation TagAssociations with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation TagAssociations using Alchemy Cloud Control.
---

# TagAssociation

The TagAssociation resource lets you create and manage [AWS LakeFormation TagAssociations](https://docs.aws.amazon.com/lakeformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-tagassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tagassociation = await AWS.LakeFormation.TagAssociation("tagassociation-example", {
  LFTags: [],
  Resource: "example-resource",
});
```

