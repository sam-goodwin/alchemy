---
title: Service
description: Learn how to create, update, and manage AWS ServiceDiscovery Services using Alchemy Cloud Control.
---


The Service resource lets you manage [AWS ServiceDiscovery Services](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) for discovering and connecting to your application resources.

## Minimal Example

Create a basic service with required properties and a common optional property for DNS configuration.

```ts
import AWS from "alchemy/aws/control";

const basicService = await AWS.ServiceDiscovery.Service("basicService", {
  name: "myService",
  type: "HTTP",
  namespaceId: "ns-123456",
  dnsConfig: {
    namespaceId: "ns-123456",
    routingPolicy: "MULTIVALUE",
    dnsRecords: [
      {
        type: "A",
        ttl: 60
      }
    ]
  }
});
```

## Advanced Configuration

Configure a service with health check settings and custom attributes for enhanced monitoring.

```ts
const advancedService = await AWS.ServiceDiscovery.Service("advancedService", {
  name: "advancedService",
  type: "HTTP",
  namespaceId: "ns-123456",
  healthCheckConfig: {
    type: "HTTP",
    resourcePath: "/health",
    failureThreshold: 3
  },
  serviceAttributes: {
    "customAttr1": "value1",
    "customAttr2": "value2"
  }
});
```

## Service with Custom Health Check

Create a service that specifies a custom health check configuration to monitor application health.

```ts
const customHealthCheckService = await AWS.ServiceDiscovery.Service("customHealthCheckService", {
  name: "customHealthService",
  type: "HTTP",
  namespaceId: "ns-123456",
  healthCheckCustomConfig: {
    failureThreshold: 2,
    healthyThreshold: 3
  },
  dnsConfig: {
    namespaceId: "ns-123456",
    routingPolicy: "WEIGHTED",
    dnsRecords: [
      {
        type: "A",
        ttl: 60
      }
    ]
  }
});
```

## Service with Tags

Create a service and add tags for better resource organization and management.

```ts
const taggedService = await AWS.ServiceDiscovery.Service("taggedService", {
  name: "taggedService",
  type: "HTTP",
  namespaceId: "ns-123456",
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Team",
      value: "Engineering"
    }
  ]
});
```
