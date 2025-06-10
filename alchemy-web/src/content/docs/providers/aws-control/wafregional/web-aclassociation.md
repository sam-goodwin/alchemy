---
title: WebACLAssociation
description: Learn how to create, update, and manage AWS WAFRegional WebACLAssociations using Alchemy Cloud Control.
---


The WebACLAssociation resource allows you to associate a WebACL with a specified resource in AWS WAFRegional. This is essential for protecting your web applications from common web exploits and vulnerabilities. For more information, refer to the [AWS WAFRegional WebACLAssociations documentation](https://docs.aws.amazon.com/wafregional/latest/userguide/).

## Minimal Example

Create a basic WebACLAssociation with the required properties.

```ts
import AWS from "alchemy/aws/control";

const webACLAssociation = await AWS.WAFRegional.WebACLAssociation("basicWebACLAssociation", {
  ResourceArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188",
  WebACLId: "waf-12345678",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a WebACLAssociation with additional properties for enhanced management.

```ts
import AWS from "alchemy/aws/control";

const advancedWebACLAssociation = await AWS.WAFRegional.WebACLAssociation("advancedWebACLAssociation", {
  ResourceArn: "arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0",
  WebACLId: "waf-87654321",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Updating an Existing Association

This example demonstrates how to update an existing WebACLAssociation by changing the associated WebACL.

```ts
import AWS from "alchemy/aws/control";

const updatedWebACLAssociation = await AWS.WAFRegional.WebACLAssociation("updateWebACLAssociation", {
  ResourceArn: "arn:aws:s3:::my-bucket",
  WebACLId: "waf-23456789",
  adopt: false // Optional: Do not adopt existing resource
});
```

## Associating with an API Gateway

This example shows how to associate a WebACL with an API Gateway.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayWebACLAssociation = await AWS.WAFRegional.WebACLAssociation("apiGatewayWebACLAssociation", {
  ResourceArn: "arn:aws:apigateway:us-west-2::/restapis/abcdef1234/resources/xyz",
  WebACLId: "waf-34567890",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```
