---
title: Managing AWS CloudFront ContinuousDeploymentPolicys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront ContinuousDeploymentPolicys using Alchemy Cloud Control.
---

# ContinuousDeploymentPolicy

The ContinuousDeploymentPolicy resource lets you create and manage [AWS CloudFront ContinuousDeploymentPolicys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-continuousdeploymentpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const continuousdeploymentpolicy = await AWS.CloudFront.ContinuousDeploymentPolicy(
  "continuousdeploymentpolicy-example",
  { ContinuousDeploymentPolicyConfig: "example-continuousdeploymentpolicyconfig" }
);
```

