---
title: Asset
description: Learn how to create, update, and manage AWS MediaPackage Assets using Alchemy Cloud Control.
---


The Asset resource allows you to manage [AWS MediaPackage Assets](https://docs.aws.amazon.com/mediapackage/latest/userguide/) which encapsulate the media content and its associated metadata. This resource is essential for streaming video and audio content.

## Minimal Example

Create a basic MediaPackage Asset with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const mediaPackageAsset = await AWS.MediaPackage.Asset("myMediaPackageAsset", {
  sourceArn: "arn:aws:mediapackage:us-east-1:123456789012:assets/my-source",
  id: "myAssetId",
  packagingGroupId: "myPackagingGroupId",
  sourceRoleArn: "arn:aws:iam::123456789012:role/myMediaPackageRole",
  resourceId: "myResourceId",
  tags: [
    {
      Key: "Project",
      Value: "MediaStreaming"
    }
  ]
});
```

## Advanced Configuration

Configure a MediaPackage Asset with additional egress endpoints for optimized delivery.

```ts
const advancedMediaPackageAsset = await AWS.MediaPackage.Asset("advancedMediaPackageAsset", {
  sourceArn: "arn:aws:mediapackage:us-east-1:123456789012:assets/advanced-source",
  id: "advancedAssetId",
  packagingGroupId: "myAdvancedPackagingGroupId",
  sourceRoleArn: "arn:aws:iam::123456789012:role/myAdvancedMediaPackageRole",
  egressEndpoints: [
    {
      url: "https://example.com/egress",
      type: "https"
    }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing MediaPackage Asset, you can set the adopt property to true.

```ts
const adoptedMediaPackageAsset = await AWS.MediaPackage.Asset("adoptedMediaPackageAsset", {
  sourceArn: "arn:aws:mediapackage:us-east-1:123456789012:assets/adopted-source",
  id: "adoptedAssetId",
  packagingGroupId: "myAdoptedPackagingGroupId",
  sourceRoleArn: "arn:aws:iam::123456789012:role/myAdoptedMediaPackageRole",
  adopt: true
});
```

## Tagging for Organization

Use tags to organize your MediaPackage Assets for better management and reporting.

```ts
const taggedMediaPackageAsset = await AWS.MediaPackage.Asset("taggedMediaPackageAsset", {
  sourceArn: "arn:aws:mediapackage:us-east-1:123456789012:assets/tagged-source",
  id: "taggedAssetId",
  packagingGroupId: "myTaggedPackagingGroupId",
  sourceRoleArn: "arn:aws:iam::123456789012:role/myTaggedMediaPackageRole",
  tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Media"
    }
  ]
});
```
