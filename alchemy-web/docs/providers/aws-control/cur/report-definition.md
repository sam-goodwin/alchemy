---
title: Managing AWS CUR ReportDefinitions with Alchemy
description: Learn how to create, update, and manage AWS CUR ReportDefinitions using Alchemy Cloud Control.
---

# ReportDefinition

The ReportDefinition resource allows you to manage [AWS CUR ReportDefinitions](https://docs.aws.amazon.com/cur/latest/userguide/) for configuring and delivering billing reports to Amazon S3.

## Minimal Example

Create a basic CUR ReportDefinition with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicReportDefinition = await AWS.CUR.ReportDefinition("BasicReportDefinition", {
  ReportName: "MonthlyBillingReport",
  Compression: "GZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-billing-reports",
  S3Region: "us-east-1",
  S3Prefix: "billing/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT"
});
```

## Advanced Configuration

Configure a ReportDefinition with additional artifacts and schema elements for more detailed reporting.

```ts
const advancedReportDefinition = await AWS.CUR.ReportDefinition("AdvancedReportDefinition", {
  ReportName: "DetailedBillingReport",
  Compression: "GZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-detailed-billing-reports",
  S3Region: "us-west-2",
  S3Prefix: "detailed-billing/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT",
  AdditionalArtifacts: ["REDSHIFT", "QUICKSIGHT"],
  AdditionalSchemaElements: ["RESOURCES"]
});
```

## Custom Billing View

Create a ReportDefinition that includes a custom billing view by specifying the BillingViewArn.

```ts
const customBillingViewReport = await AWS.CUR.ReportDefinition("CustomBillingViewReport", {
  ReportName: "CustomBillingViewReport",
  Compression: "GZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-custom-billing-reports",
  S3Region: "us-east-1",
  S3Prefix: "custom-billing/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT",
  BillingViewArn: "arn:aws:cur:us-east-1:123456789012:billing-view:my-billing-view"
});
```