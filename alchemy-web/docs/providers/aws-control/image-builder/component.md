---
title: Managing AWS ImageBuilder Components with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder Components using Alchemy Cloud Control.
---

# Component

The Component resource lets you manage [AWS ImageBuilder Components](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) that are used to define the software and settings for your images.

## Minimal Example

Create a basic ImageBuilder component with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicComponent = await AWS.ImageBuilder.Component("BasicComponent", {
  Name: "BasicExampleComponent",
  Platform: "Linux",
  Version: "1.0.0",
  Description: "A basic component for demonstration purposes.",
  SupportedOsVersions: ["ubuntu-20-04"]
});
```

## Advanced Configuration

Configure an ImageBuilder component with additional settings like KMS key ID and tags.

```ts
const AdvancedComponent = await AWS.ImageBuilder.Component("AdvancedComponent", {
  Name: "AdvancedExampleComponent",
  Platform: "Linux",
  Version: "1.1.0",
  Description: "An advanced component with KMS key and tags.",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  Data: "base64-encoded-script-data"
});
```

## Component URI Example

Demonstrate creating a component using a URI to specify the source of the component data.

```ts
const UriComponent = await AWS.ImageBuilder.Component("UriComponent", {
  Name: "UriExampleComponent",
  Platform: "Windows",
  Version: "2.0.0",
  Description: "A component sourced from a URI.",
  Uri: "https://example.com/path/to/component.yaml",
  ChangeDescription: "Updated to include new features."
});
```

## Custom Data Example

Create a component with custom data that specifies installation steps.

```ts
const CustomDataComponent = await AWS.ImageBuilder.Component("CustomDataComponent", {
  Name: "CustomDataExampleComponent",
  Platform: "Linux",
  Version: "1.2.0",
  Description: "A component with custom data for installation.",
  Data: `
    version: 1.0
    phases:
      build:
        commands:
          - echo "Installing dependencies..."
          - apt-get update
          - apt-get install -y curl
  `
});
```