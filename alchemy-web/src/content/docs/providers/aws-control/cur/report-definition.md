---
title: ReportDefinition
description: Learn how to create, update, and manage AWS CUR ReportDefinitions using Alchemy Cloud Control.
---


The ReportDefinition resource lets you create and manage [AWS CUR ReportDefinitions](https://docs.aws.amazon.com/cur/latest/userguide/) for cost and usage reporting in AWS.

## Minimal Example

Create a basic report definition with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicReportDefinition = await AWS.CUR.ReportDefinition("basicReport", {
  ReportName: "MonthlyCostReport",
  Compression: "GZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-cur-reports-bucket",
  S3Region: "us-west-2",
  S3Prefix: "monthly-reports/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT"
});
```

## Advanced Configuration

Configure a report definition with advanced options such as additional artifacts and schema elements.

```ts
const advancedReportDefinition = await AWS.CUR.ReportDefinition("advancedReport", {
  ReportName: "DetailedCostReport",
  Compression: "ZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-advanced-cur-reports-bucket",
  S3Region: "us-east-1",
  S3Prefix: "detailed-reports/",
  TimeUnit: "HOURLY",
  ReportVersioning: "CREATE_NEW_REPORT",
  AdditionalArtifacts: ["REDSHIFT", "QUICKSIGHT"],
  AdditionalSchemaElements: ["RESOURCES"]
});
```

## Example with Billing View

Create a report definition that includes a billing view ARN for more granular reporting.

```ts
const billingViewReportDefinition = await AWS.CUR.ReportDefinition("billingViewReport", {
  ReportName: "BillingViewCostReport",
  Compression: "GZIP",
  Format: "parquet",
  RefreshClosedReports: false,
  S3Bucket: "my-billing-view-reports-bucket",
  S3Region: "us-west-2",
  S3Prefix: "billing-view-reports/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT",
  BillingViewArn: "arn:aws:cur:us-west-2:123456789012:billingview:my-billing-view"
});
```

## Example with Adoption of Existing Resources

Create a report definition while adopting an existing resource if it already exists.

```ts
const adoptedReportDefinition = await AWS.CUR.ReportDefinition("adoptedReport", {
  ReportName: "AdoptedCostReport",
  Compression: "ZIP",
  Format: "textORcsv",
  RefreshClosedReports: true,
  S3Bucket: "my-adopted-reports-bucket",
  S3Region: "us-west-1",
  S3Prefix: "adopted-reports/",
  TimeUnit: "DAILY",
  ReportVersioning: "CREATE_NEW_REPORT",
  adopt: true
});
```
