---
title: Managing AWS Glue MLTransforms with Alchemy
description: Learn how to create, update, and manage AWS Glue MLTransforms using Alchemy Cloud Control.
---

# MLTransform

The MLTransform resource lets you create and manage [AWS Glue MLTransforms](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mltransform = await AWS.Glue.MLTransform("mltransform-example", {
  Role: "example-role",
  TransformParameters: "example-transformparameters",
  InputRecordTables: "example-inputrecordtables",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A mltransform resource managed by Alchemy",
});
```

## Advanced Configuration

Create a mltransform with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMLTransform = await AWS.Glue.MLTransform("advanced-mltransform", {
  Role: "example-role",
  TransformParameters: "example-transformparameters",
  InputRecordTables: "example-inputrecordtables",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A mltransform resource managed by Alchemy",
});
```

