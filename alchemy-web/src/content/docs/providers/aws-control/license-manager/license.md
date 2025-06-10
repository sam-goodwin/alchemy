---
title: License
description: Learn how to create, update, and manage AWS LicenseManager Licenses using Alchemy Cloud Control.
---


The License resource allows you to manage [AWS LicenseManager Licenses](https://docs.aws.amazon.com/licensemanager/latest/userguide/) for software usage tracking and compliance.

## Minimal Example

Create a basic License resource with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicLicense = await AWS.LicenseManager.License("basicLicense", {
  ProductSKU: "1234-5678-9012",
  Status: "ACTIVE",
  ConsumptionConfiguration: {
    ConsumeLicense: true,
    LicenseSpecifications: [],
  },
  Validity: {
    Start: "2023-01-01T00:00:00Z",
    End: "2024-01-01T00:00:00Z",
  },
  ProductName: "Example Software",
  Issuer: {
    Name: "Example Corp",
    Key: "issuer-key"
  },
  HomeRegion: "us-east-1",
  Entitlements: [
    {
      Name: "Example Entitlement",
      Value: "100"
    }
  ],
  LicenseName: "Basic License Name",
});
```

## Advanced Configuration

Configure a license with additional options such as metadata and beneficiary details.

```ts
const advancedLicense = await AWS.LicenseManager.License("advancedLicense", {
  ProductSKU: "1234-5678-9012",
  Status: "ACTIVE",
  ConsumptionConfiguration: {
    ConsumeLicense: true,
    LicenseSpecifications: [],
  },
  Validity: {
    Start: "2023-01-01T00:00:00Z",
    End: "2025-01-01T00:00:00Z",
  },
  ProductName: "Advanced Example Software",
  Issuer: {
    Name: "Advanced Corp",
    Key: "advanced-issuer-key"
  },
  HomeRegion: "us-west-2",
  Entitlements: [
    {
      Name: "Advanced Entitlement",
      Value: "200"
    }
  ],
  LicenseMetadata: [
    {
      Name: "LicenseType",
      Value: "Enterprise"
    }
  ],
  LicenseName: "Advanced License Name",
  Beneficiary: "account-id-or-arn",
});
```

## License with Multiple Entitlements

Create a license that includes multiple entitlements for more complex software usage scenarios.

```ts
const multiEntitlementLicense = await AWS.LicenseManager.License("multiEntitlementLicense", {
  ProductSKU: "5678-1234-9012",
  Status: "ACTIVE",
  ConsumptionConfiguration: {
    ConsumeLicense: true,
    LicenseSpecifications: [],
  },
  Validity: {
    Start: "2023-06-01T00:00:00Z",
    End: "2026-06-01T00:00:00Z",
  },
  ProductName: "Multi-Entitlement Software",
  Issuer: {
    Name: "MultiCorp",
    Key: "multi-issuer-key"
  },
  HomeRegion: "eu-central-1",
  Entitlements: [
    {
      Name: "Entitlement One",
      Value: "50"
    },
    {
      Name: "Entitlement Two",
      Value: "150"
    }
  ],
  LicenseName: "Multi Entitlement License",
});
```
