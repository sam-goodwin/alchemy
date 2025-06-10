---
title: ExtensionAssociation
description: Learn how to create, update, and manage AWS AppConfig ExtensionAssociations using Alchemy Cloud Control.
---


The ExtensionAssociation resource allows you to manage [AWS AppConfig ExtensionAssociations](https://docs.aws.amazon.com/appconfig/latest/userguide/), which are used to associate extensions with AppConfig resources.

## Minimal Example

Create a basic ExtensionAssociation with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicExtensionAssociation = await AWS.AppConfig.ExtensionAssociation("basicAssociation", {
  ResourceIdentifier: "myApplication",
  ExtensionIdentifier: "myExtension",
  Parameters: {
    key1: "value1",
    key2: "value2"
  }
});
```

## Advanced Configuration

Configure an ExtensionAssociation with additional properties, including tags and an extension version number.

```ts
const advancedExtensionAssociation = await AWS.AppConfig.ExtensionAssociation("advancedAssociation", {
  ResourceIdentifier: "myApplication",
  ExtensionIdentifier: "myExtension",
  ExtensionVersionNumber: 1,
  Parameters: {
    key1: "value1",
    key2: "value2"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Adoption of Existing Resource

Create an ExtensionAssociation that adopts an existing resource if it already exists, preventing failure.

```ts
const adoptExistingAssociation = await AWS.AppConfig.ExtensionAssociation("adoptAssociation", {
  ResourceIdentifier: "myExistingApplication",
  ExtensionIdentifier: "myExtension",
  adopt: true
});
```

## Detailed Parameter Configuration

Demonstrate the use of detailed parameters for an ExtensionAssociation.

```ts
const detailedParameterAssociation = await AWS.AppConfig.ExtensionAssociation("detailedParamAssociation", {
  ResourceIdentifier: "myApplication",
  ExtensionIdentifier: "myDetailedExtension",
  Parameters: {
    configOption1: "enabled",
    configOption2: 42,
    configOption3: ["optionA", "optionB"]
  },
  Tags: [
    { Key: "Team", Value: "DevOps" }
  ]
});
```
