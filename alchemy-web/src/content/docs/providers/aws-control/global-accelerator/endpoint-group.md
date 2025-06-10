---
title: EndpointGroup
description: Learn how to create, update, and manage AWS GlobalAccelerator EndpointGroups using Alchemy Cloud Control.
---


The EndpointGroup resource lets you manage [AWS GlobalAccelerator EndpointGroups](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) that improve the availability and performance of your applications by directing traffic to optimal endpoints.

## Minimal Example

Create a basic EndpointGroup with required properties and a common optional property for health checks.

```ts
import AWS from "alchemy/aws/control";

const basicEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("basic-endpoint-group", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234-5678-90ab-cdef-1234567890ab",
  EndpointGroupRegion: "us-east-1",
  HealthCheckIntervalSeconds: 30
});
```

## Advanced Configuration

Configure an EndpointGroup with additional options such as traffic dial percentage and health check settings.

```ts
const advancedEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("advanced-endpoint-group", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234-5678-90ab-cdef-1234567890ab",
  EndpointGroupRegion: "us-west-2",
  HealthCheckIntervalSeconds: 20,
  TrafficDialPercentage: 75,
  HealthCheckPath: "/health",
  HealthCheckProtocol: "HTTP",
  HealthCheckPort: 80,
  ThresholdCount: 3
});
```

## Adding Endpoint Configurations

Manage a group of endpoints by specifying configurations for each endpoint.

```ts
const endpointConfigurations = [
  {
    EndpointId: "i-0abcd1234efgh5678", // EC2 instance ID
    Weight: 100
  },
  {
    EndpointId: "i-0ijklmnop1234qrst", // Another EC2 instance ID
    Weight: 50
  }
];

const configuredEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("configured-endpoint-group", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234-5678-90ab-cdef-1234567890ab",
  EndpointGroupRegion: "eu-central-1",
  EndpointConfigurations: endpointConfigurations,
  HealthCheckIntervalSeconds: 10,
  TrafficDialPercentage: 100
});
```

## Using Port Overrides

Customize the traffic routing by specifying port overrides for the EndpointGroup.

```ts
const portOverrides = [
  {
    EndpointPort: 8080,
    ListenerPort: 80
  },
  {
    EndpointPort: 8443,
    ListenerPort: 443
  }
];

const portOverrideEndpointGroup = await AWS.GlobalAccelerator.EndpointGroup("port-override-endpoint-group", {
  ListenerArn: "arn:aws:globalaccelerator::123456789012:listener/abcd1234-5678-90ab-cdef-1234567890ab",
  EndpointGroupRegion: "ap-south-1",
  PortOverrides: portOverrides,
  HealthCheckIntervalSeconds: 15
});
```
