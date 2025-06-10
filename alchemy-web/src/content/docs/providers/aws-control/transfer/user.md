---
title: User
description: Learn how to create, update, and manage AWS Transfer Users using Alchemy Cloud Control.
---


The User resource lets you manage [AWS Transfer Users](https://docs.aws.amazon.com/transfer/latest/userguide/) for secure file transfers via SFTP, FTPS, and FTP. This resource allows you to configure user permissions, home directories, and other user-related properties.

## Minimal Example

Create a basic AWS Transfer User with required properties and a simple home directory setting.

```ts
import AWS from "alchemy/aws/control";

const transferUser = await AWS.Transfer.User("basicTransferUser", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "transferUser01",
  HomeDirectory: "/home/transferUser01"
});
```

## Advanced Configuration

Configure an AWS Transfer User with additional security settings like SSH public keys and IAM policy.

```ts
const advancedTransferUser = await AWS.Transfer.User("advancedTransferUser", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "transferUser02",
  HomeDirectory: "/home/transferUser02",
  SshPublicKeys: [
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3...",
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCr..."
  ],
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "transfer:List*",
        Resource: "*"
      },
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket-name/*"
      }
    ]
  })
});
```

## Home Directory Mappings

Demonstrate how to map a user’s home directory to specific S3 paths using home directory mappings.

```ts
const mappedTransferUser = await AWS.Transfer.User("mappedTransferUser", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "transferUser03",
  HomeDirectory: "/home/transferUser03",
  HomeDirectoryMappings: [
    {
      Entry: "/home/transferUser03",
      Target: "arn:aws:s3:::my-bucket-name/user01"
    },
    {
      Entry: "/uploads",
      Target: "arn:aws:s3:::my-bucket-name/user01/uploads"
    }
  ]
});
```

## POSIX Profile Configuration

Create a user with a POSIX profile for managing UNIX-like permissions.

```ts
const posixUser = await AWS.Transfer.User("posixTransferUser", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "transferUser04",
  HomeDirectory: "/home/transferUser04",
  PosixProfile: {
    Gid: 1001,
    SecondaryGids: [1002, 1003],
    Uid: 1000
  }
});
```
