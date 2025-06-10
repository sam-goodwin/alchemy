---
title: Collection
description: Learn how to create, update, and manage AWS Rekognition Collections using Alchemy Cloud Control.
---


The Collection resource allows you to manage [AWS Rekognition Collections](https://docs.aws.amazon.com/rekognition/latest/userguide/) for storing and indexing faces for facial recognition applications.

## Minimal Example

Create a basic Rekognition Collection with a unique identifier.

```ts
import AWS from "alchemy/aws/control";

const rekognitionCollection = await AWS.Rekognition.Collection("myCollection", {
  CollectionId: "my-rekognition-collection",
  Tags: [
    { Key: "Project", Value: "FaceRecognition" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a collection with an adoption flag to prevent failure if the collection already exists.

```ts
const existingCollection = await AWS.Rekognition.Collection("existingCollection", {
  CollectionId: "my-existing-collection",
  adopt: true // Adopts the existing collection without failing
});
```

## Tagging Collections

Create a collection while adding multiple tags for better resource management.

```ts
const taggedCollection = await AWS.Rekognition.Collection("taggedCollection", {
  CollectionId: "my-tagged-collection",
  Tags: [
    { Key: "Team", Value: "AI" },
    { Key: "Version", Value: "v1.0" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Handling Collection Metadata

Retrieve metadata such as ARN and creation time for a collection.

```ts
const collectionMetadata = await AWS.Rekognition.Collection("metadataCollection", {
  CollectionId: "my-metadata-collection"
});

// Accessing properties after creation
console.log(`Collection ARN: ${collectionMetadata.Arn}`);
console.log(`Creation Time: ${collectionMetadata.CreationTime}`);
```
