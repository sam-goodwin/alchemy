---
title: Connector
description: Learn how to create, update, and manage AWS PCAConnectorSCEP Connectors using Alchemy Cloud Control.
---


The Connector resource lets you manage [AWS PCAConnectorSCEP Connectors](https://docs.aws.amazon.com/pcaconnectorscep/latest/userguide/) for integrating with a certificate authority and enabling mobile device management.

## Minimal Example

Create a basic PCAConnectorSCEP Connector with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConnector = await AWS.PCAConnectorSCEP.Connector("basic-connector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-12ab-34cd-56ef-1234567890ab",
  MobileDeviceManagement: {
    // Example Mobile Device Management configuration
    MdmUrl: "https://mdm.example.com",
    Certificates: ["certificate1", "certificate2"]
  }
});
```

## Advanced Configuration

Configure a connector with tags and an existing resource adoption strategy.

```ts
const advancedConnector = await AWS.PCAConnectorSCEP.Connector("advanced-connector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-12ab-34cd-56ef-1234567890ab",
  MobileDeviceManagement: {
    MdmUrl: "https://mdm.example.com",
    Certificates: ["certificate1", "certificate2"]
  },
  Tags: {
    Environment: "Production",
    Project: "MobileDeviceManagement"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Connector with Additional Tags

Create a connector with additional tags to organize resources more effectively.

```ts
const taggedConnector = await AWS.PCAConnectorSCEP.Connector("tagged-connector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-12ab-34cd-56ef-1234567890ab",
  Tags: {
    Owner: "team@example.com",
    Purpose: "Testing PCAConnectorSCEP"
  }
});
```
