---
title: Managing AWS CleanRooms Collaborations with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms Collaborations using Alchemy Cloud Control.
---

# Collaboration

The Collaboration resource lets you create and manage [AWS CleanRooms Collaborations](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-collaboration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const collaboration = await AWS.CleanRooms.Collaboration("collaboration-example", {
  CreatorDisplayName: "collaboration-creatordisplay",
  CreatorMemberAbilities: ["example-creatormemberabilities-1"],
  Description: "A collaboration resource managed by Alchemy",
  QueryLogStatus: "example-querylogstatus",
  Members: [],
  Name: "collaboration-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a collaboration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCollaboration = await AWS.CleanRooms.Collaboration("advanced-collaboration", {
  CreatorDisplayName: "collaboration-creatordisplay",
  CreatorMemberAbilities: ["example-creatormemberabilities-1"],
  Description: "A collaboration resource managed by Alchemy",
  QueryLogStatus: "example-querylogstatus",
  Members: [],
  Name: "collaboration-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

