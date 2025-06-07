---
title: Managing AWS LicenseManager Grants with Alchemy
description: Learn how to create, update, and manage AWS LicenseManager Grants using Alchemy Cloud Control.
---

# Grant

The Grant resource allows you to create, update, and manage [AWS LicenseManager Grants](https://docs.aws.amazon.com/licensemanager/latest/userguide/) which enable the sharing of licenses across AWS accounts and regions.

## Minimal Example

Create a basic LicenseManager Grant with required properties and common optional ones.

```ts
import AWS from "alchemy/aws/control";

const LicenseGrant = await AWS.LicenseManager.Grant("LicenseGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: ["arn:aws:iam::123456789012:role/ExampleRole"],
  HomeRegion: "us-east-1",
  AllowedOperations: ["CreateSnapshot", "RestoreSnapshot"]
});
```

## Advanced Configuration

Enhance your LicenseManager Grant with additional configurations such as status and grant name.

```ts
const AdvancedLicenseGrant = await AWS.LicenseManager.Grant("AdvancedLicenseGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: ["arn:aws:iam::123456789012:role/AdvancedRole"],
  HomeRegion: "us-east-1",
  AllowedOperations: ["CreateSnapshot", "RestoreSnapshot"],
  GrantName: "AdvancedLicenseGrant",
  Status: "ACTIVE"
});
```

## Adopting Existing Resources

Create a LicenseManager Grant that adopts an existing resource rather than failing if it already exists.

```ts
const ExistingLicenseGrant = await AWS.LicenseManager.Grant("ExistingLicenseGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: ["arn:aws:iam::123456789012:role/ExistingRole"],
  HomeRegion: "us-east-1",
  AllowedOperations: ["CreateSnapshot", "RestoreSnapshot"],
  adopt: true
});
```

## Granting Additional Operations

Configure a Grant with a broader set of allowed operations to enable more flexibility.

```ts
const FlexibleLicenseGrant = await AWS.LicenseManager.Grant("FlexibleLicenseGrant", {
  LicenseArn: "arn:aws:license-manager:us-east-1:123456789012:license:example-license",
  Principals: ["arn:aws:iam::123456789012:role/FlexibleRole"],
  HomeRegion: "us-east-1",
  AllowedOperations: [
    "CreateSnapshot",
    "RestoreSnapshot",
    "ListLicenses",
    "UpdateLicense"
  ]
});
```