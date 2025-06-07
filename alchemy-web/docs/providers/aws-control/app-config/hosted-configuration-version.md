---
title: Managing AWS AppConfig HostedConfigurationVersions with Alchemy
description: Learn how to create, update, and manage AWS AppConfig HostedConfigurationVersions using Alchemy Cloud Control.
---

# HostedConfigurationVersion

The HostedConfigurationVersion resource lets you manage [AWS AppConfig HostedConfigurationVersions](https://docs.aws.amazon.com/appconfig/latest/userguide/) for your applications. This resource is essential for versioning your configuration data, allowing for easier deployments and updates.

## Minimal Example

Create a basic hosted configuration version with required properties and an optional description:

```ts
import AWS from "alchemy/aws/control";

const BasicHostedConfigVersion = await AWS.AppConfig.HostedConfigurationVersion("BasicConfigVersion", {
  ApplicationId: "myAppId",
  ConfigurationProfileId: "myConfigProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ key: "value" }),
  Description: "Basic configuration version for my application."
});
```

## Advanced Configuration

Configure a hosted configuration version with additional options like version label and tags:

```ts
const AdvancedHostedConfigVersion = await AWS.AppConfig.HostedConfigurationVersion("AdvancedConfigVersion", {
  ApplicationId: "myAppId",
  ConfigurationProfileId: "myConfigProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ featureFlag: true, threshold: 75 }),
  VersionLabel: "v1.0.1",
  Description: "Advanced configuration version with feature flags.",
  adopt: true
});
```

## Versioning and Content Management

Create a new hosted configuration version while referencing the latest version number:

```ts
const ExistingConfigVersion = await AWS.AppConfig.HostedConfigurationVersion("ExistingConfigVersion", {
  ApplicationId: "myAppId",
  ConfigurationProfileId: "myConfigProfileId",
  ContentType: "application/json",
  Content: JSON.stringify({ newSetting: "enabled" }),
  LatestVersionNumber: 1, // Assuming 1 is the latest version
  VersionLabel: "v1.1.0"
});
```

## Using Content as YAML

You can also use YAML format for your configuration content:

```ts
const YamlHostedConfigVersion = await AWS.AppConfig.HostedConfigurationVersion("YamlConfigVersion", {
  ApplicationId: "myAppId",
  ConfigurationProfileId: "myConfigProfileId",
  ContentType: "text/yaml",
  Content: `
    key: value
    feature:
      enabled: true
      threshold: 75
  `,
  VersionLabel: "v2.0.0"
});
```