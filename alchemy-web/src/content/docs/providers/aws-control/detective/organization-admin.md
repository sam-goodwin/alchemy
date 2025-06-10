---
title: OrganizationAdmin
description: Learn how to create, update, and manage AWS Detective OrganizationAdmins using Alchemy Cloud Control.
---


The OrganizationAdmin resource lets you manage [AWS Detective OrganizationAdmins](https://docs.aws.amazon.com/detective/latest/userguide/) and their configurations. This resource helps in managing the administrator account for AWS Detective.

## Minimal Example

Create a basic OrganizationAdmin with required properties.

```ts
import AWS from "alchemy/aws/control";

const organizationAdmin = await AWS.Detective.OrganizationAdmin("myOrganizationAdmin", {
  AccountId: "123456789012",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Here is an example of creating an OrganizationAdmin with minimal properties along with the adoption feature.

```ts
const advancedOrganizationAdmin = await AWS.Detective.OrganizationAdmin("advancedOrgAdmin", {
  AccountId: "987654321098",
  adopt: true // Adopt the existing resource
});
```

## Handling Existing Resources

If you want to ensure that your OrganizationAdmin resource does not fail when the resource already exists, you can set the `adopt` property to true.

```ts
const adoptedOrganizationAdmin = await AWS.Detective.OrganizationAdmin("existingOrgAdmin", {
  AccountId: "555555555555",
  adopt: true // This will allow the resource to be adopted instead of failing
});
```

## Resource Lifecycle Management

You can also manage the lifecycle of the OrganizationAdmin resource by specifying properties that handle creation and updates.

```ts
const lifecycleManagedAdmin = await AWS.Detective.OrganizationAdmin("lifecycleOrgAdmin", {
  AccountId: "333333333333",
  adopt: false // Do not adopt existing resources
});
```
