---
title: Managing AWS SupportApp AccountAliass with Alchemy
description: Learn how to create, update, and manage AWS SupportApp AccountAliass using Alchemy Cloud Control.
---

# AccountAlias

The AccountAlias resource lets you create and manage [AWS SupportApp AccountAliass](https://docs.aws.amazon.com/supportapp/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-supportapp-accountalias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accountalias = await AWS.SupportApp.AccountAlias("accountalias-example", {
  AccountAlias: "example-accountalias",
});
```

