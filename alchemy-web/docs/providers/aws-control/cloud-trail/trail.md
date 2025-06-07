---
title: Managing AWS CloudTrail Trails with Alchemy
description: Learn how to create, update, and manage AWS CloudTrail Trails using Alchemy Cloud Control.
---

# Trail

The Trail resource lets you manage [AWS CloudTrail Trails](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) for logging and monitoring account activity across your AWS infrastructure.

## Minimal Example

Create a basic CloudTrail trail with essential properties for S3 bucket logging and enable logging.

```ts
import AWS from "alchemy/aws/control";

const BasicTrail = await AWS.CloudTrail.Trail("BasicTrail", {
  S3BucketName: "my-cloudtrail-logs-bucket",
  IsLogging: true,
  IncludeGlobalServiceEvents: true,
  TrailName: "BasicTrail"
});
```

## Advanced Configuration

Configure a CloudTrail trail with advanced options including KMS encryption and CloudWatch logging.

```ts
const AdvancedTrail = await AWS.CloudTrail.Trail("AdvancedTrail", {
  S3BucketName: "my-secure-cloudtrail-logs-bucket",
  IsLogging: true,
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  CloudWatchLogsRoleArn: "arn:aws:iam::123456789012:role/CloudTrail_CloudWatchLogs",
  CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:CloudTrailLogGroup",
  SnsTopicName: "my-cloudtrail-sns-topic",
  EventSelectors: [
    {
      ReadWriteType: "All",
      IncludeManagementEvents: true,
      DataResources: [
        {
          Type: "AWS::S3::Object",
          Values: ["arn:aws:s3:::my-secure-cloudtrail-logs-bucket/"]
        }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Multi-Region Trail

Create a multi-region trail that logs events across all AWS regions.

```ts
const MultiRegionTrail = await AWS.CloudTrail.Trail("MultiRegionTrail", {
  S3BucketName: "my-multi-region-cloudtrail-logs-bucket",
  IsLogging: true,
  IsMultiRegionTrail: true,
  TrailName: "MultiRegionTrail"
});
```

## Organization Trail

Set up an organization trail to monitor all accounts in an AWS Organization.

```ts
const OrganizationTrail = await AWS.CloudTrail.Trail("OrganizationTrail", {
  S3BucketName: "my-org-cloudtrail-logs-bucket",
  IsLogging: true,
  IsOrganizationTrail: true,
  TrailName: "OrganizationTrail"
});
``` 

## Insight Selectors

Enable insight selectors to capture unusual activity patterns.

```ts
const InsightTrail = await AWS.CloudTrail.Trail("InsightTrail", {
  S3BucketName: "my-insight-cloudtrail-logs-bucket",
  IsLogging: true,
  InsightSelectors: [
    {
      InsightType: "ApiCallRateInsight"
    }
  ],
  TrailName: "InsightTrail"
});
```