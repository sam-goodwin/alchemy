---
title: StorageVirtualMachine
description: Learn how to create, update, and manage AWS FSx StorageVirtualMachines using Alchemy Cloud Control.
---


The StorageVirtualMachine resource lets you create and manage [AWS FSx StorageVirtualMachines](https://docs.aws.amazon.com/fsx/latest/userguide/) for your Amazon FSx for Windows File Server file systems. This resource enables you to configure a virtual machine that manages data stored within your FSx file system.

## Minimal Example

Create a basic Storage Virtual Machine with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const storageVirtualMachine = await AWS.FSx.StorageVirtualMachine("myStorageVM", {
  fileSystemId: "fs-0123456789abcdef0",
  name: "MyStorageVM",
  svmAdminPassword: "SecurePassword123!",
  rootVolumeSecurityStyle: "UNIX"
});
```

## Advanced Configuration

Configure a Storage Virtual Machine with Active Directory integration and tags:

```ts
const advancedStorageVM = await AWS.FSx.StorageVirtualMachine("advancedStorageVM", {
  fileSystemId: "fs-0987654321fedcba0",
  name: "AdvancedStorageVM",
  svmAdminPassword: "AnotherSecurePassword!",
  activeDirectoryConfiguration: {
    activeDirectoryId: "d-1234567890",
    organizationalUnitDistinguishedName: "OU=FSxOU,DC=example,DC=com",
    userName: "admin@example.com",
    password: "ADPassword123!"
  },
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```

## Integrating with Existing Resources

Create a Storage Virtual Machine that adopts an existing resource if it already exists:

```ts
const adoptStorageVM = await AWS.FSx.StorageVirtualMachine("adoptStorageVM", {
  fileSystemId: "fs-1122334455667788",
  name: "AdoptStorageVM",
  adopt: true
});
```

## Security Style Configuration

Set up a Storage Virtual Machine with specific security styles for the root volume:

```ts
const securityStyleVM = await AWS.FSx.StorageVirtualMachine("securityStyleVM", {
  fileSystemId: "fs-2233445566778899",
  name: "SecurityStyleVM",
  rootVolumeSecurityStyle: "NTFS"
});
```
