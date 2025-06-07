---
title: Managing AWS SupportApp SlackWorkspaceConfigurations with Alchemy
description: Learn how to create, update, and manage AWS SupportApp SlackWorkspaceConfigurations using Alchemy Cloud Control.
---

# SlackWorkspaceConfiguration

The SlackWorkspaceConfiguration resource allows you to manage the integration of Slack with AWS SupportApp. This integration facilitates the collaboration between AWS Support and your team's Slack workspace, enhancing the ability to handle support issues effectively. For more information, refer to the [AWS SupportApp SlackWorkspaceConfigurations documentation](https://docs.aws.amazon.com/supportapp/latest/userguide/).

## Minimal Example

Create a basic Slack workspace configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const SlackConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("SlackConfig", {
  TeamId: "T12345678", // Slack Team ID
  VersionId: "v1.0" // Optional version ID
});
```

## Advanced Configuration

Configure the Slack workspace with additional settings for better integration.

```ts
const AdvancedSlackConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("AdvancedSlackConfig", {
  TeamId: "T87654321", // Slack Team ID
  VersionId: "v1.1", // Optional version ID
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Resource Properties

Create a Slack configuration and utilize additional resource properties like ARN and timestamps.

```ts
const DetailedSlackConfig = await AWS.SupportApp.SlackWorkspaceConfiguration("DetailedSlackConfig", {
  TeamId: "T12345678", // Slack Team ID
  VersionId: "v1.2", // Optional version ID
  adopt: true // Adopt existing resource if it already exists
});

// Example of accessing additional properties
console.log(`Resource ARN: ${DetailedSlackConfig.Arn}`);
console.log(`Creation Time: ${DetailedSlackConfig.CreationTime}`);
console.log(`Last Update Time: ${DetailedSlackConfig.LastUpdateTime}`);
```