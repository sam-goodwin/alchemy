---
title: Managing AWS MSK BatchScramSecrets with Alchemy
description: Learn how to create, update, and manage AWS MSK BatchScramSecrets using Alchemy Cloud Control.
---

# BatchScramSecret

The BatchScramSecret resource allows you to manage AWS MSK Batch Scram Secrets effectively. This resource is essential for enabling secure communication in Amazon Managed Streaming for Apache Kafka (MSK) clusters. For more information, refer to the [AWS MSK BatchScramSecrets documentation](https://docs.aws.amazon.com/msk/latest/userguide/).

## Minimal Example

Create a basic BatchScramSecret with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const BasicBatchScramSecret = await AWS.MSK.BatchScramSecret("BasicBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/MyKafkaCluster/abcdef12-3456-7890-abcd-ef1234567890-1",
  SecretArnList: [
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret1",
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret2"
  ]
});
```

## Advanced Configuration

Configure a BatchScramSecret with the adoption feature enabled:

```ts
const AdvancedBatchScramSecret = await AWS.MSK.BatchScramSecret("AdvancedBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/MyKafkaCluster/abcdef12-3456-7890-abcd-ef1234567890-1",
  SecretArnList: [
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret1"
  ],
  adopt: true
});
```

## Using Multiple Secrets

Demonstrate how to manage multiple secrets for enhanced security:

```ts
const MultiSecretBatchScramSecret = await AWS.MSK.BatchScramSecret("MultiSecretBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/MyKafkaCluster/abcdef12-3456-7890-abcd-ef1234567890-1",
  SecretArnList: [
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret1",
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret2",
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret3"
  ]
});
```

This example illustrates the creation of a BatchScramSecret that utilizes multiple secret ARNs, which enhances the security posture of your Kafka cluster.