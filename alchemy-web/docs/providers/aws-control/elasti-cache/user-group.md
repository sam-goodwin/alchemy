---
title: Managing AWS ElastiCache UserGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache UserGroups using Alchemy Cloud Control.
---

# UserGroup

The UserGroup resource allows you to manage [AWS ElastiCache UserGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for controlling access to your ElastiCache clusters.

## Minimal Example

Create a basic UserGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicUserGroup = await AWS.ElastiCache.UserGroup("BasicUserGroup", {
  UserGroupId: "user-group-1",
  Engine: "redis",
  UserIds: ["user-id-1", "user-id-2"],
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a UserGroup with multiple user IDs and additional tags.

```ts
const AdvancedUserGroup = await AWS.ElastiCache.UserGroup("AdvancedUserGroup", {
  UserGroupId: "user-group-2",
  Engine: "memcached",
  UserIds: ["user-id-3", "user-id-4", "user-id-5"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing UserGroup instead of failing when the resource already exists, you can set the `adopt` property.

```ts
const AdoptExistingUserGroup = await AWS.ElastiCache.UserGroup("AdoptExistingUserGroup", {
  UserGroupId: "existing-user-group-id",
  Engine: "redis",
  UserIds: ["user-id-6", "user-id-7"],
  adopt: true
});
```