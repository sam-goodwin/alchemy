---
title: UserHierarchyStructure
description: Learn how to create, update, and manage AWS Connect UserHierarchyStructures using Alchemy Cloud Control.
---


The UserHierarchyStructure resource allows you to manage the user hierarchy within AWS Connect, enabling you to define the organizational structure of your contact center. This resource is essential for setting up users, groups, and their respective hierarchy in a Connect instance. For more details, visit the [AWS Connect UserHierarchyStructures documentation](https://docs.aws.amazon.com/connect/latest/userguide/).

## Minimal Example

Create a basic user hierarchy structure for an AWS Connect instance with a single level of hierarchy.

```ts
import AWS from "alchemy/aws/control";

const userHierarchy = await AWS.Connect.UserHierarchyStructure("basicUserHierarchy", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstu",
  UserHierarchyStructure: {
    Levels: [
      {
        Name: "Agents",
        Id: "level1",
        HierarchyPath: "Agents"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a more complex user hierarchy structure with multiple levels.

```ts
const advancedUserHierarchy = await AWS.Connect.UserHierarchyStructure("advancedUserHierarchy", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstu",
  UserHierarchyStructure: {
    Levels: [
      {
        Name: "Executives",
        Id: "level1",
        HierarchyPath: "Executives"
      },
      {
        Name: "Managers",
        Id: "level2",
        HierarchyPath: "Executives/Managers"
      },
      {
        Name: "Agents",
        Id: "level3",
        HierarchyPath: "Executives/Managers/Agents"
      }
    ]
  }
});
```

## Adopting Existing Hierarchy

If you want to adopt an existing user hierarchy structure without creating a new one, you can set the `adopt` property to true.

```ts
const adoptedUserHierarchy = await AWS.Connect.UserHierarchyStructure("adoptedUserHierarchy", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstu",
  UserHierarchyStructure: {
    Levels: [
      {
        Name: "Support",
        Id: "level1",
        HierarchyPath: "Support"
      }
    ]
  },
  adopt: true
});
```
