---
title: Managing AWS SecurityHub Hubs with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub Hubs using Alchemy Cloud Control.
---

# Hub

The Hub resource lets you manage [AWS SecurityHub Hubs](https://docs.aws.amazon.com/securityhub/latest/userguide/) which provide a centralized view of security alerts and compliance status across AWS accounts.

## Minimal Example

Create a basic SecurityHub Hub with default settings.

```ts
import AWS from "alchemy/aws/control";

const SecurityHubHub = await AWS.SecurityHub.Hub("default-hub", {
  EnableDefaultStandards: true,
  ControlFindingGenerator: "AWS",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a SecurityHub Hub with auto-enable controls and custom tags.

```ts
const AdvancedSecurityHubHub = await AWS.SecurityHub.Hub("advanced-hub", {
  EnableDefaultStandards: true,
  AutoEnableControls: true,
  ControlFindingGenerator: "CustomGenerator",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevSecOps" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing SecurityHub Hub without failing if it already exists.

```ts
const AdoptedSecurityHubHub = await AWS.SecurityHub.Hub("adopted-hub", {
  EnableDefaultStandards: true,
  ControlFindingGenerator: "AWS",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Integration with Other AWS Services

Create a SecurityHub Hub that integrates with other AWS services for enhanced monitoring.

```ts
const IntegratedSecurityHubHub = await AWS.SecurityHub.Hub("integrated-hub", {
  EnableDefaultStandards: true,
  ControlFindingGenerator: "AWS",
  AutoEnableControls: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Service", Value: "Monitoring" }
  ]
});
```