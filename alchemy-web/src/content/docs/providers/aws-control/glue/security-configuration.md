---
title: SecurityConfiguration
description: Learn how to create, update, and manage AWS Glue SecurityConfigurations using Alchemy Cloud Control.
---


The SecurityConfiguration resource lets you manage [AWS Glue SecurityConfigurations](https://docs.aws.amazon.com/glue/latest/userguide/) for encrypting data at rest and in transit within your Glue jobs and crawlers.

## Minimal Example

Create a basic security configuration with encryption settings.

```ts
import AWS from "alchemy/aws/control";

const basicSecurityConfig = await AWS.Glue.SecurityConfiguration("basicSecurityConfig", {
  name: "basic_security_config",
  encryptionConfiguration: {
    // Using S3 encryption
    s3Encryption: [{
      encryptionMode: "SSE-S3",
      location: "s3://my-encrypted-bucket"
    }],
    // Optionally add other encryption settings here
  },
  adopt: true // Allows adopting existing resource if it already exists
});
```

## Advanced Configuration

Configure a security configuration with multiple encryption modes for different data sources.

```ts
const advancedSecurityConfig = await AWS.Glue.SecurityConfiguration("advancedSecurityConfig", {
  name: "advanced_security_config",
  encryptionConfiguration: {
    s3Encryption: [{
      encryptionMode: "SSE-KMS",
      kmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
      location: "s3://my-advanced-bucket"
    }],
    // Configure other encryption settings as needed
    cloudWatchEncryption: {
      cloudWatchEncryptionMode: "DISABLED"
    },
    jobBookmarksEncryption: {
      jobBookmarksEncryptionMode: "DISABLED"
    }
  }
});
```

## Use Case: Job Specific Security Configuration

Create a security configuration tailored for a specific job that requires enhanced encryption.

```ts
const jobSpecificSecurityConfig = await AWS.Glue.SecurityConfiguration("jobSpecificSecurityConfig", {
  name: "job_specific_security_config",
  encryptionConfiguration: {
    s3Encryption: [{
      encryptionMode: "SSE-KMS",
      kmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
      location: "s3://my-job-specific-bucket"
    }],
    cloudWatchEncryption: {
      cloudWatchEncryptionMode: "SSE-KMS",
      kmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
    }
  }
});
```
