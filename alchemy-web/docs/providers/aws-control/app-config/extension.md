---
title: Managing AWS AppConfig Extensions with Alchemy
description: Learn how to create, update, and manage AWS AppConfig Extensions using Alchemy Cloud Control.
---

# Extension

The Extension resource lets you manage [AWS AppConfig Extensions](https://docs.aws.amazon.com/appconfig/latest/userguide/) to enhance the configuration management capabilities in your applications.

## Minimal Example

Create a basic AppConfig Extension with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicExtension = await AWS.AppConfig.Extension("BasicExtension", {
  Name: "BasicAppConfigExtension",
  Description: "This extension is used to enhance app configuration.",
  Actions: {
    // Define actions here (e.g., actions to be performed by the extension)
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "AppConfig" }
  ]
});
```

## Advanced Configuration

Configure an AppConfig Extension with parameters and additional actions.

```ts
const AdvancedExtension = await AWS.AppConfig.Extension("AdvancedExtension", {
  Name: "AdvancedAppConfigExtension",
  Description: "This extension includes advanced configuration options.",
  Parameters: {
    // Add parameter key-value pairs here (e.g., specific configuration parameters)
  },
  Actions: {
    // Define actions here (e.g., actions to be performed by the extension)
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "AppConfig" }
  ],
  adopt: true // Adopt existing resource if it exists
});
```

## Custom Actions

Demonstrate how to configure an extension with custom actions to be executed.

```ts
const CustomActionExtension = await AWS.AppConfig.Extension("CustomActionExtension", {
  Name: "CustomActionAppConfigExtension",
  Description: "This extension has custom actions.",
  Actions: {
    // Define your custom actions here
    Action1: {
      Type: "AWS::Lambda::Function",
      Properties: {
        FunctionName: "MyCustomActionHandler",
        Runtime: "nodejs14.x",
        Handler: "index.handler",
        Code: {
          ZipFile: "exports.handler = async (event) => { return 'Hello from custom action!'; };"
        }
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```