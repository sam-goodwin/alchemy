---
title: LoggingConfiguration
description: Learn how to create, update, and manage AWS NetworkFirewall LoggingConfigurations using Alchemy Cloud Control.
---


The LoggingConfiguration resource allows you to manage [AWS NetworkFirewall LoggingConfigurations](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) for your network firewall, enabling you to configure logging settings for your firewall traffic.

## Minimal Example

Create a basic LoggingConfiguration for a network firewall with essential properties:

```ts
import AWS from "alchemy/aws/control";

const loggingConfig = await AWS.NetworkFirewall.LoggingConfiguration("basicLoggingConfig", {
  FirewallArn: "arn:aws:network-firewall:us-east-1:123456789012:firewall/my-firewall",
  LoggingConfiguration: {
    LogDestinationConfigs: [
      {
        LogDestinationType: "S3",
        LogDestination: {
          S3: {
            BucketName: "my-logging-bucket",
            Prefix: "firewall-logs/"
          }
        },
        LogType: ["ALERT", "FLOW"]
      }
    ]
  }
});
```

## Advanced Configuration

Configure a LoggingConfiguration with additional logging options for detailed monitoring:

```ts
const advancedLoggingConfig = await AWS.NetworkFirewall.LoggingConfiguration("advancedLoggingConfig", {
  FirewallArn: "arn:aws:network-firewall:us-east-1:123456789012:firewall/my-advanced-firewall",
  LoggingConfiguration: {
    LogDestinationConfigs: [
      {
        LogDestinationType: "CloudWatch",
        LogDestination: {
          CloudWatch: {
            LogGroupName: "my-firewall-logs",
            LogStreamName: "firewall-log-stream"
          }
        },
        LogType: ["ALERT", "FLOW", "INSPECTION"]
      },
      {
        LogDestinationType: "Kinesis",
        LogDestination: {
          Kinesis: {
            StreamName: "my-logs-kinesis-stream"
          }
        },
        LogType: ["ALERT", "FLOW"]
      }
    ]
  }
});
```

## Adoption of Existing Configuration

If you want to adopt an existing LoggingConfiguration without failing when it already exists, set the `adopt` property to true:

```ts
const adoptExistingConfig = await AWS.NetworkFirewall.LoggingConfiguration("adoptExistingConfig", {
  FirewallArn: "arn:aws:network-firewall:us-east-1:123456789012:firewall/my-existing-firewall",
  LoggingConfiguration: {
    LogDestinationConfigs: [
      {
        LogDestinationType: "S3",
        LogDestination: {
          S3: {
            BucketName: "existing-logging-bucket",
            Prefix: "existing-firewall-logs/"
          }
        },
        LogType: ["ALERT"]
      }
    ]
  },
  adopt: true
});
```
