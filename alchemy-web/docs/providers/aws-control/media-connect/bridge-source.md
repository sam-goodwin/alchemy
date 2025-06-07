---
title: Managing AWS MediaConnect BridgeSources with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect BridgeSources using Alchemy Cloud Control.
---

# BridgeSource

The BridgeSource resource lets you create and manage [AWS MediaConnect BridgeSources](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-bridgesource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bridgesource = await AWS.MediaConnect.BridgeSource("bridgesource-example", {
  BridgeArn: "example-bridgearn",
  Name: "bridgesource-",
});
```

