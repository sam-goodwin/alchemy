---
title: PackageVersion
description: Learn how to create, update, and manage AWS Panorama PackageVersions using Alchemy Cloud Control.
---


The PackageVersion resource lets you manage [AWS Panorama PackageVersions](https://docs.aws.amazon.com/panorama/latest/userguide/) for deploying and updating machine learning models and applications on AWS Panorama devices.

## Minimal Example

Create a basic PackageVersion with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const packageVersion = await AWS.Panorama.PackageVersion("myPackageVersion", {
  PackageId: "my-package-id",
  PackageVersion: "1.0.0",
  PatchVersion: "1.0.1",
  MarkLatest: true
});
```

## Advanced Configuration

Configure a PackageVersion with additional properties like OwnerAccount and UpdatedLatestPatchVersion.

```ts
const advancedPackageVersion = await AWS.Panorama.PackageVersion("advancedPackageVersion", {
  PackageId: "my-package-id",
  PackageVersion: "1.1.0",
  PatchVersion: "1.1.1",
  MarkLatest: true,
  OwnerAccount: "123456789012",
  UpdatedLatestPatchVersion: "1.1.1"
});
```

## Adoption of Existing Resources

Create a PackageVersion that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingPackageVersion = await AWS.Panorama.PackageVersion("adoptPackageVersion", {
  PackageId: "my-existing-package-id",
  PackageVersion: "1.0.0",
  PatchVersion: "1.0.1",
  adopt: true
});
```

## Updating a PackageVersion

Demonstrate updating a PackageVersion with a new PatchVersion and marking it as the latest.

```ts
const updatedPackageVersion = await AWS.Panorama.PackageVersion("updatePackageVersion", {
  PackageId: "my-package-id",
  PackageVersion: "1.0.1", // Incrementing version
  PatchVersion: "1.0.2",
  MarkLatest: true
});
```
