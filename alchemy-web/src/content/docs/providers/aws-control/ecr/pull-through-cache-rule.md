---
title: PullThroughCacheRule
description: Learn how to create, update, and manage AWS ECR PullThroughCacheRules using Alchemy Cloud Control.
---


The PullThroughCacheRule resource allows you to manage [AWS ECR PullThroughCacheRules](https://docs.aws.amazon.com/ecr/latest/userguide/) which enable you to cache images from an upstream registry in your Amazon Elastic Container Registry (ECR).

## Minimal Example

Create a basic PullThroughCacheRule with required properties to cache images from an upstream registry.

```ts
import AWS from "alchemy/aws/control";

const pullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("myPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry-1.example.com",
  UpstreamRepositoryPrefix: "myapp",
  EcrRepositoryPrefix: "myapp-cache"
});
```

## Advanced Configuration

Configure a PullThroughCacheRule with a custom role ARN and credentials for accessing the upstream registry.

```ts
const advancedPullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("advancedPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry-2.example.com",
  UpstreamRepositoryPrefix: "myapp",
  EcrRepositoryPrefix: "myapp-cache",
  CustomRoleArn: "arn:aws:iam::123456789012:role/MyCustomRole",
  CredentialArn: "arn:aws:iam::123456789012:role/MyCredentials"
});
```

## Adoption of Existing Resources

Use the adopt feature to avoid failure if a PullThroughCacheRule already exists.

```ts
const adoptedPullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("adoptedPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry-3.example.com",
  UpstreamRepositoryPrefix: "myapp",
  EcrRepositoryPrefix: "myapp-cache",
  adopt: true
});
```
