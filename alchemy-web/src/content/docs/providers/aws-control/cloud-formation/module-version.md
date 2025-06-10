---
title: ModuleVersion
description: Learn how to create, update, and manage AWS CloudFormation ModuleVersions using Alchemy Cloud Control.
---


The ModuleVersion resource allows you to create and manage [AWS CloudFormation ModuleVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/aws-resource-cloudformation-moduleversion.html), which are useful for versioning your CloudFormation modules.

## Minimal Example

This example demonstrates how to create a basic ModuleVersion with the required properties, including an optional `adopt` flag.

```ts
import AWS from "alchemy/aws/control";

const moduleVersion = await AWS.CloudFormation.ModuleVersion("myModuleVersion", {
  ModuleName: "MyAwesomeModule",
  ModulePackage: "s3://my-bucket/my-module-package.zip",
  adopt: true // Allows adoption of existing resources
});
```

## Advanced Configuration

In this example, we create a ModuleVersion with additional properties to manage its lifecycle.

```ts
const advancedModuleVersion = await AWS.CloudFormation.ModuleVersion("myAdvancedModuleVersion", {
  ModuleName: "MyAdvancedModule",
  ModulePackage: "s3://my-bucket/my-advanced-module.zip",
  adopt: true // Enables adoption of existing resources
});
```

## ModuleVersion with Metadata

This example illustrates how to retrieve additional metadata properties such as `Arn`, `CreationTime`, and `LastUpdateTime`.

```ts
const moduleVersionMetadata = await AWS.CloudFormation.ModuleVersion("myModuleVersionWithMetadata", {
  ModuleName: "MyModuleWithMetadata",
  ModulePackage: "s3://my-bucket/my-module-with-metadata.zip"
});

// Accessing metadata properties
console.log(`ARN: ${moduleVersionMetadata.Arn}`);
console.log(`Created At: ${moduleVersionMetadata.CreationTime}`);
console.log(`Last Updated At: ${moduleVersionMetadata.LastUpdateTime}`);
```

## Handling Existing ModuleVersions

This example shows how to handle situations where a ModuleVersion already exists by using the `adopt` property.

```ts
const existingModuleVersion = await AWS.CloudFormation.ModuleVersion("myExistingModuleVersion", {
  ModuleName: "ExistingModule",
  ModulePackage: "s3://my-bucket/existing-module-package.zip",
  adopt: true // Adopts the existing resource instead of failing
});
```
