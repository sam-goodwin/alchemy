---
title: GeofenceCollection
description: Learn how to create, update, and manage AWS Location GeofenceCollections using Alchemy Cloud Control.
---


The GeofenceCollection resource allows you to manage [GeofenceCollections](https://docs.aws.amazon.com/location/latest/userguide/) in AWS Location Service, enabling you to define geofences for location-based applications.

## Minimal Example

Create a basic GeofenceCollection with a name and description:

```ts
import AWS from "alchemy/aws/control";

const geofenceCollection = await AWS.Location.GeofenceCollection("myGeofenceCollection", {
  CollectionName: "UserAreas",
  Description: "A collection of user-defined geofences for tracking activity.",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a GeofenceCollection with an optional KMS key for encryption:

```ts
const secureGeofenceCollection = await AWS.Location.GeofenceCollection("secureGeofenceCollection", {
  CollectionName: "SecureUserAreas",
  Description: "A secure collection of geofences with encryption.",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    { Key: "Project", Value: "GeofencingApp" },
    { Key: "Owner", Value: "TeamAlpha" }
  ]
});
```

## Adoption of Existing Resources

Create a GeofenceCollection while adopting an existing resource if it already exists:

```ts
const existingGeofenceCollection = await AWS.Location.GeofenceCollection("existingGeofenceCollection", {
  CollectionName: "ExistingUserAreas",
  adopt: true // Adopts the existing resource if found
});
```

## Using Tags for Resource Management

Create a GeofenceCollection with multiple tags for better resource management:

```ts
const taggedGeofenceCollection = await AWS.Location.GeofenceCollection("taggedGeofenceCollection", {
  CollectionName: "TaggedUserAreas",
  Description: "A collection of geofences tagged for better management.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "UseCase", Value: "Testing" }
  ]
});
```
