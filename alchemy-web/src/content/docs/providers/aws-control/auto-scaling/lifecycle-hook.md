---
title: LifecycleHook
description: Learn how to create, update, and manage AWS AutoScaling LifecycleHooks using Alchemy Cloud Control.
---


The LifecycleHook resource allows you to manage [AWS AutoScaling LifecycleHooks](https://docs.aws.amazon.com/autoscaling/latest/userguide/) which enable you to perform custom actions during the instance launch and termination process.

## Minimal Example

Create a basic LifecycleHook with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const lifecycleHook = await AWS.AutoScaling.LifecycleHook("myLifecycleHook", {
  LifecycleHookName: "InstanceLaunchHook",
  LifecycleTransition: "autoscaling:EC2_INSTANCE_LAUNCHING",
  AutoScalingGroupName: "myAutoScalingGroup",
  HeartbeatTimeout: 300 // Wait for up to 5 minutes for a heartbeat
});
```

## Advanced Configuration

Configure a LifecycleHook with additional parameters including notification settings and IAM role.

```ts
const advancedLifecycleHook = await AWS.AutoScaling.LifecycleHook("myAdvancedLifecycleHook", {
  LifecycleHookName: "InstanceTerminationHook",
  LifecycleTransition: "autoscaling:EC2_INSTANCE_TERMINATING",
  AutoScalingGroupName: "myAutoScalingGroup",
  HeartbeatTimeout: 600, // Wait for up to 10 minutes for a heartbeat
  NotificationTargetARN: "arn:aws:sns:us-west-2:123456789012:mySnsTopic",
  RoleARN: "arn:aws:iam::123456789012:role/myAutoScalingRole",
  DefaultResult: "ABANDON" // Default action to take if no heartbeat is received
});
```

## Using Notification Metadata

This example demonstrates how to include notification metadata for the LifecycleHook.

```ts
const lifecycleHookWithMetadata = await AWS.AutoScaling.LifecycleHook("myLifecycleHookWithMetadata", {
  LifecycleHookName: "InstanceLaunchHookWithMetadata",
  LifecycleTransition: "autoscaling:EC2_INSTANCE_LAUNCHING",
  AutoScalingGroupName: "myAutoScalingGroup",
  NotificationMetadata: JSON.stringify({ instanceId: "i-1234567890abcdef0", action: "launch" })
});
```

## Adopting Existing Resources

This example shows how to adopt an existing LifecycleHook resource instead of failing when it already exists.

```ts
const adoptLifecycleHook = await AWS.AutoScaling.LifecycleHook("myAdoptedLifecycleHook", {
  LifecycleHookName: "ExistingHook",
  LifecycleTransition: "autoscaling:EC2_INSTANCE_TERMINATING",
  AutoScalingGroupName: "myAutoScalingGroup",
  adopt: true // Adopt existing resource if it already exists
});
```
