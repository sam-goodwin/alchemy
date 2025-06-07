---
title: Managing AWS DevOpsGuru ResourceCollections with Alchemy
description: Learn how to create, update, and manage AWS DevOpsGuru ResourceCollections using Alchemy Cloud Control.
---

# ResourceCollection

The ResourceCollection resource lets you create and manage [AWS DevOpsGuru ResourceCollections](https://docs.aws.amazon.com/devopsguru/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-devopsguru-resourcecollection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcecollection = await AWS.DevOpsGuru.ResourceCollection("resourcecollection-example", {
  ResourceCollectionFilter: "example-resourcecollectionfilter",
});
```

