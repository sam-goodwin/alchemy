---
title: MultiRegionAccessPoint
description: Learn how to create, update, and manage AWS S3 MultiRegionAccessPoints using Alchemy Cloud Control.
---


The MultiRegionAccessPoint resource lets you manage [AWS S3 MultiRegion Access Points](https://docs.aws.amazon.com/s3/latest/userguide/) for easier access to S3 data across multiple regions.

## Minimal Example

Create a basic MultiRegion Access Point with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const multiRegionAccessPoint = await AWS.S3.MultiRegionAccessPoint("myMultiRegionAccessPoint", {
  Regions: [
    { Region: "us-east-1", Bucket: "my-bucket-us-east" },
    { Region: "us-west-2", Bucket: "my-bucket-us-west" }
  ],
  Name: "my-access-point",
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: true,
    IgnorePublicAcls: true,
    BlockPublicPolicy: true,
    RestrictPublicBuckets: true
  }
});
```

## Advanced Configuration

Configure a MultiRegion Access Point with additional settings for enhanced security and resource management.

```ts
const advancedMultiRegionAccessPoint = await AWS.S3.MultiRegionAccessPoint("advancedAccessPoint", {
  Regions: [
    { Region: "eu-west-1", Bucket: "my-bucket-eu-west" },
    { Region: "ap-southeast-1", Bucket: "my-bucket-ap-southeast" }
  ],
  Name: "advanced-access-point",
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: false,
    IgnorePublicAcls: false,
    BlockPublicPolicy: false,
    RestrictPublicBuckets: false
  },
  adopt: true // Adopt an existing resource without failing
});
```

## Using Existing Resources

This example demonstrates how to adopt an existing MultiRegion Access Point instead of creating a new one.

```ts
const existingAccessPoint = await AWS.S3.MultiRegionAccessPoint("existingAccessPoint", {
  Regions: [
    { Region: "us-west-1", Bucket: "existing-bucket-west" },
    { Region: "sa-east-1", Bucket: "existing-bucket-brazil" }
  ],
  Name: "existing-access-point",
  adopt: true // Adopt the existing resource
});
```

## Different Region Configurations

Create a MultiRegion Access Point that routes to different buckets across various regions, showcasing flexibility in resource management.

```ts
const diverseRegionAccessPoint = await AWS.S3.MultiRegionAccessPoint("diverseRegionAccessPoint", {
  Regions: [
    { Region: "ca-central-1", Bucket: "canada-bucket" },
    { Region: "ap-south-1", Bucket: "india-bucket" },
    { Region: "eu-central-1", Bucket: "germany-bucket" }
  ],
  Name: "diverse-access-point"
});
```
