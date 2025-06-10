---
title: FargateProfile
description: Learn how to create, update, and manage AWS EKS FargateProfiles using Alchemy Cloud Control.
---


The FargateProfile resource allows you to manage [AWS EKS FargateProfiles](https://docs.aws.amazon.com/eks/latest/userguide/) for running your Kubernetes pods on AWS Fargate, enabling serverless compute for containers.

## Minimal Example

Create a basic FargateProfile with required properties and one optional subnet configuration.

```ts
import AWS from "alchemy/aws/control";

const fargateProfile = await AWS.EKS.FargateProfile("defaultFargateProfile", {
  clusterName: "myEKSCluster",
  podExecutionRoleArn: "arn:aws:iam::123456789012:role/myPodExecutionRole",
  selectors: [
    {
      namespace: "default"
    }
  ],
  subnets: [
    "10.0.0.0/24",
    "10.0.1.0/24"
  ]
});
```

## Advanced Configuration

Configure a FargateProfile with multiple selectors and additional tags for better management.

```ts
const advancedFargateProfile = await AWS.EKS.FargateProfile("advancedFargateProfile", {
  clusterName: "myAdvancedEKSCluster",
  podExecutionRoleArn: "arn:aws:iam::123456789012:role/myAdvancedPodExecutionRole",
  selectors: [
    {
      namespace: "frontend",
      labels: {
        app: "web"
      }
    },
    {
      namespace: "backend",
      labels: {
        app: "api"
      }
    }
  ],
  subnets: [
    "10.0.2.0/24",
    "10.0.3.0/24"
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Team",
      value: "DevOps"
    }
  ]
});
```

## Custom Execution Role

Define a custom pod execution role with specific IAM policies for enhanced security.

```ts
const customExecutionRole = await AWS.IAM.Role("customPodExecutionRole", {
  assumeRolePolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "eks-fargate-pods.amazonaws.com"
        },
        Action: "sts:AssumeRole"
      }
    ]
  }),
  policies: [
    {
      policyName: "FargatePodPolicy",
      policyDocument: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: [
              "logs:CreateLogStream",
              "logs:PutLogEvents",
              "ecr:GetAuthorizationToken",
              "ecr:BatchGetImage",
              "ecr:BatchCheckLayerAvailability"
            ],
            Resource: "*"
          }
        ]
      })
    }
  ]
});
```

This role can then be used in your FargateProfile like so:

```ts
const fargateProfileWithCustomRole = await AWS.EKS.FargateProfile("fargateProfileWithCustomRole", {
  clusterName: "myEKSClusterWithCustomRole",
  podExecutionRoleArn: customExecutionRole.arn,
  selectors: [
    {
      namespace: "default"
    }
  ],
  subnets: [
    "10.0.4.0/24",
    "10.0.5.0/24"
  ]
});
```
