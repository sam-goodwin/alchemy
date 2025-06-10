---
title: Workgroup
description: Learn how to create, update, and manage AWS RedshiftServerless Workgroups using Alchemy Cloud Control.
---


The Workgroup resource lets you manage [AWS RedshiftServerless Workgroups](https://docs.aws.amazon.com/redshiftserverless/latest/userguide/) and their configuration settings for serverless data warehousing.

## Minimal Example

Create a basic RedshiftServerless Workgroup with essential properties.

```ts
import AWS from "alchemy/aws/control";

const workgroup = await AWS.RedshiftServerless.Workgroup("defaultWorkgroup", {
  workgroupName: "default",
  baseCapacity: 2, // Minimum base capacity
  publicyAccessible: true,
  securityGroupIds: ["sg-0123456789abcdef0"],
  subnetIds: ["subnet-0123456789abcdef0"]
});
```

## Advanced Configuration

Configure a workgroup with enhanced settings, including VPC routing and custom configuration parameters.

```ts
const advancedWorkgroup = await AWS.RedshiftServerless.Workgroup("advancedWorkgroup", {
  workgroupName: "advanced",
  baseCapacity: 4,
  enhancedVpcRouting: true,
  configParameters: [
    {
      parameter: "enable_s3_select",
      value: "true"
    },
    {
      parameter: "enable_query_logging",
      value: "true"
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Owner",
      value: "DataTeam"
    }
  ]
});
```

## Snapshot Restoration

Create a workgroup using a specific snapshot for restoring from a backup.

```ts
const snapshotWorkgroup = await AWS.RedshiftServerless.Workgroup("snapshotWorkgroup", {
  workgroupName: "restoration-workgroup",
  snapshotArn: "arn:aws:redshift-serverless:us-west-2:123456789012:snapshot:my-snapshot",
  snapshotOwnerAccount: "123456789012",
  recoveryPointId: "rpid-0123456789abcdef0"
});
```

## Performance Tuning

Configure a workgroup optimized for performance with a specific price performance target.

```ts
const performanceWorkgroup = await AWS.RedshiftServerless.Workgroup("performanceWorkgroup", {
  workgroupName: "performance-optimized",
  maxCapacity: 8,
  pricePerformanceTarget: {
    target: "high"
  },
  tags: [
    {
      key: "Performance",
      value: "High"
    }
  ]
});
```
