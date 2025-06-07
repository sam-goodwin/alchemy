---
title: Managing AWS ApiGateway UsagePlanKeys with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway UsagePlanKeys using Alchemy Cloud Control.
---

# UsagePlanKey

The UsagePlanKey resource lets you create and manage [AWS ApiGateway UsagePlanKeys](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-usageplankey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const usageplankey = await AWS.ApiGateway.UsagePlanKey("usageplankey-example", {
  KeyType: "example-keytype",
  UsagePlanId: "example-usageplanid",
  KeyId: "example-keyid",
});
```

