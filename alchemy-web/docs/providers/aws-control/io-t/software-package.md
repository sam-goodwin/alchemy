---
title: Managing AWS IoT SoftwarePackages with Alchemy
description: Learn how to create, update, and manage AWS IoT SoftwarePackages using Alchemy Cloud Control.
---

# SoftwarePackage

The SoftwarePackage resource allows you to manage [AWS IoT SoftwarePackages](https://docs.aws.amazon.com/iot/latest/userguide/) that can be used to define and deploy software components on IoT devices.

## Minimal Example

Create a basic SoftwarePackage with a name and description:

```ts
import AWS from "alchemy/aws/control";

const BasicSoftwarePackage = await AWS.IoT.SoftwarePackage("BasicSoftwarePackage", {
  PackageName: "MyIoTSoftware",
  Description: "This is a basic software package for IoT devices.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Advanced Configuration

Configure a SoftwarePackage with additional properties such as tags:

```ts
const AdvancedSoftwarePackage = await AWS.IoT.SoftwarePackage("AdvancedSoftwarePackage", {
  PackageName: "AdvancedIoTSoftware",
  Description: "This package includes advanced features for IoT devices.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" },
    { Key: "Version", Value: "1.0.0" }
  ],
  adopt: true // Allows adoption of an existing resource if it already exists
});
```

## Using SoftwarePackage with Adoption

Demonstrate how to create a SoftwarePackage that adopts an existing resource:

```ts
const AdoptedSoftwarePackage = await AWS.IoT.SoftwarePackage("AdoptedSoftwarePackage", {
  PackageName: "ExistingIoTSoftware",
  Description: "This package is adopted from an existing resource.",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "IoT" }
  ],
  adopt: true // Enables adoption of an existing SoftwarePackage
});
```

## Updating a SoftwarePackage

Show how to update an existing SoftwarePackage:

```ts
const UpdatedSoftwarePackage = await AWS.IoT.SoftwarePackage("UpdatedSoftwarePackage", {
  PackageName: "ExistingIoTSoftware",
  Description: "Updated description for the existing software package.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Version", Value: "1.1.0" }
  ]
});
```