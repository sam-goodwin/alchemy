---
title: SoftwarePackage
description: Learn how to create, update, and manage AWS IoT SoftwarePackages using Alchemy Cloud Control.
---


The SoftwarePackage resource lets you manage [AWS IoT SoftwarePackages](https://docs.aws.amazon.com/iot/latest/userguide/) for deploying and maintaining software on IoT devices.

## Minimal Example

Create a basic SoftwarePackage with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicSoftwarePackage = await AWS.IoT.SoftwarePackage("basicSoftwarePackage", {
  PackageName: "MyIoTSoftware",
  Description: "This package includes essential software for IoT devices."
});
```

## Advanced Configuration

Configure a SoftwarePackage with tags and additional information.

```ts
const advancedSoftwarePackage = await AWS.IoT.SoftwarePackage("advancedSoftwarePackage", {
  PackageName: "AdvancedIoTSoftware",
  Description: "This package contains advanced features for IoT management.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoTDevelopment" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Versioning and Updates

Create a SoftwarePackage that allows for versioning and updating existing software.

```ts
const versionedSoftwarePackage = await AWS.IoT.SoftwarePackage("versionedSoftwarePackage", {
  PackageName: "VersionedIoTSoftware",
  Description: "This package supports versioning for seamless updates.",
  Tags: [
    { Key: "Version", Value: "1.0.0" },
    { Key: "Status", Value: "Stable" }
  ],
  adopt: true
});
```

## Resource Metadata

Access metadata such as ARN and timestamps for a SoftwarePackage.

```ts
const softwarePackageMetadata = await AWS.IoT.SoftwarePackage("softwarePackageMetadata", {
  PackageName: "MetadataIoTSoftware",
  Description: "This package demonstrates how to access metadata.",
  Tags: [{ Key: "Info", Value: "Contains metadata information" }]
});

// Log the ARN and creation time
console.log(`ARN: ${softwarePackageMetadata.Arn}`);
console.log(`Created At: ${softwarePackageMetadata.CreationTime}`);
```
