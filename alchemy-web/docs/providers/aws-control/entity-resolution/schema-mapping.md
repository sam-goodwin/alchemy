---
title: Managing AWS EntityResolution SchemaMappings with Alchemy
description: Learn how to create, update, and manage AWS EntityResolution SchemaMappings using Alchemy Cloud Control.
---

# SchemaMapping

The SchemaMapping resource lets you create and manage [AWS EntityResolution SchemaMappings](https://docs.aws.amazon.com/entityresolution/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-entityresolution-schemamapping.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schemamapping = await AWS.EntityResolution.SchemaMapping("schemamapping-example", {
  MappedInputFields: [],
  SchemaName: "schemamapping-schema",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A schemamapping resource managed by Alchemy",
});
```

## Advanced Configuration

Create a schemamapping with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSchemaMapping = await AWS.EntityResolution.SchemaMapping("advanced-schemamapping", {
  MappedInputFields: [],
  SchemaName: "schemamapping-schema",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A schemamapping resource managed by Alchemy",
});
```

