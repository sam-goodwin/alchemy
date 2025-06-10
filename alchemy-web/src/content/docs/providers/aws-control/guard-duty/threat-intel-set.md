---
title: ThreatIntelSet
description: Learn how to create, update, and manage AWS GuardDuty ThreatIntelSets using Alchemy Cloud Control.
---


The ThreatIntelSet resource allows you to manage [AWS GuardDuty ThreatIntelSets](https://docs.aws.amazon.com/guardduty/latest/userguide/) which are used to provide additional intelligence data to enhance threat detection.

## Minimal Example

Create a basic ThreatIntelSet with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const threatIntelSet = await AWS.GuardDuty.ThreatIntelSet("basicIntelSet", {
  format: "TXT",
  location: "https://example.com/threat-intel.txt",
  activate: true,
  detectorId: "detector-1234567890abcdef"
});
```

## Advanced Configuration

Configure a ThreatIntelSet with additional tags for better resource management.

```ts
const advancedThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("advancedIntelSet", {
  format: "JSON",
  location: "https://example.com/advanced-intel.json",
  activate: false,
  detectorId: "detector-abcdef1234567890",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Security" }
  ]
});
```

## Updating an Existing ThreatIntelSet

Adopt an existing ThreatIntelSet instead of failing if it already exists.

```ts
const existingThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("existingIntelSet", {
  format: "CSV",
  location: "https://example.com/existing-intel.csv",
  activate: true,
  detectorId: "detector-fedcba0987654321",
  adopt: true
});
```

## Using Tags for Resource Management

Create a ThreatIntelSet with specific tags to help with organization and billing.

```ts
const taggedThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("taggedIntelSet", {
  format: "TXT",
  location: "https://example.com/tagged-intel.txt",
  activate: true,
  detectorId: "detector-12345abcdef",
  tags: [
    { Key: "Department", Value: "IT" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```
