---
title: Managing AWS ECR RegistryPolicys with Alchemy
description: Learn how to create, update, and manage AWS ECR RegistryPolicys using Alchemy Cloud Control.
---

# RegistryPolicy

The RegistryPolicy resource lets you create and manage [AWS ECR RegistryPolicys](https://docs.aws.amazon.com/ecr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-registrypolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const registrypolicy = await AWS.ECR.RegistryPolicy("registrypolicy-example", { PolicyText: {} });
```

