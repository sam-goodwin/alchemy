---
title: Managing AWS QBusiness DataAccessors with Alchemy
description: Learn how to create, update, and manage AWS QBusiness DataAccessors using Alchemy Cloud Control.
---

# DataAccessor

The DataAccessor resource lets you create and manage [AWS QBusiness DataAccessors](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-dataaccessor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataaccessor = await AWS.QBusiness.DataAccessor("dataaccessor-example", {
  DisplayName: "dataaccessor-display",
  ActionConfigurations: [],
  ApplicationId: "example-applicationid",
  Principal: "example-principal",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dataaccessor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataAccessor = await AWS.QBusiness.DataAccessor("advanced-dataaccessor", {
  DisplayName: "dataaccessor-display",
  ActionConfigurations: [],
  ApplicationId: "example-applicationid",
  Principal: "example-principal",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

