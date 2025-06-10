---
title: SecurityProfile
description: Learn how to create, update, and manage AWS IoT SecurityProfiles using Alchemy Cloud Control.
---


The SecurityProfile resource lets you manage [AWS IoT SecurityProfiles](https://docs.aws.amazon.com/iot/latest/userguide/) for monitoring and controlling the security aspects of your IoT devices.

## Minimal Example

Create a basic IoT SecurityProfile with essential properties and one optional property for additional metrics.

```ts
import AWS from "alchemy/aws/control";

const basicSecurityProfile = await AWS.IoT.SecurityProfile("basicSecurityProfile", {
  securityProfileName: "BasicSecurityProfile",
  securityProfileDescription: "A simple security profile for basic monitoring.",
  behaviors: [{
    metric: "mqtt.broker.bytes",
    operator: "greater-than",
    threshold: 1000,
    durationSeconds: 60
  }],
  additionalMetricsToRetainV2: [{
    metric: "mqtt.broker.bytes",
    metricType: "average",
    statistic: "Average"
  }]
});
```

## Advanced Configuration

Configure a SecurityProfile with multiple behaviors and alert targets for comprehensive monitoring.

```ts
const advancedSecurityProfile = await AWS.IoT.SecurityProfile("advancedSecurityProfile", {
  securityProfileName: "AdvancedSecurityProfile",
  securityProfileDescription: "An advanced security profile with multiple behaviors.",
  behaviors: [{
    metric: "iot.device.connection",
    operator: "greater-than",
    threshold: 5,
    durationSeconds: 300
  }, {
    metric: "iot.device.error",
    operator: "greater-than",
    threshold: 1,
    durationSeconds: 60
  }],
  alertTargets: {
    "sns": {
      targetArn: "arn:aws:sns:us-west-2:123456789012:SecurityAlerts",
      roleArn: "arn:aws:iam::123456789012:role/SecurityProfileAlerts"
    }
  }
});
```

## Monitoring with Metrics Export

Set up an IoT SecurityProfile that exports metrics for detailed analysis.

```ts
const metricsExportSecurityProfile = await AWS.IoT.SecurityProfile("metricsExportSecurityProfile", {
  securityProfileName: "MetricsExportSecurityProfile",
  securityProfileDescription: "Security profile with metrics export configuration.",
  behaviors: [{
    metric: "iot.device.connection",
    operator: "greater-than",
    threshold: 5,
    durationSeconds: 300
  }],
  metricsExportConfig: {
    roleArn: "arn:aws:iam::123456789012:role/ExportMetricsRole",
    metricTypes: ["total", "average"]
  }
});
```

## Tagging for Organization

Create a SecurityProfile with tags for better resource organization and management.

```ts
const taggedSecurityProfile = await AWS.IoT.SecurityProfile("taggedSecurityProfile", {
  securityProfileName: "TaggedSecurityProfile",
  securityProfileDescription: "Security profile with tags for better organization.",
  tags: [{
    key: "Environment",
    value: "Production"
  }, {
    key: "Owner",
    value: "DevOps Team"
  }]
});
```
