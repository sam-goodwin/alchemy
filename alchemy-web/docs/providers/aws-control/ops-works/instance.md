---
title: Managing AWS OpsWorks Instances with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you create and manage [AWS OpsWorks Instances](https://docs.aws.amazon.com/opsworks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworks-instance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instance = await AWS.OpsWorks.Instance("instance-example", {
  InstanceType: "example-instancetype",
  LayerIds: ["example-layerids-1"],
  StackId: "example-stackid",
});
```

