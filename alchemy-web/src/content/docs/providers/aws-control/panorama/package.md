---
title: Package
description: Learn how to create, update, and manage AWS Panorama Packages using Alchemy Cloud Control.
---


The Package resource allows you to create, manage, and deploy [AWS Panorama Packages](https://docs.aws.amazon.com/panorama/latest/userguide/) for edge computing applications. These packages can contain machine learning models and other assets that are deployed to AWS Panorama devices.

## Minimal Example

Create a basic AWS Panorama Package with required properties and a common optional storage location.

```ts
import AWS from "alchemy/aws/control";

const panoramaPackage = await AWS.Panorama.Package("myPanoramaPackage", {
  packageName: "MyFirstPanoramaPackage",
  storageLocation: {
    s3Bucket: "my-panorama-bucket",
    s3Key: "packages/my-first-package.zip"
  },
  tags: [
    { key: "Project", value: "PanoramaDemo" }
  ]
});
```

## Advanced Configuration

Configure a Panorama Package with additional tags for better organization and management.

```ts
const advancedPanoramaPackage = await AWS.Panorama.Package("advancedPanoramaPackage", {
  packageName: "AdvancedPanoramaPackage",
  storageLocation: {
    s3Bucket: "my-panorama-bucket",
    s3Key: "packages/advanced-package.zip"
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Version", value: "1.0" }
  ],
  adopt: true // Adopts an existing resource if it already exists
});
```

## Package with Multiple Tags

Create a Panorama Package that includes multiple tags for tracking and resource management.

```ts
const taggedPanoramaPackage = await AWS.Panorama.Package("taggedPanoramaPackage", {
  packageName: "TaggedPanoramaPackage",
  storageLocation: {
    s3Bucket: "my-panorama-bucket",
    s3Key: "packages/tagged-package.zip"
  },
  tags: [
    { key: "Department", value: "AI" },
    { key: "Application", value: "ImageProcessing" },
    { key: "Owner", value: "DataScienceTeam" }
  ]
});
```

## Package Adoption Example

Demonstrate how to adopt an existing Panorama Package resource by setting the `adopt` property to true.

```ts
const adoptedPanoramaPackage = await AWS.Panorama.Package("adoptedPanoramaPackage", {
  packageName: "ExistingPanoramaPackage",
  storageLocation: {
    s3Bucket: "my-panorama-bucket",
    s3Key: "packages/existing-package.zip"
  },
  adopt: true
});
```
