---
title: Managing AWS ECR PullThroughCacheRules with Alchemy
description: Learn how to create, update, and manage AWS ECR PullThroughCacheRules using Alchemy Cloud Control.
---

# PullThroughCacheRule

The PullThroughCacheRule resource lets you manage [AWS ECR PullThroughCacheRules](https://docs.aws.amazon.com/ecr/latest/userguide/) for caching images from an upstream registry. This feature helps optimize the retrieval of container images, reducing latency and improving performance.

## Minimal Example

Create a basic PullThroughCacheRule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicPullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("BasicPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry.example.com",
  EcrRepositoryPrefix: "my-app/"
});
```

## Advanced Configuration

Configure a PullThroughCacheRule with additional options, including a custom role and upstream repository prefix.

```ts
const AdvancedPullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("AdvancedPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry.example.com",
  EcrRepositoryPrefix: "my-app/",
  UpstreamRegistry: "my-upstream-registry",
  CustomRoleArn: "arn:aws:iam::123456789012:role/MyECRPullRole"
});
```

## Using Credentials for Upstream Access

Demonstrate how to configure a PullThroughCacheRule with credentials for accessing the upstream registry.

```ts
const SecurePullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("SecurePullThroughCacheRule", {
  UpstreamRegistryUrl: "https://secure-registry.example.com",
  EcrRepositoryPrefix: "my-secure-app/",
  CredentialArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:my-credentials"
});
```

## Adoption of Existing Rules

Show how to adopt an existing PullThroughCacheRule by setting the adopt property to true.

```ts
const AdoptExistingPullThroughCacheRule = await AWS.ECR.PullThroughCacheRule("AdoptExistingPullThroughCacheRule", {
  UpstreamRegistryUrl: "https://registry.example.com",
  EcrRepositoryPrefix: "my-app/",
  adopt: true
});
```