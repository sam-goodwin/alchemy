---
title: Instance
description: Learn how to create, update, and manage AWS ServiceDiscovery Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS ServiceDiscovery Instances](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) for service discovery and health checking of your applications.

## Minimal Example

Create a basic ServiceDiscovery Instance with required properties:

```ts
import AWS from "alchemy/aws/control";

const serviceDiscoveryInstance = await AWS.ServiceDiscovery.Instance("myServiceDiscoveryInstance", {
  InstanceAttributes: {
    "AWS_INSTANCE_IPV4": "192.0.2.1",
    "AWS_INSTANCE_PORT": "80"
  },
  ServiceId: "srv-12345678", // Replace with your actual service ID
  InstanceId: "instance-001", // Optional: unique instance ID
  adopt: true // Optional: adopt existing resource if it exists
});
```

## Advanced Configuration

Configure an instance with additional attributes for detailed service information:

```ts
const advancedServiceDiscoveryInstance = await AWS.ServiceDiscovery.Instance("myAdvancedServiceDiscoveryInstance", {
  InstanceAttributes: {
    "AWS_INSTANCE_IPV4": "192.0.2.2",
    "AWS_INSTANCE_PORT": "8080",
    "AWS_INSTANCE_NAME": "myAppInstance",
    "AWS_INSTANCE_HEALTH_STATUS": "Healthy"
  },
  ServiceId: "srv-87654321", // Replace with your actual service ID
  InstanceId: "instance-002" // Optional: unique instance ID
});
```

## Using with Auto-Discovery

Integrate ServiceDiscovery Instance with auto-discovery capabilities:

```ts
const autoDiscoveryInstance = await AWS.ServiceDiscovery.Instance("myAutoDiscoveryInstance", {
  InstanceAttributes: {
    "AWS_INSTANCE_IPV4": "192.0.2.3",
    "AWS_INSTANCE_PORT": "443",
    "AWS_INSTANCE_NAME": "secureAppInstance"
  },
  ServiceId: "srv-11223344", // Replace with your actual service ID
  InstanceId: "instance-003", // Optional: unique instance ID
  adopt: true // Optional: adopt existing resource if it exists
});
```
