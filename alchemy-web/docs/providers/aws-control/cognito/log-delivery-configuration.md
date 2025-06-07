---
title: Managing AWS Cognito LogDeliveryConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Cognito LogDeliveryConfigurations using Alchemy Cloud Control.
---

# LogDeliveryConfiguration

The LogDeliveryConfiguration resource lets you create and manage [AWS Cognito LogDeliveryConfigurations](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-logdeliveryconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const logdeliveryconfiguration = await AWS.Cognito.LogDeliveryConfiguration(
  "logdeliveryconfiguration-example",
  { UserPoolId: "example-userpoolid" }
);
```

