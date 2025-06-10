---
title: Plugin
description: Learn how to create, update, and manage AWS QBusiness Plugins using Alchemy Cloud Control.
---


The Plugin resource allows you to manage [AWS QBusiness Plugins](https://docs.aws.amazon.com/qbusiness/latest/userguide/) for integrating custom functionalities into your applications.

## Minimal Example

Create a basic QBusiness Plugin with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPlugin = await AWS.QBusiness.Plugin("basicPlugin", {
  Type: "custom",
  DisplayName: "Basic Custom Plugin",
  AuthConfiguration: {
    // Example of a basic AuthConfiguration
    AuthType: "API_KEY",
    ApiKey: alchemy.secret(process.env.PLUGIN_API_KEY!)
  }
});
```

## Advanced Configuration

Configure a QBusiness Plugin with a custom server URL and additional settings.

```ts
const advancedPlugin = await AWS.QBusiness.Plugin("advancedPlugin", {
  Type: "custom",
  DisplayName: "Advanced Custom Plugin",
  ServerUrl: "https://api.customplugin.com/v1",
  CustomPluginConfiguration: {
    // Example of a custom plugin configuration
    ConfigurationKey: "ConfigurationValue",
    Timeout: 30 // Timeout in seconds
  },
  AuthConfiguration: {
    AuthType: "OAUTH",
    ClientId: alchemy.secret(process.env.PLUGIN_CLIENT_ID!),
    ClientSecret: alchemy.secret(process.env.PLUGIN_CLIENT_SECRET!)
  }
});
```

## Updating Plugin State

Change the state of an existing QBusiness Plugin to 'ACTIVE' or 'INACTIVE'.

```ts
const updatePluginState = await AWS.QBusiness.Plugin("updatePluginState", {
  Type: "custom",
  DisplayName: "Plugin State Update",
  State: "ACTIVE",
  AuthConfiguration: {
    AuthType: "API_KEY",
    ApiKey: alchemy.secret(process.env.PLUGIN_API_KEY!)
  }
});
```

## Tagging Plugins

Add tags to your QBusiness Plugin for better organization and management.

```ts
const taggedPlugin = await AWS.QBusiness.Plugin("taggedPlugin", {
  Type: "custom",
  DisplayName: "Tagged Custom Plugin",
  AuthConfiguration: {
    AuthType: "API_KEY",
    ApiKey: alchemy.secret(process.env.PLUGIN_API_KEY!)
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```
