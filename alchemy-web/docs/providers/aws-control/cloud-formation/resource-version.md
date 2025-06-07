---
title: Managing AWS CloudFormation ResourceVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation ResourceVersions using Alchemy Cloud Control.
---

# ResourceVersion

The ResourceVersion resource lets you create and manage [AWS CloudFormation ResourceVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-resourceversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourceversion = await AWS.CloudFormation.ResourceVersion("resourceversion-example", {
  TypeName: "resourceversion-type",
  SchemaHandlerPackage: "example-schemahandlerpackage",
});
```

