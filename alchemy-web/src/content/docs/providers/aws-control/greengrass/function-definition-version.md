---
title: FunctionDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass FunctionDefinitionVersions using Alchemy Cloud Control.
---


The FunctionDefinitionVersion resource allows you to manage [AWS Greengrass Function Definition Versions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define the functions to be executed on Greengrass core devices.

## Minimal Example

Create a basic FunctionDefinitionVersion with required properties and a default configuration.

```ts
import AWS from "alchemy/aws/control";

const functionDefinitionVersion = await AWS.Greengrass.FunctionDefinitionVersion("myFunctionDefVersion", {
  FunctionDefinitionId: "myFunctionDefId",
  Functions: [
    {
      Function: {
        FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:myGreengrassFunction",
        FunctionConfiguration: {
          EncodingType: "json",
          MemorySize: 128,
          Timeout: 3
        }
      }
    }
  ],
  DefaultConfig: {
    DefaultConfig: {
      Execution: {
        IsolationMode: "GreengrassContainer",
        RunAs: {
          User: "ggc_user"
        }
      }
    }
  }
});
```

## Advanced Configuration

Configure a FunctionDefinitionVersion with multiple functions and enhanced settings.

```ts
const advancedFunctionDefinitionVersion = await AWS.Greengrass.FunctionDefinitionVersion("advancedFunctionDefVersion", {
  FunctionDefinitionId: "advancedFunctionDefId",
  Functions: [
    {
      Function: {
        FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:myGreengrassFunction1",
        FunctionConfiguration: {
          EncodingType: "json",
          MemorySize: 256,
          Timeout: 5,
          Environment: {
            Variables: {
              ENV_VAR1: "value1",
              ENV_VAR2: "value2"
            }
          }
        }
      }
    },
    {
      Function: {
        FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:myGreengrassFunction2",
        FunctionConfiguration: {
          EncodingType: "json",
          MemorySize: 512,
          Timeout: 10,
          Environment: {
            Variables: {
              ENV_VAR3: "value3"
            }
          }
        }
      }
    }
  ],
  DefaultConfig: {
    DefaultConfig: {
      Execution: {
        IsolationMode: "GreengrassContainer",
        RunAs: {
          User: "ggc_user"
        }
      }
    }
  }
});
```

## Using Existing Resources

If you want to adopt an existing FunctionDefinitionVersion instead of failing when it already exists, set the `adopt` property to true.

```ts
const adoptFunctionDefinitionVersion = await AWS.Greengrass.FunctionDefinitionVersion("adoptedFunctionDefVersion", {
  FunctionDefinitionId: "existingFunctionDefId",
  Functions: [
    {
      Function: {
        FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:myExistingFunction",
        FunctionConfiguration: {
          EncodingType: "json",
          MemorySize: 256,
          Timeout: 5
        }
      }
    }
  ],
  adopt: true
});
```
