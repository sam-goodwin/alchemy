---
title: WaitCondition
description: Learn how to create, update, and manage AWS CloudFormation WaitConditions using Alchemy Cloud Control.
---


The WaitCondition resource allows you to create a wait condition in AWS CloudFormation that pauses the stack creation until a specified number of signals are received. This is useful for coordinating the completion of asynchronous tasks. You can learn more in the [AWS CloudFormation WaitConditions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic WaitCondition that waits for 2 signals and has a timeout of 300 seconds.

```ts
import AWS from "alchemy/aws/control";

const waitCondition = await AWS.CloudFormation.WaitCondition("BasicWaitCondition", {
  Count: 2,
  Handle: "arn:aws:sns:us-east-1:123456789012:MyWaitConditionHandle",
  Timeout: "300"
});
```

## Advanced Configuration

Create a WaitCondition that adopts an existing resource if it already exists.

```ts
const advancedWaitCondition = await AWS.CloudFormation.WaitCondition("AdvancedWaitCondition", {
  Count: 3,
  Handle: "arn:aws:sns:us-east-1:123456789012:MyAdvancedWaitConditionHandle",
  Timeout: "600",
  adopt: true
});
```

## WaitCondition with Custom Handle

Demonstrate how to set a custom handle for the WaitCondition, which can be useful for integrating with other AWS services.

```ts
const customHandleWaitCondition = await AWS.CloudFormation.WaitCondition("CustomHandleWaitCondition", {
  Count: 1,
  Handle: "arn:aws:sns:us-east-1:123456789012:CustomHandle",
  Timeout: "120"
});
```

## Handling Timeout Scenarios

Configure a WaitCondition with a specific timeout to manage potential delays in signal receipt.

```ts
const timeoutWaitCondition = await AWS.CloudFormation.WaitCondition("TimeoutWaitCondition", {
  Count: 5,
  Handle: "arn:aws:sns:us-east-1:123456789012:TimeoutHandle",
  Timeout: "180"
});
```
