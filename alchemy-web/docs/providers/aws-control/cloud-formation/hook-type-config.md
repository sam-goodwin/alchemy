---
title: Managing AWS CloudFormation HookTypeConfigs with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation HookTypeConfigs using Alchemy Cloud Control.
---

# HookTypeConfig

The HookTypeConfig resource lets you create and manage [AWS CloudFormation HookTypeConfigs](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-hooktypeconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const hooktypeconfig = await AWS.CloudFormation.HookTypeConfig("hooktypeconfig-example", {
  Configuration: "example-configuration",
});
```

