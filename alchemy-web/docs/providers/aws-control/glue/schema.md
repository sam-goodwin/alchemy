---
title: Managing AWS Glue Schemas with Alchemy
description: Learn how to create, update, and manage AWS Glue Schemas using Alchemy Cloud Control.
---

# Schema

The Schema resource lets you create and manage [AWS Glue Schemas](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schema = await AWS.Glue.Schema("schema-example", {
  DataFormat: "example-dataformat",
  Compatibility: "example-compatibility",
  Name: "schema-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A schema resource managed by Alchemy",
});
```

## Advanced Configuration

Create a schema with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSchema = await AWS.Glue.Schema("advanced-schema", {
  DataFormat: "example-dataformat",
  Compatibility: "example-compatibility",
  Name: "schema-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A schema resource managed by Alchemy",
});
```

