---
title: HostedConfigurationVersion
description: Learn how to create, update, and manage AWS AppConfig HostedConfigurationVersions using Alchemy Cloud Control.
---


The HostedConfigurationVersion resource allows you to manage [AWS AppConfig HostedConfigurationVersions](https://docs.aws.amazon.com/appconfig/latest/userguide/) for your applications. This resource enables you to create and manage versions of your application configurations hosted in AWS AppConfig.

## Minimal Example

Create a basic HostedConfigurationVersion with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicConfigurationVersion = await AWS.AppConfig.HostedConfigurationVersion("basicConfigVersion", {
  ApplicationId: "myApplicationId",
  ConfigurationProfileId: "myConfigurationProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ featureEnabled: true }),
  Description: "Initial version of the configuration"
});
```

## Advanced Configuration

Configure a HostedConfigurationVersion with additional properties such as a version label and latest version number.

```ts
const advancedConfigurationVersion = await AWS.AppConfig.HostedConfigurationVersion("advancedConfigVersion", {
  ApplicationId: "myApplicationId",
  ConfigurationProfileId: "myConfigurationProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ featureEnabled: true, maxItems: 100 }),
  VersionLabel: "v1.0.1",
  LatestVersionNumber: 2,
  Description: "Updated configuration with more features"
});
```

## Adoption of Existing Resource

Use the adopt property to create a HostedConfigurationVersion that adopts an existing version if it already exists.

```ts
const adoptedConfigurationVersion = await AWS.AppConfig.HostedConfigurationVersion("adoptedConfigVersion", {
  ApplicationId: "myApplicationId",
  ConfigurationProfileId: "myConfigurationProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ featureEnabled: false }),
  Description: "Adopting existing configuration version",
  adopt: true
});
```
