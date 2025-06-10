---
title: Grant
description: Learn how to create, update, and manage AWS LicenseManager Grants using Alchemy Cloud Control.
---


The Grant resource lets you manage [AWS LicenseManager Grants](https://docs.aws.amazon.com/licensemanager/latest/userguide/) which are used to grant permissions for using licenses to specified principals.

## Minimal Example

Create a basic grant with essential properties, including the license ARN and principals.

```ts
import AWS from "alchemy/aws/control";

const basicGrant = await AWS.LicenseManager.Grant("basicGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: [
    "arn:aws:iam::123456789012:user/Alice"
  ],
  Status: "ACTIVE"
});
```

## Advanced Configuration

Configure a grant with allowed operations and a home region for more specific control.

```ts
const advancedGrant = await AWS.LicenseManager.Grant("advancedGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: [
    "arn:aws:iam::123456789012:user/Bob",
    "arn:aws:iam::123456789012:user/Charlie"
  ],
  AllowedOperations: [
    "Checkout",
    "Transfer"
  ],
  HomeRegion: "us-east-1",
  GrantName: "MyAdvancedGrant"
});
```

## Grant with Expiration

Create a grant that includes an expiration date to limit the duration of the permissions.

```ts
const expirationGrant = await AWS.LicenseManager.Grant("expirationGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: [
    "arn:aws:iam::123456789012:user/Diana"
  ],
  AllowedOperations: [
    "Checkout"
  ],
  Status: "ACTIVE",
  HomeRegion: "us-west-2",
  GrantName: "TemporaryGrant",
  CreationTime: new Date().toISOString(),
  LastUpdateTime: new Date().toISOString()
});
```
