---
title: LifecyclePolicy
description: Learn how to create, update, and manage AWS DLM LifecyclePolicys using Alchemy Cloud Control.
---


The LifecyclePolicy resource allows you to manage [AWS DLM LifecyclePolicys](https://docs.aws.amazon.com/dlm/latest/userguide/) for automating the creation, retention, and deletion of EBS snapshots and AMIs.

## Minimal Example

Create a basic lifecycle policy that retains snapshots every 24 hours for 7 days.

```ts
import AWS from "alchemy/aws/control";

const basicLifecyclePolicy = await AWS.DLM.LifecyclePolicy("basicLifecyclePolicy", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/DLMExecutionRole",
  Description: "Basic lifecycle policy for EBS snapshots",
  CreateInterval: 24,
  RetainInterval: 7,
  PolicyDetails: {
    ResourceTypes: ["VOLUME"],
    Schedules: [{
      Name: "DailySnapshot",
      CreateRule: {
        Interval: 24,
        IntervalUnit: "HOURS",
      },
      RetainRule: {
        Count: 7,
      },
    }],
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a lifecycle policy to include cross-region copy of snapshots and specific exclusions.

```ts
const advancedLifecyclePolicy = await AWS.DLM.LifecyclePolicy("advancedLifecyclePolicy", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/DLMExecutionRole",
  Description: "Advanced lifecycle policy with cross-region copy and exclusions",
  CreateInterval: 12,
  RetainInterval: 30,
  PolicyDetails: {
    ResourceTypes: ["VOLUME"],
    Schedules: [{
      Name: "TwiceDailySnapshot",
      CreateRule: {
        Interval: 12,
        IntervalUnit: "HOURS",
      },
      RetainRule: {
        Count: 30,
      },
    }],
    CrossRegionCopyRules: [{
      TargetRegion: "us-west-2",
      RetainRule: {
        Count: 14,
      },
    }],
    Exclusions: {
      Tags: [{
        Key: "Backup",
        Value: "No"
      }]
    }
  },
  Tags: [{
    Key: "Environment",
    Value: "Testing"
  }]
});
```

## Use Case: AMI Lifecycle Management

Manage AMIs for EC2 instances with specific tagging and retention policies.

```ts
const amiLifecyclePolicy = await AWS.DLM.LifecyclePolicy("amiLifecyclePolicy", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/DLMExecutionRole",
  Description: "AMI lifecycle policy for EC2 instances",
  CreateInterval: 24,
  RetainInterval: 14,
  PolicyDetails: {
    ResourceTypes: ["IMAGE"],
    Schedules: [{
      Name: "DailyAMICreation",
      CreateRule: {
        Interval: 24,
        IntervalUnit: "HOURS",
      },
      RetainRule: {
        Count: 14,
      },
    }],
    Exclusions: {
      Tags: [{
        Key: "Backup",
        Value: "False"
      }]
    }
  },
  Tags: [{
    Key: "Application",
    Value: "WebApp"
  }]
});
```
