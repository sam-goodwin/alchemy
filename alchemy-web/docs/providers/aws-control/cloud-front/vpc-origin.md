---
title: Managing AWS CloudFront VpcOrigins with Alchemy
description: Learn how to create, update, and manage AWS CloudFront VpcOrigins using Alchemy Cloud Control.
---

# VpcOrigin

The VpcOrigin resource lets you create and manage [AWS CloudFront VpcOrigins](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-vpcorigin.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcorigin = await AWS.CloudFront.VpcOrigin("vpcorigin-example", {
  VpcOriginEndpointConfig: "example-vpcoriginendpointconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpcorigin with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVpcOrigin = await AWS.CloudFront.VpcOrigin("advanced-vpcorigin", {
  VpcOriginEndpointConfig: "example-vpcoriginendpointconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

