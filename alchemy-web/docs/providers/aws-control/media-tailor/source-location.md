---
title: Managing AWS MediaTailor SourceLocations with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor SourceLocations using Alchemy Cloud Control.
---

# SourceLocation

The SourceLocation resource lets you create and manage [AWS MediaTailor SourceLocations](https://docs.aws.amazon.com/mediatailor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-sourcelocation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sourcelocation = await AWS.MediaTailor.SourceLocation("sourcelocation-example", {
  SourceLocationName: "sourcelocation-sourcelocation",
  HttpConfiguration: "example-httpconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a sourcelocation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSourceLocation = await AWS.MediaTailor.SourceLocation("advanced-sourcelocation", {
  SourceLocationName: "sourcelocation-sourcelocation",
  HttpConfiguration: "example-httpconfiguration",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

