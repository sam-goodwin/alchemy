---
title: HealthCheck
description: Learn how to create, update, and manage AWS Route53 HealthChecks using Alchemy Cloud Control.
---


The HealthCheck resource lets you manage [AWS Route53 HealthChecks](https://docs.aws.amazon.com/route53/latest/userguide/) which monitor the health of your resources and ensure high availability by performing periodic checks.

## Minimal Example

Create a basic health check that monitors the availability of a website.

```ts
import AWS from "alchemy/aws/control";

const basicHealthCheck = await AWS.Route53.HealthCheck("basicHealthCheck", {
  HealthCheckConfig: {
    Type: "HTTP",
    ResourcePath: "/",
    FullyQualifiedDomainName: "www.example.com",
    Port: 80,
    RequestInterval: 30,
    FailureThreshold: 3,
    HealthThreshold: 2,
    AlarmIdentifier: {
      Name: "example-health-check"
    }
  },
  HealthCheckTags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a health check with advanced settings for enhanced monitoring, including custom thresholds and HTTP authentication.

```ts
const advancedHealthCheck = await AWS.Route53.HealthCheck("advancedHealthCheck", {
  HealthCheckConfig: {
    Type: "HTTPS",
    ResourcePath: "/health",
    FullyQualifiedDomainName: "api.example.com",
    Port: 443,
    RequestInterval: 60,
    FailureThreshold: 5,
    HealthThreshold: 3,
    InvertHealthCheck: true,
    HealthCheckCustomConfig: {
      EnableSNI: true,
      TlsRecordType: "A"
    },
    RequestHeaders: {
      "Authorization": "Bearer token"
    },
    AlarmIdentifier: {
      Name: "api-health-check"
    }
  },
  HealthCheckTags: [{ Key: "Service", Value: "API" }]
});
```

## Monitoring with CloudWatch Alarms

Set up a health check with a CloudWatch alarm to notify when the health check fails.

```ts
const monitoredHealthCheck = await AWS.Route53.HealthCheck("monitoredHealthCheck", {
  HealthCheckConfig: {
    Type: "HTTP",
    ResourcePath: "/status",
    FullyQualifiedDomainName: "monitor.example.com",
    Port: 80,
    RequestInterval: 30,
    FailureThreshold: 3,
    HealthThreshold: 1,
    AlarmIdentifier: {
      Name: "monitor-health-check"
    }
  },
  HealthCheckTags: [
    { Key: "Service", Value: "Monitoring" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```
