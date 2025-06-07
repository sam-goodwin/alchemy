---
title: Managing AWS CodeGuruProfiler ProfilingGroups with Alchemy
description: Learn how to create, update, and manage AWS CodeGuruProfiler ProfilingGroups using Alchemy Cloud Control.
---

# ProfilingGroup

The ProfilingGroup resource lets you create and manage [AWS CodeGuruProfiler ProfilingGroups](https://docs.aws.amazon.com/codeguruprofiler/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codeguruprofiler-profilinggroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const profilinggroup = await AWS.CodeGuruProfiler.ProfilingGroup("profilinggroup-example", {
  ProfilingGroupName: "profilinggroup-profilinggroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a profilinggroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProfilingGroup = await AWS.CodeGuruProfiler.ProfilingGroup(
  "advanced-profilinggroup",
  {
    ProfilingGroupName: "profilinggroup-profilinggroup",
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

