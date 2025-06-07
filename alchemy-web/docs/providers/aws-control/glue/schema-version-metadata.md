---
title: Managing AWS Glue SchemaVersionMetadatas with Alchemy
description: Learn how to create, update, and manage AWS Glue SchemaVersionMetadatas using Alchemy Cloud Control.
---

# SchemaVersionMetadata

The SchemaVersionMetadata resource lets you create and manage [AWS Glue SchemaVersionMetadatas](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schemaversionmetadata = await AWS.Glue.SchemaVersionMetadata(
  "schemaversionmetadata-example",
  { SchemaVersionId: "example-schemaversionid", Value: "example-value", Key: "example-key" }
);
```

