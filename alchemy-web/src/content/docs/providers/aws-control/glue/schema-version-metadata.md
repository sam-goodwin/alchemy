---
title: SchemaVersionMetadata
description: Learn how to create, update, and manage AWS Glue SchemaVersionMetadatas using Alchemy Cloud Control.
---


The SchemaVersionMetadata resource allows you to manage metadata associated with specific schema versions in AWS Glue. This metadata can be useful for tracking and managing schema evolution over time. For more information, visit the [AWS Glue SchemaVersionMetadatas](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

Create a basic SchemaVersionMetadata resource with required properties.

```ts
import AWS from "alchemy/aws/control";

const schemaVersionMetadata = await AWS.Glue.SchemaVersionMetadata("mySchemaVersionMetadata", {
  SchemaVersionId: "1234567890abcdef",
  Key: "description",
  Value: "This schema version describes user data."
});
```

## Advanced Configuration

You can also use the `adopt` option to adopt an existing resource if it already exists.

```ts
const existingSchemaVersionMetadata = await AWS.Glue.SchemaVersionMetadata("existingSchemaVersionMetadata", {
  SchemaVersionId: "1234567890abcdef",
  Key: "lastUpdated",
  Value: "2023-10-01T12:00:00Z",
  adopt: true // Adopt the existing resource if it already exists
});
```

## Example with Additional Metadata

Create a SchemaVersionMetadata resource that includes additional metadata.

```ts
const additionalMetadata = await AWS.Glue.SchemaVersionMetadata("additionalMetadata", {
  SchemaVersionId: "abcdef1234567890",
  Key: "author",
  Value: "John Doe"
});
```

## Example for Multiple Metadata Entries

You can create multiple SchemaVersionMetadata entries for a single schema version to track different aspects.

```ts
const authorMetadata = await AWS.Glue.SchemaVersionMetadata("authorMetadata", {
  SchemaVersionId: "abcdef1234567890",
  Key: "author",
  Value: "Jane Smith"
});

const versionMetadata = await AWS.Glue.SchemaVersionMetadata("versionMetadata", {
  SchemaVersionId: "abcdef1234567890",
  Key: "version",
  Value: "1.0.0"
});
```
