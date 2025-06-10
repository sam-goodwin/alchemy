---
title: ReplicationConfig
description: Learn how to create, update, and manage AWS DMS ReplicationConfigs using Alchemy Cloud Control.
---


The ReplicationConfig resource allows you to manage [AWS DMS ReplicationConfigs](https://docs.aws.amazon.com/dms/latest/userguide/) for database migration tasks including configuration settings for replication tasks.

## Minimal Example

Create a basic DMS ReplicationConfig with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicReplicationConfig = await AWS.DMS.ReplicationConfig("basicReplication", {
  ReplicationConfigIdentifier: "basic-replication-config",
  ComputeConfig: {
    ComputeType: "dms.r5.large",
    MinCpus: 2,
    MaxCpus: 4
  },
  ReplicationType: "full-load",
  TableMappings: {
    rules: [
      {
        ruleType: "selection",
        rule: {
          table: "my_table"
        }
      }
    ]
  },
  SourceEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:source-endpoint",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:target-endpoint"
});
```

## Advanced Configuration

Configure a ReplicationConfig with additional settings such as replication settings and supplemental settings.

```ts
const advancedReplicationConfig = await AWS.DMS.ReplicationConfig("advancedReplication", {
  ReplicationConfigIdentifier: "advanced-replication-config",
  ComputeConfig: {
    ComputeType: "dms.r5.xlarge",
    MinCpus: 4,
    MaxCpus: 8
  },
  ReplicationType: "cdc",
  TableMappings: {
    rules: [
      {
        ruleType: "selection",
        rule: {
          table: "my_table",
          schema: "public"
        }
      }
    ]
  },
  SourceEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:source-endpoint",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:target-endpoint",
  ReplicationSettings: {
    "cdc": {
      "batchSize": 1000
    }
  },
  SupplementalSettings: {
    "targetTable": "target_table"
  }
});
```

## Using Tags for Resource Management

Create a ReplicationConfig with tags for better resource management.

```ts
const taggedReplicationConfig = await AWS.DMS.ReplicationConfig("taggedReplication", {
  ReplicationConfigIdentifier: "tagged-replication-config",
  ComputeConfig: {
    ComputeType: "dms.r5.large",
    MinCpus: 2,
    MaxCpus: 4
  },
  ReplicationType: "full-load",
  TableMappings: {
    rules: [
      {
        ruleType: "selection",
        rule: {
          table: "my_table"
        }
      }
    ]
  },
  SourceEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:source-endpoint",
  TargetEndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:target-endpoint",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DatabaseMigration" }
  ]
});
```
