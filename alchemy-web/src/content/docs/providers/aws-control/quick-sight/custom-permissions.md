---
title: CustomPermissions
description: Learn how to create, update, and manage AWS QuickSight CustomPermissionss using Alchemy Cloud Control.
---


The CustomPermissions resource allows you to manage [AWS QuickSight Custom Permissions](https://docs.aws.amazon.com/quicksight/latest/userguide/) for your AWS account, enabling fine-grained access control for QuickSight resources.

## Minimal Example

Create a basic CustomPermissions resource with required properties.

```ts
import AWS from "alchemy/aws/control";

const customPermissions = await AWS.QuickSight.CustomPermissions("basicCustomPermissions", {
  CustomPermissionsName: "DefaultPermissions",
  AwsAccountId: "123456789012",
  Capabilities: {
    "SPICE": true,
    "ANALYSIS": true
  },
  Tags: [
    { Key: "Environment", Value: "Dev" },
    { Key: "Project", Value: "Analytics" }
  ]
});
```

## Advanced Configuration

Configure a CustomPermissions resource with a complex set of capabilities and tags.

```ts
const advancedCustomPermissions = await AWS.QuickSight.CustomPermissions("advancedCustomPermissions", {
  CustomPermissionsName: "AdvancedPermissions",
  AwsAccountId: "123456789012",
  Capabilities: {
    "SPICE": true,
    "ANALYSIS": true,
    "DASHBOARD": true,
    "DATASET": true,
    "USER": true
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Data Science" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```

## Adoption of Existing Resource

Create a CustomPermissions resource while adopting an existing resource if it already exists.

```ts
const adoptCustomPermissions = await AWS.QuickSight.CustomPermissions("adoptExistingCustomPermissions", {
  CustomPermissionsName: "ExistingPermissions",
  AwsAccountId: "123456789012",
  adopt: true
});
``` 

## Adding Tags for Organization

Create a CustomPermissions resource with multiple tags for better organization and management.

```ts
const taggedCustomPermissions = await AWS.QuickSight.CustomPermissions("taggedCustomPermissions", {
  CustomPermissionsName: "TaggedPermissions",
  AwsAccountId: "123456789012",
  Tags: [
    { Key: "Department", Value: "Marketing" },
    { Key: "Project", Value: "Sales Dashboard" },
    { Key: "Status", Value: "Active" }
  ]
});
```
