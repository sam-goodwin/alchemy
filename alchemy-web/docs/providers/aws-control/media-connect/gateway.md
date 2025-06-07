---
title: Managing AWS MediaConnect Gateways with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect Gateways using Alchemy Cloud Control.
---

# Gateway

The Gateway resource lets you create and manage [AWS MediaConnect Gateways](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-gateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gateway = await AWS.MediaConnect.Gateway("gateway-example", {
  Networks: [],
  EgressCidrBlocks: ["example-egresscidrblocks-1"],
  Name: "gateway-",
});
```

