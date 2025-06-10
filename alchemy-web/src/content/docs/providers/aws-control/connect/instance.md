---
title: Instance
description: Learn how to create, update, and manage AWS Connect Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS Connect Instances](https://docs.aws.amazon.com/connect/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic AWS Connect Instance with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const connectInstance = await AWS.Connect.Instance("basicConnectInstance", {
  IdentityManagementType: "SAML", // Required property
  DirectoryId: "d-1234567890", // Optional property for directory
  Attributes: {
    // Attributes configuration
    InboundCallsEnabled: true,
    OutboundCallsEnabled: true
  }
});
```

## Advanced Configuration

Configure an AWS Connect Instance with tags and a custom instance alias.

```ts
const advancedConnectInstance = await AWS.Connect.Instance("advancedConnectInstance", {
  IdentityManagementType: "SAML", // Required property
  InstanceAlias: "MyCustomConnectInstance", // Optional property for alias
  Attributes: {
    InboundCallsEnabled: true,
    OutboundCallsEnabled: true,
    ChatEnabled: true
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CustomerSupport" }
  ]
});
```

## Instance with Directory Integration

Create an AWS Connect Instance that integrates with an Active Directory.

```ts
const directoryIntegratedInstance = await AWS.Connect.Instance("directoryIntegratedInstance", {
  IdentityManagementType: "DIRECTORY", // Required property
  DirectoryId: "d-0987654321", // Required property for directory integration
  Attributes: {
    InboundCallsEnabled: true,
    OutboundCallsEnabled: true,
    ChatEnabled: false
  },
  Tags: [
    { Key: "Service", Value: "Support" }
  ]
});
```

## Instance with Custom Attributes

Create an AWS Connect Instance with custom attributes for advanced call features.

```ts
const customAttributesInstance = await AWS.Connect.Instance("customAttributesInstance", {
  IdentityManagementType: "SAML", // Required property
  InstanceAlias: "SupportCenter", // Optional property
  Attributes: {
    InboundCallsEnabled: true,
    OutboundCallsEnabled: true,
    OutboundCallerId: "+1234567890", // Custom attribute for caller ID
    ChatEnabled: true
  },
  Tags: [
    { Key: "Department", Value: "CustomerService" },
    { Key: "Region", Value: "US-East" }
  ]
});
```
