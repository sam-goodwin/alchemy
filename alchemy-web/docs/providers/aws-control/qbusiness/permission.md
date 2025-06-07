---
title: Managing AWS QBusiness Permissions with Alchemy
description: Learn how to create, update, and manage AWS QBusiness Permissions using Alchemy Cloud Control.
---

# Permission

The Permission resource lets you create and manage [AWS QBusiness Permissions](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-permission.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const permission = await AWS.QBusiness.Permission("permission-example", {
  Actions: ["example-actions-1"],
  StatementId: "example-statementid",
  ApplicationId: "example-applicationid",
  Principal: "example-principal",
});
```

