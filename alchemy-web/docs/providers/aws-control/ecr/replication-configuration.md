---
title: Managing AWS ECR ReplicationConfigurations with Alchemy
description: Learn how to create, update, and manage AWS ECR ReplicationConfigurations using Alchemy Cloud Control.
---

# ReplicationConfiguration

The ReplicationConfiguration resource lets you create and manage [AWS ECR ReplicationConfigurations](https://docs.aws.amazon.com/ecr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-replicationconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const replicationconfiguration = await AWS.ECR.ReplicationConfiguration(
  "replicationconfiguration-example",
  { ReplicationConfiguration: "example-replicationconfiguration" }
);
```

