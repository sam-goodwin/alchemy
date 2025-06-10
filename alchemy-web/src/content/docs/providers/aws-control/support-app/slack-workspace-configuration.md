---
title: SlackWorkspaceConfiguration
description: Learn how to create, update, and manage AWS SupportApp SlackWorkspaceConfigurations using Alchemy Cloud Control.
---


The SlackWorkspaceConfiguration resource lets you manage the integration of AWS Support with Slack, allowing notifications and updates to be sent to your Slack channels. For more detailed information, visit the [AWS SupportApp SlackWorkspaceConfigurations](https://docs.aws.amazon.com/supportapp/latest/userguide/) documentation.

## Minimal Example

Create a basic Slack workspace configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const slackWorkspaceConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("mySlackWorkspaceConfig", {
  TeamId: "T1234567890", // Slack Team ID
  VersionId: "v1" // Optional: Specify a version ID
});
```

## Advanced Configuration

Configure a Slack workspace with additional properties such as a specific version ID.

```ts
const advancedSlackWorkspaceConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("advancedSlackWorkspaceConfig", {
  TeamId: "T0987654321", // Slack Team ID
  VersionId: "v2", // Specify a different version ID
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Updating Existing Configuration

Update an existing Slack workspace configuration by specifying the new version ID.

```ts
const updateSlackWorkspaceConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("updateSlackWorkspaceConfig", {
  TeamId: "T1234567890", // Slack Team ID to update
  VersionId: "v3" // Update to a new version ID
});
```

## Adopting an Existing Resource

Adopt an existing Slack workspace configuration without causing an error if it already exists.

```ts
const adoptSlackWorkspaceConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("adoptSlackWorkspaceConfig", {
  TeamId: "T1122334455", // Slack Team ID
  adopt: true // Set to true to adopt the existing resource
});
```
