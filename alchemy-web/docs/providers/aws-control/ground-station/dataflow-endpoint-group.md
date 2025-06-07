---
title: Managing AWS GroundStation DataflowEndpointGroups with Alchemy
description: Learn how to create, update, and manage AWS GroundStation DataflowEndpointGroups using Alchemy Cloud Control.
---

# DataflowEndpointGroup

The DataflowEndpointGroup resource lets you create and manage [AWS GroundStation DataflowEndpointGroups](https://docs.aws.amazon.com/groundstation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-dataflowendpointgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataflowendpointgroup = await AWS.GroundStation.DataflowEndpointGroup(
  "dataflowendpointgroup-example",
  { EndpointDetails: [], Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a dataflowendpointgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataflowEndpointGroup = await AWS.GroundStation.DataflowEndpointGroup(
  "advanced-dataflowendpointgroup",
  {
    EndpointDetails: [],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

