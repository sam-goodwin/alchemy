---
title: Managing AWS Connect ContactFlowVersions with Alchemy
description: Learn how to create, update, and manage AWS Connect ContactFlowVersions using Alchemy Cloud Control.
---

# ContactFlowVersion

The ContactFlowVersion resource lets you manage [AWS Connect ContactFlowVersions](https://docs.aws.amazon.com/connect/latest/userguide/) for creating and managing contact flows within Amazon Connect.

## Resource Documentation

The ContactFlowVersion resource is essential for versioning contact flows, allowing you to maintain multiple iterations of your contact flow configurations. You can create, update, and delete contact flow versions to manage how customers interact with your services.

## Minimal Example

Create a basic ContactFlowVersion with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicContactFlowVersion = await AWS.Connect.ContactFlowVersion("BasicContactFlowVersion", {
  ContactFlowId: "12345678-1234-1234-1234-123456789012",
  Description: "Basic version of the contact flow for customer support"
});
```

## Advanced Configuration

Configure a ContactFlowVersion with additional properties such as adopting existing resources.

```ts
const advancedContactFlowVersion = await AWS.Connect.ContactFlowVersion("AdvancedContactFlowVersion", {
  ContactFlowId: "12345678-1234-1234-1234-123456789012",
  Description: "Advanced version of the contact flow with adoption of existing resources",
  adopt: true
});
```

## Versioning and Management Use Case

Create multiple versions of a contact flow for different business units.

```ts
const salesContactFlowVersion = await AWS.Connect.ContactFlowVersion("SalesContactFlowVersion", {
  ContactFlowId: "87654321-4321-4321-4321-210987654321",
  Description: "Contact flow version for the sales department"
});

const supportContactFlowVersion = await AWS.Connect.ContactFlowVersion("SupportContactFlowVersion", {
  ContactFlowId: "87654321-4321-4321-4321-210987654321",
  Description: "Contact flow version for customer support"
});
```

## Deleting a Contact Flow Version

An example demonstrating how to set up a contact flow version for deletion on resource destroy.

```ts
const deleteContactFlowVersion = await AWS.Connect.ContactFlowVersion("DeleteContactFlowVersion", {
  ContactFlowId: "12345678-1234-1234-1234-123456789012",
  Description: "Temporary contact flow version for testing",
  adopt: false // Ensures it fails if the resource already exists
});
```