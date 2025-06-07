---
title: Managing AWS IoT SoftwarePackageVersions with Alchemy
description: Learn how to create, update, and manage AWS IoT SoftwarePackageVersions using Alchemy Cloud Control.
---

# SoftwarePackageVersion

The SoftwarePackageVersion resource lets you create and manage [AWS IoT SoftwarePackageVersions](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-softwarepackageversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const softwarepackageversion = await AWS.IoT.SoftwarePackageVersion(
  "softwarepackageversion-example",
  {
    PackageName: "softwarepackageversion-package",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A softwarepackageversion resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a softwarepackageversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSoftwarePackageVersion = await AWS.IoT.SoftwarePackageVersion(
  "advanced-softwarepackageversion",
  {
    PackageName: "softwarepackageversion-package",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A softwarepackageversion resource managed by Alchemy",
  }
);
```

