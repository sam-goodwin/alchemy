---
title: Managing AWS IoT CACertificates with Alchemy
description: Learn how to create, update, and manage AWS IoT CACertificates using Alchemy Cloud Control.
---

# CACertificate

The CACertificate resource allows you to manage [AWS IoT CACertificates](https://docs.aws.amazon.com/iot/latest/userguide/) for securing device communications and ensuring trusted connections within AWS IoT services.

## Minimal Example

Create a basic CACertificate with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCACertificate = await AWS.IoT.CACertificate("BasicCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...rest_of_certificate...\n-----END CERTIFICATE-----",
  CertificateMode: "SNI_ONLY" // Optional property
});
```

## Advanced Configuration

Configure a CACertificate with auto registration settings and tags for better resource management.

```ts
const advancedCACertificate = await AWS.IoT.CACertificate("AdvancedCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...rest_of_certificate...\n-----END CERTIFICATE-----",
  AutoRegistrationStatus: "ENABLE",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Custom Registration Configuration

Demonstrate how to set up a CACertificate with a custom registration configuration to manage device registrations.

```ts
const registrationConfigCACertificate = await AWS.IoT.CACertificate("RegistrationConfigCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...rest_of_certificate...\n-----END CERTIFICATE-----",
  RegistrationConfig: {
    // Custom registration parameters e.g., roleArn, templateBody, etc.
    RoleArn: "arn:aws:iam::123456789012:role/IoTRole",
    TemplateBody: JSON.stringify({
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "iot:CreateKeysAndCertificate",
          "Resource": "*"
        }
      ]
    })
  }
});
``` 

## Removing Auto Registration

Create a CACertificate while specifying the removal of auto registration.

```ts
const removeAutoRegistrationCACertificate = await AWS.IoT.CACertificate("RemoveAutoRegistrationCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...rest_of_certificate...\n-----END CERTIFICATE-----",
  RemoveAutoRegistration: true // Disables auto-registration for this certificate
});
```