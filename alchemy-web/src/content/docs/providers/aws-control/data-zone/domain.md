---
title: Domain
description: Learn how to create, update, and manage AWS DataZone Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS DataZone Domains](https://docs.aws.amazon.com/datazone/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DataZone Domain with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const dataZoneDomain = await AWS.DataZone.Domain("myDataZoneDomain", {
  name: "my-data-zone",
  DomainExecutionRole: "arn:aws:iam::123456789012:role/MyDataZoneRole",
  Description: "This is my DataZone domain for managing data assets."
});
```

## Advanced Configuration

Configure a DataZone Domain with additional options like KMS key identifier and service role.

```ts
const advancedDataZoneDomain = await AWS.DataZone.Domain("advancedDataZoneDomain", {
  name: "advanced-data-zone",
  DomainExecutionRole: "arn:aws:iam::123456789012:role/MyDataZoneRole",
  ServiceRole: "arn:aws:iam::123456789012:role/MyDataZoneServiceRole",
  KmsKeyIdentifier: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataZoneProject" }
  ]
});
```

## Single Sign-On Configuration

Set up a DataZone Domain with Single Sign-On (SSO) integration.

```ts
const ssoDataZoneDomain = await AWS.DataZone.Domain("ssoDataZoneDomain", {
  name: "sso-enabled-data-zone",
  DomainExecutionRole: "arn:aws:iam::123456789012:role/MyDataZoneRole",
  SingleSignOn: {
    SsoProvider: "my-sso-provider",
    SsoClientId: "my-sso-client-id",
    SsoClientSecret: alchemy.secret(process.env.SSO_CLIENT_SECRET!)
  }
});
```

## Policy Configuration

Create a DataZone Domain with a specific IAM policy for execution roles.

```ts
const policyDataZoneDomain = await AWS.DataZone.Domain("policyDataZoneDomain", {
  name: "policy-data-zone",
  DomainExecutionRole: "arn:aws:iam::123456789012:role/MyDataZoneRole",
  Description: "DataZone domain with specific IAM policy.",
  ServiceRole: "arn:aws:iam::123456789012:role/MyDataZoneServiceRole",
  Tags: [
    { Key: "UseCase", Value: "DataManagement" }
  ]
});

// Example IAM Policy JSON
const executionPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "datazone:CreateAsset",
        "datazone:UpdateAsset"
      ],
      Resource: "*"
    }
  ]
};
```
