---
title: OrganizationConfiguration
description: Learn how to create, update, and manage AWS SecurityHub OrganizationConfigurations using Alchemy Cloud Control.
---


The OrganizationConfiguration resource lets you manage the configuration settings for AWS SecurityHub across multiple accounts within an organization. For more details, visit the [AWS SecurityHub OrganizationConfigurations documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/).

## Minimal Example

Create a basic OrganizationConfiguration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicOrgConfig = await AWS.SecurityHub.OrganizationConfiguration("basicOrgConfig", {
  AutoEnable: true,
  ConfigurationType: "DEFAULT"
});
```

## Advanced Configuration

Configure an OrganizationConfiguration with additional settings for auto-enabling standards.

```ts
const advancedOrgConfig = await AWS.SecurityHub.OrganizationConfiguration("advancedOrgConfig", {
  AutoEnable: true,
  AutoEnableStandards: "ENABLE_ALL"
});
```

## Adopting Existing Resources

If you want to adopt existing OrganizationConfigurations instead of failing when the resource already exists, you can set the `adopt` property to true.

```ts
const adoptExistingOrgConfig = await AWS.SecurityHub.OrganizationConfiguration("adoptOrgConfig", {
  AutoEnable: false,
  ConfigurationType: "CUSTOM",
  adopt: true
});
```
