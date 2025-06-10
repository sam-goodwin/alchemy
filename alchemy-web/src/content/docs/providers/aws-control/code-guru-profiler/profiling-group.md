---
title: ProfilingGroup
description: Learn how to create, update, and manage AWS CodeGuruProfiler ProfilingGroups using Alchemy Cloud Control.
---


The ProfilingGroup resource lets you manage [AWS CodeGuruProfiler ProfilingGroups](https://docs.aws.amazon.com/codeguruprofiler/latest/userguide/) to monitor and optimize your applications' performance.

## Minimal Example

Create a basic profiling group with a name and a compute platform.

```ts
import AWS from "alchemy/aws/control";

const basicProfilingGroup = await AWS.CodeGuruProfiler.ProfilingGroup("basicProfilingGroup", {
  ProfilingGroupName: "MyApplicationProfilingGroup",
  ComputePlatform: "Default" // Specify platform as Default or EKS
});
```

## Advanced Configuration

Configure a profiling group with anomaly detection notifications and tags for better management.

```ts
const advancedProfilingGroup = await AWS.CodeGuruProfiler.ProfilingGroup("advancedProfilingGroup", {
  ProfilingGroupName: "MyAdvancedProfilingGroup",
  AnomalyDetectionNotificationConfiguration: [
    {
      Channel: {
        Sns: {
          TopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
        }
      }
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Application",
      Value: "MyWebApp"
    }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing profiling group instead of failing when it already exists, use the adopt option.

```ts
const adoptProfilingGroup = await AWS.CodeGuruProfiler.ProfilingGroup("adoptProfilingGroup", {
  ProfilingGroupName: "MyExistingProfilingGroup",
  adopt: true // Enable adopting existing resource
});
```

## Setting Agent Permissions

Set agent permissions to control access for your profiling group.

```ts
const permissionProfilingGroup = await AWS.CodeGuruProfiler.ProfilingGroup("permissionProfilingGroup", {
  ProfilingGroupName: "MyPermissionedProfilingGroup",
  AgentPermissions: {
    Allow: [
      {
        Principal: "arn:aws:iam::123456789012:role/MyProfilerRole",
        Action: "codeguru-profiler:PutPermission",
        Resource: "*"
      }
    ]
  }
});
```
