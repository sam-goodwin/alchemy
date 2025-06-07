---
title: Managing AWS IdentityStore Groups with Alchemy
description: Learn how to create, update, and manage AWS IdentityStore Groups using Alchemy Cloud Control.
---

# Group

The Group resource lets you create and manage [AWS IdentityStore Groups](https://docs.aws.amazon.com/identitystore/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-identitystore-group.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const group = await AWS.IdentityStore.Group("group-example", {
  DisplayName: "group-display",
  IdentityStoreId: "example-identitystoreid",
  Description: "A group resource managed by Alchemy",
});
```

## Advanced Configuration

Create a group with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGroup = await AWS.IdentityStore.Group("advanced-group", {
  DisplayName: "group-display",
  IdentityStoreId: "example-identitystoreid",
  Description: "A group resource managed by Alchemy",
});
```

