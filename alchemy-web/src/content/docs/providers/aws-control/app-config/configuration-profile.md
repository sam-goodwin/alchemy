---
title: ConfigurationProfile
description: Learn how to create, update, and manage AWS AppConfig ConfigurationProfiles using Alchemy Cloud Control.
---


The ConfigurationProfile resource allows you to manage [AWS AppConfig ConfigurationProfiles](https://docs.aws.amazon.com/appconfig/latest/userguide/) to define how configuration data is retrieved and validated for your applications.

## Minimal Example

Create a basic configuration profile with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConfigProfile = await AWS.AppConfig.ConfigurationProfile("basicConfigProfile", {
  applicationId: "myApplication123",
  name: "MyBasicConfigProfile",
  locationUri: "s3://my-bucket/configs/basic.json",
  type: "AWS.AppConfig.Json",
  tags: [
    { key: "Environment", value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a configuration profile with additional options such as KMS key identifier and validators.

```ts
const advancedConfigProfile = await AWS.AppConfig.ConfigurationProfile("advancedConfigProfile", {
  applicationId: "myApplication123",
  name: "MyAdvancedConfigProfile",
  locationUri: "s3://my-bucket/configs/advanced.json",
  type: "AWS.AppConfig.Json",
  kmsKeyIdentifier: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  validators: [
    {
      type: "JSON_SCHEMA",
      content: '{"type": "object", "properties": {"featureFlag": {"type": "boolean"}}}'
    }
  ],
  description: "This profile contains advanced configuration."
});
```

## Configuration with IAM Role Retrieval

Create a configuration profile specifying an IAM role for retrieval.

```ts
const roleConfigProfile = await AWS.AppConfig.ConfigurationProfile("roleConfigProfile", {
  applicationId: "myApplication123",
  name: "MyRoleConfigProfile",
  locationUri: "s3://my-bucket/configs/role.json",
  retrievalRoleArn: "arn:aws:iam::123456789012:role/MyAppConfigRole",
  deletionProtectionCheck: "true"
});
```

## Configuration Profile with Deletion Protection

Set up a configuration profile with deletion protection enabled.

```ts
const protectedConfigProfile = await AWS.AppConfig.ConfigurationProfile("protectedConfigProfile", {
  applicationId: "myApplication123",
  name: "MyProtectedConfigProfile",
  locationUri: "s3://my-bucket/configs/protected.json",
  deletionProtectionCheck: "true",
  description: "This configuration profile is protected from accidental deletion."
});
```
