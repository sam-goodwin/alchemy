---
title: Managing AWS BackupGateway Hypervisors with Alchemy
description: Learn how to create, update, and manage AWS BackupGateway Hypervisors using Alchemy Cloud Control.
---

# Hypervisor

The Hypervisor resource lets you create and manage [AWS BackupGateway Hypervisors](https://docs.aws.amazon.com/backupgateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backupgateway-hypervisor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const hypervisor = await AWS.BackupGateway.Hypervisor("hypervisor-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a hypervisor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedHypervisor = await AWS.BackupGateway.Hypervisor("advanced-hypervisor", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

