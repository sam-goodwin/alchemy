---
title: Managing AWS DMS InstanceProfiles with Alchemy
description: Learn how to create, update, and manage AWS DMS InstanceProfiles using Alchemy Cloud Control.
---

# InstanceProfile

The InstanceProfile resource allows you to create and manage [AWS DMS InstanceProfiles](https://docs.aws.amazon.com/dms/latest/userguide/) which define the configuration settings for AWS Database Migration Service (DMS) replication instances.

## Minimal Example

Create a basic DMS InstanceProfile with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicInstanceProfile = await AWS.DMS.InstanceProfile("BasicInstanceProfile", {
  InstanceProfileName: "MyDMSInstanceProfile",
  SubnetGroupIdentifier: "my-subnet-group",
  AvailabilityZone: "us-east-1a",
  PubliclyAccessible: true,
  VpcSecurityGroups: ["sg-12345678"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure an InstanceProfile with advanced options such as KMS key for encryption and specific network type.

```ts
const AdvancedInstanceProfile = await AWS.DMS.InstanceProfile("AdvancedInstanceProfile", {
  InstanceProfileName: "MyAdvancedDMSInstanceProfile",
  SubnetGroupIdentifier: "my-advanced-subnet-group",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-EXAMPLEKEY",
  NetworkType: "IPV4",
  AvailabilityZone: "us-east-1b",
  PubliclyAccessible: false,
  VpcSecurityGroups: ["sg-87654321"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Migration" }
  ]
});
```

## Custom Configuration for High Availability

Create an InstanceProfile specifically designed for high availability and backup.

```ts
const HighAvailabilityInstanceProfile = await AWS.DMS.InstanceProfile("HighAvailabilityInstanceProfile", {
  InstanceProfileName: "MyHighAvailabilityDMSProfile",
  SubnetGroupIdentifier: "my-high-availability-subnet-group",
  AvailabilityZone: "us-west-2a",
  PubliclyAccessible: true,
  VpcSecurityGroups: ["sg-11223344", "sg-22334455"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backup" }
  ]
});
```

## InstanceProfile with Specific Security Settings

Set up an InstanceProfile featuring specific VPC security groups and encryption options.

```ts
const SecureInstanceProfile = await AWS.DMS.InstanceProfile("SecureInstanceProfile", {
  InstanceProfileName: "MySecureDMSProfile",
  SubnetGroupIdentifier: "my-secure-subnet-group",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-SECUREKEY",
  VpcSecurityGroups: ["sg-33445566"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
``` 

These examples illustrate how to effectively utilize the AWS DMS InstanceProfile resource with various configurations tailored to different use cases.