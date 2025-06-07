---
title: Managing AWS SSM MaintenanceWindowTargets with Alchemy
description: Learn how to create, update, and manage AWS SSM MaintenanceWindowTargets using Alchemy Cloud Control.
---

# MaintenanceWindowTarget

The MaintenanceWindowTarget resource allows you to define targets for your AWS Systems Manager Maintenance Windows. These targets can be specified using various resource types, enabling flexible management of the resources that will be operated on during the maintenance window. For more detailed information, refer to the [AWS SSM MaintenanceWindowTargets documentation](https://docs.aws.amazon.com/ssm/latest/userguide/).

## Minimal Example

Create a basic MaintenanceWindowTarget with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("BasicTarget", {
  WindowId: "mw-1234567890abcdef0",
  ResourceType: "INSTANCE",
  Targets: [{
    Key: "tag:Environment",
    Values: ["Production"]
  }],
  Description: "Target for production instances"
});
```

## Advanced Configuration

Configure a MaintenanceWindowTarget with additional options, including owner information and a more detailed target specification.

```ts
const AdvancedMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("AdvancedTarget", {
  WindowId: "mw-0987654321abcdef0",
  ResourceType: "INSTANCE",
  Targets: [{
    Key: "instanceids",
    Values: ["i-0abcd1234efgh5678", "i-0abcd1234efgh5679"]
  }],
  OwnerInformation: "Managed by DevOps Team",
  Name: "Advanced Production Target"
});
```

## Multiple Resource Types

Define a MaintenanceWindowTarget that targets multiple resource types, including EC2 instances and tags.

```ts
const MultiResourceMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("MultiResourceTarget", {
  WindowId: "mw-abcdef1234567890",
  ResourceType: "ALL",
  Targets: [
    {
      Key: "tag:Environment",
      Values: ["Staging"]
    },
    {
      Key: "instanceids",
      Values: ["i-0abcd1234efgh5678"]
    }
  ],
  Description: "Target for all staging resources"
});
```