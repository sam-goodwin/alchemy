---
title: ResiliencyPolicy
description: Learn how to create, update, and manage AWS ResilienceHub ResiliencyPolicys using Alchemy Cloud Control.
---


The ResiliencyPolicy resource enables you to define and manage [AWS ResilienceHub ResiliencyPolicys](https://docs.aws.amazon.com/resiliencehub/latest/userguide/) that govern the resiliency and recovery strategies for your applications.

## Minimal Example

Create a basic resiliency policy with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicResiliencyPolicy = await AWS.ResilienceHub.ResiliencyPolicy("basicResiliencyPolicy", {
  Policy: {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "resiliencehub:CreateResiliencyPolicy",
        "Resource": "*"
      }
    ]
  },
  PolicyDescription: "Basic resiliency policy for critical applications.",
  Tier: "MissionCritical",
  PolicyName: "BasicPolicy"
});
```

## Advanced Configuration

Configure a resiliency policy with additional options, including data location constraints and tags:

```ts
const advancedResiliencyPolicy = await AWS.ResilienceHub.ResiliencyPolicy("advancedResiliencyPolicy", {
  Policy: {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "resiliencehub:UpdateResiliencyPolicy",
        "Resource": "*"
      }
    ]
  },
  PolicyDescription: "Advanced resiliency policy for multi-region applications.",
  Tier: "Critical",
  PolicyName: "AdvancedPolicy",
  DataLocationConstraint: "us-west-2",
  Tags: {
    Project: "ResilienceProject",
    Environment: "Production"
  }
});
```

## Example with Adoption of Existing Resources

Create a resiliency policy while adopting existing resources instead of failing if they already exist:

```ts
const adoptResiliencyPolicy = await AWS.ResilienceHub.ResiliencyPolicy("adoptResiliencyPolicy", {
  Policy: {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "resiliencehub:DeleteResiliencyPolicy",
        "Resource": "*"
      }
    ]
  },
  PolicyDescription: "Policy that adopts existing resources.",
  Tier: "HighAvailability",
  PolicyName: "AdoptExistingPolicy",
  adopt: true
});
```
