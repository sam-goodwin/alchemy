---
title: Managing AWS BCMDataExports Exports with Alchemy
description: Learn how to create, update, and manage AWS BCMDataExports Exports using Alchemy Cloud Control.
---

# Export

The Export resource lets you create and manage [AWS BCMDataExports Exports](https://docs.aws.amazon.com/bcmdataexports/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bcmdataexports-export.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const awsExport = await AWS.BCMDataExports.Export("awsExport-example", {
  Export: "example-export",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a export with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedExport = await AWS.BCMDataExports.Export("advanced-awsExport", {
  Export: "example-export",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

