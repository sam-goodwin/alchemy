---
title: Managing AWS CertificateManager Accounts with Alchemy
description: Learn how to create, update, and manage AWS CertificateManager Accounts using Alchemy Cloud Control.
---

# Account

The Account resource lets you create and manage [AWS CertificateManager Accounts](https://docs.aws.amazon.com/certificatemanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-certificatemanager-account.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const account = await AWS.CertificateManager.Account("account-example", {
  ExpiryEventsConfiguration: "example-expiryeventsconfiguration",
});
```

