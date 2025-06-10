---
title: TrustStore
description: Learn how to create, update, and manage AWS Application Load Balancer TrustStores using Alchemy Cloud Control.
---


The TrustStore resource lets you manage [AWS Application Load Balancer TrustStores](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) for securely storing CA certificates. 

## Minimal Example

Create a basic TrustStore with a CA certificate bundle stored in S3:

```ts
import AWS from "alchemy/aws/control";

const basicTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("basicTrustStore", {
  Name: "basic-trust-store",
  CaCertificatesBundleS3Bucket: "my-certificates-bucket",
  CaCertificatesBundleS3Key: "path/to/certificates-bundle.zip"
});
```

## Advanced Configuration

Configure a TrustStore with additional properties including tags and versioning for the CA certificate bundle:

```ts
const advancedTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("advancedTrustStore", {
  Name: "advanced-trust-store",
  CaCertificatesBundleS3Bucket: "my-certificates-bucket",
  CaCertificatesBundleS3Key: "path/to/certificates-bundle.zip",
  CaCertificatesBundleS3ObjectVersion: "1234567890abcdef",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Resource Adoption Example

Create a TrustStore resource while adopting an existing one if it already exists:

```ts
const adoptTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("adoptTrustStore", {
  Name: "existing-trust-store",
  CaCertificatesBundleS3Bucket: "my-certificates-bucket",
  CaCertificatesBundleS3Key: "path/to/certificates-bundle.zip",
  adopt: true // Adopt the existing resource if it already exists
});
```

## Additional Use Case: Updating a TrustStore

Update the CA certificate bundle of an existing TrustStore:

```ts
const updateTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("updateTrustStore", {
  Name: "existing-trust-store",
  CaCertificatesBundleS3Bucket: "my-certificates-bucket",
  CaCertificatesBundleS3Key: "new/path/to/certificates-bundle.zip",
  Tags: [
    { Key: "UpdatedBy", Value: "admin@example.com" }
  ]
});
```
