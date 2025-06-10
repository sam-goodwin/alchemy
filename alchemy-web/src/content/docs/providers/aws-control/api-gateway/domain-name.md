---
title: DomainName
description: Learn how to create, update, and manage AWS ApiGateway DomainNames using Alchemy Cloud Control.
---


The DomainName resource lets you manage [AWS ApiGateway DomainNames](https://docs.aws.amazon.com/apigateway/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic ApiGateway DomainName with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const apiDomainName = await AWS.ApiGateway.DomainName("myApiDomain", {
  domainName: "api.myexample.com",
  certificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-ab12-cd34-ef56-abcdef123456",
  securityPolicy: "TLS_1_2",
  tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a DomainName with advanced options such as mutual TLS authentication.

```ts
import AWS from "alchemy/aws/control";

const advancedApiDomainName = await AWS.ApiGateway.DomainName("advancedApiDomain", {
  domainName: "secure.api.myexample.com",
  certificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-ab12-cd34-ef56-abcdef123456",
  mutualTlsAuthentication: {
    truststoreUri: "s3://my-bucket/truststore.pem",
    truststoreVersion: "1",
    validationContext: {
      subjectAlternativeNames: ["api.myexample.com"],
      truststore: "s3://my-bucket/truststore.pem"
    }
  },
  endpointConfiguration: {
    types: ["REGIONAL"]
  }
});
```

## Custom Security Policy

Create a DomainName with a specific security policy and ownership verification certificate.

```ts
import AWS from "alchemy/aws/control";

const customSecurityPolicyDomainName = await AWS.ApiGateway.DomainName("customSecurityDomain", {
  domainName: "custom.api.myexample.com",
  certificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-ab12-cd34-ef56-abcdef123456",
  ownershipVerificationCertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/xyz1234-xy12-xy34-xy56-xyz123456789",
  securityPolicy: "TLS_1_2",
  tags: [
    {
      Key: "Project",
      Value: "API Gateway"
    }
  ]
});
```

## Using Endpoint Configuration

Set up a DomainName with a specific endpoint configuration.

```ts
import AWS from "alchemy/aws/control";

const endpointConfiguredDomainName = await AWS.ApiGateway.DomainName("endpointConfiguredDomain", {
  domainName: "endpoint.api.myexample.com",
  certificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-ab12-cd34-ef56-abcdef123456",
  endpointConfiguration: {
    types: ["EDGE"]
  }
});
```
