---
title: ContactFlowVersion
description: Learn how to create, update, and manage AWS Connect ContactFlowVersions using Alchemy Cloud Control.
---


The ContactFlowVersion resource allows you to manage [AWS Connect ContactFlowVersions](https://docs.aws.amazon.com/connect/latest/userguide/) for defining contact flows in your AWS Connect instance.

## Minimal Example

Create a basic ContactFlowVersion with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicContactFlowVersion = await AWS.Connect.ContactFlowVersion("basicContactFlowVersion", {
  ContactFlowId: "cf-1234567890abcdef", // Replace with your actual Contact Flow ID
  Description: "Basic contact flow version for handling customer inquiries"
});
```

## Advanced Configuration

Configure a ContactFlowVersion with additional properties, adopting an existing resource if necessary.

```ts
const advancedContactFlowVersion = await AWS.Connect.ContactFlowVersion("advancedContactFlowVersion", {
  ContactFlowId: "cf-abcdef1234567890", // Replace with your actual Contact Flow ID
  Description: "Advanced contact flow version with enhanced features",
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Versioning and Updates

Create a new version of an existing contact flow to update its configuration.

```ts
const updateContactFlowVersion = await AWS.Connect.ContactFlowVersion("updateContactFlowVersion", {
  ContactFlowId: "cf-0987654321fedcba", // Replace with your actual Contact Flow ID
  Description: "Updated version of the contact flow for improved customer experience"
});
```

## Logging and Monitoring

Manage a ContactFlowVersion with logging enabled to track performance and customer interactions.

```ts
const loggingContactFlowVersion = await AWS.Connect.ContactFlowVersion("loggingContactFlowVersion", {
  ContactFlowId: "cf-fedcba0987654321", // Replace with your actual Contact Flow ID
  Description: "Contact flow version with logging enabled for monitoring",
  adopt: false // Do not adopt existing resources
});
```
