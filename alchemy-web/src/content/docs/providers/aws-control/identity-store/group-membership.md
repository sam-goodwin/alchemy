---
title: GroupMembership
description: Learn how to create, update, and manage AWS IdentityStore GroupMemberships using Alchemy Cloud Control.
---


The GroupMembership resource allows you to manage memberships of users in groups within the AWS IdentityStore. You can create, update, and delete group memberships to ensure proper user-group associations. For more information, refer to the [AWS IdentityStore GroupMemberships documentation](https://docs.aws.amazon.com/identitystore/latest/userguide/).

## Minimal Example

Create a basic group membership for a user within a specified identity store and group.

```ts
import AWS from "alchemy/aws/control";

const basicGroupMembership = await AWS.IdentityStore.GroupMembership("basicMembership", {
  MemberId: "user-123456",
  IdentityStoreId: "identity-store-abc",
  GroupId: "group-7891011"
});
```

## Advanced Configuration

Configure a group membership while adopting an existing resource instead of failing if it already exists.

```ts
const advancedGroupMembership = await AWS.IdentityStore.GroupMembership("advancedMembership", {
  MemberId: "user-654321",
  IdentityStoreId: "identity-store-xyz",
  GroupId: "group-12131415",
  adopt: true // Allows adopting an existing resource
});
```

## Managing Multiple Group Memberships

Create multiple group memberships for different users in a single operation.

```ts
const firstMembership = await AWS.IdentityStore.GroupMembership("firstMembership", {
  MemberId: "user-111111",
  IdentityStoreId: "identity-store-abc",
  GroupId: "group-123456"
});

const secondMembership = await AWS.IdentityStore.GroupMembership("secondMembership", {
  MemberId: "user-222222",
  IdentityStoreId: "identity-store-abc",
  GroupId: "group-123456"
});
```

## Deleting a Group Membership

Remove a user from a group by deleting their group membership.

```ts
const deleteMembership = await AWS.IdentityStore.GroupMembership("deleteMembership", {
  MemberId: "user-333333",
  IdentityStoreId: "identity-store-abc",
  GroupId: "group-123456"
});

// You can implement deletion logic based on your application needs here.
```
