---
title: Managing AWS AppConfig ExtensionAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppConfig ExtensionAssociations using Alchemy Cloud Control.
---

# ExtensionAssociation

The ExtensionAssociation resource lets you manage [AWS AppConfig ExtensionAssociations](https://docs.aws.amazon.com/appconfig/latest/userguide/) to extend the functionality of your applications by associating extensions with AppConfig resources.

## Minimal Example

Create a basic extension association with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const BasicExtensionAssociation = await AWS.AppConfig.ExtensionAssociation("BasicExtensionAssociation", {
  ResourceIdentifier: "myApplication",
  ExtensionIdentifier: "myExtension",
  ExtensionVersionNumber: 1,
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure an extension association with additional parameters to customize its behavior:

```ts
const AdvancedExtensionAssociation = await AWS.AppConfig.ExtensionAssociation("AdvancedExtensionAssociation", {
  ResourceIdentifier: "myEnvironment",
  ExtensionIdentifier: "myAdvancedExtension",
  ExtensionVersionNumber: 2,
  Parameters: {
    timeout: 30,
    retries: 3
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true
});
```

## Different Resource Association

Demonstrate the association of an extension with a different resource type, such as a configuration profile:

```ts
const ProfileExtensionAssociation = await AWS.AppConfig.ExtensionAssociation("ProfileExtensionAssociation", {
  ResourceIdentifier: "myConfigurationProfile",
  ExtensionIdentifier: "myProfileExtension",
  ExtensionVersionNumber: 1,
  Parameters: {
    maxSize: 100,
    encryption: "enabled"
  },
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```