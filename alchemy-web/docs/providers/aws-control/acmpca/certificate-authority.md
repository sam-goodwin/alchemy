---
title: Managing AWS ACMPCA CertificateAuthoritys with Alchemy
description: Learn how to create, update, and manage AWS ACMPCA CertificateAuthoritys using Alchemy Cloud Control.
---

# CertificateAuthority

The CertificateAuthority resource lets you create and manage [AWS ACMPCA CertificateAuthoritys](https://docs.aws.amazon.com/acmpca/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-acmpca-certificateauthority.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const certificateauthority = await AWS.ACMPCA.CertificateAuthority("certificateauthority-example", {
  Type: "example-type",
  SigningAlgorithm: "example-signingalgorithm",
  Subject: "example-subject",
  KeyAlgorithm: "example-keyalgorithm",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a certificateauthority with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCertificateAuthority = await AWS.ACMPCA.CertificateAuthority(
  "advanced-certificateauthority",
  {
    Type: "example-type",
    SigningAlgorithm: "example-signingalgorithm",
    Subject: "example-subject",
    KeyAlgorithm: "example-keyalgorithm",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

