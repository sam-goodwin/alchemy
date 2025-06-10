---
title: RecordSetGroup
description: Learn how to create, update, and manage AWS Route53 RecordSetGroups using Alchemy Cloud Control.
---


The RecordSetGroup resource lets you manage [AWS Route53 RecordSetGroups](https://docs.aws.amazon.com/route53/latest/userguide/) for DNS configuration and management.

## Minimal Example

Create a basic RecordSetGroup with a comment and a hosted zone ID.

```ts
import AWS from "alchemy/aws/control";

const recordSetGroup = await AWS.Route53.RecordSetGroup("myRecordSetGroup", {
  Comment: "This is a test RecordSetGroup",
  HostedZoneId: "Z1D633PJN98FT9", // Example Hosted Zone ID
  RecordSets: [
    {
      Name: "example.com",
      Type: "A",
      TTL: 300,
      ResourceRecords: ["192.0.2.1"]
    }
  ]
});
```

## Advanced Configuration

Configure a RecordSetGroup with multiple record sets and a hosted zone name.

```ts
const advancedRecordSetGroup = await AWS.Route53.RecordSetGroup("advancedRecordSetGroup", {
  Comment: "Advanced RecordSetGroup with multiple records",
  HostedZoneName: "example.com.",
  RecordSets: [
    {
      Name: "www.example.com",
      Type: "CNAME",
      TTL: 300,
      ResourceRecords: ["example.com"]
    },
    {
      Name: "api.example.com",
      Type: "A",
      TTL: 300,
      ResourceRecords: ["192.0.2.2"]
    }
  ]
});
```

## Adoption of Existing Resource

Use the `adopt` property to adopt an existing RecordSetGroup instead of failing when it already exists.

```ts
const adoptedRecordSetGroup = await AWS.Route53.RecordSetGroup("adoptedRecordSetGroup", {
  Comment: "Adopting an existing RecordSetGroup",
  HostedZoneId: "Z1D633PJN98FT9",
  adopt: true,
  RecordSets: [
    {
      Name: "legacy.example.com",
      Type: "A",
      TTL: 300,
      ResourceRecords: ["203.0.113.10"]
    }
  ]
});
```

## Creating a Complex RecordSetGroup

Configure a RecordSetGroup with different record types and configurations.

```ts
const complexRecordSetGroup = await AWS.Route53.RecordSetGroup("complexRecordSetGroup", {
  Comment: "Complex RecordSetGroup with various record types",
  HostedZoneId: "Z1D633PJN98FT9",
  RecordSets: [
    {
      Name: "mail.example.com",
      Type: "MX",
      TTL: 300,
      ResourceRecords: ["10 mailserver.example.com"]
    },
    {
      Name: "ftp.example.com",
      Type: "CNAME",
      TTL: 300,
      ResourceRecords: ["ftp.example.com"]
    },
    {
      Name: "example.com",
      Type: "AAAA",
      TTL: 300,
      ResourceRecords: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"]
    }
  ]
});
```
