---
title: Service
description: Learn how to create, update, and manage AWS AppRunner Services using Alchemy Cloud Control.
---


The Service resource lets you manage [AWS AppRunner Services](https://docs.aws.amazon.com/apprunner/latest/userguide/) for deploying and running web applications and APIs at scale.

## Minimal Example

Create a basic AppRunner service with default configurations and a simple source from a container image.

```ts
import AWS from "alchemy/aws/control";

const minimalService = await AWS.AppRunner.Service("minimalService", {
  SourceConfiguration: {
    ImageRepository: {
      ImageIdentifier: "my-repo/my-app:latest",
      ImageRepositoryType: "ECR"
    }
  }
});
```

## Advanced Configuration

Configure an AppRunner service with advanced settings such as health check and instance configuration.

```ts
const advancedService = await AWS.AppRunner.Service("advancedService", {
  SourceConfiguration: {
    ImageRepository: {
      ImageIdentifier: "my-repo/my-app:latest",
      ImageRepositoryType: "ECR"
    }
  },
  HealthCheckConfiguration: {
    HealthyThreshold: 3,
    Interval: 10,
    Path: "/health",
    Timeout: 5,
    UnhealthyThreshold: 2
  },
  InstanceConfiguration: {
    Cpu: "1 vCPU",
    Memory: "2 GB"
  }
});
```

## Adding Encryption Configuration

Set up an AppRunner service with encryption for sensitive data.

```ts
const secureService = await AWS.AppRunner.Service("secureService", {
  SourceConfiguration: {
    ImageRepository: {
      ImageIdentifier: "my-repo/my-app:latest",
      ImageRepositoryType: "ECR"
    }
  },
  EncryptionConfiguration: {
    KmsKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-123456789012"
  }
});
```

## Tagging Resources

Create an AppRunner service with tags for better resource management.

```ts
const taggedService = await AWS.AppRunner.Service("taggedService", {
  SourceConfiguration: {
    ImageRepository: {
      ImageIdentifier: "my-repo/my-app:latest",
      ImageRepositoryType: "ECR"
    }
  },
  Tags: [
    { Key: "Project", Value: "MyApp" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Network Configuration

Deploy an AppRunner service with a specific network configuration.

```ts
const networkConfiguredService = await AWS.AppRunner.Service("networkConfiguredService", {
  SourceConfiguration: {
    ImageRepository: {
      ImageIdentifier: "my-repo/my-app:latest",
      ImageRepositoryType: "ECR"
    }
  },
  NetworkConfiguration: {
    EgressConfiguration: {
      EgressType: "VPC",
      VpcConnectorArn: "arn:aws:apprunner:us-west-2:123456789012:vpc-connector/my-vpc-connector"
    }
  }
});
```
