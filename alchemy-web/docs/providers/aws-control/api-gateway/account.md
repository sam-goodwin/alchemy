---
title: Managing AWS ApiGateway Accounts with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Accounts using Alchemy Cloud Control.
---

# Account

The Account resource lets you create and manage [AWS ApiGateway Accounts](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-account.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const account = await AWS.ApiGateway.Account("account-example", {});
```

