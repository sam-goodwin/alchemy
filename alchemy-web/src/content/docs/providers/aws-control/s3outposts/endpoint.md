---
title: Endpoint
description: Learn how to create, update, and manage AWS S3Outposts Endpoints using Alchemy Cloud Control.
---


The Endpoint resource allows you to manage [AWS S3Outposts Endpoints](https://docs.aws.amazon.com/s3outposts/latest/userguide/) effectively. This resource facilitates the creation and configuration of S3 endpoints within an AWS Outposts environment.

## Minimal Example

Create a basic S3Outposts endpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const s3OutpostsEndpoint = await AWS.S3Outposts.Endpoint("myS3OutpostsEndpoint", {
  OutpostId: "op-12345678",
  SecurityGroupId: "sg-87654321",
  SubnetId: "subnet-1234abcd",
  AccessType: "Private" // Optional
});
```

## Advanced Configuration

Configure an endpoint with additional optional properties for advanced use cases.

```ts
const advancedS3OutpostsEndpoint = await AWS.S3Outposts.Endpoint("advancedS3OutpostsEndpoint", {
  OutpostId: "op-12345678",
  SecurityGroupId: "sg-87654321",
  SubnetId: "subnet-1234abcd",
  AccessType: "Private",
  CustomerOwnedIpv4Pool: "coip-12345678", // Optional
  adopt: true // Optional, adopt existing resource if it exists
});
```

## Handling Errors

Example of creating an endpoint and handling potential errors.

```ts
try {
  const errorHandledEndpoint = await AWS.S3Outposts.Endpoint("errorHandledEndpoint", {
    OutpostId: "op-12345678",
    SecurityGroupId: "sg-87654321",
    SubnetId: "subnet-1234abcd"
  });
} catch (error) {
  console.error("Failed to create S3Outposts Endpoint:", error.message);
}
```

## Resource Adoption

Use the adopt property to ensure that the creation doesn't fail if the endpoint already exists.

```ts
const adoptExistingEndpoint = await AWS.S3Outposts.Endpoint("adoptExistingEndpoint", {
  OutpostId: "op-12345678",
  SecurityGroupId: "sg-87654321",
  SubnetId: "subnet-1234abcd",
  adopt: true // Adopt existing endpoint instead of creating a new one
});
```
