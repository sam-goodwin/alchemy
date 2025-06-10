---
title: TLSInspectionConfiguration
description: Learn how to create, update, and manage AWS NetworkFirewall TLSInspectionConfigurations using Alchemy Cloud Control.
---


The TLSInspectionConfiguration resource allows you to manage and configure TLS inspection settings for AWS Network Firewall, enabling you to monitor and inspect encrypted traffic. For more details, refer to the [AWS NetworkFirewall TLSInspectionConfigurations documentation](https://docs.aws.amazon.com/networkfirewall/latest/userguide/).

## Minimal Example

Create a basic TLS Inspection Configuration with required properties and common optional settings:

```ts
import AWS from "alchemy/aws/control";

const tlsInspectionConfig = await AWS.NetworkFirewall.TLSInspectionConfiguration("basicTlsInspectionConfig", {
  TLSInspectionConfigurationName: "BasicTLSInspection",
  Description: "A basic TLS inspection configuration for monitoring traffic",
  TLSInspectionConfiguration: {
    // Define the TLS inspection configuration settings here
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a TLS Inspection Configuration with detailed settings for certificate validation and logging:

```ts
const advancedTlsInspectionConfig = await AWS.NetworkFirewall.TLSInspectionConfiguration("advancedTlsInspectionConfig", {
  TLSInspectionConfigurationName: "AdvancedTLSInspection",
  Description: "An advanced TLS inspection configuration with detailed settings",
  TLSInspectionConfiguration: {
    // Example configuration settings
    CertificateValidation: {
      // Define certificate validation rules
    },
    LoggingConfiguration: {
      LogLevel: "INFO",
      LogDestination: "S3"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkSecurity" }
  ]
});
```

## Custom Logging Configuration

Set up a TLS Inspection Configuration with a custom logging setup for enhanced security monitoring:

```ts
const customLoggingTlsInspectionConfig = await AWS.NetworkFirewall.TLSInspectionConfiguration("customLoggingTlsInspectionConfig", {
  TLSInspectionConfigurationName: "CustomLoggingTLSInspection",
  Description: "TLS inspection config with custom logging for security audits",
  TLSInspectionConfiguration: {
    LoggingConfiguration: {
      LogLevel: "ERROR",
      LogDestination: "CloudWatchLogs",
      LogGroup: "TLSInspectionLogs"
    }
  },
  Tags: [
    { Key: "Compliance", Value: "PCI-DSS" }
  ]
});
```

## Adoption of Existing Configuration

Adopt an existing TLS Inspection Configuration instead of failing if it already exists:

```ts
const adoptExistingTlsInspectionConfig = await AWS.NetworkFirewall.TLSInspectionConfiguration("adoptExistingTlsInspectionConfig", {
  TLSInspectionConfigurationName: "ExistingTLSInspection",
  Description: "Adopting an existing TLS inspection configuration",
  TLSInspectionConfiguration: {
    // Use existing settings from the deployed configuration
  },
  adopt: true // Enable adoption
});
```
