---
title: Template
description: Learn how to create, update, and manage AWS PCAConnectorAD Templates using Alchemy Cloud Control.
---


The Template resource lets you manage [AWS PCAConnectorAD Templates](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) for configuring certificate authorities and their templates.

## Minimal Example

Create a basic PCAConnectorAD Template with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const pcaTemplate = await AWS.PCAConnectorAD.Template("myPcaTemplate", {
  ConnectorArn: "arn:aws:example:region:account-id:connector/connector-name",
  Definition: {
    // Define your template settings here
    TemplateName: "MyTemplate",
    CertificatePolicies: [
      {
        PolicyIdentifier: "1.3.6.1.5.5.7.3.1", // This is an example OID for server authentication
        PolicyQualifiers: []
      }
    ]
  },
  Name: "My PCA Template",
  Tags: {
    Environment: "Production",
    Department: "IT"
  }
});
```

## Advanced Configuration

Configure a PCAConnectorAD Template with more advanced settings including reenrollment options.

```ts
const advancedPcaTemplate = await AWS.PCAConnectorAD.Template("advancedPcaTemplate", {
  ConnectorArn: "arn:aws:example:region:account-id:connector/connector-name",
  Definition: {
    TemplateName: "AdvancedTemplate",
    CertificatePolicies: [
      {
        PolicyIdentifier: "1.3.6.1.5.5.7.3.2", // This is an example OID for client authentication
        PolicyQualifiers: []
      }
    ],
    KeyUsage: {
      DigitalSignature: true,
      KeyEncipherment: true
    }
  },
  Name: "Advanced PCA Template",
  ReenrollAllCertificateHolders: true,
  Tags: {
    Project: "Security",
    Owner: "John Doe"
  }
});
```

## Using Tags for Resource Management

Create a PCAConnectorAD Template that utilizes tags for better resource management.

```ts
const taggedPcaTemplate = await AWS.PCAConnectorAD.Template("taggedPcaTemplate", {
  ConnectorArn: "arn:aws:example:region:account-id:connector/connector-name",
  Definition: {
    TemplateName: "TaggedTemplate",
    CertificatePolicies: [
      {
        PolicyIdentifier: "1.2.840.113549.1.9.15", // Example OID for email protection
        PolicyQualifiers: []
      }
    ]
  },
  Name: "Tagged PCA Template",
  Tags: {
    Application: "Finance",
    Owner: "Jane Smith",
    Compliance: "GDPR"
  }
});
```
