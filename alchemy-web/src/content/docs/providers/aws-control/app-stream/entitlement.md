---
title: Entitlement
description: Learn how to create, update, and manage AWS AppStream Entitlements using Alchemy Cloud Control.
---


The Entitlement resource lets you manage [AWS AppStream Entitlements](https://docs.aws.amazon.com/appstream/latest/userguide/) which define the visibility of applications for users in a specified stack.

## Minimal Example

Create a basic entitlement with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicEntitlement = await AWS.AppStream.Entitlement("basic-entitlement", {
  AppVisibility: "ALL",  // Make the application visible to all users
  Description: "Basic entitlement for all users",
  Attributes: [
    { Name: "Department", Value: "Engineering" }
  ],
  StackName: "EngineeringStack",
  Name: "EngineeringApps"
});
```

## Advanced Configuration

Configure an entitlement with more complex attributes and visibility.

```ts
const advancedEntitlement = await AWS.AppStream.Entitlement("advanced-entitlement", {
  AppVisibility: "SPECIFIC",  // Make the application visible to specific users
  Description: "Advanced entitlement for specific user roles",
  Attributes: [
    { Name: "Role", Value: "Admin" },
    { Name: "Location", Value: "US-West" }
  ],
  StackName: "AdminStack",
  Name: "AdminApps",
  adopt: true  // Adopt existing resource if it already exists
});
```

## Specific Use Case: Role-Based Access

Create an entitlement specifically for different roles within the organization.

```ts
const roleBasedEntitlement = await AWS.AppStream.Entitlement("role-based-entitlement", {
  AppVisibility: "SPECIFIC",  // Limit visibility to certain roles
  Description: "Entitlement for roles within the organization",
  Attributes: [
    { Name: "Role", Value: "HR" },
    { Name: "Role", Value: "Finance" }
  ],
  StackName: "HRFinanceStack",
  Name: "HRFinanceApps"
});
```
