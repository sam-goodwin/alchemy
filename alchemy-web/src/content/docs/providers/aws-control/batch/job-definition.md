---
title: JobDefinition
description: Learn how to create, update, and manage AWS Batch JobDefinitions using Alchemy Cloud Control.
---


The JobDefinition resource allows you to define and manage [AWS Batch JobDefinitions](https://docs.aws.amazon.com/batch/latest/userguide/) for running batch jobs in the cloud.

## Minimal Example

Create a basic JobDefinition with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicJobDefinition = await AWS.Batch.JobDefinition("basicJobDefinition", {
  type: "container",
  containerProperties: {
    image: "my-docker-image:latest",
    vcpus: 2,
    memory: 4096,
    command: ["python", "script.py"],
    jobRoleArn: "arn:aws:iam::123456789012:role/myJobRole"
  },
  retryStrategy: {
    attempts: 3
  }
});
```

## Advanced Configuration

Configure a JobDefinition with additional properties such as timeout and scheduling priority:

```ts
const advancedJobDefinition = await AWS.Batch.JobDefinition("advancedJobDefinition", {
  type: "container",
  containerProperties: {
    image: "my-docker-image:latest",
    vcpus: 4,
    memory: 8192,
    command: ["python", "advanced_script.py"],
    jobRoleArn: "arn:aws:iam::123456789012:role/myAdvancedJobRole"
  },
  timeout: {
    attemptDurationSeconds: 3600
  },
  schedulingPriority: 1,
  tags: {
    Environment: "Production",
    Department: "DataProcessing"
  }
});
```

## Using EKS Properties

Define a JobDefinition that utilizes EKS properties for Kubernetes compatibility:

```ts
const eksJobDefinition = await AWS.Batch.JobDefinition("eksJobDefinition", {
  type: "container",
  eksProperties: {
    podProperties: {
      serviceAccountName: "my-service-account",
      networkConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: ["subnet-abcde123"],
        securityGroups: ["sg-12345678"]
      }
    }
  },
  containerProperties: {
    image: "my-eks-docker-image:latest",
    vcpus: 2,
    memory: 2048,
    command: ["./run_eks_task.sh"]
  }
});
```

## Propagating Tags

Create a JobDefinition that propagates tags to associated resources:

```ts
const taggedJobDefinition = await AWS.Batch.JobDefinition("taggedJobDefinition", {
  type: "container",
  containerProperties: {
    image: "my-tagged-image:latest",
    vcpus: 2,
    memory: 2048,
    command: ["./run_tagged_task.sh"],
    jobRoleArn: "arn:aws:iam::123456789012:role/myTaggedJobRole"
  },
  propagateTags: true,
  tags: {
    Project: "BatchProcessing",
    Owner: "TeamAlpha"
  }
});
```
