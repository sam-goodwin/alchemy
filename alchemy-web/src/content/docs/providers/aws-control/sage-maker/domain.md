---
title: Domain
description: Learn how to create, update, and manage AWS SageMaker Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS SageMaker Domains](https://docs.aws.amazon.com/sagemaker/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic SageMaker Domain with required properties and one optional setting:

```ts
import AWS from "alchemy/aws/control";

const sageMakerDomain = await AWS.SageMaker.Domain("basicDomain", {
  DomainName: "my-sagemaker-domain",
  VpcId: "vpc-0123456789abcdef0",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  AuthMode: "IAM",
  DefaultUserSettings: {
    ExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-east-1:123456789012:image/my-custom-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-east-1:123456789012:image-version/my-custom-image:1"
      }
    }
  }
});
```

## Advanced Configuration

Configure a SageMaker Domain with additional settings for enhanced security and network access:

```ts
const secureSageMakerDomain = await AWS.SageMaker.Domain("secureDomain", {
  DomainName: "secure-sagemaker-domain",
  VpcId: "vpc-0abcdef1234567890",
  SubnetIds: ["subnet-0abcdef1234567890", "subnet-1abcdef1234567890"],
  AuthMode: "IAM",
  AppNetworkAccessType: "PublicInternetOnly",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-EXAMPLEKEY",
  DefaultUserSettings: {
    ExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-east-1:123456789012:image/my-secure-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-east-1:123456789012:image-version/my-secure-image:1"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataScience" }
  ]
});
```

## Custom Domain Settings

Create a SageMaker Domain with custom settings for user management and application security:

```ts
const customDomain = await AWS.SageMaker.Domain("customDomain", {
  DomainName: "custom-sagemaker-domain",
  VpcId: "vpc-0fedcba9876543210",
  SubnetIds: ["subnet-0fedcba9876543210", "subnet-1fedcba9876543210"],
  AuthMode: "IAM",
  AppSecurityGroupManagement: "Service",
  DefaultUserSettings: {
    ExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-east-1:123456789012:image/my-custom-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-east-1:123456789012:image-version/my-custom-image:1"
      }
    }
  },
  DomainSettings: {
    SecurityGroupIds: ["sg-0abcdef1234567890"],
    SubnetIds: ["subnet-0fedcba9876543210"]
  }
});
```
