---
title: Managing AWS CleanRooms ConfiguredTableAssociations with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms ConfiguredTableAssociations using Alchemy Cloud Control.
---

# ConfiguredTableAssociation

The ConfiguredTableAssociation resource lets you create and manage [AWS CleanRooms ConfiguredTableAssociations](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-configuredtableassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configuredtableassociation = await AWS.CleanRooms.ConfiguredTableAssociation(
  "configuredtableassociation-example",
  {
    MembershipIdentifier: "example-membershipidentifier",
    ConfiguredTableIdentifier: "example-configuredtableidentifier",
    RoleArn: "example-rolearn",
    Name: "configuredtableassociation-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A configuredtableassociation resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a configuredtableassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfiguredTableAssociation = await AWS.CleanRooms.ConfiguredTableAssociation(
  "advanced-configuredtableassociation",
  {
    MembershipIdentifier: "example-membershipidentifier",
    ConfiguredTableIdentifier: "example-configuredtableidentifier",
    RoleArn: "example-rolearn",
    Name: "configuredtableassociation-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A configuredtableassociation resource managed by Alchemy",
  }
);
```

