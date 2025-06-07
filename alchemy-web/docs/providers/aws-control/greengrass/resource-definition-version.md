---
title: Managing AWS Greengrass ResourceDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass ResourceDefinitionVersions using Alchemy Cloud Control.
---

# ResourceDefinitionVersion

The ResourceDefinitionVersion resource lets you create and manage [AWS Greengrass ResourceDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-resourcedefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcedefinitionversion = await AWS.Greengrass.ResourceDefinitionVersion(
  "resourcedefinitionversion-example",
  { Resources: [], ResourceDefinitionId: "example-resourcedefinitionid" }
);
```

