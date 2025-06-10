---
title: IntegrationAssociation
description: Learn how to create, update, and manage AWS Connect IntegrationAssociations using Alchemy Cloud Control.
---


The IntegrationAssociation resource lets you manage [AWS Connect IntegrationAssociations](https://docs.aws.amazon.com/connect/latest/userguide/) which are used to integrate AWS Connect with various third-party services.

## Minimal Example

Create a basic IntegrationAssociation with the required properties and an optional `adopt` property.

```ts
import AWS from "alchemy/aws/control";

const integrationAssociation = await AWS.Connect.IntegrationAssociation("myIntegrationAssociation", {
  IntegrationArn: "arn:aws:connect:us-west-2:123456789012:integration/my-integration",
  InstanceId: "instance-12345678",
  IntegrationType: "Chat",
  adopt: true // Optional: If true, adopt existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Configure an IntegrationAssociation with additional properties such as `Arn`, `CreationTime`, and `LastUpdateTime`.

```ts
const advancedIntegrationAssociation = await AWS.Connect.IntegrationAssociation("advancedIntegrationAssociation", {
  IntegrationArn: "arn:aws:connect:us-west-2:123456789012:integration/my-advanced-integration",
  InstanceId: "instance-87654321",
  IntegrationType: "Voice",
  adopt: false // Optional: Do not adopt if the resource exists
});

// Accessing additional properties
console.log("ARN:", advancedIntegrationAssociation.Arn);
console.log("Created At:", advancedIntegrationAssociation.CreationTime);
console.log("Last Updated At:", advancedIntegrationAssociation.LastUpdateTime);
```

## Use Case for CRM Integration

Create an IntegrationAssociation for integrating with a CRM system.

```ts
const crmIntegrationAssociation = await AWS.Connect.IntegrationAssociation("crmIntegrationAssociation", {
  IntegrationArn: "arn:aws:connect:us-west-2:123456789012:integration/my-crm-integration",
  InstanceId: "instance-13579246",
  IntegrationType: "CRM",
  adopt: true
});

// This integration allows agents to access CRM data during calls.
console.log("CRM Integration ARN:", crmIntegrationAssociation.Arn);
```

## Use Case for Chat Support

Set up an IntegrationAssociation specifically for chat support integration.

```ts
const chatIntegrationAssociation = await AWS.Connect.IntegrationAssociation("chatIntegrationAssociation", {
  IntegrationArn: "arn:aws:connect:us-west-2:123456789012:integration/my-chat-integration",
  InstanceId: "instance-24681357",
  IntegrationType: "Chat",
  adopt: false
});

// This integration facilitates seamless chat support operations.
console.log("Chat Integration ARN:", chatIntegrationAssociation.Arn);
```
