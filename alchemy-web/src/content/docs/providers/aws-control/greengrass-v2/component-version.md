---
title: ComponentVersion
description: Learn how to create, update, and manage AWS GreengrassV2 ComponentVersions using Alchemy Cloud Control.
---


The ComponentVersion resource allows you to create and manage versions of AWS GreengrassV2 components, enabling efficient deployment and updates of your IoT applications. For more information, visit the [AWS GreengrassV2 ComponentVersions documentation](https://docs.aws.amazon.com/greengrassv2/latest/userguide/).

## Minimal Example

Create a basic component version with a lambda function as the recipe source.

```ts
import AWS from "alchemy/aws/control";

const basicComponent = await AWS.GreengrassV2.ComponentVersion("basicComponent", {
  LambdaFunction: {
    // Define the Lambda function recipe source
    FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:myLambdaFunction",
    // Specify other Lambda function properties if necessary
  },
  Tags: {
    Environment: "Development",
    Project: "IoTApp"
  }
});
```

## Advanced Configuration

Configure a component version using an inline recipe for more complex setups.

```ts
const advancedComponent = await AWS.GreengrassV2.ComponentVersion("advancedComponent", {
  InlineRecipe: JSON.stringify({
    RecipeFormatVersion: "2020-01-25",
    Component: {
      Name: "com.example.advancedComponent",
      Version: "1.0.0",
      ComponentType: "aws.greengrass.generic",
      Manifests: [{
        Platform: {
          os: "linux",
          architecture: "arm64"
        },
        Lifecycle: {
          Run: {
            Path: "/usr/bin/myExecutable"
          }
        }
      }]
    }
  }),
  Tags: {
    Environment: "Production",
    Project: "IoTApp"
  }
});
```

## Using Inline Recipe with Additional Tags

Create a component version with an inline recipe and additional tags for better organization.

```ts
const taggedComponent = await AWS.GreengrassV2.ComponentVersion("taggedComponent", {
  InlineRecipe: JSON.stringify({
    RecipeFormatVersion: "2020-01-25",
    Component: {
      Name: "com.example.taggedComponent",
      Version: "1.0.1",
      ComponentType: "aws.greengrass.generic",
      Manifests: [{
        Platform: {
          os: "linux",
          architecture: "x86_64"
        },
        Lifecycle: {
          Run: {
            Path: "/usr/bin/myExecutable",
            Permissions: {
              "/usr/bin/myExecutable": {
                "Thing": "Allow"
              }
            }
          }
        }
      }]
    }
  }),
  Tags: {
    Environment: "Staging",
    Project: "IoTApp",
    Version: "v1.0.1"
  }
});
```
