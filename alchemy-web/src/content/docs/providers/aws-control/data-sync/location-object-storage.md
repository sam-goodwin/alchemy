---
title: LocationObjectStorage
description: Learn how to create, update, and manage AWS DataSync LocationObjectStorages using Alchemy Cloud Control.
---


The LocationObjectStorage resource lets you manage [AWS DataSync LocationObjectStorages](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between on-premises storage and AWS storage services.

## Minimal Example

Create a basic DataSync LocationObjectStorage with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const objectStorageLocation = await AWS.DataSync.LocationObjectStorage("myObjectStorageLocation", {
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/my-agent"],
  BucketName: "my-data-bucket",
  ServerHostname: "storage.example.com",
  ServerProtocol: "S3"
});
```

## Advanced Configuration

Configure a more complex DataSync LocationObjectStorage with additional security properties and tags.

```ts
const secureObjectStorageLocation = await AWS.DataSync.LocationObjectStorage("secureObjectStorageLocation", {
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/my-agent"],
  BucketName: "my-secure-data-bucket",
  ServerHostname: "secure-storage.example.com",
  ServerProtocol: "S3",
  AccessKey: "myAccessKey",
  SecretKey: "mySecretKey",
  ServerCertificate: "certificate.pem",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataSync" }
  ]
});
```

## Including Subdirectories

Create a DataSync LocationObjectStorage that specifies a subdirectory within the S3 bucket.

```ts
const subdirectoryObjectStorageLocation = await AWS.DataSync.LocationObjectStorage("subdirectoryObjectStorageLocation", {
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/my-agent"],
  BucketName: "my-data-bucket",
  ServerHostname: "storage.example.com",
  ServerProtocol: "S3",
  Subdirectory: "/data/subdirectory"
});
```

## With Custom Server Port

Set up a DataSync LocationObjectStorage using a custom server port.

```ts
const customPortObjectStorageLocation = await AWS.DataSync.LocationObjectStorage("customPortObjectStorageLocation", {
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/my-agent"],
  BucketName: "my-data-bucket",
  ServerHostname: "storage.example.com",
  ServerProtocol: "S3",
  ServerPort: 8080 // Custom port for the server
});
```
