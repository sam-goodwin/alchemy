---
title: DNSSEC
description: Learn how to create, update, and manage AWS Route53 DNSSECs using Alchemy Cloud Control.
---


The DNSSEC resource allows you to manage [AWS Route53 DNSSEC](https://docs.aws.amazon.com/route53/latest/userguide/) configurations, enabling you to secure your domain name system against certain types of attacks.

## Minimal Example

Create a basic DNSSEC configuration for a hosted zone.

```ts
import AWS from "alchemy/aws/control";

const dnssec = await AWS.Route53.DNSSEC("myDNSSEC", {
  HostedZoneId: "Z3M3LM4B2R8A5F", // Replace with your actual Hosted Zone ID
  adopt: true // Adopt existing DNSSEC configuration if it exists
});
```

## Advanced Configuration

Enhance your DNSSEC setup with additional properties if required.

```ts
const advancedDNSSEC = await AWS.Route53.DNSSEC("advancedDNSSEC", {
  HostedZoneId: "Z3M3LM4B2R8A5F", // Replace with your actual Hosted Zone ID
  adopt: false // Do not adopt existing DNSSEC configuration
});
```

## Example with Resource Output

You can also capture output properties from the DNSSEC resource, such as the ARN and creation timestamps.

```ts
const dnssecWithOutputs = await AWS.Route53.DNSSEC("dnssecWithOutputs", {
  HostedZoneId: "Z3M3LM4B2R8A5F", // Replace with your actual Hosted Zone ID
  adopt: true
});

// Accessing the ARN and timestamps
console.log(`DNSSEC ARN: ${dnssecWithOutputs.Arn}`);
console.log(`Creation Time: ${dnssecWithOutputs.CreationTime}`);
console.log(`Last Update Time: ${dnssecWithOutputs.LastUpdateTime}`);
```
