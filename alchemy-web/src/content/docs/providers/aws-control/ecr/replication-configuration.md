---
title: ReplicationConfiguration
description: Learn how to create, update, and manage AWS ECR ReplicationConfigurations using Alchemy Cloud Control.
---


The ReplicationConfiguration resource lets you manage [AWS ECR ReplicationConfigurations](https://docs.aws.amazon.com/ecr/latest/userguide/) for replicating images across AWS Regions.

## Minimal Example

Create a basic replication configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicReplicationConfig = await AWS.ECR.ReplicationConfiguration("basicReplicationConfig", {
  ReplicationConfiguration: {
    Rules: [
      {
        Destination: {
          Region: "us-west-2"
        },
        RepositoryFilters: [
          {
            Filter: "my-repo/*",
            FilterType: "PREFIX"
          }
        ]
      }
    ]
  }
});
```

## Advanced Configuration

Configure a replication setup with detailed rules and multiple destinations.

```ts
const advancedReplicationConfig = await AWS.ECR.ReplicationConfiguration("advancedReplicationConfig", {
  ReplicationConfiguration: {
    Rules: [
      {
        Destination: {
          Region: "us-east-1"
        },
        RepositoryFilters: [
          {
            Filter: "project-repo/*",
            FilterType: "PREFIX"
          }
        ]
      },
      {
        Destination: {
          Region: "eu-west-1"
        },
        RepositoryFilters: [
          {
            Filter: "another-repo/*",
            FilterType: "PREFIX"
          }
        ]
      }
    ]
  },
  adopt: true
});
```

## Example with IAM Policies

Set up a replication configuration with IAM policies to restrict access.

```ts
const policyReplicationConfig = await AWS.ECR.ReplicationConfiguration("policyReplicationConfig", {
  ReplicationConfiguration: {
    Rules: [
      {
        Destination: {
          Region: "ap-south-1"
        },
        RepositoryFilters: [
          {
            Filter: "secure-repo/*",
            FilterType: "PREFIX"
          }
        ]
      }
    ]
  },
  adopt: true
});

// Example IAM policy for ECR actions
const ecrPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetAuthorizationToken"
      ],
      Resource: "*"
    }
  ]
};
```

## Example with Multiple Regions

Set a replication configuration that replicates images to multiple AWS Regions.

```ts
const multiRegionReplicationConfig = await AWS.ECR.ReplicationConfiguration("multiRegionReplicationConfig", {
  ReplicationConfiguration: {
    Rules: [
      {
        Destination: {
          Region: "us-west-1"
        },
        RepositoryFilters: [
          {
            Filter: "multi-repo/*",
            FilterType: "PREFIX"
          }
        ]
      },
      {
        Destination: {
          Region: "eu-central-1"
        },
        RepositoryFilters: [
          {
            Filter: "multi-repo/*",
            FilterType: "PREFIX"
          }
        ]
      }
    ]
  }
});
```
