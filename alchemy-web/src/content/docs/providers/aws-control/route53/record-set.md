---
title: RecordSet
description: Learn how to create, update, and manage AWS Route53 RecordSets using Alchemy Cloud Control.
---


The RecordSet resource lets you manage [AWS Route53 RecordSets](https://docs.aws.amazon.com/route53/latest/userguide/) for DNS configurations and settings.

## Minimal Example

Create a basic A record for a domain.

```ts
import AWS from "alchemy/aws/control";

const basicRecordSet = await AWS.Route53.RecordSet("basicRecordSet", {
  Name: "example.com",
  Type: "A",
  TTL: "300",
  ResourceRecords: ["192.0.2.1"],
  HostedZoneId: "Z1234567890" // Replace with your actual hosted zone ID
});
```

## Alias Record Example

Create an alias record pointing to an AWS resource.

```ts
const aliasRecordSet = await AWS.Route53.RecordSet("aliasRecordSet", {
  Name: "www.example.com",
  Type: "A",
  AliasTarget: {
    DNSName: "dualstack.awselb-example-1234567890.us-east-1.elb.amazonaws.com",
    HostedZoneId: "Z1234567890" // Replace with the actual hosted zone ID for the load balancer
  },
  HostedZoneId: "Z1234567890" // Replace with your actual hosted zone ID
});
```

## Geo-Location Record Example

Configure a GeoLocation record for specific regions.

```ts
const geoLocationRecordSet = await AWS.Route53.RecordSet("geoLocationRecordSet", {
  Name: "example.com",
  Type: "A",
  TTL: "300",
  ResourceRecords: ["203.0.113.0"],
  GeoLocation: {
    CountryCode: "US" // Targeting users in the United States
  },
  HostedZoneId: "Z1234567890" // Replace with your actual hosted zone ID
});
```

## Multi-Value Answer Example

Set up a multi-value answer record for load balancing.

```ts
const multiValueRecordSet = await AWS.Route53.RecordSet("multiValueRecordSet", {
  Name: "example.com",
  Type: "A",
  TTL: "60",
  MultiValueAnswer: true,
  ResourceRecords: ["192.0.2.1", "192.0.2.2", "192.0.2.3"],
  HostedZoneId: "Z1234567890" // Replace with your actual hosted zone ID
});
```

## Failover Record Example

Create a failover record for high availability.

```ts
const failoverRecordSet = await AWS.Route53.RecordSet("failoverRecordSet", {
  Name: "example.com",
  Type: "A",
  TTL: "300",
  ResourceRecords: ["198.51.100.1"],
  HealthCheckId: "abc12345-6789-0123-4567-89abcdef0123", // Replace with your actual health check ID
  Failover: "PRIMARY",
  HostedZoneId: "Z1234567890" // Replace with your actual hosted zone ID
});
```
