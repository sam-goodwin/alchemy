---
title: Managing AWS IAM ServerCertificates with Alchemy
description: Learn how to create, update, and manage AWS IAM ServerCertificates using Alchemy Cloud Control.
---

# ServerCertificate

The ServerCertificate resource allows you to manage [AWS IAM ServerCertificates](https://docs.aws.amazon.com/iam/latest/userguide/) that can be used for secure communications via SSL/TLS. This resource enables you to create, update, and delete server certificates in your AWS account.

## Minimal Example

Create a basic server certificate with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicServerCertificate = await AWS.IAM.ServerCertificate("BasicCert", {
  CertificateBody: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALY0eQk8y5VfMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----`,
  PrivateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...
-----END PRIVATE KEY-----`,
  ServerCertificateName: "MyBasicServerCert"
});
```

## Advanced Configuration

Configure a server certificate with a certificate chain and tags for better management.

```ts
const AdvancedServerCertificate = await AWS.IAM.ServerCertificate("AdvancedCert", {
  CertificateBody: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALY0eQk8y5VfMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----`,
  PrivateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...
-----END PRIVATE KEY-----`,
  CertificateChain: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALY0eQk8y5VfMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----`,
  ServerCertificateName: "MyAdvancedServerCert",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Path for Organization

Create a server certificate with a specific path to help organize IAM resources.

```ts
const PathServerCertificate = await AWS.IAM.ServerCertificate("PathCert", {
  CertificateBody: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALY0eQk8y5VfMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----`,
  PrivateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...
-----END PRIVATE KEY-----`,
  ServerCertificateName: "MyPathServerCert",
  Path: "/certificates/"
});
```