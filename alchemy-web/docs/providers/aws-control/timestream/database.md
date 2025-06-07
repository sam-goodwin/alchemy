---
title: Managing AWS Timestream Databases with Alchemy
description: Learn how to create, update, and manage AWS Timestream Databases using Alchemy Cloud Control.
---

# Database

The Database resource lets you manage [AWS Timestream Databases](https://docs.aws.amazon.com/timestream/latest/userguide/) and their associated configurations.

## Minimal Example

Create a basic Timestream database with a name and optional KMS key for encryption.

```ts
import AWS from "alchemy/aws/control";

const TimestreamDatabase = await AWS.Timestream.Database("MyTimestreamDatabase", {
  DatabaseName: "MetricsDatabase",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Advanced Configuration

Configure a Timestream database with adoption of an existing resource.

```ts
const ExistingTimestreamDatabase = await AWS.Timestream.Database("ExistingDatabase", {
  DatabaseName: "ExistingMetricsDatabase",
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Database with No Tags

Create a Timestream database without any tags for simpler use cases.

```ts
const SimpleTimestreamDatabase = await AWS.Timestream.Database("SimpleDatabase", {
  DatabaseName: "SimpleMetricsDatabase"
});
```

## Database with Only KMS Key

Provision a Timestream database using only a KMS key for encryption, omitting all other properties.

```ts
const KMSOnlyTimestreamDatabase = await AWS.Timestream.Database("KMSDatabase", {
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/xyz9876-xyz9-9876-xyz9-9876xyz9876"
});
```