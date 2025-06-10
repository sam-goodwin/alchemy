---
title: Server
description: Learn how to create, update, and manage AWS Transfer Servers using Alchemy Cloud Control.
---


The Server resource lets you create and manage [AWS Transfer Servers](https://docs.aws.amazon.com/transfer/latest/userguide/) for securely transferring files over SFTP, FTPS, and FTP.

## Minimal Example

Create a basic AWS Transfer Server with default settings and a logging role.

```ts
import AWS from "alchemy/aws/control";

const transferServer = await AWS.Transfer.Server("myTransferServer", {
  LoggingRole: "arn:aws:iam::123456789012:role/MyLoggingRole",
  Protocols: ["SFTP"],
  Domain: "S3",
  EndpointType: "PUBLIC",
  Tags: [
    { Key: "Project", Value: "File Transfer" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure an AWS Transfer Server with additional settings such as custom endpoint details and a structured log destination.

```ts
const advancedTransferServer = await AWS.Transfer.Server("advancedTransferServer", {
  LoggingRole: "arn:aws:iam::123456789012:role/MyLoggingRole",
  Protocols: ["SFTP", "FTPS"],
  IdentityProviderType: "SERVICE_MANAGED",
  EndpointDetails: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: ["subnet-0abc1234def567890"],
    SecurityGroupIds: ["sg-0abcd1234efgh5678"]
  },
  StructuredLogDestinations: ["arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup"],
  SecurityPolicyName: "TransferSecurityPolicy",
  Tags: [
    { Key: "Project", Value: "Advanced File Transfer" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```

## Custom Authentication Banner

Set up an AWS Transfer Server with pre-authentication and post-authentication login banners.

```ts
const bannerTransferServer = await AWS.Transfer.Server("bannerTransferServer", {
  LoggingRole: "arn:aws:iam::123456789012:role/MyLoggingRole",
  Protocols: ["SFTP"],
  Domain: "S3",
  PreAuthenticationLoginBanner: "Welcome to the secure file transfer service!",
  PostAuthenticationLoginBanner: "You have successfully logged in."
});
```

## S3 Storage Options

Configure an AWS Transfer Server with S3 storage options for file storage.

```ts
const s3StorageTransferServer = await AWS.Transfer.Server("s3StorageTransferServer", {
  LoggingRole: "arn:aws:iam::123456789012:role/MyLoggingRole",
  Protocols: ["SFTP"],
  Domain: "S3",
  S3StorageOptions: {
    BucketName: "my-transfer-bucket",
    ObjectKey: "uploads/"
  },
  Tags: [
    { Key: "Project", Value: "S3 File Transfer" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```
