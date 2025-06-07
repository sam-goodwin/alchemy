---
title: Managing AWS ApiGateway DomainNameAccessAssociations with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway DomainNameAccessAssociations using Alchemy Cloud Control.
---

# DomainNameAccessAssociation

The DomainNameAccessAssociation resource allows you to manage associations between a custom domain name and an API Gateway, providing a way to control access to your APIs. For more details, refer to the [AWS ApiGateway DomainNameAccessAssociations documentation](https://docs.aws.amazon.com/apigateway/latest/userguide/).

## Minimal Example

This example demonstrates how to create a DomainNameAccessAssociation with the required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const DomainAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("MyDomainAccessAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-east-1::/domainnames/example.com",
  AccessAssociationSource: "arn:aws:apigateway:us-east-1::/restapis/1234567890",
  AccessAssociationSourceType: "REST_API",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Advanced Configuration

In this example, we adopt an existing resource and specify a different access association source type.

```ts
const AdvancedDomainAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("AdvancedDomainAccessAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-east-1::/domainnames/secure.example.com",
  AccessAssociationSource: "arn:aws:apigateway:us-east-1::/restapis/0987654321",
  AccessAssociationSourceType: "HTTP_API",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "ProjectX" }
  ],
  adopt: true
});
```

## Example with No Tags

This example shows how to create a DomainNameAccessAssociation without using any tags.

```ts
const NoTagDomainAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("NoTagDomainAccessAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/test.example.com",
  AccessAssociationSource: "arn:aws:apigateway:us-west-2::/restapis/1122334455",
  AccessAssociationSourceType: "REST_API"
});
```