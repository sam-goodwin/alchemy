---
title: Managing AWS Application Load Balancer TrustStores with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer TrustStores using Alchemy Cloud Control.
---

# TrustStore

The TrustStore resource allows you to manage [AWS Application Load Balancer TrustStores](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) which are used to manage certificate authorities for HTTPS connections.

## Minimal Example

Create a basic TrustStore with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("BasicTrustStore", {
  Name: "MyTrustStore",
  CaCertificatesBundleS3Bucket: "my-truststore-bucket",
  CaCertificatesBundleS3Key: "certificates/my-certificates.pem",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a TrustStore with additional properties such as object versioning.

```ts
const AdvancedTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("AdvancedTrustStore", {
  Name: "MyAdvancedTrustStore",
  CaCertificatesBundleS3Bucket: "my-truststore-bucket",
  CaCertificatesBundleS3Key: "certificates/my-certificates-v2.pem",
  CaCertificatesBundleS3ObjectVersion: "1234567890abcdef",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Resource Adoption Example

Use the adopt feature to manage an existing TrustStore without failing if it already exists.

```ts
const AdoptedTrustStore = await AWS.ElasticLoadBalancingV2.TrustStore("AdoptedTrustStore", {
  Name: "MyExistingTrustStore",
  CaCertificatesBundleS3Bucket: "my-existing-bucket",
  CaCertificatesBundleS3Key: "certificates/my-existing-certificates.pem",
  adopt: true
});
```