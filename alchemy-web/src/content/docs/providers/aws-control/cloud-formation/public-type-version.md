---
title: PublicTypeVersion
description: Learn how to create, update, and manage AWS CloudFormation PublicTypeVersions using Alchemy Cloud Control.
---


The PublicTypeVersion resource allows you to manage the versions of public types in AWS CloudFormation. This resource can be utilized to register, update, and manage the versions of public CloudFormation types. For more details, refer to the [AWS CloudFormation PublicTypeVersions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic PublicTypeVersion with minimal required properties.

```ts
import AWS from "alchemy/aws/control";

const publicTypeVersion = await AWS.CloudFormation.PublicTypeVersion("myPublicTypeVersion", {
  TypeName: "MyOrg::MyType",
  Type: "resource",
  PublicVersionNumber: "1.0.0"
});
```

## Advanced Configuration

In this example, we configure a PublicTypeVersion with additional options such as log delivery bucket and adopting existing resources.

```ts
const advancedPublicTypeVersion = await AWS.CloudFormation.PublicTypeVersion("advancedPublicTypeVersion", {
  TypeName: "MyOrg::MyAdvancedType",
  Type: "resource",
  PublicVersionNumber: "1.0.1",
  LogDeliveryBucket: "my-log-delivery-bucket",
  adopt: true
});
```

## Logging Configuration

This example shows how to set up a PublicTypeVersion with a specific log delivery bucket for logging purposes.

```ts
const loggingPublicTypeVersion = await AWS.CloudFormation.PublicTypeVersion("loggingPublicTypeVersion", {
  TypeName: "MyOrg::MyLoggingType",
  Type: "resource",
  PublicVersionNumber: "1.0.2",
  LogDeliveryBucket: "my-logging-bucket"
});
```

## Resource Adoption

Here, we demonstrate how to adopt an existing public type version when creating a new instance.

```ts
const adoptExistingPublicTypeVersion = await AWS.CloudFormation.PublicTypeVersion("adoptExistingPublicTypeVersion", {
  TypeName: "MyOrg::MyAdoptedType",
  Type: "resource",
  PublicVersionNumber: "1.0.0",
  adopt: true // This will adopt the existing resource
});
```
