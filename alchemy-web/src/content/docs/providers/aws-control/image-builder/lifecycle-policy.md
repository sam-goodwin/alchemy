---
title: LifecyclePolicy
description: Learn how to create, update, and manage AWS ImageBuilder LifecyclePolicys using Alchemy Cloud Control.
---


The LifecyclePolicy resource lets you manage the lifecycle policies for AWS ImageBuilder, automating the creation, retention, and deletion of Amazon Machine Images (AMIs). For more detailed information, refer to the [AWS ImageBuilder LifecyclePolicys documentation](https://docs.aws.amazon.com/imagebuilder/latest/userguide/).

## Minimal Example

Create a basic lifecycle policy with required properties and one optional status.

```ts
import AWS from "alchemy/aws/control";

const lifecyclePolicy = await AWS.ImageBuilder.LifecyclePolicy("basicLifecyclePolicy", {
  resourceType: "image",
  policyDetails: [
    {
      policy: [
        {
          action: "retain",
          imageDigest: "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          description: "Retain the latest image"
        }
      ]
    }
  ],
  executionRole: "arn:aws:iam::123456789012:role/ImageBuilder-Execution-Role",
  resourceSelection: {
    resourceType: "image",
    tags: {
      Environment: "production"
    }
  },
  name: "BasicLifecyclePolicy"
});
```

## Advanced Configuration

Configure a lifecycle policy with detailed policy settings and custom tags.

```ts
const advancedLifecyclePolicy = await AWS.ImageBuilder.LifecyclePolicy("advancedLifecyclePolicy", {
  resourceType: "image",
  policyDetails: [
    {
      policy: [
        {
          action: "expire",
          imageDigest: "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          description: "Expire images older than 30 days"
        },
        {
          action: "retain",
          imageDigest: "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          description: "Retain the latest image"
        }
      ]
    }
  ],
  executionRole: "arn:aws:iam::123456789012:role/ImageBuilder-Execution-Role",
  resourceSelection: {
    resourceType: "image",
    tags: {
      Environment: "testing"
    }
  },
  tags: {
    Project: "ImageBuilder",
    Owner: "dev-team"
  },
  status: "ENABLED",
  name: "AdvancedLifecyclePolicy"
});
```

## Resource Adoption

Create a policy that adopts an existing resource if it already exists.

```ts
const adoptLifecyclePolicy = await AWS.ImageBuilder.LifecyclePolicy("adoptLifecyclePolicy", {
  resourceType: "image",
  policyDetails: [
    {
      policy: [
        {
          action: "retain",
          imageDigest: "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          description: "Retain the latest image"
        }
      ]
    }
  ],
  executionRole: "arn:aws:iam::123456789012:role/ImageBuilder-Execution-Role",
  resourceSelection: {
    resourceType: "image",
    tags: {
      Environment: "development"
    }
  },
  name: "AdoptLifecyclePolicy",
  adopt: true
});
```
