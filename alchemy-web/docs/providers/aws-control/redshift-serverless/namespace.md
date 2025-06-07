---
title: Managing AWS RedshiftServerless Namespaces with Alchemy
description: Learn how to create, update, and manage AWS RedshiftServerless Namespaces using Alchemy Cloud Control.
---

# Namespace

The Namespace resource lets you create and manage [AWS RedshiftServerless Namespaces](https://docs.aws.amazon.com/redshiftserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-namespace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const namespace = await AWS.RedshiftServerless.Namespace("namespace-example", {
  NamespaceName: "namespace-spacename",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a namespace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNamespace = await AWS.RedshiftServerless.Namespace("advanced-namespace", {
  NamespaceName: "namespace-spacename",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

