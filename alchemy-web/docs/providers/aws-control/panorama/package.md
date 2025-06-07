---
title: Managing AWS Panorama Packages with Alchemy
description: Learn how to create, update, and manage AWS Panorama Packages using Alchemy Cloud Control.
---

# Package

The Package resource lets you create and manage [AWS Panorama Packages](https://docs.aws.amazon.com/panorama/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const awsPackage = await AWS.Panorama.Package("awsPackage-example", {
  PackageName: "package-package",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a package with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPackage = await AWS.Panorama.Package("advanced-awsPackage", {
  PackageName: "package-package",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

