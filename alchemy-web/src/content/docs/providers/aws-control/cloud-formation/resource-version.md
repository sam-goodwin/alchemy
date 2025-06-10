---
title: ResourceVersion
description: Learn how to create, update, and manage AWS CloudFormation ResourceVersions using Alchemy Cloud Control.
---


The ResourceVersion resource lets you manage [AWS CloudFormation ResourceVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) which define the schema and behavior of custom AWS CloudFormation resources.

## Minimal Example

Create a basic ResourceVersion with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const resourceVersion = await AWS.CloudFormation.ResourceVersion("myResourceVersion", {
  TypeName: "My::Custom::Resource",
  SchemaHandlerPackage: "s3://my-bucket/my-handler.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyExecutionRole"
});
```

## Advanced Configuration

Configure a ResourceVersion with additional logging settings to capture detailed execution information:

```ts
import AWS from "alchemy/aws/control";

const loggingConfig = {
  LogGroupName: "my-log-group",
  LogRoleArn: "arn:aws:iam::123456789012:role/MyLoggingRole",
  LogLevel: "INFO"
};

const advancedResourceVersion = await AWS.CloudFormation.ResourceVersion("advancedResourceVersion", {
  TypeName: "My::Advanced::CustomResource",
  SchemaHandlerPackage: "s3://my-bucket/my-advanced-handler.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyExecutionRole",
  LoggingConfig: loggingConfig
});
```

## Adoption of Existing Resources

Adopt an existing resource without failing if it already exists by setting the `adopt` property to true:

```ts
import AWS from "alchemy/aws/control";

const adoptedResourceVersion = await AWS.CloudFormation.ResourceVersion("adoptedResourceVersion", {
  TypeName: "My::Adopted::Resource",
  SchemaHandlerPackage: "s3://my-bucket/my-adopted-handler.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyExecutionRole",
  adopt: true
});
```
