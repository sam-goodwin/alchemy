---
title: Managing AWS KafkaConnect Connectors with Alchemy
description: Learn how to create, update, and manage AWS KafkaConnect Connectors using Alchemy Cloud Control.
---

# Connector

The Connector resource lets you create and manage [AWS KafkaConnect Connectors](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kafkaconnect-connector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connector = await AWS.KafkaConnect.Connector("connector-example", {
  KafkaCluster: "example-kafkacluster",
  KafkaConnectVersion: "example-kafkaconnectversion",
  ConnectorConfiguration: {},
  Capacity: "example-capacity",
  KafkaClusterEncryptionInTransit: "example-kafkaclusterencryptionintransit",
  KafkaClusterClientAuthentication: "example-kafkaclusterclientauthentication",
  ConnectorName: "connector-connector",
  ServiceExecutionRoleArn: "example-serviceexecutionrolearn",
  Plugins: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnector = await AWS.KafkaConnect.Connector("advanced-connector", {
  KafkaCluster: "example-kafkacluster",
  KafkaConnectVersion: "example-kafkaconnectversion",
  ConnectorConfiguration: {},
  Capacity: "example-capacity",
  KafkaClusterEncryptionInTransit: "example-kafkaclusterencryptionintransit",
  KafkaClusterClientAuthentication: "example-kafkaclusterclientauthentication",
  ConnectorName: "connector-connector",
  ServiceExecutionRoleArn: "example-serviceexecutionrolearn",
  Plugins: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

