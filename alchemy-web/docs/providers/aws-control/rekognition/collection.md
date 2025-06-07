---
title: Managing AWS Rekognition Collections with Alchemy
description: Learn how to create, update, and manage AWS Rekognition Collections using Alchemy Cloud Control.
---

# Collection

The Collection resource allows you to manage [AWS Rekognition Collections](https://docs.aws.amazon.com/rekognition/latest/userguide/) which are used to store facial features for face recognition.

## Minimal Example

Create a basic Rekognition collection with a specified Collection ID and optional tags.

```ts
import AWS from "alchemy/aws/control";

const RekognitionCollection = await AWS.Rekognition.Collection("MyFirstCollection", {
  CollectionId: "MyCollectionId",
  Tags: [{ Key: "Project", Value: "FaceRecognition" }]
});
```

## Advanced Configuration

Set up a collection with adoption of existing resources enabled.

```ts
const ExistingCollection = await AWS.Rekognition.Collection("ExistingCollection", {
  CollectionId: "ExistingCollectionId",
  Tags: [{ Key: "Environment", Value: "Testing" }],
  adopt: true // Adopts the existing collection if it is found
});
```

## Deleting a Collection

You can delete a collection by specifying the Collection ID.

```ts
const DeleteCollection = await AWS.Rekognition.Collection("DeleteMyCollection", {
  CollectionId: "MyCollectionId"
});

// Code to handle deletion would follow here
```

## Retrieving Collection Details

You can retrieve details of an existing collection by specifying its Collection ID.

```ts
const GetCollectionDetails = await AWS.Rekognition.Collection("GetCollectionDetails", {
  CollectionId: "MyCollectionId"
});

// Code to handle retrieval of collection details would follow here
```