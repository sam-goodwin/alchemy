---
title: HostedZone
description: Learn how to create, update, and manage AWS Route53 HostedZones using Alchemy Cloud Control.
---


The HostedZone resource lets you manage [AWS Route53 HostedZones](https://docs.aws.amazon.com/route53/latest/userguide/) for DNS management. Hosted zones allow you to route traffic for your domain and manage DNS records.

## Minimal Example

Create a basic hosted zone with a name and the ability to add tags.

```ts
import AWS from "alchemy/aws/control";

const hostedZone = await AWS.Route53.HostedZone("myHostedZone", {
  name: "mydomain.com",
  HostedZoneTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Website" }
  ]
});
```

## Advanced Configuration

Configure a hosted zone with VPC associations and custom settings.

```ts
import AWS from "alchemy/aws/control";

const hostedZoneWithVPC = await AWS.Route53.HostedZone("myVPCHostedZone", {
  name: "myvpcdomain.com",
  VPCs: [
    {
      VPCId: "vpc-0abcd1234efgh5678",
      VPCRegion: "us-west-2"
    }
  ],
  HostedZoneConfig: {
    Comment: "Hosted zone for my VPC domain"
  }
});
```

## Query Logging Configuration

Set up a hosted zone with query logging enabled for monitoring DNS queries.

```ts
import AWS from "alchemy/aws/control";

const hostedZoneWithLogging = await AWS.Route53.HostedZone("myLoggingHostedZone", {
  name: "myloggingdomain.com",
  QueryLoggingConfig: {
    CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:Route53Logs",
    CloudWatchLogsRoleArn: "arn:aws:iam::123456789012:role/Route53LoggingRole"
  }
});
```

## Adoption of Existing Hosted Zone

Adopt an existing hosted zone instead of failing if the resource already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedHostedZone = await AWS.Route53.HostedZone("existingHostedZone", {
  name: "existingdomain.com",
  adopt: true // This will adopt the hosted zone if it already exists
});
```
