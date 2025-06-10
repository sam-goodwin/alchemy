---
title: Keyspace
description: Learn how to create, update, and manage AWS Cassandra Keyspaces using Alchemy Cloud Control.
---


The Keyspace resource lets you manage [AWS Cassandra Keyspaces](https://docs.aws.amazon.com/cassandra/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Cassandra Keyspace with a specified name and replication specification.

```ts
import AWS from "alchemy/aws/control";

const cassandraKeyspace = await AWS.Cassandra.Keyspace("myKeyspace", {
  keyspaceName: "my_cassandra_keyspace",
  replicationSpecification: {
    // Simple replication for single region
    className: "SimpleStrategy",
    replicationFactor: 1
  }
});
```

## Advanced Configuration

Configure a Cassandra Keyspace with client-side timestamps enabled and tags for better resource management.

```ts
const advancedKeyspace = await AWS.Cassandra.Keyspace("advancedKeyspace", {
  keyspaceName: "advanced_cassandra_keyspace",
  clientSideTimestampsEnabled: true,
  replicationSpecification: {
    className: "NetworkTopologyStrategy",
    datacenter1: 3 // 3 replicas in datacenter1
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "DataAnalytics" }
  ]
});
```

## Adoption of Existing Keyspace

If you want to adopt an existing Cassandra Keyspace instead of creating a new one, set the `adopt` property to true.

```ts
const existingKeyspace = await AWS.Cassandra.Keyspace("existingKeyspace", {
  keyspaceName: "existing_cassandra_keyspace",
  adopt: true // Adopt the existing keyspace
});
```

## Keyspace with Multiple Replication Factors

Create a Cassandra Keyspace with a more complex replication strategy across multiple data centers.

```ts
const multiDCKeyspace = await AWS.Cassandra.Keyspace("multiDCKeyspace", {
  keyspaceName: "multi_dc_cassandra_keyspace",
  replicationSpecification: {
    className: "NetworkTopologyStrategy",
    datacenter1: 2, // 2 replicas in datacenter1
    datacenter2: 3  // 3 replicas in datacenter2
  },
  tags: [
    { key: "Environment", value: "Staging" },
    { key: "Team", value: "DevOps" }
  ]
});
```
