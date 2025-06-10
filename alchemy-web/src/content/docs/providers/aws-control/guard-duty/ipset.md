---
title: IPSet
description: Learn how to create, update, and manage AWS GuardDuty IPSets using Alchemy Cloud Control.
---


The IPSet resource lets you manage [AWS GuardDuty IPSets](https://docs.aws.amazon.com/guardduty/latest/userguide/) for threat detection in your AWS environment.

## Minimal Example

Create a basic IPSet with required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const ipSet = await AWS.GuardDuty.IPSet("myIpSet", {
  Format: "TXT",
  Location: "https://my-bucket.s3.amazonaws.com/my-ipset.txt",
  Activate: true,
  DetectorId: "12abcdef34abcdef56789abcdef01234"
});
```

## Advanced Configuration

Configure an IPSet with tags for resource management.

```ts
const taggedIpSet = await AWS.GuardDuty.IPSet("taggedIpSet", {
  Format: "TXT",
  Location: "https://my-bucket.s3.amazonaws.com/my-tagged-ipset.txt",
  Activate: true,
  DetectorId: "12abcdef34abcdef56789abcdef01234",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Security" }
  ]
});
```

## Example with Existing Resource Adoption

Create an IPSet that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedIpSet = await AWS.GuardDuty.IPSet("adoptedIpSet", {
  Format: "TXT",
  Location: "https://my-bucket.s3.amazonaws.com/my-adopted-ipset.txt",
  Activate: true,
  DetectorId: "12abcdef34abcdef56789abcdef01234",
  adopt: true
});
```

## Example with Different Formats

Create an IPSet with a different format and custom location.

```ts
const jsonIpSet = await AWS.GuardDuty.IPSet("jsonIpSet", {
  Format: "JSON",
  Location: "https://my-bucket.s3.amazonaws.com/my-json-ipset.json",
  Activate: false,
  DetectorId: "12abcdef34abcdef56789abcdef01234"
});
```
