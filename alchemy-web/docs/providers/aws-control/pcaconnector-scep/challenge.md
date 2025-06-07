---
title: Managing AWS PCAConnectorSCEP Challenges with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorSCEP Challenges using Alchemy Cloud Control.
---

# Challenge

The Challenge resource allows you to manage [AWS PCAConnectorSCEP Challenges](https://docs.aws.amazon.com/pcaconnectorscep/latest/userguide/) for certificate provisioning within AWS environments.

## Minimal Example

This example demonstrates how to create a basic PCAConnectorSCEP Challenge with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicChallenge = await AWS.PCAConnectorSCEP.Challenge("BasicChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/myConnector",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

In this example, we create a Challenge with additional tags and the option to adopt an existing resource.

```ts
const advancedChallenge = await AWS.PCAConnectorSCEP.Challenge("AdvancedChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/myAdvancedConnector",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ],
  adopt: true
});
```

## Handling Existing Resources

This example illustrates creating a Challenge while ensuring that existing resources are adopted instead of failing.

```ts
const existingResourceChallenge = await AWS.PCAConnectorSCEP.Challenge("ResourceChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/myExistingConnector",
  adopt: true
});
```

## Resource Lifecycle Management

Here, we demonstrate how to create a Challenge and manage its lifecycle.

```ts
const lifecycleChallenge = await AWS.PCAConnectorSCEP.Challenge("LifecycleChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/myLifecycleConnector",
  Tags: [{ Key: "Environment", Value: "Testing" }]
});

// Logic for updating the Challenge can be added here
```