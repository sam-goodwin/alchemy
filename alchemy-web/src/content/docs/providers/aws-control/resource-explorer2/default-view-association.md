---
title: DefaultViewAssociation
description: Learn how to create, update, and manage AWS ResourceExplorer2 DefaultViewAssociations using Alchemy Cloud Control.
---


The DefaultViewAssociation resource allows you to manage the association of a default view within AWS Resource Explorer 2. This resource enables you to specify which view should be used as the default for resource exploration. For more details, refer to the [AWS ResourceExplorer2 DefaultViewAssociations documentation](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/).

## Minimal Example

Create a basic DefaultViewAssociation with the required `ViewArn` property.

```ts
import AWS from "alchemy/aws/control";

const defaultViewAssociation = await AWS.ResourceExplorer2.DefaultViewAssociation("basicViewAssociation", {
  ViewArn: "arn:aws:resource-explorer-2:us-west-2:123456789012:view/my-view"
});
```

## Enhanced Adoption Settings

This example demonstrates how to adopt an existing DefaultViewAssociation instead of failing if it already exists.

```ts
const adoptedViewAssociation = await AWS.ResourceExplorer2.DefaultViewAssociation("adoptedViewAssociation", {
  ViewArn: "arn:aws:resource-explorer-2:us-west-2:123456789012:view/my-view",
  adopt: true
});
```

## Advanced Configuration

In this scenario, we are creating a DefaultViewAssociation and showing how to utilize additional properties like `Arn`, `CreationTime`, and `LastUpdateTime`.

```ts
const advancedViewAssociation = await AWS.ResourceExplorer2.DefaultViewAssociation("advancedViewAssociation", {
  ViewArn: "arn:aws:resource-explorer-2:us-west-2:123456789012:view/my-advanced-view",
  adopt: false // Default is false
});

// Accessing additional properties
console.log(`ARN: ${advancedViewAssociation.Arn}`);
console.log(`Created at: ${advancedViewAssociation.CreationTime}`);
console.log(`Last updated at: ${advancedViewAssociation.LastUpdateTime}`);
```
