---
title: Extension
description: Learn how to create, update, and manage AWS AppConfig Extensions using Alchemy Cloud Control.
---


The Extension resource lets you manage [AWS AppConfig Extensions](https://docs.aws.amazon.com/appconfig/latest/userguide/) for extending application configurations with custom actions and parameters.

## Minimal Example

Create a basic AppConfig Extension with essential properties.

```ts
import AWS from "alchemy/aws/control";

const appConfigExtension = await AWS.AppConfig.Extension("basicExtension", {
  Name: "MyBasicExtension",
  Actions: {
    "MyAction": {
      "ActionType": "AWS::Lambda::Function",
      "FunctionArn": "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction"
    }
  },
  Description: "A basic AppConfig extension for demonstration purposes."
});
```

## Advanced Configuration

Configure an AppConfig Extension with parameters and additional actions.

```ts
const advancedAppConfigExtension = await AWS.AppConfig.Extension("advancedExtension", {
  Name: "MyAdvancedExtension",
  Actions: {
    "MyAdvancedAction": {
      "ActionType": "AWS::StepFunctions::StateMachine",
      "StateMachineArn": "arn:aws:states:us-west-2:123456789012:stateMachine:myStateMachine"
    }
  },
  Parameters: {
    "parameter1": "value1",
    "parameter2": 42
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  Description: "An advanced AppConfig extension with parameters and tags."
});
```

## Adoption of Existing Resource

Create an AppConfig Extension that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingExtension = await AWS.AppConfig.Extension("existingExtension", {
  Name: "ExistingExtension",
  Actions: {
    "ExistingAction": {
      "ActionType": "AWS::SNS::Topic",
      "TopicArn": "arn:aws:sns:us-west-2:123456789012:myTopic"
    }
  },
  adopt: true, // Adopt existing resource if it exists
  Description: "This extension adopts an existing resource if available."
});
```
