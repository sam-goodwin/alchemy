---
title: Broker
description: Learn how to create, update, and manage AWS AmazonMQ Brokers using Alchemy Cloud Control.
---


The Broker resource allows you to manage [AWS AmazonMQ Brokers](https://docs.aws.amazon.com/amazonmq/latest/userguide/) for messaging services in the cloud.

## Minimal Example

Create a basic AmazonMQ Broker with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicBroker = await AWS.AmazonMQ.Broker("myBasicBroker", {
  BrokerName: "my-amazonmq-broker",
  HostInstanceType: "mq.m5.large",
  Users: [
    {
      Username: "admin",
      Password: "SecurePassword123!",
      ConsoleAccess: true,
      Groups: ["admins"]
    }
  ],
  PubliclyAccessible: true,
  DeploymentMode: "SINGLE_INSTANCE",
  EngineType: "ACTIVEMQ",
  EngineVersion: "5.15.14"
});
```

## Advanced Configuration

Configure an AmazonMQ Broker with advanced settings, including logging, maintenance windows, and data replication.

```ts
const advancedBroker = await AWS.AmazonMQ.Broker("myAdvancedBroker", {
  BrokerName: "my-advanced-broker",
  HostInstanceType: "mq.m5.large",
  Users: [
    {
      Username: "user1",
      Password: "AnotherSecurePassword456!",
      ConsoleAccess: true,
      Groups: ["developers"]
    }
  ],
  PubliclyAccessible: true,
  DeploymentMode: "ACTIVE_STANDBY_MULTI_AZ",
  EngineType: "RABBITMQ",
  EngineVersion: "3.8.9",
  Logs: {
    General: true,
    Audit: true
  },
  MaintenanceWindowStartTime: {
    DayOfWeek: "SUNDAY",
    TimeOfDay: "05:00:00",
    TimeZone: "UTC"
  },
  DataReplicationPrimaryBrokerArn: "arn:aws:mq:us-east-1:123456789012:broker:my-replica-broker"
});
```

## Security and Encryption Options

Set up an AmazonMQ Broker with LDAP server metadata and encryption options for enhanced security.

```ts
const secureBroker = await AWS.AmazonMQ.Broker("mySecureBroker", {
  BrokerName: "my-secure-broker",
  HostInstanceType: "mq.t3.medium",
  Users: [
    {
      Username: "secureUser",
      Password: "SuperSecurePassword789!",
      ConsoleAccess: true,
      Groups: ["secureGroup"]
    }
  ],
  PubliclyAccessible: false,
  DeploymentMode: "SINGLE_INSTANCE",
  EngineType: "ACTIVEMQ",
  EngineVersion: "5.15.14",
  LdapServerMetadata: {
    Hosts: ["ldap.example.com"],
    Port: 389,
    UserDN: "cn=admin,dc=example,dc=com",
    Password: "ldapAdminPassword"
  },
  EncryptionOptions: {
    UseAwsOwnedKey: true,
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key"
  }
});
```

## Custom Configuration with Tags

Create an AmazonMQ Broker with custom configuration and tags for resource organization.

```ts
const taggedBroker = await AWS.AmazonMQ.Broker("myTaggedBroker", {
  BrokerName: "my-tagged-broker",
  HostInstanceType: "mq.m5.large",
  Users: [
    {
      Username: "taggedUser",
      Password: "TaggedPassword123!",
      ConsoleAccess: true,
      Groups: ["taggedGroup"]
    }
  ],
  PubliclyAccessible: true,
  DeploymentMode: "SINGLE_INSTANCE",
  EngineType: "RABBITMQ",
  EngineVersion: "3.8.9",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MessagingService"
    }
  ]
});
```
