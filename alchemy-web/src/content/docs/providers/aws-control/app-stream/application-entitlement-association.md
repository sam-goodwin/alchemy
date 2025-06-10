---
title: ApplicationEntitlementAssociation
description: Learn how to create, update, and manage AWS AppStream ApplicationEntitlementAssociations using Alchemy Cloud Control.
---


The ApplicationEntitlementAssociation resource allows you to manage the association between applications and entitlements in AWS AppStream. This resource helps in controlling user access to applications based on their entitlements. For more information, visit the [AWS AppStream ApplicationEntitlementAssociations documentation](https://docs.aws.amazon.com/appstream/latest/userguide/).

## Minimal Example

Create a basic ApplicationEntitlementAssociation that associates an application with an entitlement.

```ts
import AWS from "alchemy/aws/control";

const appEntitlementAssociation = await AWS.AppStream.ApplicationEntitlementAssociation("appEntitlementAssociation1", {
  EntitlementName: "FinanceAppEntitlement",
  ApplicationIdentifier: "FinanceApp",
  StackName: "FinanceStack",
  adopt: true // Set to true to adopt existing resources if they exist
});
```

## Advanced Configuration

This example demonstrates how to create an ApplicationEntitlementAssociation with additional properties, focusing on entitlement management in a more complex environment.

```ts
const advancedAppEntitlementAssociation = await AWS.AppStream.ApplicationEntitlementAssociation("advancedAppEntitlementAssociation", {
  EntitlementName: "AdvancedEntitlement",
  ApplicationIdentifier: "AdvancedApp",
  StackName: "AdvancedStack",
  adopt: false // Default is false; it will fail if the resource already exists
});
```

## Use Case: Updating Existing Association

This example shows updating an existing ApplicationEntitlementAssociation by specifying the same identifiers.

```ts
const updateAppEntitlementAssociation = await AWS.AppStream.ApplicationEntitlementAssociation("updateAppEntitlementAssociation", {
  EntitlementName: "UpdatedEntitlement",
  ApplicationIdentifier: "UpdatedApp",
  StackName: "UpdatedStack",
  adopt: true // Adopt existing association if it exists
});
```

## Use Case: Managing Multiple Associations

This example illustrates how to manage multiple ApplicationEntitlementAssociations for different applications within the same stack.

```ts
const firstAssociation = await AWS.AppStream.ApplicationEntitlementAssociation("firstAssociation", {
  EntitlementName: "FirstAppEntitlement",
  ApplicationIdentifier: "FirstApp",
  StackName: "CommonStack"
});

const secondAssociation = await AWS.AppStream.ApplicationEntitlementAssociation("secondAssociation", {
  EntitlementName: "SecondAppEntitlement",
  ApplicationIdentifier: "SecondApp",
  StackName: "CommonStack"
});
```
