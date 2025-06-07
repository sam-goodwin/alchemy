---
title: Managing AWS Route53 RecordSets with Alchemy
description: Learn how to create, update, and manage AWS Route53 RecordSets using Alchemy Cloud Control.
---

# RecordSet

The RecordSet resource allows you to manage [AWS Route53 RecordSets](https://docs.aws.amazon.com/route53/latest/userguide/) for DNS configuration in your applications.

## Minimal Example

Create a basic A record pointing to an IP address with minimal required properties.

```ts
import AWS from "alchemy/aws/control";

const basicRecordSet = await AWS.Route53.RecordSet("BasicARecord", {
  Name: "mywebsite.com",
  Type: "A",
  TTL: "300",
  ResourceRecords: ["192.0.2.1"]
});
```

## Advanced Configuration

Configure a more complex RecordSet with health check and geo-location settings.

```ts
const advancedRecordSet = await AWS.Route53.RecordSet("AdvancedGeoRecord", {
  Name: "mygeo.website.com",
  Type: "A",
  TTL: "300",
  ResourceRecords: ["203.0.113.5"],
  HealthCheckId: "abc1234",
  GeoLocation: {
    CountryCode: "US"
  },
  Comment: "Advanced geo-targeted record for US users"
});
```

## Multi-Value Answer Configuration

Create a multi-value answer record set for load balancing across multiple IP addresses.

```ts
const multiValueRecordSet = await AWS.Route53.RecordSet("MultiValueRecord", {
  Name: "loadbalanced.com",
  Type: "A",
  TTL: "300",
  MultiValueAnswer: true,
  ResourceRecords: ["203.0.113.10", "203.0.113.20"]
});
```

## Alias RecordSet

Define an Alias target pointing to a CloudFront distribution.

```ts
const aliasRecordSet = await AWS.Route53.RecordSet("AliasToCloudFront", {
  Name: "www.mywebsite.com",
  Type: "A",
  AliasTarget: {
    DNSName: "d123456abcdef8.cloudfront.net",
    HostedZoneId: "Z2FDTNDATAQYW2"
  },
  TTL: "60",
  Comment: "Alias record pointing to CloudFront distribution"
});
```

## Failover RecordSet

Set up a failover record set for high availability.

```ts
const failoverRecordSet = await AWS.Route53.RecordSet("FailoverRecord", {
  Name: "failover.myapp.com",
  Type: "A",
  TTL: "60",
  ResourceRecords: ["192.0.2.2"],
  Failover: "PRIMARY",
  HealthCheckId: "healthcheck-id",
  Comment: "Primary record for failover setup"
});
```