---
title: Managing AWS Connect SecurityKeys with Alchemy
description: Learn how to create, update, and manage AWS Connect SecurityKeys using Alchemy Cloud Control.
---

# SecurityKey

The SecurityKey resource lets you create and manage [AWS Connect SecurityKeys](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-securitykey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securitykey = await AWS.Connect.SecurityKey("securitykey-example", {
  InstanceId: "example-instanceid",
  Key: "example-key",
});
```

