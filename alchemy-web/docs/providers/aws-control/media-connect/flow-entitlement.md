---
title: Managing AWS MediaConnect FlowEntitlements with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect FlowEntitlements using Alchemy Cloud Control.
---

# FlowEntitlement

The FlowEntitlement resource lets you create and manage [AWS MediaConnect FlowEntitlements](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-flowentitlement.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowentitlement = await AWS.MediaConnect.FlowEntitlement("flowentitlement-example", {
  Description: "A flowentitlement resource managed by Alchemy",
  Subscribers: ["example-subscribers-1"],
  FlowArn: "example-flowarn",
  Name: "flowentitlement-",
});
```

## Advanced Configuration

Create a flowentitlement with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlowEntitlement = await AWS.MediaConnect.FlowEntitlement("advanced-flowentitlement", {
  Description: "A flowentitlement resource managed by Alchemy",
  Subscribers: ["example-subscribers-1"],
  FlowArn: "example-flowarn",
  Name: "flowentitlement-",
  Encryption: { Enabled: true, KmsKeyId: "alias/aws/s3" },
});
```

