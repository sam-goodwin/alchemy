---
title: PolicyStore
description: Learn how to create, update, and manage AWS VerifiedPermissions PolicyStores using Alchemy Cloud Control.
---


The PolicyStore resource lets you manage [AWS VerifiedPermissions PolicyStores](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) for handling and validating permissions for your applications.

## Minimal Example

Create a basic PolicyStore with a description and validation settings.

```ts
import AWS from "alchemy/aws/control";

const basicPolicyStore = await AWS.VerifiedPermissions.PolicyStore("basicPolicyStore", {
  Description: "A basic policy store for managing permissions.",
  ValidationSettings: {
    // Example validation settings
    PolicySyntax: "JSON"
  }
});
```

## Advanced Configuration

Configure a PolicyStore with a custom schema and validation settings.

```ts
const advancedPolicyStore = await AWS.VerifiedPermissions.PolicyStore("advancedPolicyStore", {
  Description: "An advanced policy store with custom schema.",
  ValidationSettings: {
    PolicySyntax: "JSON",
    EnableValidation: true
  },
  Schema: {
    // Example schema definition
    Type: "object",
    Properties: {
      Resource: {
        Type: "string"
      },
      Action: {
        Type: "string"
      },
      Effect: {
        Type: "string",
        Enum: ["Allow", "Deny"]
      }
    },
    Required: ["Resource", "Action", "Effect"]
  }
});
```

## Adoption of Existing Resource

Create a PolicyStore and adopt an existing resource if it already exists.

```ts
const adoptedPolicyStore = await AWS.VerifiedPermissions.PolicyStore("adoptedPolicyStore", {
  Description: "An adopted policy store that will take over an existing one if found.",
  ValidationSettings: {
    PolicySyntax: "JSON"
  },
  adopt: true // Will adopt existing resource if it exists
});
``` 

## Policy Validation Example

Define a PolicyStore with specific policy validation settings.

```ts
const policyValidationStore = await AWS.VerifiedPermissions.PolicyStore("policyValidationStore", {
  Description: "A policy store for validating specific policies.",
  ValidationSettings: {
    PolicySyntax: "JSON",
    EnableValidation: true,
    MaxPolicySize: 2048 // Example size limit for the policy
  }
});
``` 

## Schema Definition Example

Create a PolicyStore with a detailed schema definition for policies.

```ts
const schemaPolicyStore = await AWS.VerifiedPermissions.PolicyStore("schemaPolicyStore", {
  Description: "A policy store with a detailed schema for permissions.",
  ValidationSettings: {
    PolicySyntax: "JSON"
  },
  Schema: {
    Type: "object",
    Properties: {
      UserId: {
        Type: "string"
      },
      Resource: {
        Type: "string"
      },
      Action: {
        Type: "string"
      },
      Effect: {
        Type: "string",
        Enum: ["Allow", "Deny"]
      }
    },
    Required: ["UserId", "Resource", "Action", "Effect"]
  }
});
```
