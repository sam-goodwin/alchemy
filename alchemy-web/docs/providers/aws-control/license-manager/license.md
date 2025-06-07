---
title: Managing AWS LicenseManager Licenses with Alchemy
description: Learn how to create, update, and manage AWS LicenseManager Licenses using Alchemy Cloud Control.
---

# License

The License resource lets you create and manage [AWS LicenseManager Licenses](https://docs.aws.amazon.com/licensemanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-licensemanager-license.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const license = await AWS.LicenseManager.License("license-example", {
  ConsumptionConfiguration: "example-consumptionconfiguration",
  Validity: "example-validity",
  ProductName: "license-product",
  Issuer: "example-issuer",
  HomeRegion: "example-homeregion",
  Entitlements: [],
  LicenseName: "license-license",
});
```

