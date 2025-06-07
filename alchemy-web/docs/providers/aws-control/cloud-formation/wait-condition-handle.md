---
title: Managing AWS CloudFormation WaitConditionHandles with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation WaitConditionHandles using Alchemy Cloud Control.
---

# WaitConditionHandle

The WaitConditionHandle resource allows you to manage [AWS CloudFormation WaitConditionHandles](https://docs.aws.amazon.com/cloudformation/latest/userguide/), which are used to coordinate the creation of AWS resources by signaling when a given condition is met. This is particularly useful in scenarios where you need to wait for an asynchronous process to complete before proceeding with stack creation.

## Minimal Example

Create a basic WaitConditionHandle with the default properties.

```ts
import AWS from "alchemy/aws/control";

const BasicWaitConditionHandle = await AWS.CloudFormation.WaitConditionHandle("BasicWaitConditionHandle", {
  adopt: false // Default is false: Do not adopt existing resources
});
```

## Advanced Configuration

Configure a WaitConditionHandle with the adoption of existing resources.

```ts
const AdvancedWaitConditionHandle = await AWS.CloudFormation.WaitConditionHandle("AdvancedWaitConditionHandle", {
  adopt: true // Adopt an existing resource if it already exists
});
```

## Use Case with Wait Conditions

Create a WaitConditionHandle that can be used to signal the completion of a resource creation process.

```ts
import AWS from "alchemy/aws/control";

const ResourceWaitConditionHandle = await AWS.CloudFormation.WaitConditionHandle("ResourceWaitConditionHandle", {
  adopt: false
});

// Use this handle in conjunction with a WaitCondition resource
const WaitCondition = await AWS.CloudFormation.WaitCondition("MyWaitCondition", {
  Handle: ResourceWaitConditionHandle.Arn,
  Timeout: "300", // Timeout in seconds
  Count: 1 // Number of signals to wait for
});
```