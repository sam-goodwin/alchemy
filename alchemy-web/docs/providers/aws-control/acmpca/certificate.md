---
title: Managing AWS ACMPCA Certificates with Alchemy
description: Learn how to create, update, and manage AWS ACMPCA Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource lets you create and manage [AWS ACMPCA Certificates](https://docs.aws.amazon.com/acmpca/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-acmpca-certificate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const certificate = await AWS.ACMPCA.Certificate("certificate-example", {
  CertificateAuthorityArn: "example-certificateauthorityarn",
  Validity: "example-validity",
  CertificateSigningRequest: "example-certificatesigningrequest",
  SigningAlgorithm: "example-signingalgorithm",
});
```

