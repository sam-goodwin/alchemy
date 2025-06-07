---
title: Managing AWS Glue SecurityConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Glue SecurityConfigurations using Alchemy Cloud Control.
---

# SecurityConfiguration

The SecurityConfiguration resource allows you to manage security configurations for AWS Glue, including encryption settings for data at rest and in transit. For more detailed information, you can refer to the [AWS Glue SecurityConfigurations documentation](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

Create a basic security configuration with encryption settings for S3.

```ts
import AWS from "alchemy/aws/control";

const BasicSecurityConfiguration = await AWS.Glue.SecurityConfiguration("BasicSecurityConfig", {
  Name: "BasicSecurityConfig",
  EncryptionConfiguration: {
    S3Encryptions: [{
      S3EncryptionMode: "DISABLED"
    }]
  }
});
```

## Advanced Configuration

Configure a security configuration with multiple encryption settings for S3, including KMS key usage.

```ts
const AdvancedSecurityConfiguration = await AWS.Glue.SecurityConfiguration("AdvancedSecurityConfig", {
  Name: "AdvancedSecurityConfig",
  EncryptionConfiguration: {
    S3Encryptions: [{
      S3EncryptionMode: "SSE-KMS",
      KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef"
    }]
  }
});
```

## Development Environment Configuration

Set up a security configuration for a development environment with minimal encryption settings.

```ts
const DevSecurityConfiguration = await AWS.Glue.SecurityConfiguration("DevSecurityConfig", {
  Name: "DevSecurityConfig",
  EncryptionConfiguration: {
    S3Encryptions: [{
      S3EncryptionMode: "DISABLED"
    }]
  }
});
```

## Production Environment Configuration

Establish a security configuration optimized for production with strict encryption policies.

```ts
const ProdSecurityConfiguration = await AWS.Glue.SecurityConfiguration("ProdSecurityConfig", {
  Name: "ProdSecurityConfig",
  EncryptionConfiguration: {
    S3Encryptions: [{
      S3EncryptionMode: "SSE-KMS",
      KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef"
    }]
  }
});
```