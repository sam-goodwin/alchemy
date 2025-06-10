---
title: CisScanConfiguration
description: Learn how to create, update, and manage AWS InspectorV2 CisScanConfigurations using Alchemy Cloud Control.
---


The CisScanConfiguration resource allows you to create and manage [AWS InspectorV2 CisScanConfigurations](https://docs.aws.amazon.com/inspectorv2/latest/userguide/) for assessing the security of your infrastructure against CIS benchmarks.

## Minimal Example

Create a basic CIS scan configuration with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const cisScanConfig = await AWS.InspectorV2.CisScanConfiguration("myCisScanConfig", {
  SecurityLevel: "High",
  Schedule: {
    Interval: "Daily"
  },
  Targets: {
    ResourceGroupArn: "arn:aws:inspector:us-west-2:123456789012:resourcegroup/my-resource-group"
  },
  ScanName: "DailyCISScan",
  Tags: {
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a CIS scan with additional settings including a customized schedule and multiple targets.

```ts
const advancedCisScanConfig = await AWS.InspectorV2.CisScanConfiguration("advancedCisScanConfig", {
  SecurityLevel: "Medium",
  Schedule: {
    Interval: "Weekly",
    StartTime: "2023-10-01T00:00:00Z"
  },
  Targets: {
    ResourceGroupArn: "arn:aws:inspector:us-west-2:123456789012:resourcegroup/my-resource-group",
    AdditionalTargets: [
      {
        ResourceArn: "arn:aws:ec2:us-west-2:123456789012:instance/i-0123456789abcdef0"
      }
    ]
  },
  ScanName: "WeeklyCISScan"
});
```

## Custom Security Level

Set up a scan configuration with a specific security level and multiple tags for better organization.

```ts
const customSecurityLevelScanConfig = await AWS.InspectorV2.CisScanConfiguration("customSecurityLevelScanConfig", {
  SecurityLevel: "Critical",
  Schedule: {
    Interval: "Monthly"
  },
  Targets: {
    ResourceGroupArn: "arn:aws:inspector:us-west-2:123456789012:resourcegroup/my-resource-group"
  },
  ScanName: "MonthlyCriticalCISScan",
  Tags: {
    Project: "SecurityAudit",
    Owner: "SecurityTeam"
  }
});
```
