---
title: Managing AWS MediaTailor VodSources with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor VodSources using Alchemy Cloud Control.
---

# VodSource

The VodSource resource lets you create and manage [AWS MediaTailor VodSources](https://docs.aws.amazon.com/mediatailor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-vodsource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vodsource = await AWS.MediaTailor.VodSource("vodsource-example", {
  VodSourceName: "vodsource-vodsource",
  SourceLocationName: "vodsource-sourcelocation",
  HttpPackageConfigurations: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vodsource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVodSource = await AWS.MediaTailor.VodSource("advanced-vodsource", {
  VodSourceName: "vodsource-vodsource",
  SourceLocationName: "vodsource-sourcelocation",
  HttpPackageConfigurations: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

