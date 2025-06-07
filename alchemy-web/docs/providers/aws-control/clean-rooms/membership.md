---
title: Managing AWS CleanRooms Memberships with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms Memberships using Alchemy Cloud Control.
---

# Membership

The Membership resource lets you create and manage [AWS CleanRooms Memberships](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-membership.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const membership = await AWS.CleanRooms.Membership("membership-example", {
  CollaborationIdentifier: "example-collaborationidentifier",
  QueryLogStatus: "example-querylogstatus",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a membership with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMembership = await AWS.CleanRooms.Membership("advanced-membership", {
  CollaborationIdentifier: "example-collaborationidentifier",
  QueryLogStatus: "example-querylogstatus",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

