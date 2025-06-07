---
title: Managing AWS CodeBuild ReportGroups with Alchemy
description: Learn how to create, update, and manage AWS CodeBuild ReportGroups using Alchemy Cloud Control.
---

# ReportGroup

The ReportGroup resource allows you to manage [AWS CodeBuild ReportGroups](https://docs.aws.amazon.com/codebuild/latest/userguide/) for organizing and storing build reports.

## Minimal Example

Create a basic ReportGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicReportGroup = await AWS.CodeBuild.ReportGroup("BasicReportGroup", {
  Type: "TEST",
  ExportConfig: {
    ExportConfigType: "S3",
    S3Destination: {
      Bucket: "my-report-group-bucket",
      Path: "reports",
      Packaging: "ZIP"
    }
  },
  Name: "BasicReportGroup",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Advanced Configuration

Configure a ReportGroup with additional settings, including deletion of reports upon deletion of the ReportGroup.

```ts
const AdvancedReportGroup = await AWS.CodeBuild.ReportGroup("AdvancedReportGroup", {
  Type: "TEST",
  ExportConfig: {
    ExportConfigType: "S3",
    S3Destination: {
      Bucket: "advanced-report-group-bucket",
      Path: "advanced-reports",
      Packaging: "ZIP"
    }
  },
  DeleteReports: true,
  Name: "AdvancedReportGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

Create a ReportGroup that adopts an existing resource instead of failing if it already exists.

```ts
const AdoptedReportGroup = await AWS.CodeBuild.ReportGroup("AdoptedReportGroup", {
  Type: "TEST",
  ExportConfig: {
    ExportConfigType: "S3",
    S3Destination: {
      Bucket: "adopted-report-group-bucket",
      Path: "adopted-reports",
      Packaging: "ZIP"
    }
  },
  Name: "AdoptedReportGroup",
  adopt: true
});
``` 

This example demonstrates how to create a ReportGroup that can adopt an existing resource, facilitating resource management in scenarios where the resource may already exist.