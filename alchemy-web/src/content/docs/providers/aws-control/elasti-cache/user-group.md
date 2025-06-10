---
title: UserGroup
description: Learn how to create, update, and manage AWS ElastiCache UserGroups using Alchemy Cloud Control.
---


The UserGroup resource allows you to manage [AWS ElastiCache UserGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) that provide access control for ElastiCache resources.

## Minimal Example

Create a basic UserGroup with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const userGroup = await AWS.ElastiCache.UserGroup("myUserGroup", {
  UserGroupId: "my-user-group-id",
  Engine: "redis",
  UserIds: ["user1", "user2"],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Create a UserGroup with additional properties, including the adoption option.

```ts
const advancedUserGroup = await AWS.ElastiCache.UserGroup("advancedUserGroup", {
  UserGroupId: "my-advanced-user-group-id",
  Engine: "memcached",
  UserIds: ["user3", "user4"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "MyProject" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Multiple Users

Illustrate creating a UserGroup with several user IDs.

```ts
const multiUserGroup = await AWS.ElastiCache.UserGroup("multiUserGroup", {
  UserGroupId: "my-multi-user-group-id",
  Engine: "redis",
  UserIds: [
    "user5",
    "user6",
    "user7",
    "user8"
  ],
  Tags: [
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## Example for Resource Management

Create a UserGroup specifically for resource management tasks.

```ts
const resourceManagementGroup = await AWS.ElastiCache.UserGroup("resourceManagementGroup", {
  UserGroupId: "resource-management-group-id",
  Engine: "redis",
  UserIds: ["adminUser"],
  Tags: [
    { Key: "AccessLevel", Value: "Admin" }
  ]
});
```
