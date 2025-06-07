---
title: Managing AWS S3 AccessGrantsLocations with Alchemy
description: Learn how to create, update, and manage AWS S3 AccessGrantsLocations using Alchemy Cloud Control.
---

# AccessGrantsLocation

The AccessGrantsLocation resource lets you manage access grants for S3 buckets in AWS, providing a way to specify IAM roles and locations for granting access. For more information, visit the [AWS S3 AccessGrantsLocations](https://docs.aws.amazon.com/s3/latest/userguide/).

## Minimal Example

Create a basic AccessGrantsLocation with essential properties:

```ts
import AWS from "alchemy/aws/control";

const accessGrantsLocation = await AWS.S3.AccessGrantsLocation("BasicAccessGrantsLocation", {
  LocationScope: "Bucket",
  IamRoleArn: "arn:aws:iam::123456789012:role/MyS3AccessRole",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure an AccessGrantsLocation with additional options such as adopting existing resources:

```ts
const advancedAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("AdvancedAccessGrantsLocation", {
  LocationScope: "Object",
  IamRoleArn: "arn:aws:iam::123456789012:role/MyS3ReadOnlyRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Custom IAM Role

Demonstrate how to create an AccessGrantsLocation with a specific IAM role and no tags:

```ts
const customRoleAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("CustomRoleAccessGrantsLocation", {
  LocationScope: "Bucket",
  IamRoleArn: "arn:aws:iam::123456789012:role/MyCustomS3Role"
});
```

## Example for Tagging and Resource Management

Create an AccessGrantsLocation while managing tags for better resource organization:

```ts
const taggedAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("TaggedAccessGrantsLocation", {
  LocationScope: "Object",
  IamRoleArn: "arn:aws:iam::123456789012:role/MyTaggedS3Role",
  Tags: [
    { Key: "Project", Value: "DataMigration" },
    { Key: "Owner", Value: "JohnDoe" }
  ]
});
```