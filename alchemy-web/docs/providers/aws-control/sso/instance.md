---
title: Managing AWS SSO Instances with Alchemy
description: Learn how to create, update, and manage AWS SSO Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you manage [AWS SSO Instances](https://docs.aws.amazon.com/sso/latest/userguide/) for enabling single sign-on capabilities across your AWS environment.

## Minimal Example

Create a basic AWS SSO Instance with a name and tags.

```ts
import AWS from "alchemy/aws/control";

const SSOInstance = await AWS.SSO.Instance("MySSOInstance", {
  Name: "MySSOInstance",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an SSO Instance with additional properties such as adoption.

```ts
const AdoptExistingSSOInstance = await AWS.SSO.Instance("AdoptExistingSSOInstance", {
  Name: "ExistingSSOInstance",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Engineering" }
  ],
  adopt: true
});
```

## Instance with Creation Time

Create an SSO Instance and retrieve its ARN and creation time.

```ts
const DetailedSSOInstance = await AWS.SSO.Instance("DetailedSSOInstance", {
  Name: "DetailedSSOInstance",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "QA" }
  ]
});

// Accessing additional properties
console.log(`ARN: ${DetailedSSOInstance.Arn}`);
console.log(`Created At: ${DetailedSSOInstance.CreationTime}`);
```