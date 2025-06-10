---
title: LocationNFS
description: Learn how to create, update, and manage AWS DataSync LocationNFSs using Alchemy Cloud Control.
---


The LocationNFS resource lets you manage [AWS DataSync LocationNFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between your on-premises NFS servers and AWS storage services.

## Minimal Example

Create a basic NFS location with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const nfsLocation = await AWS.DataSync.LocationNFS("myNFSLocation", {
  ServerHostname: "nfs.example.com",
  Subdirectory: "/data",
  OnPremConfig: {
    AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-1"]
  }
});
```

## Advanced Configuration

Configure an NFS location with mount options for better performance:

```ts
const advancedNfsLocation = await AWS.DataSync.LocationNFS("advancedNFSLocation", {
  ServerHostname: "nfs.example.com",
  Subdirectory: "/data",
  OnPremConfig: {
    AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-1"]
  },
  MountOptions: {
    Version: "nfs3",
    Tls: "off"
  }
});
```

## Adding Tags

Create an NFS location with tags for better resource management:

```ts
const taggedNfsLocation = await AWS.DataSync.LocationNFS("taggedNFSLocation", {
  ServerHostname: "nfs.example.com",
  Subdirectory: "/data",
  OnPremConfig: {
    AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-1"]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing NFS resource rather than creating a new one, set the `adopt` property to true:

```ts
const adoptedNfsLocation = await AWS.DataSync.LocationNFS("adoptedNFSLocation", {
  ServerHostname: "nfs.example.com",
  Subdirectory: "/data",
  OnPremConfig: {
    AgentArns: ["arn:aws:datasync:us-west-2:123456789012:agent/agent-1"]
  },
  adopt: true
});
```
