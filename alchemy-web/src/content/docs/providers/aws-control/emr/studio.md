---
title: Studio
description: Learn how to create, update, and manage AWS EMR Studios using Alchemy Cloud Control.
---


The Studio resource lets you manage [AWS EMR Studios](https://docs.aws.amazon.com/emr/latest/userguide/) for developing and running data analytics applications. EMR Studios provide a collaborative environment for data scientists and data engineers to create, manage, and share notebooks.

## Minimal Example

Create a basic EMR Studio with essential properties.

```ts
import AWS from "alchemy/aws/control";

const emrStudio = await AWS.EMR.Studio("basicEmrStudio", {
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://my-emr-studio-bucket/",
  SubnetIds: ["subnet-0123456789abcdef0"],
  Name: "BasicEMRStudio",
  ServiceRole: "EMRStudioServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef0123456789"
});
```

## Advanced Configuration

Configure an EMR Studio with additional options for better security and identity management.

```ts
const advancedEmrStudio = await AWS.EMR.Studio("advancedEmrStudio", {
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://my-emr-studio-advanced-bucket/",
  SubnetIds: ["subnet-0123456789abcdef0"],
  Name: "AdvancedEMRStudio",
  ServiceRole: "EMRStudioServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef0123456789",
  Description: "An advanced EMR Studio with enhanced security settings.",
  EncryptionKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  TrustedIdentityPropagationEnabled: true,
  AuthMode: "SAML",
  IdpAuthUrl: "https://idp.example.com/auth",
  IdpRelayStateParameterName: "state",
  IdcUserAssignment: "user@example.com"
});
```

## Custom Identity Configuration

Create an EMR Studio configured for custom identity management with SAML authentication.

```ts
const customIdentityEmrStudio = await AWS.EMR.Studio("customIdentityEmrStudio", {
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://my-emr-studio-custom-bucket/",
  SubnetIds: ["subnet-0123456789abcdef0"],
  Name: "CustomIdentityEMRStudio",
  ServiceRole: "EMRStudioServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef0123456789",
  AuthMode: "SAML",
  IdpAuthUrl: "https://idp.example.com/auth",
  IdpRelayStateParameterName: "state"
});
```

## Secure Configuration with IAM Policy

Set up an EMR Studio with a specific IAM policy for enhanced security.

```ts
const secureEmrStudio = await AWS.EMR.Studio("secureEmrStudio", {
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://my-emr-studio-secure-bucket/",
  SubnetIds: ["subnet-0123456789abcdef0"],
  Name: "SecureEMRStudio",
  ServiceRole: "EMRStudioServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef0123456789",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataAnalytics" }
  ],
  UserRole: "EMRStudioUserRole",
  IdcUserAssignment: "user@example.com"
});
```
