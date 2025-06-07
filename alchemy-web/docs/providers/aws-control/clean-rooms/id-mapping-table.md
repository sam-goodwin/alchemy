---
title: Managing AWS CleanRooms IdMappingTables with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms IdMappingTables using Alchemy Cloud Control.
---

# IdMappingTable

The IdMappingTable resource lets you create and manage [AWS CleanRooms IdMappingTables](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-idmappingtable.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const idmappingtable = await AWS.CleanRooms.IdMappingTable("idmappingtable-example", {
  MembershipIdentifier: "example-membershipidentifier",
  InputReferenceConfig: "example-inputreferenceconfig",
  Name: "idmappingtable-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A idmappingtable resource managed by Alchemy",
});
```

## Advanced Configuration

Create a idmappingtable with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIdMappingTable = await AWS.CleanRooms.IdMappingTable("advanced-idmappingtable", {
  MembershipIdentifier: "example-membershipidentifier",
  InputReferenceConfig: "example-inputreferenceconfig",
  Name: "idmappingtable-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A idmappingtable resource managed by Alchemy",
});
```

