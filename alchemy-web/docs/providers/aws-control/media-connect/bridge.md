---
title: Managing AWS MediaConnect Bridges with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect Bridges using Alchemy Cloud Control.
---

# Bridge

The Bridge resource lets you create and manage [AWS MediaConnect Bridges](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-bridge.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bridge = await AWS.MediaConnect.Bridge("bridge-example", {
  PlacementArn: "example-placementarn",
  Sources: [],
  Name: "bridge-",
});
```

