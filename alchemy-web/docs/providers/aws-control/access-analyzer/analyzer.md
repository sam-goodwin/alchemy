---
title: Managing AWS AccessAnalyzer Analyzers with Alchemy
description: Learn how to create, update, and manage AWS AccessAnalyzer Analyzers using Alchemy Cloud Control.
---

# Analyzer

The Analyzer resource lets you create and manage [AWS AccessAnalyzer Analyzers](https://docs.aws.amazon.com/accessanalyzer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-accessanalyzer-analyzer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const analyzer = await AWS.AccessAnalyzer.Analyzer("analyzer-example", {
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a analyzer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnalyzer = await AWS.AccessAnalyzer.Analyzer("advanced-analyzer", {
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

