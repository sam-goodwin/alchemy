---
title: BatchScramSecret
description: Learn how to create, update, and manage AWS MSK BatchScramSecrets using Alchemy Cloud Control.
---


The BatchScramSecret resource allows you to manage [AWS MSK BatchScramSecrets](https://docs.aws.amazon.com/msk/latest/userguide/) which are used for SCRAM authentication in Amazon MSK clusters.

## Minimal Example

Create a basic BatchScramSecret associated with an MSK cluster.

```ts
import AWS from "alchemy/aws/control";

const batchScramSecret = await AWS.MSK.BatchScramSecret("myBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/my-cluster/abcd1234-efgh-5678-ijkl-90mnopqrst",
  SecretArnList: [
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret1",
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret2"
  ],
  adopt: true // Allows adoption of existing resources
});
```

## Advanced Configuration

Configure a BatchScramSecret with additional properties for existing resources.

```ts
const existingBatchScramSecret = await AWS.MSK.BatchScramSecret("existingBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/my-cluster/abcd1234-efgh-5678-ijkl-90mnopqrst",
  SecretArnList: [
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret3",
    "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret4"
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## BatchScramSecret with Only Required Properties

Create a BatchScramSecret using only the required properties.

```ts
const minimalBatchScramSecret = await AWS.MSK.BatchScramSecret("minimalBatchScramSecret", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/my-cluster/abcd1234-efgh-5678-ijkl-90mnopqrst"
});
```

## BatchScramSecret for Multiple Clusters

Create separate BatchScramSecrets for multiple MSK clusters by using different configurations.

```ts
const batchScramSecretForClusterA = await AWS.MSK.BatchScramSecret("batchScramSecretA", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/my-cluster-a/abcd1234-efgh-5678-ijkl-90mnopqrst",
  SecretArnList: ["arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecretA"]
});

const batchScramSecretForClusterB = await AWS.MSK.BatchScramSecret("batchScramSecretB", {
  ClusterArn: "arn:aws:kafka:us-west-2:123456789012:cluster/my-cluster-b/abcd1234-efgh-5678-ijkl-90mnopqrst",
  SecretArnList: ["arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecretB"]
});
```
