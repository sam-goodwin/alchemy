---
title: Database
description: Learn how to create, update, and manage AWS Timestream Databases using Alchemy Cloud Control.
---


The Database resource lets you manage [AWS Timestream Databases](https://docs.aws.amazon.com/timestream/latest/userguide/) for time-series data storage and analysis.

## Minimal Example

Create a basic Timestream database with a specified name and optional KMS key for encryption.

```ts
import AWS from "alchemy/aws/control";

const timestreamDatabase = await AWS.Timestream.Database("myTimestreamDatabase", {
  DatabaseName: "MyTimeSeriesDB",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoT" }
  ]
});
```

## Advanced Configuration

Create a Timestream database with additional tags for better resource management.

```ts
const advancedTimestreamDatabase = await AWS.Timestream.Database("advancedTimestreamDatabase", {
  DatabaseName: "AdvancedTimeSeriesDB",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  Tags: [
    { Key: "Team", Value: "DataScience" },
    { Key: "CostCenter", Value: "12345" },
    { Key: "Compliance", Value: "GDPR" }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Example with Resource Adoption

This example demonstrates creating a Timestream database that adopts an existing resource, preventing failure if it already exists.

```ts
const adoptedDatabase = await AWS.Timestream.Database("adoptedDatabase", {
  DatabaseName: "ExistingTimeSeriesDB",
  adopt: true // This will attempt to adopt the existing resource
});
```

## Example with Encryption Key

This example shows how to create a Timestream database with a specified KMS key for enhanced security.

```ts
const secureDatabase = await AWS.Timestream.Database("secureTimestreamDatabase", {
  DatabaseName: "SecureTimeSeriesDB",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-secure-key",
  Tags: [
    { Key: "Security", Value: "High" }
  ]
});
```
