---
title: Namespace
description: Learn how to create, update, and manage AWS RedshiftServerless Namespaces using Alchemy Cloud Control.
---


The Namespace resource allows you to create and manage [AWS RedshiftServerless Namespaces](https://docs.aws.amazon.com/redshiftserverless/latest/userguide/) for serverless data warehousing.

## Minimal Example

Create a basic RedshiftServerless Namespace with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const namespace = await AWS.RedshiftServerless.Namespace("myNamespace", {
  namespaceName: "myDataWarehouse",
  adminUsername: "admin",
  adminUserPassword: "StrongPassword123!",
  manageAdminPassword: true
});
```

## Advanced Configuration

Configure a Namespace with advanced options such as IAM roles and snapshot copy configurations.

```ts
const advancedNamespace = await AWS.RedshiftServerless.Namespace("advancedNamespace", {
  namespaceName: "advancedDataWarehouse",
  adminUsername: "admin",
  adminUserPassword: "AnotherStrongPassword456!",
  manageAdminPassword: true,
  iamRoles: [
    "arn:aws:iam::123456789012:role/myRedshiftRole"
  ],
  snapshotCopyConfigurations: [{
    destinationRegion: "us-west-2",
    retentionPeriod: 7
  }],
  tags: [
    { key: "Project", value: "RedshiftServerless" },
    { key: "Environment", value: "Production" }
  ]
});
```

## Snapshot and Security Configuration

Create a Namespace with final snapshot settings and KMS key for enhanced security.

```ts
const secureNamespace = await AWS.RedshiftServerless.Namespace("secureNamespace", {
  namespaceName: "secureDataWarehouse",
  adminUsername: "admin",
  adminUserPassword: "SecurePassword789!",
  finalSnapshotName: "finalSnapshot",
  finalSnapshotRetentionPeriod: 30,
  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id"
});
```

## Resource Policy Example

Define a Namespace with a custom resource policy to manage access permissions.

```ts
const policyNamespace = await AWS.RedshiftServerless.Namespace("policyNamespace", {
  namespaceName: "policyDataWarehouse",
  adminUsername: "admin",
  adminUserPassword: "PolicyPassword321!",
  namespaceResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/myAccessRole"
        },
        Action: "redshift-serverless:DescribeNamespaces",
        Resource: "*"
      }
    ]
  }
});
```
