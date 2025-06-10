---
title: Integration
description: Learn how to create, update, and manage AWS RDS Integrations using Alchemy Cloud Control.
---


The Integration resource allows you to manage [AWS RDS Integrations](https://docs.aws.amazon.com/rds/latest/userguide/) for connecting and integrating relational databases with other AWS services and applications.

## Minimal Example

Create a basic RDS Integration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const rdsIntegration = await AWS.RDS.Integration("basicRdsIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydatabase",
  TargetArn: "arn:aws:sqs:us-east-1:123456789012:myqueue",
  IntegrationName: "MyRDSIntegration",
  Description: "Integration for my RDS database to SQS"
});
```

## Advanced Configuration

Configure an RDS Integration with additional encryption context and KMS key for enhanced security.

```ts
const secureRdsIntegration = await AWS.RDS.Integration("secureRdsIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydatabase",
  TargetArn: "arn:aws:sqs:us-east-1:123456789012:mysecurequeue",
  KMSKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key",
  AdditionalEncryptionContext: {
    "User": "myServiceUser",
    "Environment": "Production"
  },
  IntegrationName: "SecureRDSIntegration",
  Description: "Secure integration for my RDS database with encryption"
});
```

## Using Data Filters

Create an RDS Integration that utilizes a data filter to specify the data to be integrated.

```ts
const filteredRdsIntegration = await AWS.RDS.Integration("filteredRdsIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydatabase",
  TargetArn: "arn:aws:sns:us-east-1:123456789012:mytopic",
  DataFilter: "SELECT * FROM my_table WHERE status = 'active'",
  IntegrationName: "FilteredRDSIntegration",
  Description: "Integration for active records from my RDS database"
});
```

## Tagging Resources

Create an RDS Integration with tags for easier resource management and identification.

```ts
const taggedRdsIntegration = await AWS.RDS.Integration("taggedRdsIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydatabase",
  TargetArn: "arn:aws:s3:::mybucket/myfolder/",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "DataPipeline" }
  ],
  IntegrationName: "TaggedRDSIntegration",
  Description: "Integration for development environment with tagging"
});
```
