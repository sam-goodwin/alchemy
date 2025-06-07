---
title: Managing AWS Glue SchemaVersions with Alchemy
description: Learn how to create, update, and manage AWS Glue SchemaVersions using Alchemy Cloud Control.
---

# SchemaVersion

The SchemaVersion resource lets you create and manage [AWS Glue SchemaVersions](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schemaversion = await AWS.Glue.SchemaVersion("schemaversion-example", {
  SchemaDefinition: "example-schemadefinition",
  Schema: "example-schema",
});
```

