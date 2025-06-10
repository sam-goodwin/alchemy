---
title: WaitConditionHandle
description: Learn how to create, update, and manage AWS CloudFormation WaitConditionHandles using Alchemy Cloud Control.
---


The WaitConditionHandle resource in AWS CloudFormation allows you to create a handle that can be used with a WaitCondition to wait for a signal before proceeding with resource creation. This is particularly useful in scenarios where you need to wait for resources to be fully provisioned or initialized before continuing. For more information, see the [AWS CloudFormation WaitConditionHandles documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic WaitConditionHandle with default properties.

```ts
import AWS from "alchemy/aws/control";

const waitConditionHandle = await AWS.CloudFormation.WaitConditionHandle("BasicWaitHandle", {
  adopt: false // This handle will not adopt existing resources
});
```

## Advanced Configuration

Configure a WaitConditionHandle to adopt an existing resource if it already exists.

```ts
const advancedWaitConditionHandle = await AWS.CloudFormation.WaitConditionHandle("AdvancedWaitHandle", {
  adopt: true // This handle will adopt an existing resource if found
});
```

## Usage with WaitCondition

This example demonstrates how to use a WaitConditionHandle with a WaitCondition to ensure resources are created in a specific order.

```ts
import AWS from "alchemy/aws/control";

const waitHandle = await AWS.CloudFormation.WaitConditionHandle("MyWaitHandle", {
  adopt: false
});

const waitCondition = await AWS.CloudFormation.WaitCondition("MyWaitCondition", {
  handle: waitHandle.arn, // Reference the ARN of the WaitConditionHandle
  timeout: "300", // Wait for a maximum of 300 seconds
  count: 1 // Wait for one signal
});
```

## Monitoring Creation Time

Here's how to access the creation time of the WaitConditionHandle after it's been created.

```ts
const waitHandle = await AWS.CloudFormation.WaitConditionHandle("MonitoringWaitHandle", {
  adopt: false
});

// Accessing the creation time
console.log(`WaitConditionHandle Created At: ${waitHandle.creationTime}`);
```
