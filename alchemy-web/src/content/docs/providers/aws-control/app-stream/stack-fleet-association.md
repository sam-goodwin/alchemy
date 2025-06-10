---
title: StackFleetAssociation
description: Learn how to create, update, and manage AWS AppStream StackFleetAssociations using Alchemy Cloud Control.
---


The StackFleetAssociation resource allows you to associate an AppStream stack with a fleet, enabling the distribution of resources across your application. For more details, refer to the [AWS AppStream StackFleetAssociations](https://docs.aws.amazon.com/appstream/latest/userguide/).

## Minimal Example

Create a basic StackFleetAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicAssociation = await AWS.AppStream.StackFleetAssociation("basic-association", {
  FleetName: "MyFleet",
  StackName: "MyStack",
  adopt: true // If true, adopts existing resource instead of failing if it already exists
});
```

## Advanced Configuration

You can create a StackFleetAssociation and access additional properties like ARN, creation time, and last update time.

```ts
const advancedAssociation = await AWS.AppStream.StackFleetAssociation("advanced-association", {
  FleetName: "AdvancedFleet",
  StackName: "AdvancedStack",
  adopt: false // Default is false
});

// Accessing additional properties
console.log(`ARN: ${advancedAssociation.Arn}`);
console.log(`Created At: ${advancedAssociation.CreationTime}`);
console.log(`Last Updated At: ${advancedAssociation.LastUpdateTime}`);
```

## Specific Use Case: Handling Existing Resources

If you are working in an environment where resources may already exist, you can adopt them instead of creating new associations.

```ts
const existingAssociation = await AWS.AppStream.StackFleetAssociation("existing-association", {
  FleetName: "ExistingFleet",
  StackName: "ExistingStack",
  adopt: true // This will adopt the existing resource
});

// Confirming the association
console.log(`Successfully associated: ${existingAssociation.FleetName} with ${existingAssociation.StackName}`);
```
