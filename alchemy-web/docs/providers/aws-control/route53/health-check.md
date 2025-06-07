---
title: Managing AWS Route53 HealthChecks with Alchemy
description: Learn how to create, update, and manage AWS Route53 HealthChecks using Alchemy Cloud Control.
---

# HealthCheck

The HealthCheck resource allows you to manage [AWS Route53 HealthChecks](https://docs.aws.amazon.com/route53/latest/userguide/) to monitor the health of your application endpoints.

## Minimal Example

Create a basic health check for an HTTP endpoint with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicHealthCheck = await AWS.Route53.HealthCheck("BasicHealthCheck", {
  HealthCheckConfig: {
    Type: "HTTP",
    ResourcePath: "/health",
    FullyQualifiedDomainName: "api.yourdomain.com",
    Port: 80,
    RequestInterval: 30,
    FailureThreshold: 3
  },
  HealthCheckTags: [
    { Key: "Environment", Value: "production" },
    { Key: "Service", Value: "API" }
  ]
});
```

## Advanced Configuration

Configure a health check with advanced settings including HTTPS and custom health check parameters.

```ts
const AdvancedHealthCheck = await AWS.Route53.HealthCheck("AdvancedHealthCheck", {
  HealthCheckConfig: {
    Type: "HTTPS",
    ResourcePath: "/status",
    FullyQualifiedDomainName: "secure.yourdomain.com",
    Port: 443,
    RequestInterval: 60,
    FailureThreshold: 2,
    HealthThreshold: 2,
    SearchString: "Healthy",
    Inverted: false
  },
  HealthCheckTags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Service", Value: "WebApp" }
  ]
});
```

## Using Custom Health Check Settings

Create a health check with DNS resolution and custom health check settings.

```ts
const DnsHealthCheck = await AWS.Route53.HealthCheck("DnsHealthCheck", {
  HealthCheckConfig: {
    Type: "TCP",
    FullyQualifiedDomainName: "db.yourdomain.com",
    Port: 5432,
    RequestInterval: 20,
    FailureThreshold: 2,
    HealthThreshold: 1,
    MeasureLatency: true,
    EnableSNI: true
  },
  HealthCheckTags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Service", Value: "Database" }
  ]
});
```