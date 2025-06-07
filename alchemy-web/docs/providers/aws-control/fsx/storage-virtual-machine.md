---
title: Managing AWS FSx StorageVirtualMachines with Alchemy
description: Learn how to create, update, and manage AWS FSx StorageVirtualMachines using Alchemy Cloud Control.
---

# StorageVirtualMachine

The StorageVirtualMachine resource lets you create and manage [AWS FSx StorageVirtualMachines](https://docs.aws.amazon.com/fsx/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-storagevirtualmachine.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storagevirtualmachine = await AWS.FSx.StorageVirtualMachine("storagevirtualmachine-example", {
  FileSystemId: "example-filesystemid",
  Name: "storagevirtualmachine-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a storagevirtualmachine with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStorageVirtualMachine = await AWS.FSx.StorageVirtualMachine(
  "advanced-storagevirtualmachine",
  {
    FileSystemId: "example-filesystemid",
    Name: "storagevirtualmachine-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

