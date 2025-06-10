---
title: DatasetGroup
description: Learn how to create, update, and manage AWS Personalize DatasetGroups using Alchemy Cloud Control.
---


The DatasetGroup resource lets you manage [AWS Personalize DatasetGroups](https://docs.aws.amazon.com/personalize/latest/userguide/) for organizing datasets and models tailored for personalized recommendations.

## Minimal Example

Create a basic DatasetGroup with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicDatasetGroup = await AWS.Personalize.DatasetGroup("basicDatasetGroup", {
  name: "MusicRecommendations",
  roleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-Role",
  domain: "PERSONALIZATION"
});
```

## Advanced Configuration

Configure a DatasetGroup with a KMS key for encryption and additional options.

```ts
const secureDatasetGroup = await AWS.Personalize.DatasetGroup("secureDatasetGroup", {
  name: "MovieRecommendations",
  roleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-Role",
  domain: "PERSONALIZATION",
  kmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
});
```

## Adopting Existing Resources

Create a DatasetGroup that adopts an existing resource if one is found.

```ts
const adoptedDatasetGroup = await AWS.Personalize.DatasetGroup("adoptedDatasetGroup", {
  name: "UserBehaviorTracking",
  roleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-Role",
  domain: "PERSONALIZATION",
  adopt: true // Will adopt if the resource already exists
});
```

## Updating an Existing DatasetGroup

Update an existing DatasetGroup to change its name and role.

```ts
const updatedDatasetGroup = await AWS.Personalize.DatasetGroup("updatedDatasetGroup", {
  name: "UpdatedMusicRecommendations",
  roleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-Role"
});
```
