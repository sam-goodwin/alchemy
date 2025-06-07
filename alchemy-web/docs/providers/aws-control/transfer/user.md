---
title: Managing AWS Transfer Users with Alchemy
description: Learn how to create, update, and manage AWS Transfer Users using Alchemy Cloud Control.
---

# User

The User resource allows you to manage [AWS Transfer Users](https://docs.aws.amazon.com/transfer/latest/userguide/) for transferring files over SFTP, FTPS, and FTP protocols.

## Minimal Example

Create a basic AWS Transfer User with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const TransferUser = await AWS.Transfer.User("basic-transfer-user", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "johndoe",
  HomeDirectory: "/home/johndoe",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure an AWS Transfer User with additional properties like policy and SSH public keys.

```ts
const AdvancedTransferUser = await AWS.Transfer.User("advanced-transfer-user", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "janedoe",
  HomeDirectory: "/home/janedoe",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: ["s3:ListBucket"],
      Resource: ["arn:aws:s3:::my-bucket"],
      Condition: {
        StringEquals: {
          "s3:prefix": ["home/janedoe/"]
        }
      }
    }]
  }),
  SshPublicKeys: [
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... user@hostname"
  ],
  Tags: [{ Key: "Environment", Value: "production" }, { Key: "Team", Value: "DevOps" }]
});
```

## Using Home Directory Mappings

Demonstrate how to set up home directory mappings for the user.

```ts
const MappedTransferUser = await AWS.Transfer.User("mapped-transfer-user", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "mikejohnson",
  HomeDirectory: "/home/mikejohnson",
  HomeDirectoryMappings: [
    {
      Entry: "/",
      Target: "/home/mikejohnson"
    },
    {
      Entry: "/documents",
      Target: "/home/mikejohnson/documents"
    }
  ],
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```

## Adding POSIX Profile

Create a Transfer User with a POSIX profile to manage permissions.

```ts
const PosixTransferUser = await AWS.Transfer.User("posix-transfer-user", {
  Role: "arn:aws:iam::123456789012:role/MyTransferRole",
  ServerId: "s-12345678",
  UserName: "sarahconnor",
  HomeDirectory: "/home/sarahconnor",
  PosixProfile: {
    Gid: 1001,
    Uid: 1001,
    SecondaryGids: [1002, 1003]
  },
  Tags: [{ Key: "Environment", Value: "testing" }]
});
```