---
title: Managing AWS KMS Aliass with Alchemy
description: Learn how to create, update, and manage AWS KMS Aliass using Alchemy Cloud Control.
---

# Alias

The Alias resource lets you create and manage [AWS KMS Aliass](https://docs.aws.amazon.com/kms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alias = await AWS.KMS.Alias("alias-example", {
  TargetKeyId: "example-targetkeyid",
  AliasName: "alias-alias",
});
```

