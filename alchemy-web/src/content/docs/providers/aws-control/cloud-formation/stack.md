---
title: Stack
description: Learn how to create, update, and manage AWS CloudFormation Stacks using Alchemy Cloud Control.
---


The Stack resource lets you create and manage [AWS CloudFormation Stacks](https://docs.aws.amazon.com/cloudformation/latest/userguide/) which are used to provision AWS resources in a predictable and repeatable manner.

## Minimal Example

Create a basic CloudFormation Stack with a template URL and a set of parameters.

```ts
import AWS from "alchemy/aws/control";

const basicStack = await AWS.CloudFormation.Stack("basicStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair"
  },
  NotificationARNs: [
    "arn:aws:sns:us-east-1:123456789012:my-topic"
  ],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AlchemyDemo" }
  ],
  TimeoutInMinutes: 30
});
```

## Advanced Configuration

Configure a stack with a timeout and additional notification settings.

```ts
const advancedStack = await AWS.CloudFormation.Stack("advancedStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    InstanceType: "t2.medium",
    KeyName: "my-key-pair",
    DBInstanceClass: "db.t2.micro"
  },
  NotificationARNs: [
    "arn:aws:sns:us-east-1:123456789012:my-topic",
    "arn:aws:sns:us-east-1:123456789012:another-topic"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  TimeoutInMinutes: 60,
  adopt: true // Adopt existing resources instead of failing
});
```

## Deploying with Existing Resources

Create a stack that adopts existing resources if they are already present.

```ts
const adoptStack = await AWS.CloudFormation.Stack("adoptStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/mytemplate.yaml",
  Parameters: {
    ExistingResourceId: "my-existing-resource-id"
  },
  NotificationARNs: [
    "arn:aws:sns:us-east-1:123456789012:my-notification-topic"
  ],
  Tags: [
    { Key: "Application", Value: "MyApp" },
    { Key: "Stage", Value: "Beta" }
  ],
  adopt: true
});
```

## Using Custom Templates

Define a stack using a custom CloudFormation template hosted on S3.

```ts
const customTemplateStack = await AWS.CloudFormation.Stack("customTemplateStack", {
  TemplateURL: "https://s3.amazonaws.com/mybucket/custom-template.yaml",
  Parameters: {
    VPCId: "vpc-0abcd1234efgh5678",
    SubnetId: "subnet-0abcd1234efgh5678"
  },
  NotificationARNs: [
    "arn:aws:sns:us-east-1:123456789012:my-custom-topic"
  ],
  Tags: [
    { Key: "Team", Value: "Engineering" },
    { Key: "Status", Value: "Active" }
  ],
  TimeoutInMinutes: 45
});
```
