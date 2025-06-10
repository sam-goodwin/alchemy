---
title: ConfiguredTableAssociation
description: Learn how to create, update, and manage AWS CleanRooms ConfiguredTableAssociations using Alchemy Cloud Control.
---


The ConfiguredTableAssociation resource allows you to manage associations between configured tables and memberships in AWS CleanRooms. This resource enables you to set analysis rules and manage access through IAM policies. For more information, refer to the [AWS CleanRooms ConfiguredTableAssociations documentation](https://docs.aws.amazon.com/cleanrooms/latest/userguide/).

## Minimal Example

Create a basic ConfiguredTableAssociation with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicConfiguredTableAssociation = await AWS.CleanRooms.ConfiguredTableAssociation("basicAssociation", {
  MembershipIdentifier: "membership-123456",
  ConfiguredTableIdentifier: "configured-table-abc",
  RoleArn: "arn:aws:iam::123456789012:role/CleanRoomsRole",
  Name: "Basic Association",
  Description: "This is a basic configured table association"
});
```

## Advanced Configuration

Configure a more advanced ConfiguredTableAssociation with analysis rules and tags:

```ts
import AWS from "alchemy/aws/control";

const advancedConfiguredTableAssociation = await AWS.CleanRooms.ConfiguredTableAssociation("advancedAssociation", {
  MembershipIdentifier: "membership-123456",
  ConfiguredTableIdentifier: "configured-table-abc",
  RoleArn: "arn:aws:iam::123456789012:role/CleanRoomsRole",
  Name: "Advanced Association",
  ConfiguredTableAssociationAnalysisRules: [
    {
      Rule: "allow",
      Conditions: {
        Filter: "age > 21"
      }
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataAnalysis" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing ConfiguredTableAssociation instead of failing when it already exists, you can set the adopt property:

```ts
import AWS from "alchemy/aws/control";

const adoptedConfiguredTableAssociation = await AWS.CleanRooms.ConfiguredTableAssociation("adoptedAssociation", {
  MembershipIdentifier: "membership-123456",
  ConfiguredTableIdentifier: "configured-table-abc",
  RoleArn: "arn:aws:iam::123456789012:role/CleanRoomsRole",
  Name: "Adopted Association",
  adopt: true // This will adopt the existing resource
});
```
