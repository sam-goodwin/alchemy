---
title: Managing AWS Config ConformancePacks with Alchemy
description: Learn how to create, update, and manage AWS Config ConformancePacks using Alchemy Cloud Control.
---

# ConformancePack

The ConformancePack resource lets you create and manage [AWS Config ConformancePacks](https://docs.aws.amazon.com/config/latest/userguide/) that help you maintain compliance with your organization's policies and regulations.

## Minimal Example

Create a basic ConformancePack with required properties and one optional property for input parameters.

```ts
import AWS from "alchemy/aws/control";

const BasicConformancePack = await AWS.Config.ConformancePack("BasicConformancePack", {
  ConformancePackName: "BasicCompliancePack",
  ConformancePackInputParameters: [
    {
      ParameterName: "ComplianceType",
      ParameterValue: "CIS"
    }
  ],
  DeliveryS3Bucket: "my-config-bucket"
});
```

## Advanced Configuration

Configure a ConformancePack with a custom SSM document template and additional input parameters for enhanced compliance management.

```ts
const AdvancedConformancePack = await AWS.Config.ConformancePack("AdvancedConformancePack", {
  ConformancePackName: "AdvancedCompliancePack",
  TemplateSSMDocumentDetails: {
    DocumentName: "MySSMDocument",
    DocumentVersion: "1"
  },
  ConformancePackInputParameters: [
    {
      ParameterName: "ComplianceType",
      ParameterValue: "CIS"
    },
    {
      ParameterName: "Region",
      ParameterValue: "us-east-1"
    }
  ],
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "conformance-packs/"
});
```

## Using Template Body

Create a ConformancePack using a template body to define compliance rules directly in the resource definition.

```ts
const TemplateBodyConformancePack = await AWS.Config.ConformancePack("TemplateBodyConformancePack", {
  ConformancePackName: "TemplateBodyCompliancePack",
  TemplateBody: JSON.stringify({
    Rules: [
      {
        ConfigRuleName: "S3BucketPublicReadProhibited",
        Source: {
          Owner: "AWS",
          SourceIdentifier: "S3_BUCKET_PUBLIC_READ_PROHIBITED"
        }
      }
    ]
  }),
  DeliveryS3Bucket: "my-config-bucket"
});
```

## Adoption of Existing Resources

Adopt existing resources into a new ConformancePack without failing if they already exist.

```ts
const AdoptExistingConformancePack = await AWS.Config.ConformancePack("AdoptExistingConformancePack", {
  ConformancePackName: "ExistingCompliancePack",
  adopt: true,
  DeliveryS3Bucket: "my-config-bucket"
});
```