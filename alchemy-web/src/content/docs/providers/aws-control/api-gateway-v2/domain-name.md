---
title: DomainName
description: Learn how to create, update, and manage AWS ApiGatewayV2 DomainNames using Alchemy Cloud Control.
---


The DomainName resource lets you manage [AWS ApiGatewayV2 DomainNames](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) for your APIs. This resource allows you to create custom domain names and configure settings such as mutual TLS authentication.

## Minimal Example

Create a basic domain name with mutual TLS authentication.

```ts
import AWS from "alchemy/aws/control";

const domainName = await AWS.ApiGatewayV2.DomainName("myDomainName", {
  DomainName: "api.mywebsite.com",
  MutualTlsAuthentication: {
    TruststoreUri: "s3://mybucket/truststore.pem",
    TruststoreVersion: "1",
    ServerCertificateId: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-efgh-5678-ijkl-1234567890ab"
  },
  Tags: {
    Environment: "production",
    Project: "myApiProject"
  }
});
```

## Advanced Configuration

Configure a domain name with multiple domain name configurations and custom tags.

```ts
const advancedDomainName = await AWS.ApiGatewayV2.DomainName("advancedDomainName", {
  DomainName: "api.mywebsite.com",
  DomainNameConfigurations: [
    {
      ApiGatewayDomainName: "api.mywebsite.com",
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-efgh-5678-ijkl-1234567890ab",
      EndpointType: "REGIONAL",
      SecurityPolicy: "TLS_1_2"
    }
  ],
  Tags: {
    Environment: "staging",
    Owner: "team@example.com"
  }
});
```

## Custom Domain Name with No TLS

Create a basic domain name without mutual TLS authentication.

```ts
const simpleDomainName = await AWS.ApiGatewayV2.DomainName("simpleDomainName", {
  DomainName: "public.mywebsite.com",
  Tags: {
    Environment: "development",
    Project: "publicApi"
  }
});
```

## Domain Name with Multiple Configurations

Setting up a domain name with both regional and edge-optimized configurations.

```ts
const multiConfigDomainName = await AWS.ApiGatewayV2.DomainName("multiConfigDomainName", {
  DomainName: "multi-config.mywebsite.com",
  DomainNameConfigurations: [
    {
      ApiGatewayDomainName: "multi-config.mywebsite.com",
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-1234567890ab",
      EndpointType: "EDGE",
      SecurityPolicy: "TLS_1_2"
    },
    {
      ApiGatewayDomainName: "multi-config.mywebsite.com",
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/wxyz1234-ijkl-5678-qrst-1234567890ab",
      EndpointType: "REGIONAL",
      SecurityPolicy: "TLS_1_2"
    }
  ],
  Tags: {
    Environment: "production",
    Project: "multiApiProject"
  }
});
```
