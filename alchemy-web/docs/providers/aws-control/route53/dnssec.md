---
title: Managing AWS Route53 DNSSECs with Alchemy
description: Learn how to create, update, and manage AWS Route53 DNSSECs using Alchemy Cloud Control.
---

# DNSSEC

The DNSSEC resource lets you manage [AWS Route53 DNSSEC](https://docs.aws.amazon.com/route53/latest/userguide/) for your hosted zones, enabling DNS security extensions to protect against certain types of attacks.

## Minimal Example

Create a basic DNSSEC configuration for a hosted zone with the required properties.

```ts
import AWS from "alchemy/aws/control";

const DnsSecConfig = await AWS.Route53.DNSSEC("MyDnsSec", {
  HostedZoneId: "Z3M3LMZ1L3B8XA",
  adopt: false
});
```

## Advanced Configuration

Configure DNSSEC with additional properties such as adopting existing resources.

```ts
const AdvancedDnsSecConfig = await AWS.Route53.DNSSEC("AdvancedDnsSec", {
  HostedZoneId: "Z3M3LMZ1L3B8XA",
  adopt: true
});
```

## Handling Multiple Hosted Zones

Manage DNSSEC for multiple hosted zones by creating separate resources for each zone.

```ts
const PrimaryZoneDnsSec = await AWS.Route53.DNSSEC("PrimaryZoneDnsSec", {
  HostedZoneId: "Z1A2B3C4D5E6F7",
  adopt: false
});

const SecondaryZoneDnsSec = await AWS.Route53.DNSSEC("SecondaryZoneDnsSec", {
  HostedZoneId: "Z7X8Y9Z0A1B2C3",
  adopt: true
});
```

## Logging and Monitoring DNSSEC Changes

Monitor the creation time and last update time for auditing purposes.

```ts
const DnsSecMonitorConfig = await AWS.Route53.DNSSEC("MonitorDnsSec", {
  HostedZoneId: "Z2M3LMZ1L3B8XA",
  adopt: false
});

// Log the creation and last update time
console.log(`DNSSEC Created At: ${DnsSecMonitorConfig.CreationTime}`);
console.log(`DNSSEC Last Updated At: ${DnsSecMonitorConfig.LastUpdateTime}`);
```