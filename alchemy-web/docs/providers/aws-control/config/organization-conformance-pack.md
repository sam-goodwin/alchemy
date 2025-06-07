---
title: Managing AWS Config OrganizationConformancePacks with Alchemy
description: Learn how to create, update, and manage AWS Config OrganizationConformancePacks using Alchemy Cloud Control.
---

# OrganizationConformancePack

The OrganizationConformancePack resource lets you manage [AWS Config Organization Conformance Packs](https://docs.aws.amazon.com/config/latest/userguide/) that help you ensure compliance across multiple AWS accounts. This resource allows you to define configuration rules and remediation actions at the organizational level.

## Minimal Example

Create a basic Organization Conformance Pack with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const conformancePack = await AWS.Config.OrganizationConformancePack("MyConformancePack", {
  OrganizationConformancePackName: "MyOrgConformancePack",
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "config-prefix/",
  ConformancePackInputParameters: [
    {
      ParameterName: "S3Bucket",
      ParameterValue: "my-config-bucket"
    }
  ],
  ExcludedAccounts: ["123456789012", "987654321098"]
});
```

## Advanced Configuration

Configure a conformance pack with detailed template body and additional input parameters.

```ts
const advancedConformancePack = await AWS.Config.OrganizationConformancePack("AdvancedConformancePack", {
  OrganizationConformancePackName: "AdvancedOrgConformancePack",
  TemplateBody: JSON.stringify({
    "AWSTemplateFormatVersion": "2010-09-09",
    "Resources": {
      // Define your resources here
    }
  }),
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "config-advanced-prefix/",
  ConformancePackInputParameters: [
    {
      ParameterName: "S3Bucket",
      ParameterValue: "my-advanced-config-bucket"
    },
    {
      ParameterName: "MaxComplianceAge",
      ParameterValue: "30"
    }
  ],
  ExcludedAccounts: ["123456789012"]
});
```

## Using TemplateS3Uri

Create a conformance pack using a template from an S3 URI, streamlining your configuration management.

```ts
const uriConformancePack = await AWS.Config.OrganizationConformancePack("UriConformancePack", {
  OrganizationConformancePackName: "UriBasedOrgConformancePack",
  TemplateS3Uri: "s3://my-config-bucket/config-template.yaml",
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "config-uri-prefix/",
  ConformancePackInputParameters: [
    {
      ParameterName: "S3Bucket",
      ParameterValue: "my-uri-config-bucket"
    }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing conformance pack instead of failing if it already exists.

```ts
const adoptConformancePack = await AWS.Config.OrganizationConformancePack("AdoptConformancePack", {
  OrganizationConformancePackName: "ExistingConformancePack",
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "adopt-prefix/",
  adopt: true // This will adopt the existing resource if it exists
});
```