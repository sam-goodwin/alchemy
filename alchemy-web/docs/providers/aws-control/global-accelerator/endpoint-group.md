---
title: Managing AWS GlobalAccelerator EndpointGroups with Alchemy
description: Learn how to create, update, and manage AWS GlobalAccelerator EndpointGroups using Alchemy Cloud Control.
---

# EndpointGroup

The EndpointGroup resource lets you manage [AWS GlobalAccelerator EndpointGroups](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) that define the endpoints to which traffic is directed by an AWS Global Accelerator.

## Minimal Example

Create a basic EndpointGroup with required properties and common optional settings:

```ts
import AWS from "alchemy/aws/control";

const BasicEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("BasicEndpointGroup", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234",
  EndpointGroupRegion: "us-west-2",
  HealthCheckIntervalSeconds: 30,
  TrafficDialPercentage: 100
});
```

## Advanced Configuration

Configure an EndpointGroup with advanced options such as health checks and endpoint configurations:

```ts
const AdvancedEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("AdvancedEndpointGroup", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234",
  EndpointGroupRegion: "us-east-1",
  HealthCheckIntervalSeconds: 10,
  HealthCheckPath: "/health",
  HealthCheckProtocol: "HTTP",
  HealthCheckPort: 80,
  EndpointConfigurations: [
    {
      EndpointId: "i-0abcd1234efgh5678", // Example EC2 instance ID
      Weight: 128
    },
    {
      EndpointId: "i-1ijkl9012mnop3456", // Another EC2 instance ID
      Weight: 64
    }
  ]
});
```

## Traffic Management

Define an EndpointGroup that manages traffic distribution across multiple endpoints:

```ts
const TrafficManagedEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("TrafficManagedEndpointGroup", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234",
  EndpointGroupRegion: "eu-central-1",
  TrafficDialPercentage: 75,
  EndpointConfigurations: [
    {
      EndpointId: "i-2qrst7890uvwx1234", // A different EC2 instance ID
      Weight: 200
    },
    {
      EndpointId: "i-3yzab4567cdef8901", // Yet another EC2 instance ID
      Weight: 100
    }
  ]
});
```

## Health Check Configuration

Set up an EndpointGroup with specific health check configurations to ensure endpoint availability:

```ts
const HealthCheckConfiguredEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("HealthCheckConfiguredEndpointGroup", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234",
  EndpointGroupRegion: "ap-southeast-1",
  HealthCheckIntervalSeconds: 15,
  HealthCheckPath: "/status",
  HealthCheckProtocol: "HTTPS",
  HealthCheckPort: 443,
  ThresholdCount: 3,
  EndpointConfigurations: [
    {
      EndpointId: "i-4ghijklmnopq1234", // Another EC2 instance ID
      Weight: 150
    }
  ]
});
```