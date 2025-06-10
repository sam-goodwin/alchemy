---
title: Cluster
description: Learn how to create, update, and manage AWS MSK Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS MSK Clusters](https://docs.aws.amazon.com/msk/latest/userguide/) for running Apache Kafka in a fully managed environment.

## Minimal Example

Create a basic MSK Cluster with required properties and one optional property for logging:

```ts
import AWS from "alchemy/aws/control";

const kafkaCluster = await AWS.MSK.Cluster("basicKafkaCluster", {
  KafkaVersion: "2.8.0",
  NumberOfBrokerNodes: 3,
  BrokerNodeGroupInfo: {
    InstanceType: "kafka.m5.large",
    ClientSubnets: ["subnet-12345678", "subnet-87654321"],
    SecurityGroups: ["sg-0abcdef1234567890"]
  },
  LoggingInfo: {
    BrokerLogs: {
      CloudWatchLogs: {
        Enabled: true,
        LogGroup: "kafka-logs",
        LogStream: "broker-logs"
      }
    }
  }
});
```

## Advanced Configuration

Configure an MSK Cluster with encryption and enhanced monitoring settings:

```ts
const secureKafkaCluster = await AWS.MSK.Cluster("secureKafkaCluster", {
  KafkaVersion: "2.8.0",
  NumberOfBrokerNodes: 3,
  BrokerNodeGroupInfo: {
    InstanceType: "kafka.m5.large",
    ClientSubnets: ["subnet-12345678", "subnet-87654321"],
    SecurityGroups: ["sg-0abcdef1234567890"]
  },
  EncryptionInfo: {
    EncryptionAtRest: {
      DataVolumeKmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
    }
  },
  EnhancedMonitoring: "PER_TOPIC_PER_BROKER"
});
```

## Custom Configuration with Client Authentication

Create an MSK Cluster with client authentication and configuration settings:

```ts
const authenticatedKafkaCluster = await AWS.MSK.Cluster("authenticatedKafkaCluster", {
  KafkaVersion: "2.8.0",
  NumberOfBrokerNodes: 3,
  BrokerNodeGroupInfo: {
    InstanceType: "kafka.m5.large",
    ClientSubnets: ["subnet-12345678", "subnet-87654321"],
    SecurityGroups: ["sg-0abcdef1234567890"]
  },
  ClientAuthentication: {
    Sasl: {
      Scram: {
        Enabled: true
      }
    },
    Tls: {
      Enabled: true
    }
  },
  ConfigurationInfo: {
    Arn: "arn:aws:msk:us-west-2:123456789012:configuration/my-configuration",
    Revision: 1
  }
});
```

## Tags for Resource Management

Create an MSK Cluster with tags for better resource management:

```ts
const taggedKafkaCluster = await AWS.MSK.Cluster("taggedKafkaCluster", {
  KafkaVersion: "2.8.0",
  NumberOfBrokerNodes: 3,
  BrokerNodeGroupInfo: {
    InstanceType: "kafka.m5.large",
    ClientSubnets: ["subnet-12345678", "subnet-87654321"],
    SecurityGroups: ["sg-0abcdef1234567890"]
  },
  Tags: {
    Environment: "Production",
    Project: "KafkaService"
  }
});
```
