---
title: Managing AWS Greengrass CoreDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass CoreDefinitionVersions using Alchemy Cloud Control.
---

# CoreDefinitionVersion

The CoreDefinitionVersion resource lets you create and manage [AWS Greengrass CoreDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-coredefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const coredefinitionversion = await AWS.Greengrass.CoreDefinitionVersion(
  "coredefinitionversion-example",
  { Cores: [], CoreDefinitionId: "example-coredefinitionid" }
);
```

