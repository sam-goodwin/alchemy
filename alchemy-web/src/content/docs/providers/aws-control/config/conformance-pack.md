---
title: ConformancePack
description: Learn how to create, update, and manage AWS Config ConformancePacks using Alchemy Cloud Control.
---


The ConformancePack resource lets you manage [AWS Config ConformancePacks](https://docs.aws.amazon.com/config/latest/userguide/) that help ensure compliance of your AWS resources with specific rules and standards.

## Minimal Example

Create a basic ConformancePack with required properties and one optional parameter.

```ts
import AWS from "alchemy/aws/control";

const basicConformancePack = await AWS.Config.ConformancePack("basicConformancePack", {
  ConformancePackName: "BasicCompliancePack",
  DeliveryS3Bucket: "my-config-bucket",
  DeliveryS3KeyPrefix: "compliance-packs/"
});
```

## Advanced Configuration

Configure a ConformancePack with input parameters and SSM document details for more complex setups.

```ts
const advancedConformancePack = await AWS.Config.ConformancePack("advancedConformancePack", {
  ConformancePackName: "AdvancedCompliancePack",
  DeliveryS3Bucket: "my-config-bucket",
  ConformancePackInputParameters: [
    {
      ParameterName: "S3BucketName",
      ParameterValue: "my-secure-bucket"
    },
    {
      ParameterName: "DynamoDBTable",
      ParameterValue: "my-table"
    }
  ],
  TemplateSSMDocumentDetails: {
    DocumentName: "MySSMDocument",
    DocumentVersion: "1"
  }
});
```

## Using a Template from S3

Deploy a ConformancePack using a CloudFormation template stored in S3.

```ts
const s3TemplateConformancePack = await AWS.Config.ConformancePack("s3TemplateConformancePack", {
  ConformancePackName: "S3TemplateCompliancePack",
  TemplateS3Uri: "s3://my-config-templates/compliance-pack-template.yaml",
  DeliveryS3Bucket: "my-config-bucket"
});
```

## Adopting Existing Resources

Create a ConformancePack that will adopt existing resources instead of failing if they already exist.

```ts
const adoptExistingConformancePack = await AWS.Config.ConformancePack("adoptExistingConformancePack", {
  ConformancePackName: "AdoptExistingCompliancePack",
  DeliveryS3Bucket: "my-config-bucket",
  adopt: true
});
```
