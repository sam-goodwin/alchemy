---
title: ModuleDefaultVersion
description: Learn how to create, update, and manage AWS CloudFormation ModuleDefaultVersions using Alchemy Cloud Control.
---


The ModuleDefaultVersion resource allows you to specify the default version of a CloudFormation module. This is useful for managing versions of reusable CloudFormation components. For more details, refer to the [AWS CloudFormation ModuleDefaultVersions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic ModuleDefaultVersion with a specified version ID and module name.

```ts
import AWS from "alchemy/aws/control";

const defaultVersion = await AWS.CloudFormation.ModuleDefaultVersion("defaultModuleVersion", {
  VersionId: "v1.0.0",
  ModuleName: "MyAwesomeModule"
});
```

## Advanced Configuration

Configure a ModuleDefaultVersion with additional properties such as adoption of existing resources.

```ts
const advancedVersion = await AWS.CloudFormation.ModuleDefaultVersion("advancedModuleVersion", {
  VersionId: "v2.0.0",
  ModuleName: "MyAwesomeModule",
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Resource Information

When you create a ModuleDefaultVersion, you can also access the resource ARN and its creation/update timestamps.

```ts
const moduleInfo = await AWS.CloudFormation.ModuleDefaultVersion("infoModuleVersion", {
  VersionId: "v2.1.0",
  ModuleName: "MyAwesomeModule"
});

console.log(`Module ARN: ${moduleInfo.Arn}`);
console.log(`Creation Time: ${moduleInfo.CreationTime}`);
console.log(`Last Update Time: ${moduleInfo.LastUpdateTime}`);
```
