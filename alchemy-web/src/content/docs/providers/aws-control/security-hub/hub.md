---
title: Hub
description: Learn how to create, update, and manage AWS SecurityHub Hubs using Alchemy Cloud Control.
---


The Hub resource lets you manage [AWS SecurityHub Hubs](https://docs.aws.amazon.com/securityhub/latest/userguide/) for centralizing security findings and compliance checks across your AWS accounts.

## Minimal Example

Create a basic SecurityHub Hub with default settings and enable default standards.

```ts
import AWS from "alchemy/aws/control";

const securityHubHub = await AWS.SecurityHub.Hub("defaultSecurityHub", {
  EnableDefaultStandards: true,
  ControlFindingGenerator: "AWS"
});
```

## Advanced Configuration

Configure a SecurityHub Hub with automatic control enabling and specific tags for management.

```ts
const advancedSecurityHubHub = await AWS.SecurityHub.Hub("advancedSecurityHub", {
  EnableDefaultStandards: true,
  AutoEnableControls: true,
  Tags: {
    Environment: "Production",
    Department: "Security"
  }
});
```

## Adoption of Existing Resources

If you need to adopt an existing SecurityHub Hub without failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptedSecurityHubHub = await AWS.SecurityHub.Hub("adoptedSecurityHub", {
  EnableDefaultStandards: true,
  adopt: true
});
```
