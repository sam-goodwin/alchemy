---
title: Application
description: Learn how to create, update, and manage AWS SSO Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS SSO Applications](https://docs.aws.amazon.com/sso/latest/userguide/) for your organization's Single Sign-On configuration.

## Minimal Example

Create a basic AWS SSO Application with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const ssoApplication = await AWS.SSO.Application("mySsoApplication", {
  applicationProviderArn: "arn:aws:sso:::application-provider/my-application-provider",
  instanceArn: "arn:aws:sso:::instance/my-sso-instance",
  name: "MySSOApp",
  status: "ACTIVE" // Optional
});
```

## Advanced Configuration

Configure an AWS SSO Application with additional properties such as portal options and tags.

```ts
import AWS from "alchemy/aws/control";

const advancedSsoApplication = await AWS.SSO.Application("advancedSsoApplication", {
  applicationProviderArn: "arn:aws:sso:::application-provider/my-advanced-provider",
  instanceArn: "arn:aws:sso:::instance/my-sso-instance",
  name: "AdvancedSSOApp",
  description: "An advanced AWS SSO Application",
  portalOptions: {
    // Example portal options configuration
    logo: "https://example.com/logo.png",
    displayName: "Advanced MySSOApp"
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Team",
      value: "DevOps"
    }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing AWS SSO Application instead of failing if the resource already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedSsoApplication = await AWS.SSO.Application("adoptedSsoApplication", {
  applicationProviderArn: "arn:aws:sso:::application-provider/my-existing-provider",
  instanceArn: "arn:aws:sso:::instance/my-sso-instance",
  name: "AdoptedSSOApp",
  adopt: true // Enable adoption of an existing resource
});
```

## Resource Update Example

Update an existing AWS SSO Application configuration.

```ts
import AWS from "alchemy/aws/control";

const updatedSsoApplication = await AWS.SSO.Application("existingSsoApplication", {
  applicationProviderArn: "arn:aws:sso:::application-provider/my-updated-provider",
  instanceArn: "arn:aws:sso:::instance/my-sso-instance",
  name: "UpdatedSSOApp",
  status: "INACTIVE", // Changing status to INACTIVE
  description: "Updated description for the SSO Application"
});
```
