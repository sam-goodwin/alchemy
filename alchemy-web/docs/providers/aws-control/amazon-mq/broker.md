---
title: Managing AWS AmazonMQ Brokers with Alchemy
description: Learn how to create, update, and manage AWS AmazonMQ Brokers using Alchemy Cloud Control.
---

# Broker

The Broker resource allows you to manage [AWS AmazonMQ Brokers](https://docs.aws.amazon.com/amazonmq/latest/userguide/) and their configurations effectively.

## Minimal Example

Create a basic AmazonMQ Broker with essential properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicBroker = await AWS.AmazonMQ.Broker("BasicBroker", {
  BrokerName: "MyBasicBroker",
  EngineType: "ActiveMQ",
  EngineVersion: "5.15.14",
  HostInstanceType: "mq.t2.micro",
  Users: [{
    Username: "admin",
    Password: "securePassword123"
  }],
  PubliclyAccessible: true,
  DeploymentMode: "SINGLE_INSTANCE",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an AmazonMQ Broker with advanced settings for security and performance.

```ts
const AdvancedBroker = await AWS.AmazonMQ.Broker("AdvancedBroker", {
  BrokerName: "MyAdvancedBroker",
  EngineType: "ActiveMQ",
  EngineVersion: "5.15.14",
  HostInstanceType: "mq.t2.large",
  Users: [{
    Username: "admin",
    Password: "securePassword123"
  }],
  PubliclyAccessible: false,
  DeploymentMode: "ACTIVE_PASSIVE",
  MaintenanceWindowStartTime: {
    DayOfWeek: "MONDAY",
    TimeOfDay: "03:00",
    TimeZone: "UTC"
  },
  SecurityGroups: ["sg-0abcd1234efgh5678"],
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-1abcd1234efgh5678"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Operations" }
  ]
});
```

## Data Replication Setup

Set up a broker with data replication for high availability.

```ts
const ReplicatedBroker = await AWS.AmazonMQ.Broker("ReplicatedBroker", {
  BrokerName: "MyReplicatedBroker",
  EngineType: "ActiveMQ",
  EngineVersion: "5.15.14",
  HostInstanceType: "mq.t2.large",
  Users: [{
    Username: "replicaAdmin",
    Password: "securePassword123"
  }],
  PubliclyAccessible: false,
  DeploymentMode: "ACTIVE_PASSIVE",
  DataReplicationMode: "ACTIVE",
  DataReplicationPrimaryBrokerArn: "arn:aws:mq:us-east-1:123456789012:broker:MyPrimaryBroker:1-abcdefg",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Purpose", Value: "testing" }
  ]
});
```