---
title: Managing AWS OpsWorksCM Servers with Alchemy
description: Learn how to create, update, and manage AWS OpsWorksCM Servers using Alchemy Cloud Control.
---

# Server

The Server resource allows you to create and manage [AWS OpsWorksCM Servers](https://docs.aws.amazon.com/opsworkscm/latest/userguide/) for configuration management. It provides a fully managed service for deploying and managing applications in a server environment.

## Minimal Example

Create a basic OpsWorksCM server with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicServer = await AWS.OpsWorksCM.Server("BasicOpsWorksServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.medium",
  KeyPair: "my-key-pair",
  Engine: "Chef",
  EngineVersion: "14.10"
});
```

## Advanced Configuration

Configure an OpsWorksCM server with advanced options such as automated backups and a maintenance window.

```ts
const advancedServer = await AWS.OpsWorksCM.Server("AdvancedOpsWorksServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "m5.large",
  BackupRetentionCount: 5,
  PreferredBackupWindow: "06:00-07:00",
  PreferredMaintenanceWindow: "Mon:04:00-Mon:04:30",
  DisableAutomatedBackup: false,
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Domain Configuration

Set up a server with a custom domain and SSL certificate.

```ts
const customDomainServer = await AWS.OpsWorksCM.Server("CustomDomainOpsWorksServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t2.small",
  CustomDomain: "myapp.example.com",
  CustomCertificate: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...==\n-----END CERTIFICATE-----",
  CustomPrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIE...YourKey...==\n-----END PRIVATE KEY-----"
});
```

## Network Configuration

Deploy a server with specific network settings, including a public IP address and specific security groups.

```ts
const networkConfiguredServer = await AWS.OpsWorksCM.Server("NetworkConfiguredOpsWorksServer", {
  ServiceRoleArn: "arn:aws:iam::123456789012:role/OpsWorksCMServiceRole",
  InstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/OpsWorksCMInstanceProfile",
  InstanceType: "t3.medium",
  AssociatePublicIpAddress: true,
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  Engine: "Chef",
  EngineVersion: "14.10"
});
```