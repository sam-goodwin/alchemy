---
title: Managing AWS CleanRooms IdNamespaceAssociations with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms IdNamespaceAssociations using Alchemy Cloud Control.
---

# IdNamespaceAssociation

The IdNamespaceAssociation resource lets you create and manage [AWS CleanRooms IdNamespaceAssociations](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-idnamespaceassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const idnamespaceassociation = await AWS.CleanRooms.IdNamespaceAssociation(
  "idnamespaceassociation-example",
  {
    MembershipIdentifier: "example-membershipidentifier",
    InputReferenceConfig: "example-inputreferenceconfig",
    Name: "idnamespaceassociation-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A idnamespaceassociation resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a idnamespaceassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIdNamespaceAssociation = await AWS.CleanRooms.IdNamespaceAssociation(
  "advanced-idnamespaceassociation",
  {
    MembershipIdentifier: "example-membershipidentifier",
    InputReferenceConfig: "example-inputreferenceconfig",
    Name: "idnamespaceassociation-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A idnamespaceassociation resource managed by Alchemy",
  }
);
```

