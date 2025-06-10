---
title: TagSyncTask
description: Learn how to create, update, and manage AWS ResourceGroups TagSyncTasks using Alchemy Cloud Control.
---


The `TagSyncTask` resource allows you to manage AWS ResourceGroups TagSync tasks, which synchronize specified tags across AWS resources in a resource group. For more information, refer to the [AWS ResourceGroups TagSyncTasks](https://docs.aws.amazon.com/resourcegroups/latest/userguide/).

## Minimal Example

Create a basic TagSyncTask with required properties.

```ts
import AWS from "alchemy/aws/control";

const tagSyncTask = await AWS.ResourceGroups.TagSyncTask("myTagSyncTask", {
  Group: "my-resource-group",
  TagKey: "Environment",
  TagValue: "Production",
  RoleArn: "arn:aws:iam::123456789012:role/tagSyncRole"
});
```

## Advanced Configuration

Configure a TagSyncTask with the option to adopt existing resources instead of failing when a resource already exists.

```ts
const advancedTagSyncTask = await AWS.ResourceGroups.TagSyncTask("advancedTagSyncTask", {
  Group: "my-resource-group",
  TagKey: "Environment",
  TagValue: "Staging",
  RoleArn: "arn:aws:iam::123456789012:role/tagSyncRole",
  adopt: true // Allows adoption of existing resources
});
```

## Usage with IAM Role

Create a TagSyncTask that requires a specific IAM role to perform tagging operations. Ensure the role has the necessary permissions.

```ts
const iamRoleArn = "arn:aws:iam::123456789012:role/tagSyncRole";

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

const taskWithIamRole = await AWS.ResourceGroups.TagSyncTask("iamTagSyncTask", {
  Group: "my-resource-group",
  TagKey: "Department",
  TagValue: "Engineering",
  RoleArn: iamRoleArn
});
```

## Synchronize Multiple Tags

Create a TagSyncTask to synchronize multiple tags across resources in a resource group.

```ts
const multiTagSyncTask = await AWS.ResourceGroups.TagSyncTask("multiTagSyncTask", {
  Group: "my-resource-group",
  TagKey: "Owner",
  TagValue: "TeamA",
  RoleArn: "arn:aws:iam::123456789012:role/tagSyncRole"
});

// Assuming a similar task for another tag
const anotherTagSyncTask = await AWS.ResourceGroups.TagSyncTask("anotherTagSyncTask", {
  Group: "my-resource-group",
  TagKey: "Project",
  TagValue: "ProjectX",
  RoleArn: "arn:aws:iam::123456789012:role/tagSyncRole"
});
```
