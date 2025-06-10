---
title: MaintenanceWindowTarget
description: Learn how to create, update, and manage AWS SSM MaintenanceWindowTargets using Alchemy Cloud Control.
---


The MaintenanceWindowTarget resource lets you manage [AWS SSM Maintenance Window Targets](https://docs.aws.amazon.com/ssm/latest/userguide/) for executing tasks on specific resources during a defined maintenance window.

## Minimal Example

Create a basic Maintenance Window Target with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const maintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("myMaintenanceWindowTarget", {
  WindowId: "mw-1234567890abcdef0", // Specify the ID of the maintenance window
  ResourceType: "INSTANCE", // Type of the resource to target
  Targets: [
    {
      Key: "InstanceIds",
      Values: ["i-0abcd1234efgh5678"] // List of EC2 instance IDs to target
    }
  ],
  OwnerInformation: "example-owner-info" // Optional owner information
});
```

## Advanced Configuration

Configure a Maintenance Window Target with additional settings for better management and identification.

```ts
const advancedMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("advancedMaintenanceWindowTarget", {
  WindowId: "mw-0987654321fedcba0", // Specify the ID of the maintenance window
  ResourceType: "INSTANCE", // Type of the resource to target
  Targets: [
    {
      Key: "Tag:Environment",
      Values: ["Production"] // Target instances with a specific tag
    }
  ],
  Description: "Targets production instances for scheduled maintenance", // Optional description
  Name: "ProdMaintenanceTarget" // Optional name for the maintenance target
});
```

## Targeting Resources by Tags

Demonstrate how to target resources using tags for more flexible management.

```ts
const tagBasedMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("tagBasedMaintenanceWindowTarget", {
  WindowId: "mw-1122334455aabbcc0", // Specify the ID of the maintenance window
  ResourceType: "INSTANCE", // Type of the resource to target
  Targets: [
    {
      Key: "Tag:Role",
      Values: ["WebServer"] // Target instances with the "Role" tag set to "WebServer"
    }
  ],
  OwnerInformation: "tagging-strategy" // Optional owner information
});
```

## Targeting Multiple Resource Types

Create a Maintenance Window Target that can handle multiple resource types.

```ts
const multiTypeMaintenanceWindowTarget = await AWS.SSM.MaintenanceWindowTarget("multiTypeMaintenanceWindowTarget", {
  WindowId: "mw-2233445566ddeeff0", // Specify the ID of the maintenance window
  ResourceType: "MANAGED_INSTANCE", // Type of the resource to target
  Targets: [
    {
      Key: "InstanceIds",
      Values: ["i-0abcd1234efgh5678", "i-0ijkl9012mnop3456"] // List of multiple EC2 instance IDs to target
    }
  ],
  Description: "Targets managed instances for maintenance", // Optional description
  Name: "ManagedInstanceTarget" // Optional name for the maintenance target
});
```
