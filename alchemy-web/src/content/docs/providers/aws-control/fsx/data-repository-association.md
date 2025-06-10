---
title: DataRepositoryAssociation
description: Learn how to create, update, and manage AWS FSx DataRepositoryAssociations using Alchemy Cloud Control.
---


The DataRepositoryAssociation resource allows you to manage associations between an FSx file system and an Amazon S3 data repository. For more details, refer to the [AWS FSx DataRepositoryAssociations documentation](https://docs.aws.amazon.com/fsx/latest/userguide/).

## Minimal Example

Create a basic DataRepositoryAssociation with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const dataRepositoryAssociation = await AWS.FSx.DataRepositoryAssociation("basicAssociation", {
  FileSystemPath: "/data",
  DataRepositoryPath: "s3://my-data-repo/path",
  FileSystemId: "fs-0123456789abcdef0",
  BatchImportMetaDataOnCreate: true
});
```

## Advanced Configuration

Configure a DataRepositoryAssociation with additional properties for chunk size and tags.

```ts
const advancedDataRepositoryAssociation = await AWS.FSx.DataRepositoryAssociation("advancedAssociation", {
  FileSystemPath: "/data",
  DataRepositoryPath: "s3://my-data-repo/advanced-path",
  FileSystemId: "fs-0123456789abcdef0",
  ImportedFileChunkSize: 1048576, // 1 MB
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataSync" }
  ]
});
```

## Example with Adoption of Existing Resource

Create a DataRepositoryAssociation that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingAssociation = await AWS.FSx.DataRepositoryAssociation("existingAssociation", {
  FileSystemPath: "/data",
  DataRepositoryPath: "s3://my-data-repo/existing-path",
  FileSystemId: "fs-0123456789abcdef0",
  adopt: true
});
```
