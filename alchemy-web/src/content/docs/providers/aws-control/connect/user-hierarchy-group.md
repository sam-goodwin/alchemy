---
title: UserHierarchyGroup
description: Learn how to create, update, and manage AWS Connect UserHierarchyGroups using Alchemy Cloud Control.
---


The UserHierarchyGroup resource lets you manage [AWS Connect UserHierarchyGroups](https://docs.aws.amazon.com/connect/latest/userguide/) for organizing users within contact centers.

## Minimal Example

Create a basic UserHierarchyGroup with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const userHierarchyGroup = await AWS.Connect.UserHierarchyGroup("basicUserGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Name: "Support Team",
  ParentGroupArn: "arn:aws:connect:us-east-1:123456789012:usermanagement:abcd1234-abcd-1234-abcd-1234abcd5678",
  Tags: [
    { Key: "Department", Value: "Support" },
    { Key: "Location", Value: "Remote" }
  ]
});
```

## Advanced Configuration

Configure a UserHierarchyGroup with additional properties such as tags for detailed categorization.

```ts
const advancedUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("advancedUserGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Name: "Sales Team",
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Region", Value: "North America" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Hierarchical Structure Example

Create a UserHierarchyGroup that builds out a sub-group within an existing hierarchy.

```ts
const managementGroup = await AWS.Connect.UserHierarchyGroup("managementGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Name: "Management Team",
  ParentGroupArn: "arn:aws:connect:us-east-1:123456789012:usermanagement:abcd1234-abcd-1234-abcd-1234abcd5678",
  Tags: [
    { Key: "Role", Value: "Management" }
  ]
});
```

## Group without Parent Example

Create a UserHierarchyGroup without specifying a parent, making it a top-level group.

```ts
const topLevelGroup = await AWS.Connect.UserHierarchyGroup("topLevelGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Name: "Top Level Group"
});
```
