---
title: ResourceDefaultVersion
description: Learn how to create, update, and manage AWS CloudFormation ResourceDefaultVersions using Alchemy Cloud Control.
---


The ResourceDefaultVersion resource allows you to manage the default version of a custom resource type in AWS CloudFormation. This resource is essential for ensuring that your CloudFormation stacks use the latest version of your resource types. For more details, refer to the [AWS CloudFormation ResourceDefaultVersions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic ResourceDefaultVersion with essential properties.

```ts
import AWS from "alchemy/aws/control";

const resourceDefaultVersion = await AWS.CloudFormation.ResourceDefaultVersion("MyResourceDefaultVersion", {
  TypeName: "MyCustomResource",
  VersionId: "v1.0.0",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/resource/MyCustomResource/v1.0.0"
});
```

## Advanced Configuration

Configure a ResourceDefaultVersion with the option to adopt existing resources if they already exist.

```ts
const advancedResourceDefaultVersion = await AWS.CloudFormation.ResourceDefaultVersion("AdvancedResourceDefaultVersion", {
  TypeName: "MyCustomResource",
  VersionId: "v1.0.1",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/resource/MyCustomResource/v1.0.1",
  adopt: true // This allows adoption of existing resources
});
```

## Updating Resource Default Version

This example demonstrates how to update the default version of an existing resource type.

```ts
const updateResourceDefaultVersion = await AWS.CloudFormation.ResourceDefaultVersion("UpdateResourceDefaultVersion", {
  TypeName: "MyCustomResource",
  VersionId: "v1.1.0",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/resource/MyCustomResource/v1.1.0"
});
```

## Using ResourceDefaultVersion with Multiple Custom Types

Here’s how to manage default versions for multiple custom resource types.

```ts
const resourceDefaultVersionA = await AWS.CloudFormation.ResourceDefaultVersion("ResourceDefaultVersionA", {
  TypeName: "CustomResourceA",
  VersionId: "v1.0.0",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/resource/CustomResourceA/v1.0.0"
});

const resourceDefaultVersionB = await AWS.CloudFormation.ResourceDefaultVersion("ResourceDefaultVersionB", {
  TypeName: "CustomResourceB",
  VersionId: "v2.0.0",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/resource/CustomResourceB/v2.0.0",
  adopt: true
});
```
