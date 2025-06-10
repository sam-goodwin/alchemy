---
title: Connector
description: Learn how to create, update, and manage AWS PCAConnectorAD Connectors using Alchemy Cloud Control.
---


The Connector resource allows you to manage [AWS PCAConnectorAD Connectors](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) used for integrating AWS Private Certificate Authority with Microsoft Active Directory.

## Minimal Example

Create a basic Connector with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicConnector = await AWS.PCAConnectorAD.Connector("myBasicConnector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abc12345-def6-7890-ghij-klmnopqrstuv",
  DirectoryId: "d-1234567890",
  VpcInformation: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-12345678"]
  },
  Tags: {
    Environment: "Development",
    Project: "CertificateManagement"
  }
});
```

## Advanced Configuration

Configure a Connector with additional properties for enhanced functionality, including adopting an existing resource.

```ts
const advancedConnector = await AWS.PCAConnectorAD.Connector("myAdvancedConnector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/xyz98765-vwxy-1234-zabc-defghijklmnop",
  DirectoryId: "d-0987654321",
  VpcInformation: {
    VpcId: "vpc-87654321",
    SubnetIds: ["subnet-23456789"],
    SecurityGroupIds: ["sg-87654321"]
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Tags for Resource Management

Create a Connector with detailed tagging for better resource management and organization.

```ts
const taggedConnector = await AWS.PCAConnectorAD.Connector("myTaggedConnector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:eu-west-1:123456789012:certificate-authority/def45678-ghij-1234-kjhg-lmnopqrstuvw",
  DirectoryId: "d-2345678901",
  VpcInformation: {
    VpcId: "vpc-23456789",
    SubnetIds: ["subnet-34567890"],
    SecurityGroupIds: ["sg-23456789"]
  },
  Tags: {
    Team: "Infra",
    CostCenter: "12345",
    Environment: "Production"
  }
});
```

## Handling Multiple Subnets and Security Groups

Create a Connector that utilizes multiple subnets and security groups for redundancy and security.

```ts
const multiSubnetConnector = await AWS.PCAConnectorAD.Connector("myMultiSubnetConnector", {
  CertificateAuthorityArn: "arn:aws:acm-pca:ap-southeast-1:123456789012:certificate-authority/ghi78901-jklm-2345-nmop-qrstuvwxyz",
  DirectoryId: "d-3456789012",
  VpcInformation: {
    VpcId: "vpc-34567890",
    SubnetIds: ["subnet-45678901", "subnet-56789012"],
    SecurityGroupIds: ["sg-34567890", "sg-45678901"]
  }
});
```
