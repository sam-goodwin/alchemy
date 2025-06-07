---
title: Managing AWS IdentityStore GroupMemberships with Alchemy
description: Learn how to create, update, and manage AWS IdentityStore GroupMemberships using Alchemy Cloud Control.
---

# GroupMembership

The GroupMembership resource lets you create and manage [AWS IdentityStore GroupMemberships](https://docs.aws.amazon.com/identitystore/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-identitystore-groupmembership.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const groupmembership = await AWS.IdentityStore.GroupMembership("groupmembership-example", {
  MemberId: "example-memberid",
  IdentityStoreId: "example-identitystoreid",
  GroupId: "example-groupid",
});
```

