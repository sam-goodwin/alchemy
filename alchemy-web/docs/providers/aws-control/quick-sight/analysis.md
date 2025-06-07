---
title: Managing AWS QuickSight Analysiss with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Analysiss using Alchemy Cloud Control.
---

# Analysis

The Analysis resource lets you create and manage [AWS QuickSight Analysiss](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-analysis.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const analysis = await AWS.QuickSight.Analysis("analysis-example", {
  Name: "analysis-",
  AnalysisId: "example-analysisid",
  AwsAccountId: "example-awsaccountid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a analysis with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnalysis = await AWS.QuickSight.Analysis("advanced-analysis", {
  Name: "analysis-",
  AnalysisId: "example-analysisid",
  AwsAccountId: "example-awsaccountid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

