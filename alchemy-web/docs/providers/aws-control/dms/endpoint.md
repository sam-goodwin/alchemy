---
title: Managing AWS DMS Endpoints with Alchemy
description: Learn how to create, update, and manage AWS DMS Endpoints using Alchemy Cloud Control.
---

# Endpoint

The Endpoint resource lets you create and manage [AWS DMS Endpoints](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-endpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const endpoint = await AWS.DMS.Endpoint("endpoint-example", {
  EndpointType: "example-endpointtype",
  EngineName: "endpoint-engine",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a endpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEndpoint = await AWS.DMS.Endpoint("advanced-endpoint", {
  EndpointType: "example-endpointtype",
  EngineName: "endpoint-engine",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

