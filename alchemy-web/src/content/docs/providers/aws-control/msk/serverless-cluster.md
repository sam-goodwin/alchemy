---
title: ServerlessCluster
description: Learn how to create, update, and manage AWS MSK ServerlessClusters using Alchemy Cloud Control.
---


The ServerlessCluster resource lets you manage [AWS MSK ServerlessClusters](https://docs.aws.amazon.com/msk/latest/userguide/) for running Apache Kafka without needing to provision or manage servers.

## Minimal Example

Create a basic ServerlessCluster with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const basicCluster = await AWS.MSK.ServerlessCluster("basic-cluster", {
  ClusterName: "MyKafkaCluster",
  VpcConfigs: [{
    SubnetId: "subnet-0bb1c79de3EXAMPLE",
    SecurityGroupId: "sg-0c1e2e3d4f5e6g7h8"
  }],
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
  Tags: {
    Environment: "Development",
    Project: "KafkaProject"
  }
});
```

## Advanced Configuration

Configure a ServerlessCluster with additional authentication and multiple VPC configurations.

```ts
const advancedCluster = await AWS.MSK.ServerlessCluster("advanced-cluster", {
  ClusterName: "AdvancedKafkaCluster",
  VpcConfigs: [
    {
      SubnetId: "subnet-0123456789abcdef0",
      SecurityGroupId: "sg-0abcdef1234567890"
    },
    {
      SubnetId: "subnet-0abcdef1234567891",
      SecurityGroupId: "sg-0abcdef1234567891"
    }
  ],
  ClientAuthentication: {
    Sasl: {
      Scram: {
        Enabled: true
      },
      Iam: {
        Enabled: true
      }
    },
    Tls: {
      Enabled: true
    }
  },
  Tags: {
    Environment: "Production",
    Project: "KafkaProject"
  }
});
```

## Using Existing Resources

Create a ServerlessCluster while adopting existing resources, preventing failure if they already exist.

```ts
const existingCluster = await AWS.MSK.ServerlessCluster("existing-cluster", {
  ClusterName: "ExistingKafkaCluster",
  VpcConfigs: [{
    SubnetId: "subnet-0abcdef1234567892",
    SecurityGroupId: "sg-0abcdef1234567892"
  }],
  ClientAuthentication: {
    Sasl: {
      Scram: {
        Enabled: false
      }
    },
    Tls: {
      Enabled: false
    }
  },
  adopt: true // Adopt existing resource if it already exists
});
```
