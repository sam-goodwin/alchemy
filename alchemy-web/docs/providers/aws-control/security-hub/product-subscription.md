---
title: Managing AWS SecurityHub ProductSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub ProductSubscriptions using Alchemy Cloud Control.
---

# ProductSubscription

The ProductSubscription resource lets you create and manage [AWS SecurityHub ProductSubscriptions](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-productsubscription.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const productsubscription = await AWS.SecurityHub.ProductSubscription(
  "productsubscription-example",
  { ProductArn: "example-productarn" }
);
```

