---
title: Managing AWS PaymentCryptography Aliass with Alchemy
description: Learn how to create, update, and manage AWS PaymentCryptography Aliass using Alchemy Cloud Control.
---

# Alias

The Alias resource lets you create and manage [AWS PaymentCryptography Aliass](https://docs.aws.amazon.com/paymentcryptography/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-paymentcryptography-alias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alias = await AWS.PaymentCryptography.Alias("alias-example", { AliasName: "alias-alias" });
```

