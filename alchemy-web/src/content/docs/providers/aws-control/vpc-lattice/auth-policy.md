---
title: AuthPolicy
description: Learn how to create, update, and manage AWS VpcLattice AuthPolicys using Alchemy Cloud Control.
---


The AuthPolicy resource lets you manage [AWS VpcLattice AuthPolicys](https://docs.aws.amazon.com/vpclattice/latest/userguide/) for controlling access to your VPC resources based on defined rules.

## Minimal Example

Create a basic AuthPolicy with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAuthPolicy = await AWS.VpcLattice.AuthPolicy("basicAuthPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "vpclattice:Access",
        Resource: "*",
        Condition: {
          StringEquals: {
            "vpclattice:SourceVpc": "vpc-12345678"
          }
        }
      }
    ]
  },
  ResourceIdentifier: "myVpcResource",
  adopt: true // Optional: adopt existing resource
});
```

## Advanced Configuration

Configure an AuthPolicy with more complex rules and multiple conditions for enhanced security.

```ts
const advancedAuthPolicy = await AWS.VpcLattice.AuthPolicy("advancedAuthPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "vpclattice:Access",
          "vpclattice:Invoke"
        ],
        Resource: "*",
        Condition: {
          StringEquals: {
            "vpclattice:SourceVpc": "vpc-12345678",
            "vpclattice:User": "user1234"
          },
          NumericLessThan: {
            "vpclattice:RequestCount": 100
          }
        }
      }
    ]
  },
  ResourceIdentifier: "myAdvancedVpcResource"
});
```

## Custom Policies for Specific Use Cases

Create an AuthPolicy that limits access based on specific IP ranges and request methods.

```ts
const ipRestrictedAuthPolicy = await AWS.VpcLattice.AuthPolicy("ipRestrictedAuthPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Action: "vpclattice:Access",
        Resource: "*",
        Condition: {
          NotIpAddress: {
            "vpclattice:SourceIp": "192.168.1.0/24"
          }
        }
      },
      {
        Effect: "Allow",
        Action: "vpclattice:Access",
        Resource: "*",
        Condition: {
          StringEquals: {
            "vpclattice:RequestMethod": "GET"
          }
        }
      }
    ]
  },
  ResourceIdentifier: "myIpRestrictedVpcResource"
});
```
