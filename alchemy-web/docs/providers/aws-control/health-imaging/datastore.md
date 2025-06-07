---
title: Managing AWS HealthImaging Datastores with Alchemy
description: Learn how to create, update, and manage AWS HealthImaging Datastores using Alchemy Cloud Control.
---

# Datastore

The Datastore resource lets you manage [AWS HealthImaging Datastores](https://docs.aws.amazon.com/healthimaging/latest/userguide/) for storing and retrieving health imaging data.

## Minimal Example

Create a basic datastore with a specified name and KMS key for encryption.

```ts
import AWS from "alchemy/aws/control";

const BasicDatastore = await AWS.HealthImaging.Datastore("BasicHealthDatastore", {
  DatastoreName: "PatientImagesStore",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Advanced Configuration

Configure a datastore with additional options, including tags and adopting an existing resource.

```ts
const AdvancedDatastore = await AWS.HealthImaging.Datastore("AdvancedHealthDatastore", {
  DatastoreName: "AdvancedPatientImagesStore",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Research" }
  ],
  adopt: true
});
```

## Example with Minimal Tags

Create a datastore without specifying a KMS key, demonstrating the option of minimal configuration.

```ts
const MinimalTagDatastore = await AWS.HealthImaging.Datastore("MinimalTagDatastore", {
  DatastoreName: "MinimalPatientImagesStore",
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Example Using Only KMS Key

Create a datastore that only specifies a KMS key without any additional configurations.

```ts
const KmsOnlyDatastore = await AWS.HealthImaging.Datastore("KmsOnlyDatastore", {
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstuv"
});
```