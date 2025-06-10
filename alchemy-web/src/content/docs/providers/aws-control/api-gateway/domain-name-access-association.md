---
title: DomainNameAccessAssociation
description: Learn how to create, update, and manage AWS ApiGateway DomainNameAccessAssociations using Alchemy Cloud Control.
---


The DomainNameAccessAssociation resource allows you to manage associations between API Gateway domain names and their access sources. This enables you to control access for APIs that use custom domain names. For more information, visit the [AWS ApiGateway DomainNameAccessAssociations documentation](https://docs.aws.amazon.com/apigateway/latest/userguide/).

## Minimal Example

Create a basic DomainNameAccessAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const domainNameAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("basicAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/yourdomain.com",
  AccessAssociationSource: "arn:aws:iam::123456789012:role/yourRole",
  AccessAssociationSourceType: "AWS::IAM::Role",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a DomainNameAccessAssociation with additional properties for more complex scenarios.

```ts
const advancedDomainNameAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("advancedAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/anotherdomain.com",
  AccessAssociationSource: "arn:aws:iam::123456789012:role/anotherRole",
  AccessAssociationSourceType: "AWS::IAM::Role",
  Tags: [{
    Key: "Project",
    Value: "API Project"
  }],
  adopt: true // Adopt existing resource if it already exists
});
```

## Managing Multiple Access Sources

Create multiple associations for different sources, demonstrating how you can manage multiple access types.

```ts
const lambdaAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("lambdaAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/lambdaproject.com",
  AccessAssociationSource: "arn:aws:lambda:us-west-2:123456789012:function:yourLambdaFunction",
  AccessAssociationSourceType: "AWS::Lambda::Function",
  Tags: [{
    Key: "Service",
    Value: "Lambda Integration"
  }]
});

const apiGatewayAccessAssociation = await AWS.ApiGateway.DomainNameAccessAssociation("apiGatewayAssociation", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/apigatewayproject.com",
  AccessAssociationSource: "arn:aws:apigateway:us-west-2::/restapis/yourApiId",
  AccessAssociationSourceType: "AWS::ApiGateway::RestApi",
  Tags: [{
    Key: "Service",
    Value: "API Gateway"
  }]
});
```
