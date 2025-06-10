---
title: SecurityPolicy
description: Learn how to create, update, and manage AWS OpenSearchServerless SecurityPolicys using Alchemy Cloud Control.
---


The SecurityPolicy resource lets you manage [AWS OpenSearchServerless SecurityPolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) for controlling access to your OpenSearch resources.

## Minimal Example

Create a basic security policy with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const securityPolicy = await AWS.OpenSearchServerless.SecurityPolicy("basicSecurityPolicy", {
  Name: "MyBasicSecurityPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "es:*",
        Resource: "*"
      }
    ]
  }),
  Type: "ALLOW",
  Description: "A basic security policy allowing all actions on all resources."
});
```

## Advanced Configuration

Define a more complex security policy with specific actions and resources.

```ts
const advancedSecurityPolicy = await AWS.OpenSearchServerless.SecurityPolicy("advancedSecurityPolicy", {
  Name: "MyAdvancedSecurityPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "es:ESHttpPut",
          "es:ESHttpPost"
        ],
        Resource: "arn:aws:es:us-west-2:123456789012:domain/MyDomain/*"
      },
      {
        Effect: "Deny",
        Action: "es:*",
        Resource: "arn:aws:es:us-west-2:123456789012:domain/MyDomain/sensitive-data/*"
      }
    ]
  }),
  Type: "ALLOW",
  Description: "An advanced security policy allowing specific actions and denying access to sensitive data."
});
```

## Adoption of Existing Policy

If you want to adopt an existing security policy instead of failing when it already exists, set the `adopt` property to true.

```ts
const existingPolicy = await AWS.OpenSearchServerless.SecurityPolicy("adoptExistingPolicy", {
  Name: "MyExistingSecurityPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "es:*",
        Resource: "*"
      }
    ]
  }),
  Type: "ALLOW",
  adopt: true, // Adopt existing resource if it exists
  Description: "This policy will be adopted if it already exists."
});
```

## Policy for a Specific IP Range

Create a security policy that restricts access to a specific IP range.

```ts
const ipRestrictedPolicy = await AWS.OpenSearchServerless.SecurityPolicy("ipRestrictedPolicy", {
  Name: "MyIPRestrictedPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "es:*",
        Resource: "*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "192.168.1.0/24"
          }
        }
      }
    ]
  }),
  Type: "ALLOW",
  Description: "A security policy that restricts access to a specific IP range."
});
```
