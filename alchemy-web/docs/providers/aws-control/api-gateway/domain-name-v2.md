---
title: Managing AWS ApiGateway DomainNameV2s with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway DomainNameV2s using Alchemy Cloud Control.
---

# DomainNameV2

The DomainNameV2 resource allows you to manage custom domain names for your AWS API Gateway, enabling you to route requests to your APIs. For more details, refer to the [AWS ApiGateway DomainNameV2 documentation](https://docs.aws.amazon.com/apigateway/latest/userguide/).

## Minimal Example

Create a simple API Gateway domain name with a basic security policy and tags.

```ts
import AWS from "alchemy/aws/control";

const ApiGatewayDomain = await AWS.ApiGateway.DomainNameV2("MyApiDomain", {
  DomainName: "api.example.com",
  SecurityPolicy: "TLS_1_2",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ],
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
});
```

## Advanced Configuration

Configure a domain name with a custom policy and endpoint settings for regional APIs.

```ts
const ApiGatewayCustomDomain = await AWS.ApiGateway.DomainNameV2("CustomApiDomain", {
  DomainName: "custom.api.example.com",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "execute-api:Invoke",
        Resource: "arn:aws:execute-api:us-east-1:123456789012:abcd1234/*"
      }
    ]
  },
  EndpointConfiguration: {
    Types: ["REGIONAL"]
  },
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
});
```

## Custom Endpoint Configuration

Set up a domain name with a custom endpoint configuration for edge-optimized APIs.

```ts
const ApiGatewayEdgeDomain = await AWS.ApiGateway.DomainNameV2("EdgeApiDomain", {
  DomainName: "edge.api.example.com",
  EndpointConfiguration: {
    Types: ["EDGE"]
  },
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
});
```

## Adoption of Existing Resource

Use the adopt option to handle an existing domain name without throwing an error.

```ts
const ExistingApiDomain = await AWS.ApiGateway.DomainNameV2("ExistingApiDomain", {
  DomainName: "existing.api.example.com",
  adopt: true
});
```