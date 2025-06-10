---
title: PartnerApp
description: Learn how to create, update, and manage AWS SageMaker PartnerApps using Alchemy Cloud Control.
---


The PartnerApp resource lets you create and manage [AWS SageMaker PartnerApps](https://docs.aws.amazon.com/sagemaker/latest/userguide/), enabling integration with third-party applications and services.

## Minimal Example

Create a basic PartnerApp with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPartnerApp = await AWS.SageMaker.PartnerApp("basicPartnerApp", {
  executionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  type: "Custom",
  tier: "Standard",
  authType: "IAM",
  applicationConfig: {
    lambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myFunction",
    lambdaInvocationType: "RequestResponse"
  }
});
```

## Advanced Configuration

Configure a PartnerApp with additional properties such as KMS Key ID and IAM session-based identity.

```ts
const advancedPartnerApp = await AWS.SageMaker.PartnerApp("advancedPartnerApp", {
  executionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  type: "Custom",
  tier: "Standard",
  authType: "IAM",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmn1234opqr",
  enableIamSessionBasedIdentity: true,
  tags: [
    {
      key: "Project",
      value: "AIIntegration"
    }
  ]
});
```

## Example with Maintenance Configuration

Create a PartnerApp that includes a maintenance configuration.

```ts
const maintenancePartnerApp = await AWS.SageMaker.PartnerApp("maintenancePartnerApp", {
  executionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  type: "Custom",
  tier: "Enterprise",
  authType: "IAM",
  maintenanceConfig: {
    maintenanceWindowStart: "2023-10-15T00:00:00Z",
    maintenanceWindowEnd: "2023-10-15T02:00:00Z"
  },
  applicationConfig: {
    lambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:maintenanceFunction"
  }
});
```

## Example with Tags for Organization

Create a PartnerApp that is tagged for better organization.

```ts
const taggedPartnerApp = await AWS.SageMaker.PartnerApp("taggedPartnerApp", {
  executionRoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  type: "Custom",
  tier: "Standard",
  authType: "IAM",
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Owner",
      value: "DataScienceTeam"
    }
  ]
});
```
