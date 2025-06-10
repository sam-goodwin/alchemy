---
title: Profile
description: Learn how to create, update, and manage AWS RolesAnywhere Profiles using Alchemy Cloud Control.
---


The Profile resource lets you manage [AWS RolesAnywhere Profiles](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/) which are used to enable IAM roles for workloads running outside of AWS. This resource allows you to define the rules and settings that govern role assumption.

## Minimal Example

Create a basic RolesAnywhere Profile with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicProfile = await AWS.RolesAnywhere.Profile("basic-profile", {
  name: "BasicProfile",
  roleArns: [
    "arn:aws:iam::123456789012:role/MyRole"
  ],
  managedPolicyArns: [
    "arn:aws:iam::aws:policy/AWSLambdaExecute"
  ]
});
```

## Advanced Configuration

Customize a RolesAnywhere Profile with advanced options such as session policies and attribute mappings.

```ts
const advancedProfile = await AWS.RolesAnywhere.Profile("advanced-profile", {
  name: "AdvancedProfile",
  roleArns: [
    "arn:aws:iam::123456789012:role/MyRole"
  ],
  sessionPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:::my-bucket"
      }
    ]
  }),
  attributeMappings: [
    {
      attributeName: "sessionTag:Project",
      mapping: "$.project"
    }
  ],
  durationSeconds: 3600,
  enabled: true
});
```

## Profile with Instance Properties Requirement

Create a profile that requires instance properties for additional security in role assumption.

```ts
const secureProfile = await AWS.RolesAnywhere.Profile("secure-profile", {
  name: "SecureProfile",
  roleArns: [
    "arn:aws:iam::123456789012:role/SecureRole"
  ],
  requireInstanceProperties: true,
  acceptRoleSessionName: true,
  tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Profile with Custom Duration

Set up a profile with a customized session duration for role assumptions.

```ts
const customDurationProfile = await AWS.RolesAnywhere.Profile("custom-duration-profile", {
  name: "CustomDurationProfile",
  roleArns: [
    "arn:aws:iam::123456789012:role/MyCustomRole"
  ],
  durationSeconds: 7200, // 2 hours
  enabled: true
});
```
