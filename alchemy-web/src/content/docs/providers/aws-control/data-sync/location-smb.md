---
title: LocationSMB
description: Learn how to create, update, and manage AWS DataSync LocationSMBs using Alchemy Cloud Control.
---


The LocationSMB resource allows you to manage [AWS DataSync LocationSMBs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring files between your on-premises SMB file shares and AWS storage services.

## Minimal Example

Create a basic SMB location with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const smbLocation = await AWS.DataSync.LocationSMB("mySmbLocation", {
  ServerHostname: "smb-server.example.com",
  Subdirectory: "/shared-folder",
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-12345678"],
  User: "username",
  Password: "securepassword!"
});
```

## Advanced Configuration

Configure a LocationSMB with additional options such as Kerberos authentication and DNS IP addresses.

```ts
const advancedSmbLocation = await AWS.DataSync.LocationSMB("myAdvancedSmbLocation", {
  ServerHostname: "smb-secure-server.example.com",
  Subdirectory: "/secure-shared-folder",
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-87654321"],
  User: "secureUser",
  Password: "anotherSecurePassword!",
  KerberosPrincipal: "user@EXAMPLE.COM",
  KerberosKeytab: "base64-encoded-keytab",
  KerberosKrb5Conf: "base64-encoded-krb5.conf",
  Domain: "example.com",
  DnsIpAddresses: ["192.168.1.1", "192.168.1.2"],
  MountOptions: {
    // Example mount options if applicable
    Version: "3.0"
  }
});
```

## Using Tags for Resource Management

Tag your LocationSMB for better organization and management.

```ts
const taggedSmbLocation = await AWS.DataSync.LocationSMB("myTaggedSmbLocation", {
  ServerHostname: "tagged-smb-server.example.com",
  Subdirectory: "/tagged-folder",
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-11223344"],
  User: "taggedUser",
  Password: "taggedPassword!",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```
