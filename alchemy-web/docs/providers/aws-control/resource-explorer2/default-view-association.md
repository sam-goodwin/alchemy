---
title: Managing AWS ResourceExplorer2 DefaultViewAssociations with Alchemy
description: Learn how to create, update, and manage AWS ResourceExplorer2 DefaultViewAssociations using Alchemy Cloud Control.
---

# DefaultViewAssociation

The DefaultViewAssociation resource lets you create and manage [AWS ResourceExplorer2 DefaultViewAssociations](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourceexplorer2-defaultviewassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const defaultviewassociation = await AWS.ResourceExplorer2.DefaultViewAssociation(
  "defaultviewassociation-example",
  { ViewArn: "example-viewarn" }
);
```

