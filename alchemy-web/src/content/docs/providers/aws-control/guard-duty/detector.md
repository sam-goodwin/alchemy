---
title: Detector
description: Learn how to create, update, and manage AWS GuardDuty Detectors using Alchemy Cloud Control.
---


The Detector resource allows you to manage [AWS GuardDuty Detectors](https://docs.aws.amazon.com/guardduty/latest/userguide/) for continuous security monitoring of your AWS accounts and workloads.

## Minimal Example

Create a basic GuardDuty detector with the required properties and a common optional property for finding publishing frequency.

```ts
import AWS from "alchemy/aws/control";

const basicDetector = await AWS.GuardDuty.Detector("basicDetector", {
  Enable: true,
  FindingPublishingFrequency: "FIFTEEN_MINUTES"
});
```

## Advanced Configuration

Configure a GuardDuty detector with additional options like data sources and features.

```ts
const advancedDetector = await AWS.GuardDuty.Detector("advancedDetector", {
  Enable: true,
  FindingPublishingFrequency: "ONE_HOUR",
  DataSources: {
    S3Logs: {
      Enable: true
    },
    CloudTrail: {
      Enable: true
    }
  },
  Features: [
    {
      Name: "S3_DATA_EVENTS",
      Enable: true
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "Security"
    }
  ]
});
```

## Enabling All Data Sources

Demonstrate how to enable all data sources for a comprehensive security posture.

```ts
const fullDataSourceDetector = await AWS.GuardDuty.Detector("fullDataSourceDetector", {
  Enable: true,
  DataSources: {
    S3Logs: {
      Enable: true
    },
    CloudTrail: {
      Enable: true
    },
    VPCFlowLogs: {
      Enable: true
    },
    DNSLogs: {
      Enable: true
    }
  },
  Tags: [
    {
      Key: "Project",
      Value: "GuardDutyEnhancement"
    }
  ]
});
```

## Adopting Existing Detectors

If you want to adopt an existing GuardDuty detector instead of failing, set the adopt property to true.

```ts
const adoptExistingDetector = await AWS.GuardDuty.Detector("adoptExistingDetector", {
  Enable: true,
  adopt: true
});
```
