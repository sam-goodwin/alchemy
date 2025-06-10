---
title: Connector
description: Learn how to create, update, and manage AWS Transfer Connectors using Alchemy Cloud Control.
---


The Connector resource allows you to manage [AWS Transfer Connectors](https://docs.aws.amazon.com/transfer/latest/userguide/) for transferring files over SFTP, AS2, or FTP. This resource simplifies the setup and management of connectors in your AWS Transfer Family.

## Minimal Example

Create a basic AWS Transfer Connector with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const transferConnector = await AWS.Transfer.Connector("basicTransferConnector", {
  AccessRole: "arn:aws:iam::123456789012:role/MyTransferAccessRole",
  Url: "sftp://mytransferconnector.example.com",
  SftpConfig: {
    HostKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD4...",
    Port: 22,
    Certificate: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrst",
  }
});
```

## Advanced Configuration

Configure an AWS Transfer Connector with additional AS2 settings and logging role.

```ts
const advancedTransferConnector = await AWS.Transfer.Connector("advancedTransferConnector", {
  AccessRole: "arn:aws:iam::123456789012:role/MyTransferAccessRole",
  Url: "as2://myadvancedconnector.example.com",
  As2Config: {
    MessageDisposition: "manual",
    SigningAlgorithm: "SHA256",
    Compression: "on",
    PartnerId: "Partner123",
    ReceiverId: "Receiver456",
  },
  LoggingRole: "arn:aws:iam::123456789012:role/MyTransferLoggingRole",
  SecurityPolicyName: "TransferSecurityPolicy"
});
```

## SFTP Configuration Example

Create a connector specifically for SFTP with enhanced security settings.

```ts
const sftpTransferConnector = await AWS.Transfer.Connector("sftpTransferConnector", {
  AccessRole: "arn:aws:iam::123456789012:role/MyTransferAccessRole",
  Url: "sftp://mysftpconnector.example.com",
  SftpConfig: {
    HostKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD4...",
    Port: 22,
    Certificate: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrst",
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataTransfer" }
  ]
});
```

## AS2 Configuration Example

Set up a connector specifically for AS2 transfers with appropriate configurations.

```ts
const as2TransferConnector = await AWS.Transfer.Connector("as2TransferConnector", {
  AccessRole: "arn:aws:iam::123456789012:role/MyTransferAccessRole",
  Url: "as2://myas2connector.example.com",
  As2Config: {
    MessageDisposition: "manual",
    SigningAlgorithm: "SHA256",
    Compression: "on",
    PartnerId: "Partner123",
    ReceiverId: "Receiver456",
  },
  LoggingRole: "arn:aws:iam::123456789012:role/MyTransferLoggingRole",
});
```
