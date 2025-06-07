---
title: Managing AWS GuardDuty ThreatIntelSets with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty ThreatIntelSets using Alchemy Cloud Control.
---

# ThreatIntelSet

The ThreatIntelSet resource allows you to manage [AWS GuardDuty ThreatIntelSets](https://docs.aws.amazon.com/guardduty/latest/userguide/) which are used to import threat intelligence data for enhanced security threat detection.

## Minimal Example

Create a basic ThreatIntelSet with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("BasicThreatIntelSet", {
  Format: "TXT",
  Location: "https://example.com/threat-intel.txt",
  Activate: true
});
```

## Advanced Configuration

Configure a ThreatIntelSet with additional properties such as tags and a specific detector ID.

```ts
const AdvancedThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("AdvancedThreatIntelSet", {
  Format: "JSON",
  Location: "https://example.com/threat-intel.json",
  DetectorId: "12abc34def567ghij890klmnop",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Custom Threat Intelligence

Create a ThreatIntelSet that utilizes a custom threat intelligence file for more tailored threat detection.

```ts
const CustomThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("CustomThreatIntelSet", {
  Format: "CSV",
  Location: "https://example.com/custom-threat-intel.csv",
  Activate: false,
  Tags: [
    { Key: "UseCase", Value: "Custom Threat Detection" },
    { Key: "Owner", Value: "SecurityTeam" }
  ]
});
```

## Adopt Existing ThreatIntelSet

Configure a ThreatIntelSet to adopt an existing resource instead of failing when the resource already exists.

```ts
const AdoptedThreatIntelSet = await AWS.GuardDuty.ThreatIntelSet("AdoptedThreatIntelSet", {
  Format: "TXT",
  Location: "https://example.com/existing-threat-intel.txt",
  Activate: true,
  adopt: true
});
```