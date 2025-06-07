---
title: Managing AWS EMR Studios with Alchemy
description: Learn how to create, update, and manage AWS EMR Studios using Alchemy Cloud Control.
---

# Studio

The Studio resource lets you manage [AWS EMR Studios](https://docs.aws.amazon.com/emr/latest/userguide/) for interactive development and data science workflows on Amazon EMR.

## Minimal Example

Create a basic EMR Studio with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const emrStudio = await AWS.EMR.Studio("MyEMRStudio", {
  Name: "MyFirstEMRStudio",
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://my-emr-studio-bucket",
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  ServiceRole: "arn:aws:iam::123456789012:role/MyEMRServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef1234567890",
  AuthMode: "SAML"
});
```

## Advanced Configuration

Configure an EMR Studio with advanced settings including encryption, user roles, and tags.

```ts
const advancedEmrStudio = await AWS.EMR.Studio("AdvancedEMRStudio", {
  Name: "AdvancedEMRStudio",
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://advanced-emr-studio-bucket",
  SubnetIds: ["subnet-0123456789abcdef0"],
  ServiceRole: "arn:aws:iam::123456789012:role/MyEMRServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef1234567890",
  AuthMode: "SAML",
  EncryptionKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd-ef12-3456-7890-abcd-ef1234567890",
  UserRole: "arn:aws:iam::123456789012:role/MyEMRUserRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Configuring Identity Provider

Create an EMR Studio with identity provider settings for user management.

```ts
const identityProviderEmrStudio = await AWS.EMR.Studio("IdentityProviderEMRStudio", {
  Name: "IdentityProviderEMRStudio",
  WorkspaceSecurityGroupId: "sg-0123456789abcdef0",
  DefaultS3Location: "s3://identity-provider-emr-studio-bucket",
  SubnetIds: ["subnet-0123456789abcdef0"],
  ServiceRole: "arn:aws:iam::123456789012:role/MyEMRServiceRole",
  VpcId: "vpc-0123456789abcdef0",
  EngineSecurityGroupId: "sg-0abcdef1234567890",
  AuthMode: "SAML",
  IdpAuthUrl: "https://idp.example.com/auth",
  IdpRelayStateParameterName: "state",
  TrustedIdentityPropagationEnabled: true
});
```