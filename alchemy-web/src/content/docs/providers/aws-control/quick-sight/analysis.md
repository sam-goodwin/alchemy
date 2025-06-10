---
title: Analysis
description: Learn how to create, update, and manage AWS QuickSight Analyses using Alchemy Cloud Control.
---


The Analysis resource lets you manage [AWS QuickSight Analyses](https://docs.aws.amazon.com/quicksight/latest/userguide/) for visualizing and exploring your data.

## Minimal Example

Create a basic QuickSight Analysis with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicAnalysis = await AWS.QuickSight.Analysis("basic-analysis", {
  Name: "Sales Analysis",
  AnalysisId: "sales-analysis-001",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceTemplate: {
      DataSourceArn: "arn:aws:quicksight:us-east-1:123456789012:datasource/sales-data-source",
      TemplateArn: "arn:aws:quicksight:us-east-1:123456789012:template/sales-template",
      DataSetReferences: [{
        DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/sales-data-set",
        DataSetPlaceholder: "SalesData"
      }]
    }
  },
  Status: "CREATED"
});
```

## Advanced Configuration

Configure an analysis with a custom theme and permissions.

```ts
const advancedAnalysis = await AWS.QuickSight.Analysis("advanced-analysis", {
  Name: "Marketing Insights",
  AnalysisId: "marketing-analysis-002",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceTemplate: {
      DataSourceArn: "arn:aws:quicksight:us-east-1:123456789012:datasource/marketing-data-source",
      TemplateArn: "arn:aws:quicksight:us-east-1:123456789012:template/marketing-template",
      DataSetReferences: [{
        DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/marketing-data-set",
        DataSetPlaceholder: "MarketingData"
      }]
    }
  },
  ThemeArn: "arn:aws:quicksight:us-east-1:123456789012:theme/my-custom-theme",
  Permissions: [{
    Principal: "arn:aws:quicksight:us-east-1:123456789012:group/analysts",
    Actions: [
      "quicksight:DescribeAnalysis",
      "quicksight:UpdateAnalysis",
      "quicksight:DeleteAnalysis"
    ]
  }],
  Status: "CREATED"
});
```

## Custom Parameters

Define an analysis with specific parameters for dynamic filtering.

```ts
const parameterizedAnalysis = await AWS.QuickSight.Analysis("parameterized-analysis", {
  Name: "Regional Sales Overview",
  AnalysisId: "regional-sales-analysis-003",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceTemplate: {
      DataSourceArn: "arn:aws:quicksight:us-east-1:123456789012:datasource/region-data-source",
      TemplateArn: "arn:aws:quicksight:us-east-1:123456789012:template/region-template",
      DataSetReferences: [{
        DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/region-data-set",
        DataSetPlaceholder: "RegionData"
      }]
    }
  },
  Parameters: {
    StringParameters: [{
      Name: "Region",
      Values: ["North America"]
    }]
  },
  Status: "CREATED"
});
``` 

## Error Handling

Create an analysis while handling potential errors.

```ts
try {
  const errorHandledAnalysis = await AWS.QuickSight.Analysis("error-handling-analysis", {
    Name: "Error Handling in Analysis",
    AnalysisId: "error-analysis-004",
    AwsAccountId: "123456789012",
    SourceEntity: {
      SourceTemplate: {
        DataSourceArn: "arn:aws:quicksight:us-east-1:123456789012:datasource/error-data-source",
        TemplateArn: "arn:aws:quicksight:us-east-1:123456789012:template/error-template",
        DataSetReferences: [{
          DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/error-data-set",
          DataSetPlaceholder: "ErrorData"
        }]
      }
    },
    Name: "Error Handling Analysis",
    Status: "CREATED"
  });
} catch (error) {
  console.error("Error creating analysis:", error);
}
```
