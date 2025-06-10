---
title: Farm
description: Learn how to create, update, and manage AWS Deadline Farms using Alchemy Cloud Control.
---


The Farm resource allows you to manage your [AWS Deadline Farms](https://docs.aws.amazon.com/deadline/latest/userguide/) effectively. Deadline Farms are essential for managing render jobs in a cloud environment, providing the necessary infrastructure for handling rendering tasks and workflows.

## Minimal Example

Create a basic Deadline Farm with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicFarm = await AWS.Deadline.Farm("myBasicFarm", {
  DisplayName: "My Basic Deadline Farm",
  Description: "This is a basic Deadline Farm for rendering tasks."
});
```

## Advanced Configuration

Configure a Deadline Farm with additional settings such as KMS Key ARN for encryption and tags for resource management.

```ts
const advancedFarm = await AWS.Deadline.Farm("myAdvancedFarm", {
  DisplayName: "My Advanced Deadline Farm",
  Description: "This farm uses KMS for encryption and has specific tags.",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "VisualEffects" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing Deadline Farm instead of failing when it is already present, you can specify the adopt option.

```ts
const adoptFarm = await AWS.Deadline.Farm("myAdoptedFarm", {
  DisplayName: "My Adopted Deadline Farm",
  Description: "This farm will adopt existing resources if they exist.",
  adopt: true
});
```

## Resource Management with Tags

Use the Tags property to manage your Deadline Farms effectively, allowing for easy identification and categorization.

```ts
const taggedFarm = await AWS.Deadline.Farm("myTaggedFarm", {
  DisplayName: "My Tagged Deadline Farm",
  Description: "This farm is tagged for better resource management.",
  Tags: [
    { Key: "Project", Value: "RenderFarm2023" },
    { Key: "Owner", Value: "ArtDepartment" }
  ]
});
```
