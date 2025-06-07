---
title: Managing AWS MediaConnect FlowOutputs with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect FlowOutputs using Alchemy Cloud Control.
---

# FlowOutput

The FlowOutput resource lets you create and manage [AWS MediaConnect FlowOutputs](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-flowoutput.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowoutput = await AWS.MediaConnect.FlowOutput("flowoutput-example", {
  Protocol: "example-protocol",
  FlowArn: "example-flowarn",
  Description: "A flowoutput resource managed by Alchemy",
});
```

## Advanced Configuration

Create a flowoutput with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlowOutput = await AWS.MediaConnect.FlowOutput("advanced-flowoutput", {
  Protocol: "example-protocol",
  FlowArn: "example-flowarn",
  Description: "A flowoutput resource managed by Alchemy",
  Encryption: { Enabled: true, KmsKeyId: "alias/aws/s3" },
});
```

