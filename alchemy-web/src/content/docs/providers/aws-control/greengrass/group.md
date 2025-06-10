---
title: Group
description: Learn how to create, update, and manage AWS Greengrass Groups using Alchemy Cloud Control.
---


The Group resource allows you to manage [AWS Greengrass Groups](https://docs.aws.amazon.com/greengrass/latest/userguide/) for deploying and managing IoT applications at the edge.

## Minimal Example

Create a basic Greengrass Group with a specified name and role ARN.

```ts
import AWS from "alchemy/aws/control";

const greengrassGroup = await AWS.Greengrass.Group("myGreengrassGroup", {
  name: "MyGreengrassGroup",
  roleArn: "arn:aws:iam::123456789012:role/GreengrassGroupRole"
});
```

## Advanced Configuration

Configure a Greengrass Group with an initial version and tags for better management.

```ts
import AWS from "alchemy/aws/control";

const initialVersion = {
  // Define the initial version structure according to your needs
  groupId: "myGreengrassGroup",
  // Additional version configurations can go here
};

const advancedGreengrassGroup = await AWS.Greengrass.Group("advancedGreengrassGroup", {
  name: "AdvancedGreengrassGroup",
  roleArn: "arn:aws:iam::123456789012:role/GreengrassGroupRole",
  initialVersion: initialVersion,
  tags: {
    Project: "IoTApp",
    Environment: "Production"
  }
});
```

## Adding Existing Resources

If you want to adopt an existing Greengrass Group instead of failing when it already exists, you can set the `adopt` property to `true`.

```ts
import AWS from "alchemy/aws/control";

const adoptGreengrassGroup = await AWS.Greengrass.Group("existingGreengrassGroup", {
  name: "ExistingGreengrassGroup",
  adopt: true
});
```

## Using Initial Version with Lambda Functions

Create a Greengrass Group with an initial version that defines Lambda functions.

```ts
import AWS from "alchemy/aws/control";

const lambdaFunction = {
  // Define Lambda function configuration here
  functionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunction",
  functionConfiguration: {
    // Add your function configuration details here
    memorySize: 128,
    timeout: 3,
    environment: {
      MY_ENV_VARIABLE: "value"
    }
  }
};

const greengrassGroupWithLambda = await AWS.Greengrass.Group("greengrassWithLambda", {
  name: "GreengrassWithLambda",
  roleArn: "arn:aws:iam::123456789012:role/GreengrassGroupRole",
  initialVersion: {
    groupId: "greengrassWithLambda",
    functions: [lambdaFunction]
  }
});
```
