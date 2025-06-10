---
title: ResourceDataSync
description: Learn how to create, update, and manage AWS SSM ResourceDataSyncs using Alchemy Cloud Control.
---


The ResourceDataSync resource allows you to configure and manage the synchronization of your AWS Systems Manager (SSM) data across different AWS Regions and accounts. For more detailed information, refer to the [AWS SSM ResourceDataSyncs documentation](https://docs.aws.amazon.com/ssm/latest/userguide/).

## Minimal Example

Create a basic ResourceDataSync with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const resourceDataSync = await AWS.SSM.ResourceDataSync("myResourceDataSync", {
  SyncName: "MyResourceDataSync",
  S3Destination: {
    BucketName: "my-bucket",
    BucketPrefix: "ssm-sync/",
    BucketRegion: "us-east-1",
    SyncFormat: "Json"
  }
});
```

## Advanced Configuration

Configure a ResourceDataSync with additional settings such as encryption with KMS.

```ts
const advancedResourceDataSync = await AWS.SSM.ResourceDataSync("advancedResourceDataSync", {
  SyncName: "AdvancedResourceDataSync",
  S3Destination: {
    BucketName: "my-secure-bucket",
    BucketPrefix: "secure-ssm-sync/",
    BucketRegion: "us-west-2",
    SyncFormat: "Json"
  },
  KMSKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrst"
});
```

## Syncing Multiple Sources

Set up a ResourceDataSync that syncs data from multiple sources.

```ts
const multiSourceResourceDataSync = await AWS.SSM.ResourceDataSync("multiSourceResourceDataSync", {
  SyncName: "MultiSourceResourceDataSync",
  S3Destination: {
    BucketName: "my-multi-source-bucket",
    BucketPrefix: "multi-source-ssm-sync/",
    BucketRegion: "us-west-1",
    SyncFormat: "Json"
  },
  SyncSource: {
    SourceType: "AWS::SSM::ManagedInstance",
    SourceRegions: ["us-east-1", "us-west-2"],
    IncludeAll: true
  }
});
```
