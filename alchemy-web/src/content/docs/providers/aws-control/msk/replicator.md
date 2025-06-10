---
title: Replicator
description: Learn how to create, update, and manage AWS MSK Replicators using Alchemy Cloud Control.
---


The Replicator resource allows you to manage [AWS MSK Replicators](https://docs.aws.amazon.com/msk/latest/userguide/) for replicating data across Kafka clusters.

## Minimal Example

Create a basic MSK Replicator with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicReplicator = await AWS.MSK.Replicator("basicReplicator", {
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/msk-replicator-role",
  ReplicatorName: "basic-replicator",
  ReplicationInfoList: [{
    SourceClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/source-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-1",
    DestinationClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/destination-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-2"
  }],
  KafkaClusters: [{
    ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-3",
    VpcId: "vpc-0abcd1234ef56789"
  }],
  Description: "This is a basic replicator for demo purposes."
});
```

## Advanced Configuration

Configure an MSK Replicator with additional tags and multiple replication information entries.

```ts
const advancedReplicator = await AWS.MSK.Replicator("advancedReplicator", {
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/msk-replicator-role",
  ReplicatorName: "advanced-replicator",
  ReplicationInfoList: [
    {
      SourceClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/source-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-1",
      DestinationClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/destination-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-2"
    },
    {
      SourceClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/another-source-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-4",
      DestinationClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/another-destination-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-5"
    }
  ],
  KafkaClusters: [{
    ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-3",
    VpcId: "vpc-0abcd1234ef56789"
  }],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataReplication" }
  ]
});
```

## Adoption of Existing Resources

If you need to adopt an existing replicator, you can set the `adopt` property to `true`.

```ts
const adoptedReplicator = await AWS.MSK.Replicator("adoptedReplicator", {
  ServiceExecutionRoleArn: "arn:aws:iam::123456789012:role/msk-replicator-role",
  ReplicatorName: "adopted-replicator",
  ReplicationInfoList: [{
    SourceClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/existing-source-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-6",
    DestinationClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/existing-destination-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-7"
  }],
  KafkaClusters: [{
    ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/existing-cluster/abcdefg-1234-5678-90ab-cdef1234abcd-8",
    VpcId: "vpc-0abcd1234ef56789"
  }],
  adopt: true
});
```
