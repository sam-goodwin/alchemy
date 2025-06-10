---
title: Server
description: Learn how to create, update, and manage AWS OpsWorksCM Servers using Alchemy Cloud Control.
---


The Server resource lets you manage [AWS OpsWorksCM Servers](https://docs.aws.amazon.com/opsworkscm/latest/userguide/) for configuration management and automation.

## Minimal Example

Create a basic OpsWorksCM server with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicServer = await AWS.OpsWorksCM.Server("basicServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.medium",
  Engine: "Chef",
  EngineVersion: "14.0",
  KeyPair: "my-key-pair"
});
```

## Advanced Configuration

Configure an OpsWorksCM server with additional settings for backups and maintenance windows.

```ts
const advancedServer = await AWS.OpsWorksCM.Server("advancedServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.medium",
  Engine: "Chef",
  EngineVersion: "14.0",
  BackupRetentionCount: 7,
  PreferredMaintenanceWindow: "Mon:03:00-Mon:04:00",
  PreferredBackupWindow: "03:00-04:00"
});
```

## Network Configuration

Set up an OpsWorksCM server with specific network configurations, including security groups and subnet IDs.

```ts
const networkConfiguredServer = await AWS.OpsWorksCM.Server("networkConfiguredServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.medium",
  Engine: "Chef",
  EngineVersion: "14.0",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  AssociatePublicIpAddress: true
});
```

## Custom Domain and Certificates

Create an OpsWorksCM server that uses a custom domain and SSL certificates for secure connections.

```ts
const secureDomainServer = await AWS.OpsWorksCM.Server("secureDomainServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.medium",
  Engine: "Chef",
  EngineVersion: "14.0",
  CustomDomain: "myapp.example.com",
  CustomCertificate: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  CustomPrivateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
});
```
