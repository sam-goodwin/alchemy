---
title: Managing AWS MediaConnect Flows with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect Flows using Alchemy Cloud Control.
---

# Flow

The Flow resource lets you create and manage [AWS MediaConnect Flows](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-flow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flow = await AWS.MediaConnect.Flow("flow-example", {
  Source: "example-source",
  Name: "flow-",
});
```

