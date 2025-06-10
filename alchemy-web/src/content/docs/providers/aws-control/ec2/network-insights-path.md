---
title: NetworkInsightsPath
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsPaths using Alchemy Cloud Control.
---


The NetworkInsightsPath resource allows you to create and manage paths for network insights in AWS EC2, providing visibility into the network route between a source and a destination. For more information, refer to the [AWS EC2 NetworkInsightsPaths documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Network Insights Path with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const networkInsightsPath = await AWS.EC2.NetworkInsightsPath("basicNetworkInsightsPath", {
  Source: "i-0123456789abcdef0", // Example EC2 instance ID as source
  Destination: "i-0abcdef1234567890", // Example EC2 instance ID as destination
  Protocol: "tcp", // Specify TCP protocol
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a Network Insights Path with additional settings including source and destination IPs, and filtering options.

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkInsightsPath = await AWS.EC2.NetworkInsightsPath("advancedNetworkInsightsPath", {
  Source: "i-0123456789abcdef0",
  Destination: "i-0abcdef1234567890",
  Protocol: "udp",
  SourceIp: "10.0.0.1", // Example CIDR block for source IP
  DestinationIp: "10.0.0.2", // Example CIDR block for destination IP
  DestinationPort: 8080, // Common application port
  FilterAtSource: {
    // Example filter configuration
    Protocol: "udp",
    Port: 8080
  },
  FilterAtDestination: {
    // Example filter configuration
    Protocol: "udp",
    Port: 8080
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```

## Example with Custom Filtering

In this example, we create a Network Insights Path with specific filtering at both the source and destination.

```ts
import AWS from "alchemy/aws/control";

const customFilteredNetworkInsightsPath = await AWS.EC2.NetworkInsightsPath("customFilteredNetworkInsightsPath", {
  Source: "i-0abcdef1234567890",
  Destination: "i-0123456789abcdef0",
  Protocol: "icmp", // Using ICMP for ping
  FilterAtSource: {
    Protocol: "icmp",
    Port: null // ICMP does not use ports
  },
  FilterAtDestination: {
    Protocol: "icmp",
    Port: null // ICMP does not use ports
  }
});
```

## Example with Resource Adoption

Create a Network Insights Path while adopting an existing resource if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedNetworkInsightsPath = await AWS.EC2.NetworkInsightsPath("adoptedNetworkInsightsPath", {
  Source: "i-0123456789abcdef0",
  Destination: "i-0abcdef1234567890",
  Protocol: "tcp",
  adopt: true // Adopt existing resource if it exists
});
```
