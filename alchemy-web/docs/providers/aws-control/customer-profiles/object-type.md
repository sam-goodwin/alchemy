---
title: Managing AWS CustomerProfiles ObjectTypes with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles ObjectTypes using Alchemy Cloud Control.
---

# ObjectType

The ObjectType resource lets you create and manage [AWS CustomerProfiles ObjectTypes](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-objecttype.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const objecttype = await AWS.CustomerProfiles.ObjectType("objecttype-example", {
  Description: "A objecttype resource managed by Alchemy",
  DomainName: "objecttype-domain",
  ObjectTypeName: "objecttype-objecttype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a objecttype with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedObjectType = await AWS.CustomerProfiles.ObjectType("advanced-objecttype", {
  Description: "A objecttype resource managed by Alchemy",
  DomainName: "objecttype-domain",
  ObjectTypeName: "objecttype-objecttype",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

