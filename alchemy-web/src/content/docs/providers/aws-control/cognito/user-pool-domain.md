---
title: UserPoolDomain
description: Learn how to create, update, and manage AWS Cognito UserPoolDomains using Alchemy Cloud Control.
---


The UserPoolDomain resource allows you to manage [AWS Cognito UserPoolDomains](https://docs.aws.amazon.com/cognito/latest/userguide/) for your user pools, enabling custom authentication flow and user experience.

## Minimal Example

Create a basic UserPoolDomain with required properties:

```ts
import AWS from "alchemy/aws/control";

const userPoolDomain = await AWS.Cognito.UserPoolDomain("myUserPoolDomain", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  Domain: "mycustomdomain",
  ManagedLoginVersion: 1 // Optional, specifies the version of managed login
});
```

## Custom Domain Configuration

Set up a UserPoolDomain with a custom domain configuration for enhanced branding:

```ts
const customDomainUserPool = await AWS.Cognito.UserPoolDomain("customDomainUserPool", {
  UserPoolId: "us-east-1_jKlMnOpQr",
  Domain: "mybrandeddomain",
  CustomDomainConfig: {
    CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-123456789012"
  }
});
```

## Advanced Configuration

Configure a UserPoolDomain to adopt an existing resource if it already exists:

```ts
const adoptUserPoolDomain = await AWS.Cognito.UserPoolDomain("adoptUserPoolDomain", {
  UserPoolId: "us-west-2_xYzAbC",
  Domain: "existingdomain",
  adopt: true // Set to true to adopt existing resource
});
```

## Managing Multiple UserPoolDomains

Create multiple UserPoolDomains for different environments, such as development and production:

```ts
const devUserPoolDomain = await AWS.Cognito.UserPoolDomain("devUserPoolDomain", {
  UserPoolId: "us-west-2_devPoolId",
  Domain: "dev.mycustomdomain"
});

const prodUserPoolDomain = await AWS.Cognito.UserPoolDomain("prodUserPoolDomain", {
  UserPoolId: "us-west-2_prodPoolId",
  Domain: "mycustomdomain"
});
```
