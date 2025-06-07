---
title: Managing AWS MediaConnect BridgeOutputs with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect BridgeOutputs using Alchemy Cloud Control.
---

# BridgeOutput

The BridgeOutput resource lets you create and manage [AWS MediaConnect BridgeOutputs](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-bridgeoutput.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bridgeoutput = await AWS.MediaConnect.BridgeOutput("bridgeoutput-example", {
  BridgeArn: "example-bridgearn",
  NetworkOutput: "example-networkoutput",
  Name: "bridgeoutput-",
});
```

