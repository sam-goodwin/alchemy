---
title: Managing AWS CloudFormation Stacks with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation Stacks using Alchemy Cloud Control.
---

# Stack

The Stack resource lets you manage [AWS CloudFormation Stacks](https://docs.aws.amazon.com/cloudformation/latest/userguide/) which are used to create and update AWS resources in a predictable manner.

## Minimal Example

Create a basic CloudFormation stack with a template URL and some parameters.

```ts
import AWS from "alchemy/aws/control";

const BasicStack = await AWS.CloudFormation.Stack("BasicStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair"
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AlchemyDemo" }
  ]
});
```

## Advanced Configuration

Configure a stack with notification ARNs and a timeout setting.

```ts
const AdvancedStack = await AWS.CloudFormation.Stack("AdvancedStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair"
  },
  NotificationARNs: [
    "arn:aws:sns:us-east-1:123456789012:my-topic"
  ],
  TimeoutInMinutes: 30,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Stack with Adoption of Existing Resources

Create a stack that adopts existing resources instead of failing if they already exist.

```ts
const AdoptExistingStack = await AWS.CloudFormation.Stack("AdoptExistingStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair"
  },
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "AlchemyAdopt" }
  ]
});
```