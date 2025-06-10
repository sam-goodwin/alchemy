---
title: DataCatalogEncryptionSettings
description: Learn how to create, update, and manage AWS Glue DataCatalogEncryptionSettings using Alchemy Cloud Control.
---


The DataCatalogEncryptionSettings resource allows you to manage the encryption settings for the AWS Glue Data Catalog. This resource is essential for ensuring that your data is securely managed and compliant with data protection regulations. For more information, refer to the [AWS Glue DataCatalogEncryptionSettings documentation](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

Create a basic DataCatalogEncryptionSettings resource with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const dataCatalogEncryptionSettings = await AWS.Glue.DataCatalogEncryptionSettings("default-encryption-settings", {
  DataCatalogEncryptionSettings: {
    EncryptionAtRest: {
      CatalogEncryptionMode: "DISABLED"
    },
    ConnectionPasswordEncryption: {
      ReturnConnectionPasswordEncrypted: true,
      AwsKmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
    }
  },
  CatalogId: "123456789012"
});
```

## Advanced Configuration

Configure the DataCatalogEncryptionSettings with more complex encryption options for enhanced security.

```ts
const advancedEncryptionSettings = await AWS.Glue.DataCatalogEncryptionSettings("advanced-encryption-settings", {
  DataCatalogEncryptionSettings: {
    EncryptionAtRest: {
      CatalogEncryptionMode: "SSE-KMS",
      SseAwsKmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
    },
    ConnectionPasswordEncryption: {
      ReturnConnectionPasswordEncrypted: true,
      AwsKmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd5678-12ab-34cd-56ef-1234567890cd"
    }
  },
  CatalogId: "123456789012"
});
```

## Using Existing Encryption Settings

Adopt existing DataCatalogEncryptionSettings instead of failing when the resource already exists.

```ts
const adoptExistingSettings = await AWS.Glue.DataCatalogEncryptionSettings("existing-encryption-settings", {
  DataCatalogEncryptionSettings: {
    EncryptionAtRest: {
      CatalogEncryptionMode: "DISABLED"
    }
  },
  CatalogId: "123456789012",
  adopt: true
});
```
