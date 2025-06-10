---
title: AccessPolicy
description: Learn how to create, update, and manage AWS OpenSearchServerless AccessPolicys using Alchemy Cloud Control.
---


The AccessPolicy resource allows you to manage access policies for AWS OpenSearchServerless, providing fine-grained control over who can access your OpenSearch resources. For more information, refer to the [AWS OpenSearchServerless AccessPolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/).

## Minimal Example

Create a basic access policy with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const simpleAccessPolicy = await AWS.OpenSearchServerless.AccessPolicy("simpleAccessPolicy", {
  Name: "SimplePolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/ExampleRole"
        },
        Action: "es:ESHttpGet",
        Resource: "arn:aws:es:us-west-2:123456789012:domain/example-domain/*"
      }
    ]
  }),
  Type: "resource",
  Description: "A simple access policy for example-domain"
});
```

## Advanced Configuration

Configure an access policy with more complex rules, including multiple statements and specific conditions.

```ts
const advancedAccessPolicy = await AWS.OpenSearchServerless.AccessPolicy("advancedAccessPolicy", {
  Name: "AdvancedPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/ExampleRole"
        },
        Action: "es:ESHttpPut",
        Resource: "arn:aws:es:us-west-2:123456789012:domain/example-domain/*",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "es:ESHttpDelete",
        Resource: "arn:aws:es:us-west-2:123456789012:domain/example-domain/*"
      }
    ]
  }),
  Type: "resource",
  Description: "An advanced access policy with conditions"
});
```

## Example for Adoption of Existing Policy

Create a resource that adopts an existing policy instead of failing if it already exists.

```ts
const existingPolicy = await AWS.OpenSearchServerless.AccessPolicy("existingPolicy", {
  Name: "ExistingPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/AnotherExampleRole"
        },
        Action: "es:ESHttpGet",
        Resource: "arn:aws:es:us-east-1:123456789012:domain/another-example-domain/*"
      }
    ]
  }),
  Type: "resource",
  adopt: true // Adopt existing resource
});
```
