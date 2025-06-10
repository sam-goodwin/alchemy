---
title: InstanceProfile
description: Learn how to create, update, and manage AWS DMS InstanceProfiles using Alchemy Cloud Control.
---


The InstanceProfile resource lets you manage [AWS DMS InstanceProfiles](https://docs.aws.amazon.com/dms/latest/userguide/) used for database migration tasks. This resource helps configure the instances that will perform the migration, including network, security, and performance settings.

## Minimal Example

Create a basic DMS InstanceProfile with essential properties.

```ts
import AWS from "alchemy/aws/control";

const dmsInstanceProfile = await AWS.DMS.InstanceProfile("myDmsInstanceProfile", {
  InstanceProfileName: "MyDMSInstanceProfile",
  SubnetGroupIdentifier: "my-subnet-group",
  VpcSecurityGroups: ["sg-01234abcd5678efgh"],
  PubliclyAccessible: true
});
```

## Advanced Configuration

Configure an InstanceProfile with additional settings for security and performance optimization.

```ts
const advancedDmsInstanceProfile = await AWS.DMS.InstanceProfile("advancedDmsInstanceProfile", {
  InstanceProfileName: "AdvancedDMSInstanceProfile",
  Description: "This instance profile is optimized for performance.",
  SubnetGroupIdentifier: "my-subnet-group",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  NetworkType: "IPV4",
  AvailabilityZone: "us-east-1a",
  VpcSecurityGroups: ["sg-01234abcd5678efgh"],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "DatabaseMigration"
    }
  ],
  PubliclyAccessible: false
});
```

## Custom Security Group Configuration

Set up an InstanceProfile with specific security group settings to control access.

```ts
const customSecurityGroupDmsInstanceProfile = await AWS.DMS.InstanceProfile("customSecurityGroupDmsInstanceProfile", {
  InstanceProfileName: "CustomSecurityGroupDMSInstanceProfile",
  SubnetGroupIdentifier: "my-subnet-group",
  VpcSecurityGroups: ["sg-09876zyxwv5432qpo"],
  PubliclyAccessible: true,
  Tags: [
    {
      Key: "Access",
      Value: "Restricted"
    }
  ]
});
```

## Using KMS for Encryption

Create an InstanceProfile that utilizes AWS KMS for encryption at rest.

```ts
const kmsEncryptedDmsInstanceProfile = await AWS.DMS.InstanceProfile("kmsEncryptedDmsInstanceProfile", {
  InstanceProfileName: "KMSEncryptedDMSInstanceProfile",
  SubnetGroupIdentifier: "my-subnet-group",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  PubliclyAccessible: false,
  Tags: [
    {
      Key: "Encryption",
      Value: "Enabled"
    }
  ]
});
```
