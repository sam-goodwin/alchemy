---
title: Trail
description: Learn how to create, update, and manage AWS CloudTrail Trails using Alchemy Cloud Control.
---


The Trail resource allows you to manage [AWS CloudTrail Trails](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) for logging and monitoring account activity across your AWS infrastructure.

## Minimal Example

Create a basic CloudTrail trail with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicTrail = await AWS.CloudTrail.Trail("basicTrail", {
  S3BucketName: "my-cloudtrail-logs-bucket",
  IsLogging: true,
  IncludeGlobalServiceEvents: true
});
```

## Advanced Configuration

Configure a CloudTrail trail with advanced settings including event selectors and KMS key for encryption.

```ts
const advancedTrail = await AWS.CloudTrail.Trail("advancedTrail", {
  S3BucketName: "my-cloudtrail-logs-bucket",
  IsLogging: true,
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234",
  EventSelectors: [
    {
      ReadWriteType: "All",
      IncludeManagementEvents: true,
      DataResources: [
        {
          Type: "AWS::S3::Object",
          Values: ["arn:aws:s3:::my-sensitive-bucket/"]
        }
      ]
    }
  ],
  SnsTopicName: "myCloudTrailSnsTopic",
  CloudWatchLogsRoleArn: "arn:aws:iam::123456789012:role/CloudWatchLogsRole"
});
```

## Multi-Region Trail

Create a CloudTrail trail that logs events across multiple regions.

```ts
const multiRegionTrail = await AWS.CloudTrail.Trail("multiRegionTrail", {
  S3BucketName: "my-multi-region-cloudtrail-logs-bucket",
  IsLogging: true,
  IsMultiRegionTrail: true,
  EnableLogFileValidation: true
});
```

## Organization Trail

Set up an organization trail to log API calls across all accounts in an AWS Organization.

```ts
const organizationTrail = await AWS.CloudTrail.Trail("organizationTrail", {
  S3BucketName: "my-org-cloudtrail-logs-bucket",
  IsLogging: true,
  IsOrganizationTrail: true,
  SnsTopicName: "orgCloudTrailSnsTopic"
});
```
