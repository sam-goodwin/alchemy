---
title: Managing AWS DataSync LocationHDFSs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationHDFSs using Alchemy Cloud Control.
---

# LocationHDFS

The LocationHDFS resource lets you manage [AWS DataSync LocationHDFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between HDFS and AWS storage services.

## Minimal Example

Create a basic HDFS location with the required properties and a couple of optional properties.

```ts
import AWS from "alchemy/aws/control";

const HdfsLocation = await AWS.DataSync.LocationHDFS("MyHdfsLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  KerberosPrincipal: "hdfs/_HOST@EXAMPLE.COM",
  KerberosKeytab: "/etc/security/keytabs/hdfs.keytab",
  KerberosKrb5Conf: "/etc/krb5.conf",
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-1"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure HDFS location with additional security and performance settings.

```ts
const AdvancedHdfsLocation = await AWS.DataSync.LocationHDFS("AdvancedHdfsLocation", {
  NameNodes: [
    {
      Hostname: "secure-namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  KerberosPrincipal: "hdfs/_HOST@SECURE.EXAMPLE.COM",
  KerberosKeytab: "/etc/security/keytabs/hdfs-secure.keytab",
  KerberosKrb5Conf: "/etc/krb5-secure.conf",
  KmsKeyProviderUri: "hdfs://kms.example.com:5000",
  BlockSize: 1048576,
  ReplicationFactor: 3,
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-2"],
  Tags: [
    { Key: "Environment", Value: "test" },
    { Key: "Team", Value: "DataOps" }
  ]
});
```

## Configuring with Subdirectories

Create an HDFS location that specifies a subdirectory for data transfer.

```ts
const SubdirectoryHdfsLocation = await AWS.DataSync.LocationHDFS("SubdirectoryHdfsLocation", {
  NameNodes: [
    {
      Hostname: "namenode.example.com",
      Port: 8020
    }
  ],
  AuthenticationType: "KERBEROS",
  KerberosPrincipal: "hdfs/_HOST@EXAMPLE.COM",
  KerberosKeytab: "/etc/security/keytabs/hdfs.keytab",
  Subdirectory: "/data/transfers",
  AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-3"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```