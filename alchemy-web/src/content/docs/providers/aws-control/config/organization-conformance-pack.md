---
title: OrganizationConformancePack
description: Learn how to create, update, and manage AWS Config OrganizationConformancePacks using Alchemy Cloud Control.
---


The OrganizationConformancePack resource allows you to manage AWS Config Organization Conformance Packs, which are collections of AWS Config rules and remediation actions that can be applied across multiple accounts in an AWS Organization. For more details, refer to the [AWS Config OrganizationConformancePacks documentation](https://docs.aws.amazon.com/config/latest/userguide/).

## Minimal Example

Create a basic Organization Conformance Pack with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const conformancePack = await AWS.Config.OrganizationConformancePack("myConformancePack", {
  OrganizationConformancePackName: "MyConformancePack",
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "config-pack/"
});
```

## Advanced Configuration

Configure an Organization Conformance Pack with additional input parameters and excluded accounts.

```ts
const advancedConformancePack = await AWS.Config.OrganizationConformancePack("advancedConformancePack", {
  OrganizationConformancePackName: "AdvancedConformancePack",
  DeliveryS3Bucket: "my-advanced-config-bucket",
  DeliveryS3KeyPrefix: "advanced-config-pack/",
  ConformancePackInputParameters: [
    {
      ParameterName: "S3BucketName",
      ParameterValue: "my-advanced-config-bucket"
    },
    {
      ParameterName: "MaxResources",
      ParameterValue: "100"
    }
  ],
  ExcludedAccounts: ["123456789012", "987654321098"]
});
```

## Custom Template Configuration

Create an Organization Conformance Pack using a custom template stored in S3.

```ts
const customTemplateConformancePack = await AWS.Config.OrganizationConformancePack("customTemplateConformancePack", {
  OrganizationConformancePackName: "CustomTemplateConformancePack",
  TemplateS3Uri: "s3://my-config-templates/custom-template.yaml",
  DeliveryS3Bucket: "my-template-config-bucket"
});
```

## Adoption of Existing Resources

Use the adopt option to handle existing resources gracefully.

```ts
const adoptionConformancePack = await AWS.Config.OrganizationConformancePack("adoptionConformancePack", {
  OrganizationConformancePackName: "AdoptionConformancePack",
  DeliveryS3Bucket: "my-adoption-config-bucket",
  adopt: true // Adopt existing resources if they already exist
});
```
