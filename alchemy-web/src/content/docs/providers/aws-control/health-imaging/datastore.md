---
title: Datastore
description: Learn how to create, update, and manage AWS HealthImaging Datastores using Alchemy Cloud Control.
---


The Datastore resource lets you manage [AWS HealthImaging Datastores](https://docs.aws.amazon.com/healthimaging/latest/userguide/) for storing and retrieving medical imaging data.

## Minimal Example

Create a basic HealthImaging Datastore with a specified name and an optional KMS key for encryption.

```ts
import AWS from "alchemy/aws/control";

const basicDatastore = await AWS.HealthImaging.Datastore("basic-datastore", {
  DatastoreName: "patient-imaging-data",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-1234567890ab"
});
```

## Advanced Configuration

Configure a datastore with tags for better resource management and organization.

```ts
const taggedDatastore = await AWS.HealthImaging.Datastore("tagged-datastore", {
  DatastoreName: "research-study-images",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-1234567890ab",
  Tags: {
    Project: "Medical Research",
    Environment: "Production"
  }
});
```

## Adoption of Existing Resources

Adopt an existing HealthImaging Datastore instead of failing if the resource already exists.

```ts
const adoptExistingDatastore = await AWS.HealthImaging.Datastore("adopt-datastore", {
  DatastoreName: "legacy-datastore",
  adopt: true
});
```
