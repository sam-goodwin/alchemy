---
title: Managing AWS GlobalAccelerator Listeners with Alchemy
description: Learn how to create, update, and manage AWS GlobalAccelerator Listeners using Alchemy Cloud Control.
---

# Listener

The Listener resource lets you create and manage [AWS GlobalAccelerator Listeners](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-globalaccelerator-listener.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const listener = await AWS.GlobalAccelerator.Listener("listener-example", {
  PortRanges: [],
  AcceleratorArn: "example-acceleratorarn",
  Protocol: "example-protocol",
});
```

