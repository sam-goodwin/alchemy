---
title: Managing AWS Location GeofenceCollections with Alchemy
description: Learn how to create, update, and manage AWS Location GeofenceCollections using Alchemy Cloud Control.
---

# GeofenceCollection

The GeofenceCollection resource lets you manage [AWS Location GeofenceCollections](https://docs.aws.amazon.com/location/latest/userguide/) for tracking geofences, which can be used to monitor location-based events.

## Minimal Example

Create a basic GeofenceCollection with a name and description.

```ts
import AWS from "alchemy/aws/control";

const BasicGeofenceCollection = await AWS.Location.GeofenceCollection("BasicGeofenceCollection", {
  CollectionName: "MyGeofenceCollection",
  Description: "This collection tracks geofences for our application.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Geolocation" }
  ]
});
```

## Advanced Configuration

Configure a GeofenceCollection with server-side encryption using a KMS key.

```ts
const EncryptedGeofenceCollection = await AWS.Location.GeofenceCollection("EncryptedGeofenceCollection", {
  CollectionName: "SecureGeofenceCollection",
  Description: "This collection tracks geofences with encryption.",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Geolocation" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing GeofenceCollection if it already exists, instead of creating a new one.

```ts
const AdoptExistingGeofenceCollection = await AWS.Location.GeofenceCollection("AdoptExistingGeofenceCollection", {
  CollectionName: "ExistingGeofenceCollection",
  adopt: true
});
```

## Updating a GeofenceCollection

Update the description of an existing GeofenceCollection.

```ts
const UpdatedGeofenceCollection = await AWS.Location.GeofenceCollection("UpdatedGeofenceCollection", {
  CollectionName: "MyGeofenceCollection",
  Description: "Updated description for tracking geofences."
});
```