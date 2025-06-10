---
title: MailManagerIngressPoint
description: Learn how to create, update, and manage AWS SES MailManagerIngressPoints using Alchemy Cloud Control.
---


The MailManagerIngressPoint resource allows you to manage inbound email processing rules for Amazon Simple Email Service (SES). You can configure how incoming emails are handled by specifying rules and traffic policies. For more details, refer to the [AWS SES MailManagerIngressPoints documentation](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic MailManagerIngressPoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicIngressPoint = await AWS.SES.MailManagerIngressPoint("basicIngressPoint", {
  RuleSetId: "default-rule-set",
  Type: "Inbound",
  TrafficPolicyId: "policy-12345",
  IngressPointName: "BasicIngressPoint"
});
```

## Advanced Configuration

Configure a MailManagerIngressPoint with additional options such as network configuration and tags.

```ts
const advancedIngressPoint = await AWS.SES.MailManagerIngressPoint("advancedIngressPoint", {
  RuleSetId: "default-rule-set",
  Type: "Inbound",
  TrafficPolicyId: "policy-67890",
  IngressPointName: "AdvancedIngressPoint",
  NetworkConfiguration: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678"],
    SecurityGroups: ["sg-12345678"]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EmailProcessing" }
  ]
});
```

## Custom Status Update

This example demonstrates how to update the status of an existing MailManagerIngressPoint.

```ts
const updateIngressPointStatus = await AWS.SES.MailManagerIngressPoint("updateIngressPoint", {
  RuleSetId: "default-rule-set",
  Type: "Inbound",
  TrafficPolicyId: "policy-13579",
  StatusToUpdate: "Enabled"
});
```

## Ingress Point Configuration

Here’s how to specify a custom ingress point configuration for processing emails.

```ts
const ingressPointWithCustomConfig = await AWS.SES.MailManagerIngressPoint("customConfigIngressPoint", {
  RuleSetId: "default-rule-set",
  Type: "Inbound",
  TrafficPolicyId: "policy-24680",
  IngressPointConfiguration: {
    S3BucketName: "email-processed-bucket",
    LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:processEmail"
  },
  IngressPointName: "CustomConfigIngressPoint"
});
```
