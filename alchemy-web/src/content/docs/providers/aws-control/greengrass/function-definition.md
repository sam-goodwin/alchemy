---
title: FunctionDefinition
description: Learn how to create, update, and manage AWS Greengrass FunctionDefinitions using Alchemy Cloud Control.
---


The FunctionDefinition resource allows you to create and manage [AWS Greengrass FunctionDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define a collection of AWS Lambda functions that are deployed to Greengrass core devices. 

## Minimal Example

Create a basic FunctionDefinition with a name and an initial version that includes a simple Lambda function.

```ts
import AWS from "alchemy/aws/control";

const initialFunctionVersion = {
  Functions: [{
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunction",
    FunctionConfiguration: {
      EncodingType: "json",
      MemorySize: 128,
      Pinned: true,
      Timeout: 3,
      Environment: {
        Variables: {
          MY_ENV_VAR: "value"
        }
      }
    }
  }]
};

const functionDefinition = await AWS.Greengrass.FunctionDefinition("myFunctionDefinition", {
  Name: "MyGreengrassFunctionDefinition",
  InitialVersion: initialFunctionVersion,
  Tags: {
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a FunctionDefinition with multiple functions, memory size, and a set of IAM policies for more complex setups.

```ts
const advancedInitialFunctionVersion = {
  Functions: [{
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunctionA",
    FunctionConfiguration: {
      EncodingType: "json",
      MemorySize: 256,
      Pinned: true,
      Timeout: 5,
      Environment: {
        Variables: {
          ENV_A: "valueA"
        }
      }
    }
  },
  {
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunctionB",
    FunctionConfiguration: {
      EncodingType: "json",
      MemorySize: 512,
      Pinned: false,
      Timeout: 10,
      Environment: {
        Variables: {
          ENV_B: "valueB"
        }
      }
    }
  }],
  CustomFunctionConfigurations: [{
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunctionB",
    FunctionConfiguration: {
      Policies: [{
        Effect: "Allow",
        Action: ["greengrass:StartFunction"],
        Resource: "*"
      }]
    }
  }]
};

const advancedFunctionDefinition = await AWS.Greengrass.FunctionDefinition("advancedFunctionDefinition", {
  Name: "AdvancedGreengrassFunctionDefinition",
  InitialVersion: advancedInitialFunctionVersion,
  Tags: {
    Environment: "Staging"
  }
});
```

## Using IAM Policies

Define a FunctionDefinition with specific IAM policies that grant permissions for Greengrass and Lambda operations.

```ts
const iamPolicyFunctionVersion = {
  Functions: [{
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyGreengrassFunctionWithPolicy",
    FunctionConfiguration: {
      EncodingType: "json",
      MemorySize: 128,
      Pinned: true,
      Timeout: 3,
      Environment: {
        Variables: {
          IAM_POLICY_VAR: "value"
        }
      }
    }
  }],
  Policies: [{
    Effect: "Allow",
    Action: [
      "greengrass:*",
      "lambda:InvokeFunction"
    ],
    Resource: "*"
  }]
};

const iamPolicyFunctionDefinition = await AWS.Greengrass.FunctionDefinition("iamPolicyFunctionDefinition", {
  Name: "FunctionWithIAMPolicy",
  InitialVersion: iamPolicyFunctionVersion,
  Tags: {
    Environment: "Development"
  }
});
```
