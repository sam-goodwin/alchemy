---
title: Managing AWS MSK ClusterPolicys with Alchemy
description: Learn how to create, update, and manage AWS MSK ClusterPolicys using Alchemy Cloud Control.
---

# ClusterPolicy

The ClusterPolicy resource lets you create and manage [AWS MSK ClusterPolicys](https://docs.aws.amazon.com/msk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-clusterpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const clusterpolicy = await AWS.MSK.ClusterPolicy("clusterpolicy-example", {
  Policy: {},
  ClusterArn: "example-clusterarn",
});
```

