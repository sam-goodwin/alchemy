---
title: WebACLAssociation
description: Learn how to create, update, and manage AWS WAFv2 WebACLAssociations using Alchemy Cloud Control.
---


The WebACLAssociation resource lets you associate a WebACL with an AWS resource, such as an Application Load Balancer, CloudFront distribution, or API Gateway. This integration allows for the application of security policies to incoming web traffic. For more information, visit the [AWS WAFv2 WebACLAssociations documentation](https://docs.aws.amazon.com/wafv2/latest/userguide/).

## Minimal Example

Create a basic WebACLAssociation by associating a WebACL with a specified resource.

```ts
import AWS from "alchemy/aws/control";

const webAclAssociation = await AWS.WAFv2.WebACLAssociation("myWebACLAssociation", {
  ResourceArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188",
  WebACLArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-web-acl/abcd1234-abcd-1234-abcd-1234abcd1234",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Create a WebACLAssociation and access its additional properties after creation.

```ts
import AWS from "alchemy/aws/control";

const advancedWebAclAssociation = await AWS.WAFv2.WebACLAssociation("advancedWebACLAssociation", {
  ResourceArn: "arn:aws:cloudfront::123456789012:distribution/E1234567890",
  WebACLArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-advanced-web-acl/abcd5678-abcd-5678-abcd-5678abcd5678"
});

// Access additional properties
console.log(`ARN: ${advancedWebAclAssociation.Arn}`);
console.log(`Created at: ${advancedWebAclAssociation.CreationTime}`);
console.log(`Last updated at: ${advancedWebAclAssociation.LastUpdateTime}`);
```

## Associating with Multiple Resources

You can create multiple WebACLAssociations for different resources to manage security across your AWS infrastructure.

```ts
import AWS from "alchemy/aws/control";

const loadBalancerAssociation = await AWS.WAFv2.WebACLAssociation("loadBalancerAssociation", {
  ResourceArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-other-load-balancer/50dc6c495c0c9188",
  WebACLArn: "arn:aws:wafv2:us-west-2:123456789012:regional/webacl/my-other-web-acl/abcd9012-abcd-9012-abcd-9012abcd9012"
});

const apiGatewayAssociation = await AWS.WAFv2.WebACLAssociation("apiGatewayAssociation", {
  ResourceArn: "arn:aws:apigateway:us-west-2::/restapis/my-api-gateway",
  WebACLArn: "arn:aws:wafv2:us-west-2:123456789012:regional/webacl/my-api-web-acl/abcd3456-abcd-3456-abcd-3456abcd3456"
});
```
