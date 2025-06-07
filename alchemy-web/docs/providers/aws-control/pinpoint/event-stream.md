---
title: Managing AWS Pinpoint EventStreams with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint EventStreams using Alchemy Cloud Control.
---

# EventStream

The EventStream resource lets you create and manage [AWS Pinpoint EventStreams](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-eventstream.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventstream = await AWS.Pinpoint.EventStream("eventstream-example", {
  ApplicationId: "example-applicationid",
  DestinationStreamArn: "example-destinationstreamarn",
  RoleArn: "example-rolearn",
});
```

