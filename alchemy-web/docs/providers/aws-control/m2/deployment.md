---
title: Managing AWS M2 Deployments with Alchemy
description: Learn how to create, update, and manage AWS M2 Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource lets you create and manage [AWS M2 Deployments](https://docs.aws.amazon.com/m2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-m2-deployment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deployment = await AWS.M2.Deployment("deployment-example", {
  EnvironmentId: "example-environmentid",
  ApplicationVersion: 1,
  ApplicationId: "example-applicationid",
});
```

