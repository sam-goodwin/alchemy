---
title: DistributionTenant
description: Learn how to create, update, and manage AWS CloudFront DistributionTenants using Alchemy Cloud Control.
---


The DistributionTenant resource lets you manage [AWS CloudFront DistributionTenants](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for serving content with customizable domain settings and configurations.

## Minimal Example

Create a basic CloudFront DistributionTenant with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const distributionTenant = await AWS.CloudFront.DistributionTenant("myDistributionTenant", {
  Domains: ["mywebsite.com", "www.mywebsite.com"],
  Enabled: true,
  DistributionId: "E1234567890ABC",
  Name: "Main Distribution Tenant"
});
```

## Advanced Configuration

Configure a DistributionTenant with additional customization options and managed certificate request.

```ts
const advancedDistributionTenant = await AWS.CloudFront.DistributionTenant("advancedDistributionTenant", {
  Domains: ["secure.mywebsite.com"],
  Enabled: true,
  DistributionId: "E0987654321XYZ",
  Name: "Secure Distribution Tenant",
  Customizations: {
    behavior: {
      cachePolicy: "myCachePolicy",
      originRequestPolicy: "myOriginRequestPolicy"
    }
  },
  ManagedCertificateRequest: {
    Domains: ["secure.mywebsite.com"],
    ValidationMethod: "DNS"
  }
});
```

## Using Connection Groups

Create a DistributionTenant that is part of a connection group for better management of related distributions.

```ts
const connectionGroupTenant = await AWS.CloudFront.DistributionTenant("connectionGroupTenant", {
  Domains: ["group.mywebsite.com"],
  Enabled: true,
  DistributionId: "E1234567890XYZ",
  Name: "Connection Group Tenant",
  ConnectionGroupId: "myConnectionGroup"
});
```

## Adding Tags for Organization

Create a DistributionTenant and include tags for better organization and management.

```ts
const taggedDistributionTenant = await AWS.CloudFront.DistributionTenant("taggedDistributionTenant", {
  Domains: ["tagged.mywebsite.com"],
  Enabled: true,
  DistributionId: "E1234567890LMN",
  Name: "Tagged Distribution Tenant",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebsiteRevamp" }
  ]
});
```
