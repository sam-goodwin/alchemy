---
title: Managing AWS GuardDuty IPSets with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty IPSets using Alchemy Cloud Control.
---

# IPSet

The IPSet resource allows you to manage [AWS GuardDuty IPSets](https://docs.aws.amazon.com/guardduty/latest/userguide/) for defining lists of IP addresses that GuardDuty uses to identify potential threats.

## Minimal Example

Create a basic IPSet with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const basicIPSet = await AWS.GuardDuty.IPSet("BasicIPSet", {
  Format: "TXT",
  Location: "s3://my-ip-set-bucket/ipset.txt",
  Activate: true,
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure an IPSet with additional properties, including a specified Detector ID:

```ts
const advancedIPSet = await AWS.GuardDuty.IPSet("AdvancedIPSet", {
  Format: "TXT",
  Location: "s3://my-ip-set-bucket/advanced-ipset.txt",
  Activate: false,
  DetectorId: "abcd1234efgh5678ijkl9012mnop3456qrst",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Existing Resource

Adopt an existing IPSet instead of failing if it already exists:

```ts
const adoptedIPSet = await AWS.GuardDuty.IPSet("AdoptedIPSet", {
  Format: "TXT",
  Location: "s3://my-ip-set-bucket/adopted-ipset.txt",
  Activate: true,
  adopt: true
});
```

## Example with Custom IP Format

Create an IPSet with a custom format and specific CIDR blocks:

```ts
const customIPSet = await AWS.GuardDuty.IPSet("CustomIPSet", {
  Format: "TXT",
  Location: "s3://my-ip-set-bucket/custom-ipset.txt",
  Activate: true,
  Tags: [{ Key: "Purpose", Value: "Testing" }]
});
```

This example assumes the provided file in S3 contains valid IP addresses formatted as expected by GuardDuty.