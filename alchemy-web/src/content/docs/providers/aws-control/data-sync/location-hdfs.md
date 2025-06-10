---
title: LocationHDFS
description: Learn how to create, update, and manage AWS DataSync LocationHDFSs using Alchemy Cloud Control.
---


The LocationHDFS resource lets you configure and manage [AWS DataSync LocationHDFS](https://docs.aws.amazon.com/datasync/latest/userguide/) to facilitate data transfer between on-premises Hadoop Distributed File System (HDFS) and AWS storage services.

## Minimal Example

Create a basic HDFS location with the essential properties.

```ts
import AWS from "alchemy/aws/control";

const hdfsLocation = await AWS.DataSync.LocationHDFS("myHDFSLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/agent-id-123"],
  SimpleUser: "hdfs-user",
  KmsKeyProviderUri: "kms-uri"
});
```

## Advanced Configuration

Configure a location with advanced options such as Kerberos authentication and replication factor.

```ts
const advancedHdfsLocation = await AWS.DataSync.LocationHDFS("advancedHDFSLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/agent-id-123"],
  SimpleUser: "hdfs-user",
  KerberosPrincipal: "hdfs/principal@EXAMPLE.COM",
  KerberosKeytab: "/etc/security/keytabs/hdfs.keytab",
  ReplicationFactor: 3,
  Subdirectory: "/data",
  BlockSize: 1048576,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Using Kerberos Configuration

Set up a location with a custom Kerberos configuration file.

```ts
const kerberosHdfsLocation = await AWS.DataSync.LocationHDFS("kerberosHDFSLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/agent-id-123"],
  SimpleUser: "hdfs-user",
  KerberosKrb5Conf: "/etc/krb5.conf",
  KerberosPrincipal: "hdfs/principal@EXAMPLE.COM",
  KerberosKeytab: "/etc/security/keytabs/hdfs.keytab"
});
```

## Specifying Qop Configuration

Create a location with specific Quality of Protection (Qop) settings.

```ts
const qopHdfsLocation = await AWS.DataSync.LocationHDFS("qopHDFSLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/agent-id-123"],
  SimpleUser: "hdfs-user",
  QopConfiguration: {
    Qop: "AUTHENTICATION",
    QopType: "PROTECTION"
  }
});
```
