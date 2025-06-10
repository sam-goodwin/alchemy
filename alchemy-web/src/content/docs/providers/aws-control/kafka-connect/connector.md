---
title: Connector
description: Learn how to create, update, and manage AWS KafkaConnect Connectors using Alchemy Cloud Control.
---


The Connector resource lets you manage [AWS KafkaConnect Connectors](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic KafkaConnect Connector with required properties and one optional configuration.

```ts
import AWS from "alchemy/aws/control";

const basicConnector = await AWS.KafkaConnect.Connector("basicConnector", {
  KafkaCluster: {
    BootstrapServers: "b-1.example-cluster.kafka.us-east-1.amazonaws.com:9092",
    Vpc: {
      SecurityGroups: ["sg-12345678"],
      Subnets: ["subnet-12345678", "subnet-87654321"]
    }
  },
  KafkaConnectVersion: "1.0.0",
  ConnectorConfiguration: {
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
  },
  Capacity: {
    AutoScaling: {
      minWorkerCount: 1,
      maxWorkerCount: 5
    },
    ProvisionedCapacity: {
      workerCount: 2,
      workerSize: "small"
    }
  },
  KafkaClusterEncryptionInTransit: {
    InClusterEncryption: true
  },
  KafkaClusterClientAuthentication: {
    AuthenticationType: "IAM"
  },
  ConnectorName: "basic-connector",
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MyKafkaConnectRole"
});
```

## Advanced Configuration

Configure a KafkaConnect Connector with detailed logging and worker settings.

```ts
const advancedConnector = await AWS.KafkaConnect.Connector("advancedConnector", {
  KafkaCluster: {
    BootstrapServers: "b-2.example-cluster.kafka.us-east-1.amazonaws.com:9092",
    Vpc: {
      SecurityGroups: ["sg-23456789"],
      Subnets: ["subnet-23456789", "subnet-98765432"]
    }
  },
  KafkaConnectVersion: "1.1.0",
  ConnectorConfiguration: {
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "tasks.max": "1"
  },
  LogDelivery: {
    CloudWatchLogs: {
      Enabled: true,
      LogGroup: "kafkaconnect-logs",
      LogStream: "connector-advanced"
    }
  },
  WorkerConfiguration: {
    WorkerCount: 3,
    WorkerSize: "medium"
  },
  Capacity: {
    AutoScaling: {
      minWorkerCount: 1,
      maxWorkerCount: 10
    }
  },
  KafkaClusterEncryptionInTransit: {
    InClusterEncryption: true
  },
  KafkaClusterClientAuthentication: {
    AuthenticationType: "IAM"
  },
  ConnectorName: "advanced-connector",
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MyAdvancedKafkaConnectRole"
});
```

## Custom Plugin Example

Demonstrate using custom plugins in a KafkaConnect Connector setup.

```ts
const pluginConnector = await AWS.KafkaConnect.Connector("pluginConnector", {
  KafkaCluster: {
    BootstrapServers: "b-3.example-cluster.kafka.us-east-1.amazonaws.com:9092",
    Vpc: {
      SecurityGroups: ["sg-34567890"],
      Subnets: ["subnet-34567890", "subnet-87654321"]
    }
  },
  KafkaConnectVersion: "1.2.0",
  ConnectorConfiguration: {
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
  },
  Plugins: [
    {
      Name: "my-custom-plugin",
      Description: "This is a custom plugin for data transformation."
    }
  ],
  Capacity: {
    AutoScaling: {
      minWorkerCount: 1,
      maxWorkerCount: 4
    }
  },
  KafkaClusterEncryptionInTransit: {
    InClusterEncryption: true
  },
  KafkaClusterClientAuthentication: {
    AuthenticationType: "IAM"
  },
  ConnectorName: "plugin-connector",
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/MyPluginKafkaConnectRole"
});
```
