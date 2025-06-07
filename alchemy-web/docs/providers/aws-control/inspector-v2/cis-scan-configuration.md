---
title: Managing AWS InspectorV2 CisScanConfigurations with Alchemy
description: Learn how to create, update, and manage AWS InspectorV2 CisScanConfigurations using Alchemy Cloud Control.
---

# CisScanConfiguration

The CisScanConfiguration resource lets you create and manage [AWS InspectorV2 CisScanConfigurations](https://docs.aws.amazon.com/inspectorv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-inspectorv2-cisscanconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cisscanconfiguration = await AWS.InspectorV2.CisScanConfiguration(
  "cisscanconfiguration-example",
  {
    SecurityLevel: "example-securitylevel",
    Schedule: "example-schedule",
    Targets: "example-targets",
    ScanName: "cisscanconfiguration-scan",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a cisscanconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCisScanConfiguration = await AWS.InspectorV2.CisScanConfiguration(
  "advanced-cisscanconfiguration",
  {
    SecurityLevel: "example-securitylevel",
    Schedule: "example-schedule",
    Targets: "example-targets",
    ScanName: "cisscanconfiguration-scan",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

