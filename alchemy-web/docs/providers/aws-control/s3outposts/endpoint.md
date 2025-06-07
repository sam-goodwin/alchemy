---
title: Managing AWS S3Outposts Endpoints with Alchemy
description: Learn how to create, update, and manage AWS S3Outposts Endpoints using Alchemy Cloud Control.
---

# Endpoint

The Endpoint resource lets you manage [AWS S3Outposts Endpoints](https://docs.aws.amazon.com/s3outposts/latest/userguide/) for connecting to Amazon S3 on your Outpost.

## Minimal Example

This example demonstrates how to create a basic S3Outposts Endpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const S3OutpostsEndpoint = await AWS.S3Outposts.Endpoint("MyS3OutpostsEndpoint", {
  OutpostId: "op-1234567890abcdef0",
  SecurityGroupId: "sg-abcdef1234567890",
  SubnetId: "subnet-1234567890abcdef0",
  AccessType: "ReadWrite" // Optional
});
```

## Advanced Configuration

This example shows how to configure an S3Outposts Endpoint with additional properties such as a customer-owned IPv4 pool and adoption of existing resources.

```ts
const AdvancedS3OutpostsEndpoint = await AWS.S3Outposts.Endpoint("AdvancedS3OutpostsEndpoint", {
  OutpostId: "op-abcdef1234567890",
  SecurityGroupId: "sg-123456abcdef7890",
  SubnetId: "subnet-abcdef1234567890",
  AccessType: "ReadWrite", // Optional
  CustomerOwnedIpv4Pool: "ipv4pool-123456", // Optional
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Error Handling

This example demonstrates how to handle the potential error response by checking the `FailedReason` property.

```ts
const EndpointWithErrorCheck = await AWS.S3Outposts.Endpoint("ErrorCheckEndpoint", {
  OutpostId: "op-1234567890abcdef0",
  SecurityGroupId: "sg-abcdef1234567890",
  SubnetId: "subnet-1234567890abcdef0",
});

// Check if the endpoint creation failed and log the reason
if (EndpointWithErrorCheck.FailedReason) {
  console.error(`Endpoint creation failed: ${EndpointWithErrorCheck.FailedReason}`);
}
```