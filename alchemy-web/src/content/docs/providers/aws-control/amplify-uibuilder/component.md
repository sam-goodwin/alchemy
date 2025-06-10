---
title: Component
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Components using Alchemy Cloud Control.
---


The Component resource lets you manage [AWS AmplifyUIBuilder Components](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/) that define the UI components in your Amplify application.

## Minimal Example

This example demonstrates how to create a simple UI component with a basic structure.

```ts
import AWS from "alchemy/aws/control";

const basicComponent = await AWS.AmplifyUIBuilder.Component("basicComponent", {
  ComponentType: "Button",
  SchemaVersion: "1.0",
  Properties: {
    label: "Click Me",
    color: "primary"
  },
  AppId: "myAmplifyAppId",
  EnvironmentName: "dev"
});
```

## Advanced Configuration

This example illustrates how to configure a component with binding properties and event handlers for more complex interactions.

```ts
const advancedComponent = await AWS.AmplifyUIBuilder.Component("advancedComponent", {
  ComponentType: "Form",
  SchemaVersion: "1.0",
  Properties: {
    title: "User Registration",
    fields: [
      { name: "username", type: "text", required: true },
      { name: "password", type: "password", required: true }
    ]
  },
  BindingProperties: {
    username: { model: "formData.username" },
    password: { model: "formData.password" }
  },
  Events: {
    onSubmit: {
      action: "submit",
      target: "formSubmitHandler"
    }
  },
  AppId: "myAmplifyAppId",
  EnvironmentName: "dev"
});
```

## Component with Variants

This example shows how to create a component with different visual variants for responsive design.

```ts
const variantComponent = await AWS.AmplifyUIBuilder.Component("variantComponent", {
  ComponentType: "Card",
  SchemaVersion: "1.0",
  Variants: [
    {
      name: "default",
      Properties: {
        backgroundColor: "white",
        borderColor: "lightgrey"
      }
    },
    {
      name: "highlighted",
      Properties: {
        backgroundColor: "yellow",
        borderColor: "orange"
      }
    }
  ],
  AppId: "myAmplifyAppId",
  EnvironmentName: "dev"
});
``` 

## Component with Child Components

This example demonstrates how to include child components within a component definition.

```ts
const parentComponent = await AWS.AmplifyUIBuilder.Component("parentComponent", {
  ComponentType: "Container",
  SchemaVersion: "1.0",
  Children: [
    {
      ComponentType: "Header",
      Properties: {
        title: "Welcome to My App"
      }
    },
    {
      ComponentType: "Button",
      Properties: {
        label: "Get Started",
        color: "blue"
      }
    }
  ],
  AppId: "myAmplifyAppId",
  EnvironmentName: "dev"
});
```
