---
title: TrafficMirrorFilter
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorFilters using Alchemy Cloud Control.
---


The TrafficMirrorFilter resource lets you manage [AWS EC2 TrafficMirrorFilters](https://docs.aws.amazon.com/ec2/latest/userguide/) to define how network traffic is mirrored for analysis and monitoring.

## Minimal Example

Create a basic TrafficMirrorFilter with a description and a tag.

```ts
import AWS from "alchemy/aws/control";

const basicFilter = await AWS.EC2.TrafficMirrorFilter("basicTrafficMirrorFilter", {
  Description: "Basic Traffic Mirror Filter for monitoring",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a TrafficMirrorFilter with network services and additional tags for more specific traffic mirroring behavior.

```ts
const advancedFilter = await AWS.EC2.TrafficMirrorFilter("advancedTrafficMirrorFilter", {
  Description: "Advanced Traffic Mirror Filter for complex routing",
  NetworkServices: ["AMAZON_DNS"],
  Tags: [
    {
      Key: "Project",
      Value: "TrafficMonitoring"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ]
});
```

## Multiple Network Services

Create a TrafficMirrorFilter that uses multiple network services for comprehensive traffic analysis.

```ts
const multiServiceFilter = await AWS.EC2.TrafficMirrorFilter("multiServiceTrafficMirrorFilter", {
  Description: "Traffic Mirror Filter for multiple services",
  NetworkServices: ["AMAZON_DNS", "S3"],
  Tags: [
    {
      Key: "Purpose",
      Value: "Traffic Analysis"
    }
  ]
});
```

## Adoption of Existing Resources

Create a TrafficMirrorFilter while adopting an existing resource if it already exists, preventing failure.

```ts
const adoptedFilter = await AWS.EC2.TrafficMirrorFilter("adoptedTrafficMirrorFilter", {
  Description: "Adopt existing Traffic Mirror Filter",
  adopt: true,
  Tags: [
    {
      Key: "Status",
      Value: "Adopted"
    }
  ]
});
```
