---
title: Challenge
description: Learn how to create, update, and manage AWS PCAConnectorSCEP Challenges using Alchemy Cloud Control.
---


The Challenge resource allows you to manage [AWS PCAConnectorSCEP Challenges](https://docs.aws.amazon.com/pcaconnectorscep/latest/userguide/) for certificate management tasks like authentication and device provisioning.

## Minimal Example

Create a basic PCAConnectorSCEP Challenge with the required properties.

```ts
import AWS from "alchemy/aws/control";

const challenge = await AWS.PCAConnectorSCEP.Challenge("myChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/my-connector",
  Tags: {
    Environment: "Development",
    Project: "DeviceProvisioning"
  }
});
```

## Advanced Configuration

Create a PCAConnectorSCEP Challenge while adopting an existing resource if it already exists.

```ts
const existingChallenge = await AWS.PCAConnectorSCEP.Challenge("existingChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/my-connector",
  Tags: {
    Environment: "Production"
  },
  adopt: true // Adopt existing resource instead of failing
});
```

## Using Resource Tags

Create a PCAConnectorSCEP Challenge with multiple tags for better resource identification.

```ts
const taggedChallenge = await AWS.PCAConnectorSCEP.Challenge("taggedChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/my-connector",
  Tags: {
    Team: "Security",
    Purpose: "Certificate Management",
    Status: "Active"
  }
});
```

## Monitoring and Updates

Create a PCAConnectorSCEP Challenge and monitor its creation time and last update time.

```ts
const monitoredChallenge = await AWS.PCAConnectorSCEP.Challenge("monitorChallenge", {
  ConnectorArn: "arn:aws:pcaconnectorscep:us-east-1:123456789012:connector/my-connector"
});

// Accessing additional properties after creation
console.log(`Challenge ARN: ${monitoredChallenge.Arn}`);
console.log(`Created at: ${monitoredChallenge.CreationTime}`);
console.log(`Last updated at: ${monitoredChallenge.LastUpdateTime}`);
```
