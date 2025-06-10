---
title: Template
description: Learn how to create, update, and manage AWS QuickSight Templates using Alchemy Cloud Control.
---


The Template resource lets you manage [AWS QuickSight Templates](https://docs.aws.amazon.com/quicksight/latest/userguide/) for reusable visualizations and dashboards.

## Minimal Example

Create a basic QuickSight template with required properties and a version description.

```ts
import AWS from "alchemy/aws/control";

const quickSightTemplate = await AWS.QuickSight.Template("basicTemplate", {
  AwsAccountId: "123456789012",
  TemplateId: "basic-template-id",
  VersionDescription: "Initial version of the template",
  SourceEntity: {
    SourceTemplate: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:template/template-source-id",
      DataSetReferences: [
        {
          DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/dataset-id",
          DataSetPlaceholder: "dataSetPlaceholder"
        }
      ]
    }
  },
  Definition: {
    ThemeArn: "arn:aws:quicksight:us-east-1:123456789012:theme/theme-id",
    Visuals: []
  }
});
```

## Advanced Configuration

Configure a QuickSight template with additional permissions and tags for better resource management.

```ts
const advancedTemplate = await AWS.QuickSight.Template("advancedTemplate", {
  AwsAccountId: "123456789012",
  TemplateId: "advanced-template-id",
  VersionDescription: "Advanced version with access control",
  SourceEntity: {
    SourceTemplate: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:template/template-source-id",
      DataSetReferences: [
        {
          DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/dataset-id",
          DataSetPlaceholder: "dataSetPlaceholder"
        }
      ]
    }
  },
  Definition: {
    ThemeArn: "arn:aws:quicksight:us-east-1:123456789012:theme/theme-id",
    Visuals: []
  },
  Permissions: [
    {
      Principal: "arn:aws:quicksight:us-east-1:123456789012:user/user-id",
      Actions: ["quicksight:DescribeTemplate", "quicksight:UpdateTemplate"]
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "Analytics"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Template with Validation Strategy

Create a QuickSight template that implements a validation strategy to ensure proper configuration.

```ts
const validatedTemplate = await AWS.QuickSight.Template("validatedTemplate", {
  AwsAccountId: "123456789012",
  TemplateId: "validated-template-id",
  VersionDescription: "Template with validation strategy",
  SourceEntity: {
    SourceTemplate: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:template/template-source-id",
      DataSetReferences: [
        {
          DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/dataset-id",
          DataSetPlaceholder: "dataSetPlaceholder"
        }
      ]
    }
  },
  Definition: {
    ThemeArn: "arn:aws:quicksight:us-east-1:123456789012:theme/theme-id",
    Visuals: []
  },
  ValidationStrategy: "DEEP" // Ensures thorough validation of the template
});
```
