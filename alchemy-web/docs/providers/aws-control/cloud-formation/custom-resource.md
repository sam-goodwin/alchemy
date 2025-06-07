---
title: Managing AWS CloudFormation CustomResources with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation CustomResources using Alchemy Cloud Control.
---

# CustomResource

The CustomResource resource lets you create and manage [AWS CloudFormation CustomResources](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cfn-customresource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const customresource = await AWS.CloudFormation.CustomResource("customresource-example", {
  ServiceToken: "example-servicetoken",
});
```

