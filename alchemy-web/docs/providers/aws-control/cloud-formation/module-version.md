---
title: Managing AWS CloudFormation ModuleVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation ModuleVersions using Alchemy Cloud Control.
---

# ModuleVersion

The ModuleVersion resource lets you create and manage [AWS CloudFormation ModuleVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-moduleversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const moduleversion = await AWS.CloudFormation.ModuleVersion("moduleversion-example", {
  ModulePackage: "example-modulepackage",
  ModuleName: "moduleversion-module",
});
```

