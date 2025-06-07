---
title: Managing AWS EntityResolution IdNamespaces with Alchemy
description: Learn how to create, update, and manage AWS EntityResolution IdNamespaces using Alchemy Cloud Control.
---

# IdNamespace

The IdNamespace resource lets you create and manage [AWS EntityResolution IdNamespaces](https://docs.aws.amazon.com/entityresolution/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-entityresolution-idnamespace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const idnamespace = await AWS.EntityResolution.IdNamespace("idnamespace-example", {
  IdNamespaceName: "idnamespace-idspacename",
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A idnamespace resource managed by Alchemy",
});
```

## Advanced Configuration

Create a idnamespace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIdNamespace = await AWS.EntityResolution.IdNamespace("advanced-idnamespace", {
  IdNamespaceName: "idnamespace-idspacename",
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A idnamespace resource managed by Alchemy",
});
```

