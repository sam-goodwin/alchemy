---
title: TableBucket
description: Learn how to create, update, and manage AWS S3Tables TableBuckets using Alchemy Cloud Control.
---


The TableBucket resource allows you to manage [AWS S3Tables TableBuckets](https://docs.aws.amazon.com/s3tables/latest/userguide/) for storing and retrieving structured data in Amazon S3.

## Minimal Example

Create a basic TableBucket with a specified name and default settings.

```ts
import AWS from "alchemy/aws/control";

const basicTableBucket = await AWS.S3Tables.TableBucket("basicTableBucket", {
  TableBucketName: "my-data-bucket",
  EncryptionConfiguration: {
    EncryptionType: "AES256"
  }
});
```

## Advanced Configuration

Configure a TableBucket with advanced settings, including unreferenced file removal policies.

```ts
const advancedTableBucket = await AWS.S3Tables.TableBucket("advancedTableBucket", {
  TableBucketName: "my-advanced-data-bucket",
  EncryptionConfiguration: {
    EncryptionType: "aws:kms",
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef"
  },
  UnreferencedFileRemoval: {
    RemovalPolicy: "Delete",
    RemovalInterval: 30 // days
  },
  adopt: true // Adopt an existing TableBucket if it already exists
});
```

## File Management Use Case

Create a TableBucket that adopts an existing resource and specifies file management settings.

```ts
const fileManagementTableBucket = await AWS.S3Tables.TableBucket("fileManagementTableBucket", {
  TableBucketName: "my-file-management-bucket",
  UnreferencedFileRemoval: {
    RemovalPolicy: "Retain",
    RemovalInterval: 60 // days
  },
  adopt: true // Adopt existing resource instead of failing
});
```

## Secure Data Storage Example

Set up a TableBucket with encryption for secure data storage.

```ts
const secureDataTableBucket = await AWS.S3Tables.TableBucket("secureDataTableBucket", {
  TableBucketName: "my-secure-data-bucket",
  EncryptionConfiguration: {
    EncryptionType: "aws:kms",
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd5678-a123-456a-a12b-a123b4cd56ef"
  }
});
```
