---
title: Managing AWS SageMaker Endpoints with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Endpoints using Alchemy Cloud Control.
---

# Endpoint

The Endpoint resource lets you create and manage [AWS SageMaker Endpoints](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const endpoint = await AWS.SageMaker.Endpoint("endpoint-example", {
  EndpointConfigName: "endpoint-endpointconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a endpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEndpoint = await AWS.SageMaker.Endpoint("advanced-endpoint", {
  EndpointConfigName: "endpoint-endpointconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

