---
title: Managing AWS AppStream Entitlements with Alchemy
description: Learn how to create, update, and manage AWS AppStream Entitlements using Alchemy Cloud Control.
---

# Entitlement

The Entitlement resource lets you create and manage [AWS AppStream Entitlements](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const entitlement = await AWS.AppStream.Entitlement("entitlement-example", {
  AppVisibility: "example-appvisibility",
  Attributes: [],
  StackName: "entitlement-stack",
  Name: "entitlement-",
  Description: "A entitlement resource managed by Alchemy",
});
```

## Advanced Configuration

Create a entitlement with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEntitlement = await AWS.AppStream.Entitlement("advanced-entitlement", {
  AppVisibility: "example-appvisibility",
  Attributes: [],
  StackName: "entitlement-stack",
  Name: "entitlement-",
  Description: "A entitlement resource managed by Alchemy",
});
```

