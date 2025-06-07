---
title: Managing AWS Greengrass SubscriptionDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass SubscriptionDefinitionVersions using Alchemy Cloud Control.
---

# SubscriptionDefinitionVersion

The SubscriptionDefinitionVersion resource lets you create and manage [AWS Greengrass SubscriptionDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-subscriptiondefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subscriptiondefinitionversion = await AWS.Greengrass.SubscriptionDefinitionVersion(
  "subscriptiondefinitionversion-example",
  { SubscriptionDefinitionId: "example-subscriptiondefinitionid", Subscriptions: [] }
);
```

