---
title: SoftwarePackageVersion
description: Learn how to create, update, and manage AWS IoT SoftwarePackageVersions using Alchemy Cloud Control.
---


The SoftwarePackageVersion resource allows you to manage [AWS IoT SoftwarePackageVersions](https://docs.aws.amazon.com/iot/latest/userguide/) for your IoT devices, enabling the deployment and management of software packages.

## Minimal Example

Create a basic SoftwarePackageVersion with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const minimalSoftwarePackageVersion = await AWS.IoT.SoftwarePackageVersion("basicSoftwarePackage", {
  PackageName: "my-software-package",
  Description: "A basic software package for device management"
});
```

## Advanced Configuration

Configure a SoftwarePackageVersion with additional attributes, SBOM, and tags for improved metadata:

```ts
const advancedSoftwarePackageVersion = await AWS.IoT.SoftwarePackageVersion("advancedSoftwarePackage", {
  PackageName: "advanced-software-package",
  Description: "An advanced software package with detailed attributes",
  Recipe: "recipe-url",
  Attributes: {
    version: "1.0.0",
    environment: "production"
  },
  Sbom: {
    format: "spdx",
    content: "sbom-content"
  },
  Tags: [
    { Key: "env", Value: "production" },
    { Key: "type", Value: "device-firmware" }
  ]
});
```

## Example with Artifact

Create a SoftwarePackageVersion that includes an artifact for the software package:

```ts
const softwarePackageWithArtifact = await AWS.IoT.SoftwarePackageVersion("softwareWithArtifact", {
  PackageName: "firmware-package",
  Description: "Firmware package for IoT devices",
  Artifact: {
    uri: "s3://my-bucket/firmware-package.zip",
    size: 2048000 // Size in bytes
  },
  VersionName: "v1.2.3"
});
```

## Adoption of Existing Resources

Configure the SoftwarePackageVersion to adopt an already existing resource instead of failing:

```ts
const adoptExistingSoftwarePackage = await AWS.IoT.SoftwarePackageVersion("adoptExisting", {
  PackageName: "existing-package",
  adopt: true, // Adopts if the resource already exists
  Description: "Adopting an existing software package"
});
```
