---
title: Managing AWS Connect UserHierarchyGroups with Alchemy
description: Learn how to create, update, and manage AWS Connect UserHierarchyGroups using Alchemy Cloud Control.
---

# UserHierarchyGroup

The UserHierarchyGroup resource lets you manage [AWS Connect UserHierarchyGroups](https://docs.aws.amazon.com/connect/latest/userguide/) that define the grouping of users within your Amazon Connect instance. This resource allows you to structure your users and optimize their experience within the contact center.

## Minimal Example

Create a basic UserHierarchyGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("BasicHierarchyGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abc123def456",
  Name: "Basic Support Team",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure a UserHierarchyGroup with a parent group and multiple tags.

```ts
const AdvancedUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("AdvancedHierarchyGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abc123def456",
  ParentGroupArn: "arn:aws:connect:us-east-1:123456789012:user-hierarchy-group/parent-group",
  Name: "Advanced Support Team",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Support" }
  ]
});
```

## Adoption of Existing Resource

Create a UserHierarchyGroup while adopting an existing resource if it already exists.

```ts
const AdoptedUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("AdoptedHierarchyGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abc123def456",
  Name: "Adopted Support Team",
  adopt: true
});
```

## Hierarchical Structure

Define a UserHierarchyGroup within a more complex hierarchy with multiple nested groups.

```ts
const ParentUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("ParentHierarchyGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abc123def456",
  Name: "Parent Support Team"
});

const ChildUserHierarchyGroup = await AWS.Connect.UserHierarchyGroup("ChildHierarchyGroup", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abc123def456",
  ParentGroupArn: ParentUserHierarchyGroup.Arn,
  Name: "Child Support Team"
});
```