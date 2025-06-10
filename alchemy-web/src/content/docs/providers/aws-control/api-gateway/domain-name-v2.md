---
title: DomainNameV2
description: Learn how to create, update, and manage AWS ApiGateway DomainNameV2s using Alchemy Cloud Control.
---


The DomainNameV2 resource allows you to create and manage custom domain names for your APIs in AWS ApiGateway. This can enhance your API's accessibility and branding by allowing you to use your own domain names. For more details, refer to the [AWS ApiGateway DomainNameV2s](https://docs.aws.amazon.com/apigateway/latest/userguide/) documentation.

## Minimal Example

Create a basic custom domain name with required properties and a security policy.

```ts
import AWS from "alchemy/aws/control";

const basicDomainName = await AWS.ApiGateway.DomainNameV2("basicDomain", {
  DomainName: "myapi.example.com",
  SecurityPolicy: "TLS_1_2", // Enforce TLS 1.2 security policy
  CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-abcd-1234-abcd-123456789012" // Example certificate ARN
});
```

## Advanced Configuration

Configure a domain name with additional properties, including a policy and endpoint configuration.

```ts
const advancedDomainName = await AWS.ApiGateway.DomainNameV2("advancedDomain", {
  DomainName: "api.example.com",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "execute-api:Invoke",
        Resource: "*"
      }
    ]
  },
  EndpointConfiguration: {
    Types: ["REGIONAL"] // Specify the endpoint type
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyAPIProject"
    }
  ]
});
```

## Using Custom Policies

Create a domain name that includes a custom IAM policy to restrict access.

```ts
const policyDomainName = await AWS.ApiGateway.DomainNameV2("policyDomain", {
  DomainName: "secureapi.example.com",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Principal: "*",
        Action: "execute-api:Invoke",
        Resource: "arn:aws:execute-api:us-west-2:123456789012:myApi/*/GET/private",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24" // Restrict access to specific IP range
          }
        }
      }
    ]
  }
});
```

## Adding Tags for Resource Management

Create a domain name with tags for better resource management and identification.

```ts
const taggedDomainName = await AWS.ApiGateway.DomainNameV2("taggedDomain", {
  DomainName: "taggedapi.example.com",
  Tags: [
    {
      Key: "Owner",
      Value: "DevTeam"
    },
    {
      Key: "Purpose",
      Value: "API Gateway"
    }
  ]
});
```
