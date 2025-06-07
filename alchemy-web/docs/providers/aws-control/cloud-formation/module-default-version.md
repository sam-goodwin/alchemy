---
title: Managing AWS CloudFormation ModuleDefaultVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation ModuleDefaultVersions using Alchemy Cloud Control.
---

# ModuleDefaultVersion

The ModuleDefaultVersion resource lets you manage the default version of a CloudFormation module, enabling you to specify which version of the module should be used when creating stack instances. For more details, visit the [AWS CloudFormation ModuleDefaultVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) documentation.

## Minimal Example

Create a basic ModuleDefaultVersion with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const DefaultVersion = await AWS.CloudFormation.ModuleDefaultVersion("MyModuleDefaultVersion", {
  ModuleName: "MyModule",
  VersionId: "1.0.0"
});
```

## Advanced Configuration

Configure a ModuleDefaultVersion with additional properties such as adopting an existing resource.

```ts
const AdvancedDefaultVersion = await AWS.CloudFormation.ModuleDefaultVersion("AdvancedModuleDefaultVersion", {
  ModuleName: "MyAdvancedModule",
  VersionId: "2.0.0",
  adopt: true // Adopts the resource if it already exists
});
```

## Example with ARN

Create a ModuleDefaultVersion and access its ARN after creation.

```ts
const ModuleWithArn = await AWS.CloudFormation.ModuleDefaultVersion("ModuleWithArn", {
  ModuleName: "MyModuleWithArn",
  VersionId: "1.2.3"
});

// Access the ARN property
console.log(`The ARN of the module is: ${ModuleWithArn.Arn}`);
```