---
title: AccessPolicy
description: Learn how to create, update, and manage AWS IoTSiteWise AccessPolicys using Alchemy Cloud Control.
---


The AccessPolicy resource allows you to manage [AWS IoTSiteWise AccessPolicys](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) which control access to your IoT SiteWise resources.

## Minimal Example

Create a basic access policy with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicAccessPolicy = await AWS.IoTSiteWise.AccessPolicy("basicAccessPolicy", {
  AccessPolicyResource: {
    id: "sitewise-resource-id", // Replace with your specific resource ID
    type: "AWS::IoTSiteWise::Asset" // Specify the type of resource
  },
  AccessPolicyIdentity: {
    id: "user-or-group-id", // Replace with the ID of the user or group
    type: "USER" // Specify whether it's a USER or GROUP
  },
  AccessPolicyPermission: "READ" // Permission level (e.g., READ, WRITE)
});
```

## Advanced Configuration

Configure an access policy with `adopt` option, allowing it to adopt existing resources.

```ts
const advancedAccessPolicy = await AWS.IoTSiteWise.AccessPolicy("advancedAccessPolicy", {
  AccessPolicyResource: {
    id: "existing-sitewise-resource-id", // Use the ID of an existing resource
    type: "AWS::IoTSiteWise::Asset" 
  },
  AccessPolicyIdentity: {
    id: "group-id", // Replace with the ID of your group
    type: "GROUP" // Specify the type as GROUP
  },
  AccessPolicyPermission: "WRITE", // Grant write permissions
  adopt: true // Adopt existing resource instead of failing
});
```

## Policy with Multiple Permissions

Create an access policy with multiple permissions for a user.

```ts
const multiPermissionPolicy = await AWS.IoTSiteWise.AccessPolicy("multiPermissionPolicy", {
  AccessPolicyResource: {
    id: "asset-id-12345", // Replace with a valid asset ID
    type: "AWS::IoTSiteWise::Asset"
  },
  AccessPolicyIdentity: {
    id: "user-id-67890", // Replace with the ID of the user
    type: "USER"
  },
  AccessPolicyPermission: JSON.stringify([
    {
      action: "iotsitewise:DescribeAsset",
      resource: "arn:aws:iotsitewise:region:account-id:asset/asset-id-12345"
    },
    {
      action: "iotsitewise:UpdateAsset",
      resource: "arn:aws:iotsitewise:region:account-id:asset/asset-id-12345"
    }
  ])
});
```
