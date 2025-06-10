---
title: SecurityConfiguration
description: Learn how to create, update, and manage AWS EMR SecurityConfigurations using Alchemy Cloud Control.
---


The SecurityConfiguration resource allows you to manage [AWS EMR SecurityConfigurations](https://docs.aws.amazon.com/emr/latest/userguide/) that define security settings for your EMR clusters, such as encryption, access control, and logging.

## Minimal Example

Create a basic EMR SecurityConfiguration with required properties and a common optional name.

```ts
import AWS from "alchemy/aws/control";

const emrSecurityConfig = await AWS.EMR.SecurityConfiguration("basicSecurityConfig", {
  SecurityConfiguration: {
    Encryption: {
      EnableInTransitEncryption: true,
      EnableAtRestEncryption: true,
      AtRestEncryptionConfiguration: {
        S3Encryption: {
          Mode: "SSE-S3"
        }
      },
      InTransitEncryptionConfiguration: {
        Enable: true
      }
    },
    Logging: {
      EnableLogging: true,
      S3LoggingPath: "s3://my-emr-logs/"
    }
  },
  Name: "BasicSecurityConfig"
});
```

## Advanced Configuration

Configure an EMR SecurityConfiguration with detailed encryption and logging settings.

```ts
const advancedSecurityConfig = await AWS.EMR.SecurityConfiguration("advancedSecurityConfig", {
  SecurityConfiguration: {
    Encryption: {
      EnableInTransitEncryption: true,
      EnableAtRestEncryption: true,
      AtRestEncryptionConfiguration: {
        S3Encryption: {
          Mode: "SSE-KMS",
          KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
        }
      },
      InTransitEncryptionConfiguration: {
        Enable: true,
        Options: {
          KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
        }
      }
    },
    Logging: {
      EnableLogging: true,
      S3LoggingPath: "s3://my-emr-logs/",
      CloudWatchLoggingOptions: {
        LogGroupName: "my-emr-log-group",
        LogStreamName: "my-emr-log-stream"
      }
    }
  },
  Name: "AdvancedSecurityConfig"
});
```

## Custom IAM Policy

Define a SecurityConfiguration with a custom IAM policy for access control.

```ts
const customIAMPolicyConfig = await AWS.EMR.SecurityConfiguration("customIAMPolicyConfig", {
  SecurityConfiguration: {
    IAMPolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: [
            "elasticmapreduce:ListClusters",
            "elasticmapreduce:DescribeCluster"
          ],
          Resource: "*"
        }
      ]
    },
    Encryption: {
      EnableInTransitEncryption: true,
      EnableAtRestEncryption: true
    },
    Logging: {
      EnableLogging: true,
      S3LoggingPath: "s3://my-emr-logs/"
    }
  },
  Name: "CustomIAMPolicySecurityConfig"
});
```
