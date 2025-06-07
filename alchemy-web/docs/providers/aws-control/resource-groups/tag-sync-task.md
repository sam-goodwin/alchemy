---
title: Managing AWS ResourceGroups TagSyncTasks with Alchemy
description: Learn how to create, update, and manage AWS ResourceGroups TagSyncTasks using Alchemy Cloud Control.
---

# TagSyncTask

The TagSyncTask resource allows you to manage tagging synchronization tasks for AWS Resource Groups. This resource helps you ensure that your AWS resources are organized and tagged consistently across your organization. For more information, refer to the [AWS ResourceGroups TagSyncTasks documentation](https://docs.aws.amazon.com/resourcegroups/latest/userguide/).

## Minimal Example

Create a basic TagSyncTask that associates a specific tag with a resource group.

```ts
import AWS from "alchemy/aws/control";

const basicTagSyncTask = await AWS.ResourceGroups.TagSyncTask("BasicTagSyncTask", {
  Group: "MyResourceGroup",
  TagKey: "Environment",
  TagValue: "Production",
  RoleArn: "arn:aws:iam::123456789012:role/my-tag-sync-role"
});
```

## Advanced Configuration

Configure a TagSyncTask that adopts existing resources and includes specific tags.

```ts
const advancedTagSyncTask = await AWS.ResourceGroups.TagSyncTask("AdvancedTagSyncTask", {
  Group: "MyResourceGroup",
  TagKey: "Team",
  TagValue: "DevOps",
  RoleArn: "arn:aws:iam::123456789012:role/my-tag-sync-role",
  adopt: true
});
```

## Using IAM Role for Permissions

Create a TagSyncTask that ensures the task is executed with the appropriate permissions defined in the IAM role.

```ts
const permissionsTagSyncTask = await AWS.ResourceGroups.TagSyncTask("PermissionsTagSyncTask", {
  Group: "MyResourceGroup",
  TagKey: "Stage",
  TagValue: "Testing",
  RoleArn: "arn:aws:iam::123456789012:role/my-tag-sync-role"
});

// The IAM Role needs to have policies allowing tagging resources
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "resourcegroupstaggingapi:TagResources",
        "resourcegroupstaggingapi:UntagResources"
      ],
      Resource: "*"
    }
  ]
};
```

## Cleaning Up Resources

When the TagSyncTask is no longer needed, you can create a task to clean up by removing specific tags from resources.

```ts
const cleanupTagSyncTask = await AWS.ResourceGroups.TagSyncTask("CleanupTagSyncTask", {
  Group: "MyResourceGroup",
  TagKey: "Environment",
  TagValue: "Staging",
  RoleArn: "arn:aws:iam::123456789012:role/my-tag-sync-role",
  adopt: false // This will fail if resources with the given tag do not exist
});
```