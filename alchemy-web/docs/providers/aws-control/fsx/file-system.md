---
title: Managing AWS FSx FileSystems with Alchemy
description: Learn how to create, update, and manage AWS FSx FileSystems using Alchemy Cloud Control.
---

# FileSystem

The FileSystem resource lets you create and manage [AWS FSx FileSystems](https://docs.aws.amazon.com/fsx/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-filesystem.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const filesystem = await AWS.FSx.FileSystem("filesystem-example", {
  SubnetIds: ["example-subnetids-1"],
  FileSystemType: "example-filesystemtype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a filesystem with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFileSystem = await AWS.FSx.FileSystem("advanced-filesystem", {
  SubnetIds: ["example-subnetids-1"],
  FileSystemType: "example-filesystemtype",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

