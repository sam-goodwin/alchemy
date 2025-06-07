---
title: Managing AWS MediaConnect FlowSources with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect FlowSources using Alchemy Cloud Control.
---

# FlowSource

The FlowSource resource lets you create and manage [AWS MediaConnect FlowSources](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-flowsource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowsource = await AWS.MediaConnect.FlowSource("flowsource-example", {
  Description: "A flowsource resource managed by Alchemy",
  Name: "flowsource-",
});
```

