---
title: Managing AWS Greengrass FunctionDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass FunctionDefinitionVersions using Alchemy Cloud Control.
---

# FunctionDefinitionVersion

The FunctionDefinitionVersion resource lets you create and manage [AWS Greengrass FunctionDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-functiondefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const functiondefinitionversion = await AWS.Greengrass.FunctionDefinitionVersion(
  "functiondefinitionversion-example",
  { Functions: [], FunctionDefinitionId: "example-functiondefinitionid" }
);
```

